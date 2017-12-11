const app = getApp()
var { u,firsts,seconds,shops, }=app,
    { req ,toast } = u;
Page({
  data: {
    shop:null
  },
  onLoad: function (options) {
  	var t=this;
  	t.setData({
  		shop:shops[0]
  	})
  },
  addNum(e) {
  	var t=this,
  			{ shop } = t.data;
  	shop.num=(shop.num||0)+1;
  	t.setData({shop});
  },
  delNum(e) {
  	var t=this,
  			{ shop } = t.data;
  	var num=shop.num||0;
  	if(num>0) {
  		shop.num=shop.num-1;
  	}
  	t.setData({shop});
  },
  addToCart() {
  	var t=this,
  			{ shop } = t.data;
  	var num=shop.num||0;
  	if(num==0) {
  		toast("数量不能为空");
  		return false;
  	}
  	app.globalData.carts.push(shop);
  	toast("加入购物车成功");
  }
})
