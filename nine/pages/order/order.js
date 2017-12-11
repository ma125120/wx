var app=getApp();
var {u,baseURL:URL, orders }=app,
    { req ,toast , timeGoto ,formatDevice ,toast1 }=u;
Page({
  data: {
    orders:orders,
    active_i:0,
    nav:'myRent',
    items:[],
    infos:[],
    toast:false,
    toastTitle:'',
    localAddr:''
  },
  changeTab(e) {
  	var i=e.target.dataset.i||e.currentTarget.dataset.i,
        t=this;
  	this.setData({
  		active_i:i,
  		nav:i==0?'myRent':'myOrder'
  	});
    t.getOrders();
  },
  toast1:toast1,
  onLoad: function (options) {
  	var t=this,	{type}=options;
    if(app.globalData.usercode!=4280) {
      toast("尚未注册");
      setTimeout(()=>{
        wx.navigateTo({
          url: '../tip/tip'
        })
      },1500);
      return false;
    }
  	t.setData({
  		active_i:type,
  		nav:type==0?'myRent':'myOrder',
      localAddr:app.globalData.address.formatted_address
  	});
    t.getOrders();
  },
  goto(e) {
    var t=this,
        obj=e.currentTarget.dataset.obj||e.target.dataset.obj,
        { nav } = t.data;
    if(obj.status==4280) {
      t.pay(obj.OUID);
    } else {
      wx.navigateTo({url:`../${nav}/${nav}?LUID=${obj.LUID}`});
    }
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
  getOrders() {
    var t=this,url1=t.data.active_i==0?'getCompOrders':'getMyOrders',
        url2=t.data.active_i==0?'getCompOrderInfo':'getMyOrderInfo';
    wx.showLoading({title:'加载中'});
    req({
      url:`${URL}${url1}.do`,
      header:{
        Cookie:app.globalData.head
      }
    }).then(res=>{
      var infos=res.data,items=[];
      if(infos.length>0) {
        infos.map((v,i)=>{
          setTimeout(()=>{
            req({
              url:`${URL}${url2}.do`,
              data:{
                OUID:v.OUID
              },
              header:{
                Cookie:app.globalData.head
              }
            }).then(res=>{
              items[i]=res.data;
              items[i].OUID=v.OUID;
              if(i>=infos.length-1) {
                t.setData({
                  items:items
                });
                t.getRealInfo()
                wx.hideLoading();
              }
            });
          },i*50);
        });
      } else {
        wx.hideLoading();
      }
    })
  },
  getRealInfo() {
    var t=this,
        { items } = t.data,
        infos=[];
    items=items.filter(v=>v.items.length>0);
    if(items.length<=0) {
      return false;
    }
    items.map((v,i)=>{
      if(v.order.leases&&typeof v.order.leases=="string") {
        v.order.leases=JSON.parse(v.order.leases);
      }
      var _my=v.order.leases[0];
      req({
        url:`${URL}getLeaseInfo.do`,
        data:{
          LUID:v.items[0].LUID
        },
        header:{
          Cookie:app.globalData.head
        }
      }).then(res=>{
        if(res.data.code==4280) {
          var te=res.data.data;
          te.date_start=_my.date_pickup;
          te.date_end=_my.date_giveback;
          var _info=formatDevice(te),
          detail={
            name:_info.name,
            addr:v.items[0].pickup,
            dateCount:_info.dateCount,
            num:v.items[0].num,
            LUID:v.items[0].LUID,
            tel:v.items[0].phone,
            hostName:_info.username,
            hostTel:_info.phone,
            hostAddr:_info.position
          };
          detail.total=parseInt(_info.models[0].price)*_info.dateCount*detail.num+parseInt(_info.models[0].deposit)*detail.num;
          if(te.type=='无人机') {
            detail.total=parseInt(_info.models[0].price)*_info.km*detail.num+parseInt(_info.models[0].deposit)*detail.num;
          }
          detail.date_start=_my.date_pickup.slice(5,10);
          detail.date_end=_my.date_giveback.slice(5,10);
          detail.OUID=v.OUID;
          detail.code=v.code;
          detail.status=v.order.status;
          detail.total=v.order.cost_real;
          infos[i]=detail;
        } else {
          infos[i]=null;
        }
        

        if(i>=items.length-1) {
          infos=infos.filter(v=>v);
          t.setData({
            infos
          });
          //wx.hideLoading();
        }
      })
    })
  },
  call(e) {
    var tel=e.currentTarget.dataset.tel||e.target.dataset.tel,
        t=this;
    if(tel) {
      wx.makePhoneCall({
        phoneNumber:tel
      })
    } else {
      toast("客户自提,无手机信息！");
    }
  }
})
