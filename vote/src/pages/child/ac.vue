<template>
  <div class="hello">
    <Slide :slides="swiperSlides"></Slide>
    <div class="page-header flex">
      <div class="col-3" v-for="(item,index) in top_info">
        <p><img :src="item.img" alt="" class='svg' />{{item.text}}</p>
        <p class='num'>{{hot[item.num]}}</p>
      </div>
    </div>


   		<div class="footer">
   			<div class="title v_m"><img :src="'./static/imgs/svg/act.svg'" class='v_m'  alt="">活动介绍</div>
   			<div class="body">
          <div class="c">活动名称:{{activity.ac_title}}</div>
          <div class="c">活动开始时间：{{activity.start_at|mytime}}</div>
          <div class="c">活动结束时间：{{activity.end_at|mytime}}</div>
   				<div class="promises">
            <div class="p_ac" v-for="(v,i) in arrs" v-if="v">{{(i)+"."+v}}</div>
          </div>
   				<div class="address">地址：{{contact.address}}</div>
   				<div class="tel">活动热线：{{contact.tel}}</div>
   			</div>
   			<div class="imgs" >
   				<img :src="contact.con_pic1" alt="" class='i'>
          <img :src="contact.con_pic2" alt="" class='i'>
          <img :src="contact.con_pic3" alt="" class='i'>
   			</div>
        <div class="bot">
          <img src="" alt="">
          <p class='bot_p'>扫描二维码添加公众号报名</p>
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
      slide_i:0,
      arrs:[],
    	infos:[],
      activity:{},
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
    t_start(e) {
      var t=this;
      clearInterval(t_id);
      e.stopPropagation();
      e.preventDefault();
      x1=e.touches[0].pageX;
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
  },
  created(){
    var t=this;
    /*获取活动信息*/
    this.$http.get(`${this.$URL}/main/getmain.htm`,{
      params:{
        activity_id:t.$AC_ID
      }
    })
    .then(res=>{
      let {state}=res.data;
      if(state==0) {
        document.querySelectorAll("title")[0].innerText=`${res.data.data.activity[0]['ac_title']}`;
        let activity=res.data.data.activity[0],
            hot=res.data.data.hot[0];
        t.swiperSlides=[activity.ac_pic1,activity.ac_pic2,activity.ac_pic3];
        t.activity=activity;
        t.arrs=activity.ac_introduce.split(/\d\./);
        t.hot=hot;
      }
    }).catch(err=>{
      console.log(err)
    });
    /*获取关于我们的信息*/
    this.$http.get(`${this.$URL}/main/getContact.htm`)
    .then(res=>{
      let {state}=res.data;
      if(state==0) {
        let contact=res.data.data.contact[0];
        t.contact=contact;
      }
    })
    /*图片轮播*/
    t.initSlide();
  }
}
</script>

<style scoped lang='scss'>
@import '../../style/home.scss';
.body {
  width:96%;
  margin:10px auto;
}
.c {
  margin:5px 0;
}
.swiper {
  position: relative;
  top:0;
  left:0;
  width:100%;
  height:300px;
  overflow: hidden;
}
.slide {
  width:100%;
  position: absolute;
}
.slide img {
  width:100%;
  height:300px;
  position: absolute;
  left:0;
}
.slide .active {
  z-index:99;
  left:0;
  -webkit-animation: l 0.3s ease-in-out;
  -o-animation: l 0.3s ease-in-out;
  animation: l 0.3s ease-in-out;
}
.slide .dis {
  z-index:90;
  left:-100%;
  -webkit-animation: r 0.3s ease-in-out;
  -o-animation: r 0.3s ease-in-out;
  animation: r 0.3s ease-in-out;
}
.slide ul {
  position: absolute;
  bottom:-290px;
  left:40%;
  z-index:1000;
}
li {
  display: inline-block;
}
.cir {
  border-radius: 50%;
  width:16px;
  height:16px;
  background: #fff; 
  margin-right: 10px;
  
}
.ac_li {
  background: #888;
}
.bot {
  margin-top:10px;
}
.bot_p {
  text-align: center;
  margin:10px 0;
}
@keyframes l {
  0%{
    left:100%;
  }
  100%{
    left:0%;
  }
}
@keyframes r {
  0%{
    left:0;
  }
  100%{
    left:-100%;
  }
}
.p_ac {
  font-size:14px;
  color:#000;
  margin-top:12px;
}
</style>
