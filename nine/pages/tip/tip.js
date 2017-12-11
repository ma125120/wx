var app=getApp();
var {req,toast,md5,baseURL:URL,Goto,checkForm,_DEV_}=app;
Page({
  data: {
  	to:''
  },
  onLoad: function (options) {
  	var t=this;

  },
  back() {
  	wx.navigateBack();
  }
})
