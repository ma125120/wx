var app=getApp();
Page({
  data: {
  	address:null,
    isEmpty:true
  },
  bindRegionChange:function(e) {
  	console.log(e.detail.value.join(""));
  	this.setData({
  		address:e.detail.value.join("")
  	});
  },
  chooseAddr:function() {
    var t=this;
  	wx.chooseAddress({
  	  success: function (res) {
  	    t.setData({
          address:res
        })
  	  }
  	});
  },
  onLoad: function () {
    var t=this;

  },
  onShow() {
    var t=this,
        { address ,isEmpty } =t.data;
    if(isEmpty&&!address) {
      wx.chooseAddress({
        success: function (res) {
          t.setData({
            address:res,
            isEmpty:false
          })
        },
        fail() {
          t.setData({
            isEmpty:false
          })
        },
        complete() {
          t.setData({
            isEmpty:false
          })
        }
      });
    }
  }
})

