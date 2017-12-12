<template>
  <div class="hello">
    <header @click="goToSelf">
      <div class="top">
        <div class="l">
          <img :src="info.us_pic1" alt="" />
        </div>
        <div class="m">
          <p>{{info.us_name}}</p>
          <p class='sub-title'>给他送上一份礼物吧</p>
        </div>
        <div class="r">></div>
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

    <div class="body">
      <div :class="i==active_i?'active item col-3':'item col-3'" v-for="(v,i) in gifts" :key="i"  @click='changeIndex(i,v)'>
        <div >
          
        </div>
          <img :src="v.pr_pic" alt="" />
          <p class='t' >{{v.pr_name}}</p>
          <p class='sub'>{{v.pr_rank}}点</p>
        </div>
      </div>
      <div class="foot">
        <div class='flex'>
          <div class="l">请选择以上礼品</div>
          <div class="r">数量：<span @click='del' class='sys'>-</span><input type="text" v-model='count' class='input' /><span @click='add' class='sys'>+</span><!-- <span id='i_a'>></span> --></div>
        </div>
        <div class="pay">
          <button :class="{disable:dis}" id='pay_btn' @click='send'>微信支付</button>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      count:1,
      active_i:0,
      gift_num:0,
      info:{},
      gifts:[],
      gifting:null,
      final:null,
      dis:false
    }
  },
  methods:{
    changeIndex(i,v) {
      var id=i;
      this.active_i=id;
      this.count=1;
      this.gifting=v;
    },
    goToSelf() {
      var t=this;
      this.$router.replace({
        path:'/profile',
        query:{
          id:t.$route.query.id,
          num_id:t.$route.query.num_id
        }
      })
    },
    add() {
      this.count=this.count+1;
    },
    del() {
      if(this.count>1) {
        this.count=this.count-1;
      }
    },
    send(e) {
      e.preventDefault();
      e.stopPropagation();
      if(this.dis) {
        this.$weui.alert('正在提交中，请稍后！');
      }
      this.dis=true;
      var t=this,
      gifting=t.$data.gifting,
      obj={
        "present_id":gifting._id,
        "pr_rank":gifting.pr_rank,
        "present_num":t.count,
        "activity_id":t.$AC_ID,
        "user_number":t.$data.info.number,
        "openid":t.$userinfo.openid,
        "name":t.$userinfo.nickname,
        "headimg":t.$userinfo.headimgurl
      };
      obj.token=t.$md5(obj.present_id+"_"+obj.pr_rank + "_" + obj.present_num+"_"+obj.activity_id+"_"+obj.user_number + "_" + obj.openid);
      t.$http.get(`${t.$URL}/pay/getorder.htm`,{params:obj})
      .then(res=>{
        var res1=res.data,data1=null;
        if(res1.state!=0) {
          t.dis=false;
          t.$weui.alert(res1.msg);
          return false;
        } else {
          data1=res1.data.resul;
          t.$wx.ready(function() {
            t.$wx.chooseWXPay({
              timestamp: data1.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: data1.nonceStr, // 支付签名随机串，不长于 32 位
              package: data1.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
              signType:data1.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign:data1.paySign, // 支付签名
              success: function (res) {
                t.queryOrder(data1.out_trade_no);
              },
              fail(err) {
                t.$weui.alert('支付失败');
              },
              cancel() {
                console.log('关闭');
              },
              complete() {
                t.dis=false;
              }
            });
          
          });
        }
      }).catch(err=>{
        console.log(err);
        t.dis=false;
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
    queryOrder(obj) {
      var t=this;
      t.$http.get(`${t.$URL}/pay/checkOrder.htm`,{
        params:{
          out_trade_no:obj
        }
      })
      .then(({data,state})=>{
          t.goToSelf();
      }).catch(err=>{
        console.log('已支付，但未添加到数据库');
      })
    }
  },
  created() {
    var t=this,
        _id=t.$route.query.id,
        num_id=t.$route.query.num_id;
    if(!t.isWeiXin()) {
      t.$router.replace('/noWeixin');
    }
    document.querySelectorAll("title")[0].innerText=`赠送礼物`;
    var loading = t.$weui.loading('loading', {
        className: 'custom-classname'
    });
    /*获取礼物列表*/
    t.$http.get(`${t.$URL}/pre/getpreList.htm`)
    .then(res=>{
      let state=res.data.state;
      if(state==0) {
        let gifts=res.data.data.presentList;
        t.gifts=gifts;
        t.gifting=gifts[0];
      }
    }).catch(err=>{
      console.log(err);
    });
    /*获取选手信息及投票数量*/
    //?activity_id=${t.$AC_ID}&user_id=${_id}
    t.$http.get(`${t.$URL}/main/getuser.htm`,{params:{
        activity_id:t.$AC_ID,
        user_id:_id
      }})
    .then(res=>{
      let state=res.data.state;
      if(state==0) {
        let info=res.data.data.userInfo[0],
        gift_num=res.data.data.userInfo[1].userPreTotal;
        t.gift_num=gift_num;
        t.info=info;
        loading.hide();
      }
    });

  }
}
</script>

<style scoped lang='scss'>
@import '../../style/gift.scss';
.t {
  font-size:16rem;
}
.sub {
  font-size:14rem;
  color:gray;
}
.input {
  font-size:14rem;
}
#pay_btn.disable {
  background:#888;
}
#pay_btn {
  -webkit-appearance: none;
  width:90%;
  display:block;
  margin:0 auto;
  line-height: 48px;
  font-size:20rem;
  color:#fff;
  background: #19AD17;
  border-radius:5px;
  margin-bottom:42px;
}
.col-3.active {
  border:3px solid green;
}
</style>
