//app.js
import u from './utils/util.js'
import { firsts,seconds,shops } from './utils/cases.js'
var {req}=u;
App({
  u,
  firsts,seconds,shops,
  onLaunch: function () {

  },
  globalData: {
    userInfo: null,
    carts:[],
    shopAddr:null
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
})