var app=getApp();
var {u,baseURL:URL, cases }=app,
    { req ,toast , timeGoto , formatDevice ,sort }=u;
var x1,x2,y1,y2;
Page({
  data: {
    types:app.globalData.types,
    cases:cases,
    brands:[],
    bi:0,
    typeIndex:1,
    sorts:[{
      title:'价格',
    },{
      title:'升序',
      type:'asc'
    },{
      title:'降序',
      type:'desc'
    }],
    si:0,
    animationData:null,
    animation:null
  },
  onLoad: function (options) {
  	var t=this,
        { index }=options;
    if(app.globalData.usercode!=4280) {
      toast("尚未注册");
      setTimeout(()=>{
        wx.navigateTo({
          url: '../tip/tip'
        });
      },1500);
      return false;
    } else if(!app.globalData.isRealName) {
      toast('尚未完成实名认证');
      setTimeout(()=>{
        wx.navigateTo({url:'../tip/tip'});
      },1500);
      return false;
    }
    this.setData({ typeIndex : index||0 });

    t.initData();
    t.getInfo();
  },
  getInfo() {
    //wx.showLoading({title:'加载中！'});
    var t=this,
        value=app.globalData.types[t.data.typeIndex].name,
        items=[];
    req({
      url:`${URL}getLeaseByConditions.do`,
      data:{
        condition:'type',
        values:value
      }
    }).then(res=>{
      if(res.data.length>0) {
        var cases=res.data.map((v1,i1)=>{
          v1=formatDevice(v1);
          return v1;
        });
        cases.map((v,i)=>{
          setTimeout(()=>{
            req({
              url:`${URL}getLeaseInfo.do?LUID=${v.LUID}`
            }).then(res=>{
              v.models=res.data.models;
              if(i>=cases.length-1) {
                t.setData({cases,_cases:cases});
                wx.hideLoading();
              }
            });
          },i*100);
        });
      } else {
        t.setData({cases:[],_cases:[]});
        wx.hideLoading();
      }
    })
  },
  onShow() {
    var animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease-out',
    })

    this.animation = animation;
  },
  swiperLeft() {
    this.animation.translateX(-414).step();
    this.animation.opacity(0).step({timingFunction :"step-start"});

    this.setData({
      animationData:this.animation.export()
    });
    setTimeout(()=>{
      this.animation.translateX(414).step({timingFunction :"step-start"});
      this.animation.translateX(0).opacity(1).step();
      this.setData({
        animationData:this.animation.export()
      });
    },100)
  },
  swiperRight() {
    this.animation.translateX(414).step();
    this.animation.opacity(0).step({timingFunction :"step-start"});

    this.setData({
      animationData:this.animation.export()
    });
    setTimeout(()=>{
      this.animation.translateX(-414).step({timingFunction :"step-start"});
      this.animation.translateX(0).opacity(1).step();
      this.setData({
        animationData:this.animation.export()
      });
    },100)
  },
  initData() {
    var t=this;
    //获取生产厂家
    req({
      url: `${URL}getAllProduct.do`,
      header:{
        Cookie:app.globalData.head
      }
    }).then(res=>{
      t.setData({
        types:app.globalData.types,
        brands:[{"product":'品牌'}].concat(res.data)
      })
    });
  },
  changeSort(e) {
    var si=e.detail.value,t=this;
    this.setData({si});
    t.myFilter();
  },
  changeCity(e) {
    var city=e.detail.value[1],t=this;
    this.setData({city});
    t.myFilter();
  },
  changeBrand(e) {
    var bi=e.detail.value,t=this;
    this.setData({bi});
    t.myFilter();
  },
  changeType(e) {
    var t=this;
    var index=e.target.dataset.index||e.currentTarget.dataset.index;
    t.setData({
      typeIndex:index,
      bi:0,
      city:'',
      si:0
    });
    t.getInfo();
  },
  myFilter() {
    var t=this,
        {_cases,cases, bi, si,city ,money ,brands ,sorts }=t.data,
        brand=brands[bi].product,
        so=sorts[si].type,
        cases1=_cases;
    if(city) {
      cases1=cases1.filter(v=>v.city==city);
    }
    if(bi!=0) {
      cases1=cases1.filter(v=>v.product==brand);
    }
    if(si!=0) {
      cases1.sort((a,b)=> {
        if(so=='asc') {
          return a.total-b.total
        } else {
          return b.total-a.total
        }
      })
    }
    t.setData({
      cases:cases1
    })
  },
  mainStart(e) {
    var pos=e.changedTouches[0];
    x1=pos.pageX;
    y1=pos.pageY;
  },
  mainEnd(e) {
    var pos=e.changedTouches[0],
        t=this,
        { typeIndex ,types } = t.data;
    x2=pos.pageX;
    y2=pos.pageY;
    if(x1-x2>30&&Math.abs(y1-y2)<30) {
      //i+1;
      typeIndex=typeIndex+1;
      t.swiperLeft();
      if(typeIndex>=types.length) {
        typeIndex=0;
      }
      t.setData({
        typeIndex
      });
      setTimeout(()=>{
        t.getInfo();
      },300);
      
    }
     else if(x2-x1>30&&Math.abs(y1-y2)<30) {
      typeIndex=typeIndex-1;
      t.swiperRight();
      if(typeIndex<0) {
        typeIndex=types.length-1;
      }
      t.setData({
        typeIndex
      });
      setTimeout(()=>{
        t.getInfo();
      },300);
    }
     else if(y2-y1>30) {
      t.setData({
        scroll:'display'
      });
    } else if(y1-y2>30) {
      t.setData({
        scroll:'none'
      });
    }
  }
})
