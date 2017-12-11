//index.js
//获取应用实例
const app = getApp()
var { u,firsts,seconds,shops, }=app,
    { req ,toast } = u;
Page({
  data: {
    firsts:[],
    seconds:[],
    shops:[],
    _shops:[],
    first_i:0,
    flag:false,
    detailFlag:false
  },
  onLoad: function () {
    var t=this;
    t.setData({ firsts,seconds,shops });
  },
  changeFlag(e) {
    var t=this,
        i=e.currentTarget.dataset.i||e.target.dataset.i,
        { flag }= t.data;
    t.setData({
      flag:!flag
    })
  },
  changeFirst(e) {
    var t=this,
        index=e.currentTarget.dataset.index||e.target.dataset.index,
        { flag }= t.data;
    t.setData({
      first_i:index
    })
  },
  showDetail(e) {
    var t=this;
    t.setData({
      detailFlag:!t.data.detailFlag
    })
  },
  addCart(e) {
    var t=this,
        obj=e.currentTarget.dataset.obj||e.target.dataset.obj;
    app.globalData.carts.push(obj);
    toast("加入购物车成功");
  }

})
