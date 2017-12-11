var app=getApp();
var {req,toast,sort,md5,baseURL:URL,Goto,checkForm,_DEV_, toImg }=app;

import cars from '../../utils/json/cars.js';
Page({
  data: {
  	cars:[],
    distance:33,
    my_img:'',
    page:1,
    nextPage:[],
    can:true,
    lon:0,
    lat:0,
    carIndex:0,
    pageList:[1,2,3],
    pageCount:5
  },
  next() {
    var t=this,
        {page,can}=t.data;
    if(can) {
      page=page+1;
      t.setData({
        page:page
      });
      t.getCars('next')
    }
  },
  prev() {
    var t=this,
        {pageList,page,can}=t.data;
    if(page>1) {
      page=page-1;
      t.setData({
        page:page
      });
      t.getCars();
    }
  },
  getCars(type) {
    var t=this,
        {carIndex,lon,lat,page,nextPage}=t.data,
        page=page-1;
    if(nextPage.length>0&&type=='next') {
      t.setData({
        cars:nextPage,
        can:true
      });
      req({
        url:`${URL}/getRentals.do?carType=${carIndex}&lat=${lat}&lon=${lon}&dist=100000&index=${(page+1)*20}&length=20`,
        header:{
          Cookie:app.globalData.head
        },
      }).then(res=>{
        var cars=res.data;
        if(cars.length==0) {
          t.setData({
            can:false
          });
        } else {
          cars=toImg(cars).map((v)=>{
            v.distance=v.distance.toFixed(2);
              return v;
          });
          sort(cars,'distance',true);
          t.setData({ nextPage:cars,can:true });
        }
        wx.hideLoading();
      }).catch(err=>{
        console.log(err)
        toast('没有查询到数据');
      });
    } else {
      wx.showLoading({title:'正在加载中！'});
      req({
        url:`${URL}/getRentals.do?carType=${carIndex}&lat=${lat}&lon=${lon}&dist=100000&index=${page*20}&length=20`,
        header:{
          Cookie:app.globalData.head
        },
      }).then(res=>{
        var cars=res.data;
        t.setData({
            my_img:app.globalData.help.front
        });
        if(cars.length==0) {
          t.setData({
            can:false
          });
        } else {
          cars=toImg(cars).map((v)=>{
            v.distance=v.distance.toFixed(2);
              return v;
          });
          sort(cars,'distance',true);
          t.setData({ cars,can:true });
          wx.hideLoading();
          return req({
            url:`${URL}/getRentals.do?carType=${carIndex}&lat=${lat}&lon=${lon}&dist=100000&index=${(page+1)*20}&length=20`,
            header:{
              Cookie:app.globalData.head
            },
          })
        }
      }).then(res=>{
        var cars=res.data;
        if(cars.length==0) {
          t.setData({
            can:false
          });
        } else {
          cars=toImg(cars).map((v)=>{
            v.distance=v.distance.toFixed(2);
              return v;
          });
          sort(cars,'distance',true);
          t.setData({ nextPage:cars,can:true });
        }
      }).catch(err=>{
        console.log(err)
        toast('没有查询到数据');
      });
    }
      
  },
  onLoad: function (options) {
  	var t=this,
        lon=app.globalData.longitude,
        lat=app.globalData.latitude;
    if(!lon||!lat) {
      wx.getLocation({
        type: 'wgs84', //返回可以用于wx.openLocation的经纬度
        success: function(res) {
          app.globalData.latitude = res.latitude;
          app.globalData.longitude = res.longitude;
          req({
            url:`${URL}/getAddrInfo.do?location=${res.latitude},${res.longitude}`
          }).then(res=>{
            app.globalData.address=res.data.result.addressComponent.province+res.data.result.addressComponent.city;
            app.globalData.addr=res.data.result.formatted_address;
            app.globalData.addr_code=res.data.result.addressComponent.adcode;
          });
        }
      });
      toast("正在获取地理位置中，请稍后！");
      setTimeout(()=>{
        wx.switchTab({
          url:'../home/home'
        })
      },1500);
      return false;
    }
    var carIndex=options.carIndex||1;
  	app.check();
    t.setData({
      carIndex:carIndex,
      lon:app.globalData.longitude,
      lat:app.globalData.latitude
    })
    
  	if(!_DEV_) {
      this.getCars();
  	} else {
  		t.setData({
  			cars:cars
  		});
  	}
  },
  nav(e) {
    var url=e.currentTarget.dataset.url;
    url&&Goto(url);
  },
  toLocation(e) {
    wx.openLocation({
      latitude: app.globalData.latitude,
      longitude: app.globalData.longitude,
      scale: 28
    });
    return false;
  }
})
