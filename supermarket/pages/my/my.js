var app=getApp();
var {u,baseURL:URL}=app;
Page({
  data: {
  	userInfo:null,
  	menus:[{
  		title:'收货地址',
      url:'../myAddress/myAddress',
      icon:'../../images/my/icon0.jpg'
  	},{
      title:'我要开店',
      url:'../openShop/openShop',
      icon:'../../images/my/icon1.jpg'
    },{
      title:'分享',
      url:'',
      icon:'../../images/my/icon2.jpg'
    },{
      title:'意见反馈',
      icon:'../../images/my/icon3.jpg',
      url:'../suggest/suggest'
    },{
      title:'客服电话',
      icon:'../../images/my/icon4.jpg',
    }],
    msg:'*点击完善信息'
  },
  onLoad: function (options) {
  	var t=this;
  	if(!app.globalData.userInfo) {
      app.getUserInfo(function(userInfo){
      	t.setData({
	    		userInfo:userInfo
	    	});
      });
    } else {
    	t.setData({
    		userInfo:app.globalData.userInfo
    	});
    }
  },
  active() {
    wx.showActionSheet({
      itemList: ['联系电话：18834143680'],
      success:function(res) {
        if(res.tapIndex==0) {
          wx.makePhoneCall({
            phoneNumber: '18834143680',
          });
        }
      }
    })
  }
})
