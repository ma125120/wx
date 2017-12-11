var app=getApp();
var {u,baseURL:URL,cases}=app,
    { req ,toast , timeGoto ,formatDevice }=u;
const device = wx.getSystemInfoSync();
const width = (device.windowWidth-4)/2;
Page({
  data: {
    city:'',
    multiArray: [['10月', '11月'], ['24日', '25日'], ['11点','12点'],['00分','01分']],
    cases:[],
    address:null,
    slides:[],
    items:[],
    types:[],
    width:0
  },
  getItems() {
    var types=[],
        t=this,
        items=[];
    wx.showLoading({title:'加载中'});
    req({
      url:`${URL}getLeaseType.do`,
      header:{
        Cookie:app.globalData.head
      }
    }).then(res=>{
      types=res.data.data;
      t.getRealInfo(types);
    });
  },
  getRealInfo(types) {
    var t=this,items=[];
    types.map((v,i)=>{
      setTimeout(()=>{
        req({
          url:`${URL}getLeaseByConditions.do`,
          data:{
            condition:'type',
            values:v.name
          }
        }).then(res=>{
          var _item=res.data.map((v1,i1)=>{
            v1=formatDevice(v1);
              return v1;
          }).slice(0,2);
          items[i]=_item;
          if(i>=types.length-1) {
            t.setData({
              items:items,
              types:types
            });
            wx.hideLoading();
          }
        });
      },i*100);
    });
  },
  onLoad: function (options) {
  	var t=this;
    t.setData({
      cases:cases,
      width:width
    });
    app.getAddress(null,function() {
      t.setData({
        address:app.globalData.address,
        width:width
      })
    }.bind(this));
    t.getSlides();
  },
  onShow() {
    this.getItems();
  },
  getSlides() {
    var t=this;
    req({
      url:`${URL}Resources/RollsImgs.json`,
    }).then(res=>{
      this.setData({
        slides:res.data
      })
    })
  },
  changeCity(e) {
    var city=e.detail.value[1];
    this.setData({city});
  },
})
