//app.js
import u from './utils/util.js'
import {services,cases,orders} from './utils/cases.js'
import provinces from './utils/address.js'
var {req}=u;
App({
  onLaunch: function () {
    this.getAddress();
    this.getLogin();
    this.getAllTypes();
  },
  u,
  cases,
  services,
  orders,
  provinces,
  
  //baseURL:'http://39.106.114.1/9Ding/',
  //baseURL:'http://10.162.192.26:8080/9Ding/',
  upPic(options) {
    var t=this;
    t.getOSS(function(obj) {
      var option=Object.assign({},options,obj);
      t.upPic1(option);
    }.bind(t));
  },
  upPic1(options) {
    var aliyunServerURL=options.host,
        policy=options.policy,
        signature=options.signature,
        accessid=options.accessid,
        aliyunFileKey='';
    if(options.filePath.indexOf("http")==-1) {
      aliyunFileKey= options.dir + options.filePath.replace('wxfile://', '');
    } else {
      aliyunFileKey= options.dir + options.filePath.replace('http://', '');
    }
    wx.uploadFile({
      url: aliyunServerURL, 
      filePath: options.filePath,
      name: 'file',
      formData: {
        'key': aliyunFileKey,
        'policy': policy,
        'OSSAccessKeyId': accessid,
        'signature': signature,
        'success_action_status': '200',
      },
      success: function (res) {
        if (res.statusCode != 200) {
          if(options.fail){
            options.fail(res)
          }
          return;
        }
        if(options.success){
          options.success(options.host+"/"+aliyunFileKey);
        }
      },
      fail: function (err) {
        err.wxaddinfo = aliyunServerURL;
        if (options.fail) {
          options.fail(err)
        }
      },
    })
  },
  getRealName() {
    var t=this;
    req({
      url: `${t.baseURL}getRealName.do`,
      header:{
        Cookie:t.globalData.head
      }
    }).then(res=>{
      if(res.data.code==4280) {
        t.globalData.isRealName=true;
        t.globalData.RealNameInfo=res.data.data;
      }
    });
  },
  getVip() {
    var t=this;
    req({
      url: `${t.baseURL}getAvailableViper.do`,
      header:{
        Cookie:t.globalData.head
      }
    }).then(res=>{
      if(res.data.length>0) {
        t.globalData.isVip=true;
      }
    });
  },
  getTicket() {
    var t=this;
    req({
      url: `${t.baseURL}getInvoiceQualification.do`,
      header:{
        Cookie:t.globalData.head
      }
    }).then(res=>{
      if(res.data.code==4280) {
        t.globalData.isTicket=true;
        t.globalData.ticket=res.data.data;
      }
    });
  },
  getLogin() {
    var t=this;
    // if(!t.globalData.user) {
      req({},wx.login)
      .then(res=>{
        return req({
          url: `${t.baseURL}/wxlogin.do?openid=${res.code}`
        });
      }).then(res=>{
        t.globalData.usercode=res.data.code;
        t.globalData.loginInfo=res.data;
        var head=res.header['Set-Cookie'];
        wx.setStorageSync('head',head);
        t.globalData.head=head;
        t.globalData.user=true;
        t.globalData.localTel=res.data.data.phone;
        if(res.data.code==4280) {
          t.getOSS();
          t.getCompany();
          t.getRealName();
          t.getTicket();
          t.getVip();
        }
      }).catch(err=>{
        console.log(err);
      });
    // }
  },
  getOSS(fn) {
    var t=this;
    req({
      url:`${t.baseURL}getUserUploadUrl.do`,
      header:{
        Cookie:t.globalData.head
      }
    }).then(res=>{
      t.globalData.uploadInfo=res.data.data;
      fn&&fn.call(t,res.data.data);
    });
  },
  getAddress(fn,fn1) {
    var t=this;
    wx.getLocation({
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success: function(res) {
        t.globalData.latitude = res.latitude;
        t.globalData.longitude = res.longitude;
        fn&&fn(res);
        u.req({
          url:`${t.baseURL}getPosition.do?location=${res.latitude},${res.longitude}`
        }).then(res=>{
          t.globalData.address=res.data.result;
          fn1&&fn1(res.data.result);
        });
      }
    });
  },
  getCompany() {
    var t=this;
    req({
      url:`${t.baseURL}getCompany.do`,
      header:{
        Cookie:t.globalData.head
      }
    }).then(res=>{
      if(res.data.code==4280) {
        t.globalData.isCompany=true;
        t.globalData.companyInfo=res.data.data;
      }
    })
  },
  getAllTypes(fn) {
    var t=this;
    req({
      url:`${t.baseURL}getLeaseType.do`,
      header:{
        Cookie:t.globalData.head
      }
    }).then(res=>{
      t.globalData.types=res.data.data;
    });
  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo;
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    address:null,
    user:false,
    head:null,
    usercode:0,
    loginInfo:null,
    uploadInfo:null,
    types:[],
    isRealName:false,
    isCompany:false,
    isTicket:false,
    ordering:null,
    carts:null,
    RealNameInfo:null,
    companyInfo:null,
    ticketInfo:null,
    isVip:false,
    localTel:''
  }
})