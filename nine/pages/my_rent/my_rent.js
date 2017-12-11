var app=getApp();
var {u,baseURL:URL, cases }=app,
    { req ,toast , timeGoto , formatDevice ,sort ,delay,toast1 }=u;
Page({
  data: {
    cases:[],
    toast:false,
    toastTitle:'',
  },
  toast1:toast1,
  onLoad: function (options) {
  	var t=this;
    if(app.globalData.usercode!=4280) {
      toast("尚未注册");
      setTimeout(()=>{
        wx.navigateTo({
          url: '../tip/tip'
        })
      },1500);
      return false;
    }
    t.getInfo();
  },
  getInfo() {
    var t=this;
    wx.showLoading({title:'加载中！'});
    setTimeout(()=>{
      req({
        url:`${URL}getLeases.do`,
        header:{
          Cookie:app.globalData.head
        }
      }).then(res=>{
        wx.hideLoading();
        if(res.data.length>0) {
          var cases=res.data.map(v=>{
            return formatDevice(v)
          });
          t.setData({cases});
        }
      })
    },10);
  },
})
