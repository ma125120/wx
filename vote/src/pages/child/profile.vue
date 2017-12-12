<template>
  <div class="profile">
    <header>
      <div class="title">
        <img :src="info.us_pic1" alt="" class='img t_m' />
        <span class='t_m'>{{info.us_name}}</span>
      </div>
      <div class="header-body flex">
        <div class="col-4">
          <img :src="'./static/imgs/svg/num.svg'" alt="" class='svg' />
          <span>编号</span>
          <p class='num'>{{info.number}}</p>
        </div>
        <div class="col-4">
          <img :src="'./static/imgs/svg/top2.svg'" alt="" class='svg' />
          <span>票数</span>
          <p class='num'>{{info.us_tiket}}</p>
        </div>
        <div class="col-4">
          <img :src="'./static/imgs/svg/hot.svg'" alt="" class='svg' />
          <span>热度</span>
          <p class='num'>{{info.hot}}</p>
        </div>
        <div class="col-4">
          <img :src="'./static/imgs/svg/gift1.svg'" alt="" class='svg' />
          <span>礼物</span>
          <p class='num'>{{gift_num}}</p>
        </div>
      </div>
    </header>
    <div class="page-body">
      <div class="title1">宣传:</div>
      <p class='intro'>{{info.introduce}}</p>
      <Slide :slides="swiperSlides"></Slide>
      <!-- <div class="swiper" @touchstart="t_start" @touchend='t_end'>
      <div class="slide">
        <img :class="i==slide_i?'active':'dis'" :src="slide" alt="" v-for="(slide,i) in swiperSlides" />
        <ul>
          <li v-for="v in [0,1,2]" :class="v==slide_i?'ac_li cir':'cir'"></li>
        </ul>
      </div>
    </div> -->
      <!-- <img :src="info.us_pic1" alt="" style="min-height:300px" /> -->
    </div>
    <div class="gift-list">
      <div class="title1">礼物列表:</div>
        <div class="item" v-for="(v,i) in given" :key='v.name'>
          <div class="left">
            <img :src="v.headimg" alt="" />
          </div>
          <div class="right">
            <p class="top">{{v.name}}给TA送了{{v.present_num}}{{v.unit}}{{v.pr_name}}</p>
            <p class="bot">{{v.created|mytime}}</p>
          </div>
      </div>
    </div>
    <div class='more1' @click='loadMore'>查看更多</div>

    <footer class='flex'>
      <router-link to='/' tag='div' class="l" replace><img :src="'./static/imgs/svg/back.svg'" alt='回首页' /><span>回首页</span></router-link>
      <div class="m" @click.stop="singleTicket"><img :src="'./static/imgs/svg/heart.svg'" class='my_svg'><span>投票</span></div>
      <router-link :to="'/gift?id='+this.$route.query.id+'&num_id='+this.$route.query.num_id" tag='div' class="r"><img :src="'./static/imgs/svg/zuanshi.svg'" alt='礼物' /><span>礼物</span></router-link>
    </footer>
  </div>
</template>

<script>
import Vue from 'vue';
import Slide from '@/components/slide'
var x1,x2,us_name,number,us_pic1,my_id,t_id,
    url0;
var getSearch=function(str) {
      var arr=str&&str.split("&"),obj={};
      if(arr&&arr.length>0) {
        arr.map(function(v,i) {
          var a=v.split("="),name=a[0],value=a[1];
          obj[name]=value;
          return 1;
        });
      }
      return obj;
};
export default {
  name: 'hello',
  components:{
    Slide
  },
  data () {
    return {
      given:[],
      start:0,
      i:0,
      slide_i:0,
      _id:'',
      pageSize:20,
      gift_num:0,
      info:{},
      isLoading:true,
      swiperSlides:[],
      items:[
        {
          icon:'./static/imgs/svg/top2.svg',
          text:'编号',
          attr:'number'
        },
        {
          icon:'./static/imgs/svg/top2.svg',
          text:'票数',
          attr:'us_ticket'
        },
        {
          icon:'./static/imgs/svg/top2.svg',
          text:'热度',
          attr:'hot'
        },
        {
          icon:'./static/imgs/svg/top2.svg',
          text:'礼物',
          attr:'gift'
        }
      ]
    }
  },
  filters:{
    mytime(value){console.log(value)
      var format=function(v) {
        return v<10?('0'+v):v;
      }
      var times=new Date(value),
          year=times.getFullYear(),
          month=times.getMonth()+1,
          date=times.getDate(),
          hour=times.getHours(),
          minute=times.getMinutes(),
          sec=times.getSeconds();
      return `${year}-${format(month)}-${format(date)} ${format(hour)}:${format(minute)}:${format(sec)}`;
    }
  },
  methods:{
    share(wx) {
      var t=this;
      let data={
        url:window.location.href.split("#")[0],
        jsApiList:['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ',
        'onMenuShareWeibo','onMenuShareQZone','chooseWXPay']
      };
      this.$http.get(`${t.$URL}/wechat/returnPayParameter.htm?url=${encodeURIComponent(data.url)}`)
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
          var shareObj=t.getObj();
          t.$u.share(shareObj,t.$wx);
        });
      }).catch(err=>{
        console.log(err);
      });
    },
    getObj() {
      var t=this,obj={
        desc:`我是${number}号${us_name},快来给我投票吧！`,
        title:'投票活动',
        imgUrl:us_pic1,
        link:t.getUrl()
      };
      return obj;
    },
    getUrl() {
      var t=this;
      var obj=window.location.href.split("#\/");
      var str=getSearch(obj[0].split("?")[1]);
      var url=obj[0].split("?")[0]+"#/"+obj[1];
      if(url.indexOf("other")==-1) {
        url=url+"&other="+my_id;
      }
      return url;
    },
    singleTicket(i) {
      var t=this,
          openid=t.$userinfo&&t.$userinfo.openid,
          user_number=t.info.number;
      if(!openid) {
        t.$weui.alert('用户信息获取失败,请重新进入！');
        return false;
      }
      //?openid=${openid}&activity_id=${t.$AC_ID}&user_number=${user_number}&token=${token}
      var token=t.$md5(openid+"_"+t.$AC_ID+"_"+user_number);
      this.$http.get(`${t.$URL}/iden/checkIden.htm`,{params:{
        activity_id:t.$AC_ID,
        openid:openid,
        user_number:user_number,
        token:token
      }})
      .then(res=>{
        let state=res.data.state,
            msg=res.data.data.result;
        if(state==0) {
          t.$weui.alert(msg,
            function() {
              if(msg!='您已投票!') {
                t.initInfo();
                //window.location.reload(true);
              }
            }
          );
        } else {
          t.$weui.alert('投票失败,请重试！')
        }
      }).catch(err=>{
        console.log(err);
        t.$weui.alert('投票失败,请重试！');
      });
      return false;
    },
    loadMore(type) {
      var t=this,
          {start,pageSize,given}=t;
      if(type!='first') {
        start=start+pageSize;
      }
      //?user_number=${t.info.number}&start=${t.start}&pageSize=${t.pageSize}
      this.$http.get(`${t.$URL}/pre/getpreListByIdPage.htm`,{params:{
        user_number:t.info.number,
        start:t.start,
        pageSize:t.pageSize
      }})
      .then(res=>{
        let state=res.data.state;
        if(state==0) {
          let givens=res.data.data.presentList;
          t.given=given.concat(givens);
          if(type=='first') {
            t.start=start+pageSize;
          } else {
            t.start=start;
          }
        }
      });
    },
    isWeiXin(){ 
      var ua = window.navigator.userAgent.toLowerCase(); 
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
      return true; 
      }else{ 
      return false; 
      } 
    },

    checkUrl() {
      var urlStr=window.location.href,
          str,str1,arr,arr1,t=this;
      if(urlStr.indexOf("?")<urlStr.indexOf("#")&&urlStr.split("?")[1].split("#")[0].indexOf('from')>-1&&urlStr.split("?")[1].split("#")[0].indexOf('code')==-1) {
        str1=window.location.href.split("?")[2];
        arr1=getSearch(str1);
        //window.location.href=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxea0a88eefb3610c4&redirect_uri=${encodeURIComponent(window.location.href)}&response_type=code&scope=snsapi_userinfo&state=12#wechat_redirect`;
        t.$http.get(`${t.$URL}/wechat/returnPayParameter.htm`,
          {params:{ url:encodeURIComponent(window.location.href) }})
        .then(res=>{
          var rData=res.data.data;
          window.location.href=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${rData.appId}&redirect_uri=${encodeURIComponent(window.location.href)}&response_type=code&scope=snsapi_userinfo&state=${arr1.other}#wechat_redirect`;
        }).catch(err=>{
          console.log(err);
        });
        //code不存在,从后台获取url，进行跳转
        // t.$http.get(`${t.$URL}/wechat/preCode.htm`,{params:{
        //   localhosturl:encodeURIComponent(window.location.href),
        //   state:arr1.other
        // }})
        // .then(res=>{
        //   t.$weui.alert(res.data);
        //   //window.location.href=res.data;
        // }).catch(err=>{
        //   console.log(err);
        //   t.$weui.alert(err);
        // });
      }
    },
    initInfo(loading) {
      var t=this;
      //?activity_id=${t.$AC_ID}&user_id=${t._id}
      t.$http.get(`${t.$URL}/main/getuser.htm`,{params:{
        activity_id:t.$AC_ID,
        user_id:t._id
      }})
      .then(res=>{
        let state=res.data.state;
        if(state==0) {
          let info=res.data.data.userInfo[0],
          gift_num=res.data.data.userInfo[1].userPreTotal;
          t.info=info;
          number=info.number;
          us_name=info.us_name;
          us_pic1=info.us_pic1;
          t.gift_num=gift_num;
          t.swiperSlides=[info.us_pic1,info.us_pic2,info.us_pic3];
          if(loading) {
            loading.hide();
          }
        }
      });
    }
  },
  created() {
    var t=this,
        _id=t.$route.query.id,
        num_id=t.$route.query.num_id;
    t.checkUrl();
    if(!t.isWeiXin()) {
      t.$router.replace('/noWeixin');
    } 
    document.querySelectorAll("title")[0].innerText=`选手详情`;
    var loading = t.$weui.loading('loading', {
        className: 'custom-classname'
    });
    t._id=_id;
    my_id=t.$AC_ID;
    /*获取选手信息*/
    t.initInfo(loading);
    
    setTimeout(()=>{ 
      t.loadMore('first'); 
      t.share(t.$wx);
    },500);
    
  }
}
</script>

<style scoped lang='scss'>
@import '../../style/profile.scss';

footer {
  left:0;
  width:100%;
  background: #e9e9e9;
  font-size:16rem;
  min-height:60px;
  line-height:60px;
  img {
    width:22px;
    height:22px;
    vertical-align: middle;
    padding-right:4px;
  }
  span {
    display: inline-block;
    vertical-align: middle;
  }
  .l {
    width:40%;
    text-align: left;
    padding-left:22px;
  }
  .m {
    position: absolute;
    top:50%;
    left:50%;
    background: #F3D9FE;
    color:#000;
    border:3px solid #8505B8;
    border-radius:50%;
    width:72px;
    height:72px;
    line-height:24px;
    margin-left:-36px;
    margin-top:-60px;
  }
  .r {
    width:40%;
    text-align: right;
    padding-right:24px;
  }
}
.t_m {
  vertical-align: middle;
}
.intro {
  text-align:left;
}
.my_svg {
  display: block;
  width:36px;
  height:36px;
  text-align:center;
  margin-left:16px;
  margin-top:4px;
}
</style>
