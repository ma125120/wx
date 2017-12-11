var app=getApp();
var {u,baseURL:URL, services ,provinces }=app,
    { req ,toast , timeGoto }=u;
Page({
  data: {
    services:services,
    lat:0,
    lon:0,
    city:'',
    provinces:[]
  },
  getNearService() {
  	var t=this,
  			{lat,lon}=t.data;
  	if(lat&&lon) {
  		req({
  			url:`${URL}getServiceNetwork.do`,
  			data:{
            //city:t.data.city
          condition:'city',
  				values:t.data.city
  			}
  		}).then(res=>{
        t.setData({
          services:res.data
        })
  			//console.log(res)
  		})
  	}
  },
  changeCity(e) {
  	var city=e.detail.value,t=this,{provinces}=t.data;
  	this.setData({city:provinces[city]});
  	this.getNearService();
  },
  onLoad: function (options) {
  	var t=this;
  	if(app.globalData.latitude) {
  		t.setData({
  			lat:app.globalData.latitude,
  			lon:app.globalData.longitude,
  			city:app.globalData.address.addressComponent.province
  		});
      t.getNearService();
  	} else {
  		app.getAddress(function(res) {
  			t.setData({
  				lat:res.latitude,
  				lon:res.longitude
  			});
  		}.bind(t),function(res) {
  			t.setData({
  				city:res.addressComponent.province
  			});
        t.getNearService();
  		}.bind(t));
  	}
  	t.setData({
      provinces
    })
  },
  call(e) {
    var t=this,
        tel=e.target.dataset.tel||e.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: tel //仅为示例，并非真实的电话号码
    });
  },
  goLocation(e) {
    var t=this,
        lon=e.target.dataset.lon||e.currentTarget.dataset.lon,
        lat=e.target.dataset.lat||e.currentTarget.dataset.lat;
    wx.openLocation({
      latitude: 37.87059,//lat,//37.87059,//
      longitude: 112.548879,//lon,//112.548879,//
      scale: 28
    })
  },
})
