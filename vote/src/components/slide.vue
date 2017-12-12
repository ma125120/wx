<template>
	<div class="swiper-wrap relative">
		<div class="swiper" @touchstart="t_start" @touchend='t_end'>
      <div class="slide">
      	<transition :name='activeClass' mode='out-in' v-for="(slide,i) in slides0" :key="i">
      		<img  
        			:src="slide" alt="" 
        			v-if="i==slide_i" />
      	</transition>

      </div>
   </div>
   <ul class='swiper-ul'>
      <li v-for="(v,i) in len" :class="i==slide_i?'ac_li cir':'cir'"></li>
    </ul>
	</div>
  
</template>

<script>
var t_id,x1,x2;
export default {
  name: 'Slide',
  data () {
    return {
      slide_i:0,
      i:0,
      len:0,
      activeClass:'my-left'
    }
  },
  props:['slides'],
  computed:{
  	slides0() {
  		return this.slides
  	}
  },
  methods:{
  	initSlide(len) {
      var t=this,len=t.len||len;
      t_id=setInterval(()=>{
        let i=t.slide_i+1;
        if(i>=len) {
          i=0;
        }
        t.slide_i=i;
        t.activeClass='my-left';
      },3000);
    },
    t_start(e) {
      var t=this;
      clearInterval(t_id);
      x1=e.touches[0].pageX;
    },
    t_end(e){
      var t=this,len=t.len||len;
      x2=e.changedTouches[0].pageX;
      if(x1-x2>30) {
        //左滑
        let i=t.slide_i+1;
        if(i>=len) {
          i=0;
        }
        t.slide_i=i;
        t.activeClass='my-left';
      }
      if(x2-x1>30) {
        //油滑
        let i=t.slide_i-1;
        if(i<0) {
          i=len-1;
        }
        t.slide_i=i;
        t.activeClass='my-right';
      }
      t.initSlide();
    },
  },
  mounted() {
    setTimeout(()=>{
      this.len=this.slides.length;console.log(this.slides.length)
      this.initSlide(this.slides.length);
    },500);
  	
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
$height:300px;
.my-left-enter {
	transform:translateX(100%);
}
.my-left-enter-to{
	transform:translateX(0);
}
.my-left-leave-to {
	transform:translateX(-100%);
}
.my-left-enter-active,
.my-left-leave-active {
  transition: transform .3s ease-out;
}
.my-right-enter {
	transform:translateX(-100%);
}
.my-right-enter-to{
	transform:translateX(0);
}
.my-right-leave-to {
	transform:translateX(100%);
}
.my-right-enter-active,
.my-right-leave-active {
  transition: transform .3s ease-out;
}
.swiper,
.relative {
  position: relative;
  top:0;
  left:0;
  width:100%;
}
.slide {
  width:100%;
  position: absolute;
  top:0;
  left:0;
}
.slide img {
  width:100%;
  position: absolute;
  height:$height;
  left:0;
  top:0;
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
.swiper-ul {
  position: absolute;
  bottom:0;
  left:50%;
  transform: translate(-50%,-20px);
  z-index:1000;
}
.swiper-ul li {
  display: inline-block;
}
.cir {
  border-radius: 50%;
  width:16px;
  height:16px;
  background: #eee; 
  margin-right: 10px;
}
.ac_li {
  background: #888;
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
    left:-100%;
  }
  100%{
    left:0;
  }
}
</style>
