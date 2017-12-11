var app=getApp();
var {u,baseURL:URL, orders }=app,
    { req , toast , timeGoto ,formatDevice  }=u;

Page({
  data: {
  	carts:[],
    toast:false,
    toastTitle:'',
  	all:false,
  	total:0,
  	type:'edit',
  	all1:false,
  },
  onShow: function (options) {
  	var t=this;
  	t.getCart()
  },
  getCart() {
    var t=this,
      items=[];
    t.setData({
    	carts:app.globalData.carts
    })
    // req({
    //   url:`${URL}getTrolley.do`,
    //   header:{
    //     Cookie:app.globalData.head
    //   },
    // }).then(res=>{

    // }).catch(err=>{
    //   wx.hideLoading();
    //   toast("获取购物车请求失败");
    // })
  },
  add(e) {
  	var index=e.currentTarget.dataset.i||e.target.dataset.i,
  			num=0,
  			t=this,
  			{carts}=t.data,
  			total=0;
  	num=carts[index].num||1;
  	num++;
  	carts[index].num=num;
  	carts.map((v,i)=>{
  		if(v.checked) {
  			total=total+v.price*(v.num||1);
  		}
  		return v;
  	});
  	t.setData({
  		total:total,
  		carts:carts
  	});
  },
  changeNum(e) {
    var index=e.currentTarget.dataset.i||e.target.dataset.i,
        t=this,
        {carts}=t.data,
        total=0;
    carts[index].num=e.detail.value;
    carts.map((v,i)=>{
      if(v.checked) {
          total=total+v.price*(v.num||1);
      }
      return v;
    });
    t.setData({
      total:total,
      carts:carts
    });
  },
  del(e) {
		var index=e.currentTarget.dataset.i||e.target.dataset.i,
  			num=0,
  			t=this,
  			{carts}=t.data,
  			total=0;
  	num=carts[index].num||1;
  	num--;
  	if(num<1) {
  		num=1;
  	}
  	carts[index].num=num;
  	carts.map((v,i)=>{
  		if(v.checked) {
  			total=total+v.price*(v.num||1);
  		}
  		return v;
  	});
  	t.setData({
  		total:total,
  		carts:carts
  	});
  },
  radioChange() {
  	var t=this,
  			all=!t.data.all,total=0,
  			carts=t.data.carts;
  	carts=carts.map((v,i)=>{
  		v.checked=all;
  		return v;
  	});
  	if(all) {
      carts.map(v=>{
        total+=v.price*(v.num||1);
        return v;
      })
  	}
  	t.setData({
  		all:all,
  		total:total,
  		carts
  	});
  },
  changeType(e) {
		var t=this,
				type=e.target.dataset.type||e.currentTarget.dataset.type,
				carts=t.data.carts;
		carts=carts.map(v=>{
			v.checked=false;
			return v;
		})
		t.setData({
			type:type,
			carts,
      all:false,
      all1:false
		})
  },
  radioChange1() {
  	var t=this,
  			all1=!t.data.all1,
  			carts=t.data.carts;
  	carts=carts.map((v,i)=>{
  		v.checked=all1;
  		return v;
  	});
  	t.setData({
  		all1:all1,
  		carts
  	});
  },
  delChoose() {
		var t=this,
  			{carts}=t.data,
  			arr=[],carts1=carts;
  	carts=carts.filter((v,i)=>{
  		return !v.checked;
  	});
    var _carts=carts1.filter((v,i)=>{
      return v.checked;
    }).map((v,i)=>{
      setTimeout(()=>{
        req({
          url:`${URL}removeTrolley.do?id=${v.id}`,
          header:{
            Cookie:app.globalData.head
          },
        });
      },i*30)
    });
  	t.setData({
  		total:0,
  		all:false,
  		all1:false,
  		carts:carts
  	});
  },
  finish() {
  	var t=this,
  			{carts}=t.data;
  	carts=carts.map((v,i)=>{
  		v.checked=false;
  		return v;
  	});
  	t.setData({
  		type:'edit',
			carts
  	});
  },
  changeCheck(e) {
  	var t=this,
        i=e.target.dataset.i||e.currentTarget.dataset.i,
        obj=e.target.dataset.obj||e.currentTarget.dataset.obj,
  			{ carts , total }=t.data;
    total=parseInt(total);
  	obj.checked=!obj.checked;
  	carts[i]=obj;
  	if(obj.checked) {
  		total=total+obj.price*(obj.num||1);
  	} else {
  		total=total-obj.price*(obj.num||1);
  	}
  	t.isAll();
  	t.setData({
  		total:total,
  		carts:carts
  	});
  },
  isAll() {
  	var t=this,
  			{carts}=t.data;
  	var flag=carts.every((v,i)=>v.checked);
  	t.setData({
  		all:flag,
  		all1:flag
  	});
  },
  toOrder() {
    var t=this,
        { carts ,total }=t.data;
    carts=carts.filter(v=>v.checked);
    if(carts.length>0) {
      app.globalData.carts={
        cart:carts,
        total:total
      };
      wx.navigateTo({url:'../cartToPay/cartToPay'});
    } else {
      toast("至少选择一项");
    }
  }
})
