<template>
  <div id="app">
    <router-view class='route'></router-view>
  </div>
</template>

<script>
import Vue from 'vue';
import wx from 'weixin-js-sdk';
export default {
  name: 'app',
  methods:{
    getAcId() {
      var arr=window.location.href.split("?"),str=arr[1],t=this,
          obj=t.getSearch(str);
      if(str&&(window.location.href.indexOf("code")>-1)) {
        str=str.split("#\/")[0]+"&"+arr[3];
      } else if(window.location.href.indexOf("profile")==-1) {
        t.$http.get(`${t.$URL}/wechat/returnPayParameter.htm`,
          {params:{ url:encodeURIComponent(window.location.href) }})
        .then(res=>{
          var rData=res.data.data;
          //window.location.href=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${rData.appId}&redirect_uri=${encodeURIComponent(window.location.href)}&response_type=code&scope=snsapi_userinfo&state=${obj.other}#wechat_redirect`;
        }).catch(err=>{
          console.log(err);
        });
        //var url=`${t.$URL}/wechat/preCode.htm`;
        //code不存在,从后台获取url，进行跳转
        // t.$http.get(url,{params:{
        //   localhosturl:encodeURIComponent(window.location.href),
        //   state:obj.other
        // }})
        // .then(res=>{
        //   t.$weui.alert(res.data);
        //   //window.location.href=res.data;
        // }).catch(err=>{
        //   console.log(err);
        //   t.$weui.alert(err);
        // });
      }
      var obj=t.getSearch(str),
          AC_ID=obj.state||12;
      Vue.prototype.$AC_ID=AC_ID;
      t.getUserinfo(obj.code);
    },
    isWeiXin(){ 
      var ua = window.navigator.userAgent.toLowerCase(); 
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
      return true; 
      }else{ 
      return false; 
      } 
    },
    getSearch(str) {
      var arr=str&&str.split("&"),obj={};
      if(arr&&arr.length>0) {
        arr.map(function(v,i) {
          var a=v.split("="),name=a[0],value=a[1];
          obj[name]=value;
          return 1;
        });
      }
      return obj;
    },
    getUserinfo(code) {
      var t=this;
      if(code&&!t.$userinfo) {
        t.$http.get(`${t.$URL}/wechat/getspAccess_Token.htm?code=${code}`)
        .then(res=>{
          Vue.prototype.$userinfo=res.data;
          if(res.data.errmsg)
          t.$weui.alert(res.data.errmsg);
        }).catch(err=>{
          console.log(err);
        });
      }
    },
    getLogin() {
      let data={
        url:window.location.href.split("#")[0],
        jsApiList:['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ',
        'onMenuShareWeibo','onMenuShareQZone','chooseWXPay']
      },t=this;
      this.$http.get(`${this.$URL}/wechat/returnPayParameter.htm?url=${encodeURIComponent(data.url)}`)
      .then(res=>{
        var rData=res.data.data;
        Vue.prototype.$appid=rData.appId;
        wx.config({
          debug:false,
          appId:rData.appId,
          timestamp:parseInt(rData.timestamp),
          nonceStr:rData.noncestr,
          signature:rData.signature,
          jsApiList:data.jsApiList
        });
        wx.ready(function(){
          console.log('成功引入js-sdk');
          var shareObj={
            link:window.window.location.href
          };
          t.$u.share(shareObj,wx);
        });
      }).catch(err=>{
        console.log(err);
      });
    }
  },
  created() {
    var t=this,{$u:{getCookie,setCookie}}=t;
    if(!t.isWeiXin()) {
      t.$router.replace('/noWeixin');
    } else {
      if(window.location.href.indexOf("noWeixin")>=0) {
        t.$router.replace('/');
      }
    }

    this.getLogin();
    this.getAcId();
  }
}
</script>

<style>
html,body {
	font-size-adjust: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size:14rem;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden;
  width:100vw;
}
footer {
  position: fixed;
  bottom:0;
  z-index:9999;
}
#app .more1 {
  margin-bottom:120px;
}
.v_m {
  vertical-align:middle;
}

</style>
