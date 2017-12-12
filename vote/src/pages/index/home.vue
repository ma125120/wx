<template>
  <div class="hello">
    <Slide :slides="swiperSlides"></Slide>
    <!-- <div class="swiper" @touchstart="t_start" @touchend='t_end'>
      <div class="slide">
        <img :class="i==slide_i?'active':'dis'" :src="slide" alt="" v-for="(slide,i) in swiperSlides" />
        <ul>
          <li v-for="v in [0,1,2]" :class="v==slide_i?'ac_li cir':'cir'"></li>
        </ul>
      </div>
    </div> -->
   	<div class="page-header flex">
  		<div class="col-3" v-for="(item,index) in top_info">
        <div v-if="index==0">
          <router-link :to="'/ac?activity_id=10'" tag='div'>
            <p><img :src="item.img" alt="" class='svg' />{{item.text}}</p>
            <p class='num'>{{hot[item.num]}}</p>
          </router-link>
        </div>
        <div v-else>
          <p><img :src="item.img" alt="" class='svg' />{{item.text}}</p>
          <p class='num'>{{hot[item.num]}}</p>
        </div>
  		</div>
   	</div>
   	<p class="timeTip">活动结束倒计时</p>
   	<div class="time flex">
   		<div class="timeBor">{{times.day}}天</div>
   		<div class="timeBor">{{times.hour}}时</div>
   		<div class="timeBor">{{times.minute}}分</div>
   		<div class="timeBor">{{times.second}}秒</div>
   	</div>

   	<div class="page-body">
   		<div class="search">
   			<input type="search" placeholder="请输入编号或者姓名" id='searchInput' class='s' v-model='user'><span id='searchBtn' class='s' @click='searchUser'>搜索</span>
   		</div>
   		<div v-if="isShow">
        <div class="items">
          <router-link :to="'/profile?id='+item._id+'&num_id='+item.number" tag='div' :class="index%2==0?'item':'item m'" v-for="(item,index) in userList" :key="item.id">
            <img :src="item.us_pic1" alt="">
            <p class='text-left'>{{item.us_name}}</p>
            <div class="ab">
              <div class="top-left">{{item.number}}号，{{item.us_tiket}}票</div>
              <div class="bot-right" @click.stop="singleTicket(index)">投票</div>
            </div>
          </router-link>
        </div>
   			<div class='more' @click='loadMore'>查看更多</div>
   		</div>
      
      <div class="items" v-else>
        <router-link :to="'/profile?id='+userInfo._id+'&num_id='+userInfo.number" tag='div' class='item'>
          <img :src="userInfo.us_pic1" alt="">
          <p class='text-left'>{{userInfo.us_name}}</p>
          <div class="ab">
            <div class="top-left">{{userInfo.number}}号，{{userInfo.us_tiket}}票</div>
            <div class="bot-right" @click.stop="singleTicket('s')">投票</div>
          </div>
        </router-link>

      </div>
      
   		<div class="footer">
   			<div class="title"><img :src="'./static/imgs/svg/act.svg'"  alt="">活动介绍</div>
   			<div class="body">
   				<div class="promises">
            <div class="p_ac" v-for="(v,i) in arrs" v-if="v">{{(i)+"."+v}}</div>
          </div>
   				<div class="address">地址：{{contact.address}}</div>
   				<div class="tel">活动热线：{{contact.tel}}</div>
   			</div>
   			<div class="imgs">
   				<img :src="contact.con_pic1" alt="" class='i'>
          <img :src="contact.con_pic2" alt="" class='i'>
          <img :src="contact.con_pic3" alt="" class='i'>
   			</div>
   		</div>
   	</div>
  </div>
</template>

<script>
import Slide from '@/components/slide'
var x1,x2,t_id;
export default {
  name: 'home',
  components:{
    Slide
  },
  data () {
    return {
      swiperSlides: [],
      start:0,
      pageSize:10,
      slide_i:0,
    	infos:[],
      activity:{},
      arrs:[],
      hot:{},
      contact:{},
      userList:[],
      user:'',
      userInfo:{},
      isShow:true,
    	top_info:[
			{
				text:'已报名',
				img:'./static/imgs/svg/top1.svg',
				num:'count'
			},
			{
				text:'累积投票',
				img:'./static/imgs/svg/top2.svg',
				num:'totalticket'
			},
			{
				text:'访问量',
				img:'./static/imgs/svg/top3.svg',
				num:'totalhot'
			}
    	],
    	times:{
    		day:1,
    		hour:10,
    		min:30,
    		sec:'06'
    	},
    	items:[],
    	promises:'',
    	address:'',
    	tel:'',
    	imgs:[]
    }
  },
  watch: {
    user:function(nows) {
      if(nows=='') {
        this.isShow=true;
      }
    }
  },
  computed: {
    swiper() {
     return this.$refs.mySwiper.swiper
    }
  },
  methods:{
    isWeiXin(){ 
      var ua = window.navigator.userAgent.toLowerCase(); 
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
      return true; 
      }else{ 
      return false; 
      } 
    },
  	loadMore() {
  		var t=this,{start,pageSize,userList}=t;
      start=start+pageSize;
      t.$http.get(`${t.$URL}/main/getUserListPage.htm`,{params:{
        activity_id:t.$AC_ID,
        start:start,
        pageSize:pageSize
      }})
      .then(res=>{
        let {state}=res.data;
        if(state==0) {
          let userLists=res.data.data.userList;
          t.userList=userList.concat(userLists);
          t.start=start;
        }
      }).catch(err=>{
        console.log(err);
      });
  	},
    initSlide() {
      var t=this;
      t_id=setInterval(()=>{
        let i=t.slide_i+1;
        if(i>=3) {
          i=0;
        }
        t.slide_i=i;
      },3000);
    },

    t_start(e) {
      var t=this;
      clearInterval(t_id);
      e.stopPropagation();
      e.preventDefault();
      x1=e.touches[0].pageX;
    },
    t_end(e){
      var t=this;
      e.stopPropagation();
      e.preventDefault();
      x2=e.changedTouches[0].pageX;
      if(x2-x1>30) {
        //油滑
        let i=t.slide_i+1;
        if(i>=3) {
          i=0;
        }
        t.slide_i=i;
      }
      if(x1-x2>30) {
        //左滑
        let i=t.slide_i-1;
        if(i<0) {
          i=2;
        }
        t.slide_i=i;
      }
      t.initSlide();
    },
    initUser() {
      var t=this,url=`${t.$URL}/main/getUserListPage.htm`;
      t.$http.get(url,{params:{
        activity_id:t.$AC_ID,
        start:0,
        pageSize:t.start+t.pageSize
      }})
      .then(res=>{  
        let {state}=res.data;
        if(state==0) {
          let userList=res.data.data.userList;
          t.userList=userList;
        }
      }).catch(err=>{
        console.log(err);
      });
    },
    singleTicket(i) {
      var t=this,
          openid=t.$userinfo&&t.$userinfo.openid,
          user_number;
          if(i=='s') {
            user_number=t.userInfo.number;
          } else {
            user_number=this.userList[i].number
          }
      if(!openid) {
        t.$weui.alert('用户信息获取失败,请重新进入！');
        return false;
      }
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
          t.$weui.alert(res.data.data.result,
            function() {
              if(msg!='您已投票!') {
                t.initUser();
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
    searchUser() {
      var t=this;//?activity_id=${this.$AC_ID}&number=${encodeURIComponent(t.user)}
      this.$http.get(`${t.$URL}/main/getuser.htm`,{params:{
        activity_id:t.$AC_ID,
        number:encodeURIComponent(t.user)
      }})
      .then(res=>{
        let state=res.data.state;
        if(state==0) {
          let userInfo=res.data.data.userInfo[0];
          t.userInfo=userInfo;
          t.isShow=false;
          return false;
        } else {
          //?activity_id=${this.$AC_ID}&name=${encodeURIComponent(t.user)}
          return t.$http.get(`${t.$URL}/main/getuser.htm`,{params:{
            activity_id:t.$AC_ID,
            name:encodeURIComponent(t.user)
          }})
        }
      }).then(res=>{
        let state=res.data.state;
        if(state==0) {
          let userInfo=res.data.data.userInfo[0];
          t.userInfo=userInfo;
          t.isShow=false;
        }
      }).catch(err=>{
        console.log(err);
      });
    },
    toLocal(num) {
      var n = num.toString()
      return n[1] ? n : '0' + n
    },
    comTime(nowTime,oldTime) {
      var now=nowTime.getTime(),
          old=oldTime,
          minus=Math.abs(old-now);
      var time=minus/1000,
          day=Math.floor(time/(60*60*24)),
          hour=Math.floor(time % (24 * 60 * 60) / (60 * 60)),
          minute=Math.floor(time % (24 * 60 * 60) % (60 * 60) / 60),
          second=Math.floor(time % (24 * 60 * 60) % (60 * 60) % 60);
      return {
        day:day,
        hour:this.toLocal(hour),
        minute:this.toLocal(minute),
        second:this.toLocal(second)
      }
    },
  },
  created(){
    var t=this;
    if(!t.isWeiXin()) {
      t.$router.replace('/noWeixin');
    }
    var loading = t.$weui.loading('loading', {
        className: 'custom-classname'
    });
    document.querySelectorAll("title")[0].innerText=`投票活动`;
    /*获取活动信息*/
    this.$http.get(`${this.$URL}/main/getmain.htm`,{params:{
      activity_id:t.$AC_ID
    }})
    .then(res=>{
      let {state}=res.data;
      if(state==0) {
        // document.querySelectorAll("title")[0].innerText=`${res.data.data.activity[0]['ac_title']}`;
        let activity=res.data.data.activity[0],
            hot=res.data.data.hot[0];
        t.swiperSlides=[activity.ac_pic1,activity.ac_pic2,activity.ac_pic3];
        t.activity=activity;
        t.arrs=activity.ac_introduce.split(/\d\./);
        t.hot=hot;
        /*计算时间*/
        setInterval(function() {
          let time=t.comTime(new Date(),activity.end_at);
          t.times=time;
        },1000);
        /*获取选手信息*/
        // return t.$http.get(`${t.$URL}/main/getUserListPage.htm?activity_id=${t.$AC_ID}&start=0&pageSize=${t.pageSize}`);
      }
    }).catch(err=>{
      console.log(err);
      loading.hide();
    });
    t.initUser();
    /*获取关于我们的信息*/
    this.$http.get(`${this.$URL}/main/getContact.htm`)
    .then(res=>{
      let {state}=res.data;
      if(state==0) {
        let contact=res.data.data.contact[0];
        t.contact=contact;
      }
      loading.hide();
    }).catch(err=>{
      console.log(err);
      loading.hide();
    });

    /*图片轮播*/
    t.initSlide();

  }
}
</script>

<style scoped lang='scss'>
@import '../../style/home.scss';

</style>
