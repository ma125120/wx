var app=getApp();
Page({
  data: {
  	address:null
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
        { address  } =t.data;console.log(app.globalData.shopAddr)
    if(app.globalData.shopAddr) {
    	t.setData({
        address:app.globalData.shopAddr
      });
      return false;
    }
    if(!address) {
      wx.chooseAddress({
        success: function (res) {
          t.setData({
            address:res
          });
          app.globalData.shopAddr=res;
        },
      });
    }
  }
})

