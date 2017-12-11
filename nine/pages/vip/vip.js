var app=getApp();
var {u,baseURL:URL}=app,
    { req ,toast , timeGoto }=u;
Page({
  data: {
    isVip:false
  },
  onLoad: function (options) {
  	var t=this;
  	t.initData();
  },
  initData() {
  	this.setData({
  		isVip:app.globalData.isVip
  	})
  },
  getVipersTC() {
  	req({
      url:`${URL}getVipersTC.do`,
      header:{
        Cookie:app.globalData.head
      },
    }).then(res=>{
    	console.log(res.data)
    });
  },
  buyViper() {
  	var t=this;
  	req({
      url:`${URL}buyViper.do?VID=${2}`,
      header:{
        Cookie:app.globalData.head
      },
    }).then(res=>{
    	if(res.data.code==4280) {
    		t.pay(res.data.data);
    	}
    });
  },
  pay(id) {
    req({
      url:`${URL}wxPayOrder.do?OUID=${id}`,
      header:{
        Cookie:app.globalData.head
      }
    }).then(res=>{
      var obj=res.data.data;
      wx.requestPayment({
        timeStamp:obj.timeStamp,
        nonceStr:obj.nonceStr,
        package:obj.package,
        signType:'MD5',
        paySign:obj.paySign,
        success() {
          wx.switchTab({
            url: '../my/my'
          });
        },
        complete(err) {
          console.log(err)
        }
      })
    });
  },
})
