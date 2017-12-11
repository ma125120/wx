var app=getApp();
var {u,baseURL:URL}=app,
    { req ,toast , timeGoto }=u;
var orderId=0;
Page({
  data: {
    getWay:'',
    sendFlag:false,
    contact:null,
    info:null,
    num:0,
    num1:0,
    num2:0,
    dateCount:0,
    total:0,
    km:0
  },
  onLoad: function (options) {
  	var t=this,
        {id}=options;
    orderId=id;
  	t.initData();
  	t.countMoney();

  },
  pay() {
    req({
      url:`${URL}wxPayOrder.do?OUID=${orderId}`,
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
  initData() {
  	var { info , dateCount ,num ,num1 , num2 , km }=app.globalData.ordering;
  	this.setData({
  		info , dateCount ,num ,num1 ,num2,km 
  	})
  },
  changeContact(e) {
		var type=e.currentTarget.dataset.type||e.target.dataset.type,
        t=this,
        { contact } = t.data;
    contact[type]=e.detail.value;
    t.setData({
    	contact
    });
  },
  changeGetWay(e) {
    var way=e.currentTarget.dataset.type||e.target.dataset.type,
        t=this,
        flag=false,
        { contact } = t.data;
    if(way=='send') {
    	flag=true;
    	if(!contact) {
    		t.chooseAddr();
    	}
    }
    t.setData({
      getWay:way,
      sendFlag:flag
    })
  },
  chooseAddr:function() {
    var t=this;
  	wx.chooseAddress({
		  success: function (res) {
		    t.setData({
	        contact:{
	        	phone:res.telNumber,
	        	name:res.userName,
	        	addr_pickup:`${res.provinceName}${res.cityName}${res.countyName}${res.detailInfo}`
	        }
	      });
		  }
		});
  },
  countMoney() {
    var t=this,
        {info:{models},num,num1,num2,dateCount,info , km }=t.data,
        total=0,
        price=0,
        deposit=0;
    total=parseInt(models[0].price)*dateCount*num*1.1+parseInt(models[0].deposit);
    price=parseInt(models[0].price)*num*dateCount;
    deposit=parseInt(models[0].deposit);
    if(models[1]) {
      deposit=0;
      price=parseInt(models[0].price)*(num1+num2)*dateCount;
      if(num1>0) {
        deposit=deposit+parseInt(models[0].deposit)
      }
      if(num2>0) {
        deposit=deposit+parseInt(models[1].deposit)
      }
      //deposit=parseInt(models[0].deposit)+parseInt(models[1].deposit);
      total=price*1.1+deposit;
    }
    if(info.type=='无人机') {
      total=parseInt(models[0].price)*km*num*1.1+parseInt(models[0].deposit);
      price=parseInt(models[0].price)*km*num;
    }
    t.setData({
      total:total.toFixed(2),
      price,
      deposit
    });     
  },
})
