var app=getApp();
var {u,baseURL:URL, orders }=app,
    { req ,toast , timeGoto ,formatDevice ,toast1 }=u;
Page({
  data: {
  	userInfo:null,
  	menus:[{
  		title:'我的购物车',
      url:'../myCart/myCart',
      icon:'../../images/my/cart.png'
  	},{
      title:'我的订单',
      url:'../order/order?type=1',
      icon:'../../images/my/order.png'
    },{
      title:'我的出租',
      url:'../my_rent/my_rent',
      icon:'../../images/my/rent.png'
    },{
      title:'意见反馈',
      icon:'../../images/my/suggest.png',
      url:'../suggest/suggest'
    },{
      title:'联系客服',
      icon:'../../images/my/tel.png',
      url:''
    },{
      title:'个人信息',
      icon:'../../images/my/info.png',
      url:'../info/info'
    },{
      title:'加盟合作',
      icon:'../../images/my/submit.png',
      url:'../join/join'
    }],
    msg:'*点击完善信息'
  },
  onLoad: function (options) {
  	var t=this;t.getDiscount();
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
    if(app.globalData.isRealName&&app.globalData.isCompany) {
      t.setData({ msg:'*个人信息已完善' })
    }

  },
  active() {
    wx.showActionSheet({
      itemList: ['联系人：庄经理','联系电话：13754811775'],
      success:function(res) {
        if(res.tapIndex==1) {
          wx.makePhoneCall({
            phoneNumber: '13754811775',
          });
        }
      }
    })
  },
  getDiscount() {
    req({
      url:`${URL}getDeiscount.do?days=6`,
      header:{
        Cookie:app.globalData.head
      },
    }).then(res=>{
      console.log(res.data)
    });
  }
})
