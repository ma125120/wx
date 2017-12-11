var app=getApp();
var {u,baseURL:URL}=app;
Page({
  data: {
  	userInfo:null,
  	menus:[{
  		title:'加入会员',
      url:'../vip/vip',
      icon:'../../images/my/cart.png'
  	},{
      title:'地址管理',
      url:'../my_address/my_address',
      icon:'../../images/my/order.png'
    },{
      title:'增票资质',
      url:'../ticket/ticket',
      icon:'../../images/my/rent.png'
    },{
      title:'实名认证',
      icon:'../../images/my/suggest.png',
      url:'../addInfo/addInfo'
    },{
      title:'企业信息',
      icon:'../../images/my/tel.png',
      url:'../company/company'
    }],
    msg:'*点击完善信息',
    isRealName:false ,
    isCompany:false ,
    isTicket:false ,
    isVip:false
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
  	if(app.globalData.usercode!=4280) {
      wx.redirectTo({
        url: '../regeist/regeist'
      })
    } 
    t.initForm();
  },
  initForm() {
    var t=this,
        { isRealName ,isCompany ,isTicket,isVip } =app.globalData;
    t.setData({
      isRealName ,isCompany ,isTicket,isVip
    })
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
