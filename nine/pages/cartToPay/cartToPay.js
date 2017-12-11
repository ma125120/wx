var app=getApp();
var {u,baseURL:URL}=app,
    { req ,toast , timeGoto ,myDate, addDate }=u;
Page({
  data: {
    getWay:'self',
    sendFlag:false,
    contact:null,
    info:null,
    num:0,
    num1:0,
    num2:0,
    dateCount:0,
    total:0,
    carts:[],
    total:0,
    dis:false
  },
  onLoad: function (options) {
  	var t=this;
  	t.initData();
    var contact={
          name:app.globalData.RealNameInfo.name,
          phone:app.globalData.localTel,
          addr_pickup:app.globalData.address.formatted_address
        };
    t.setData({
      contact
    })
  	//t.countMoney();
  	// setTimeout(()=>{
  	// 	req({
	  // 		url:`${URL}getMyOrders.do`,
	  // 		header:{
	  //       Cookie:app.globalData.head
	  //     },
	  // 	}).then(res=>{
	  // 		console.log(res);
	  // 	})
  	// },1500);
  },
  initData() {
  	var { cart ,total }=app.globalData.carts,
        now=myDate.getNowDate();
    cart=cart.map((v,i)=>{
      v.date_pickup=now.str;
      v.date_giveback=addDate(v.days);
      return v;
    });
  	this.setData({
  		carts:cart ,total
  	});
  },
  commit() {
    var t=this,
        { carts ,getWay ,contact } = t.data,
        leases=[];
    carts.map((v,i)=>{
      leases[i]={
          LUID:v.LUID,
          LMUID:v.models[0].id,
          num:v.num,
          days:v.days,
          date_pickup:v.date_pickup,
          date_giveback:v.date_giveback,
          name:contact.name,
          phone:contact.phone
      };
      if(getWay=='self') {
        leases[i].model_pickup=4280;
        leases[i].phone=app.globalData.localTel;
      } else {
        leases[i].model_pickup=4281;
        leases[i].pickup=contact.addr_pickup;
        leases[i].giveback=contact.addr_pickup;
        leases[i].name=contact.name;
        leases[i].phone=contact.phone;
      }
      return v;
    });
    t.setData({dis:true});
    req({
        url:`${URL}createOrder.do`,
        header:{
          Cookie:app.globalData.head
        },
        data:{leases}
      }).then(res=>{
        if(res.data.code==4280) {
          var _id=res.data.data;
          t.pay(_id)
        } 
        t.setData({dis:false});
      }).catch(err=>{
        t.setData({dis:false});
      })
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
		  	console.log(res)
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

})
