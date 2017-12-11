var app=getApp();
var {u,baseURL:URL, orders }=app,
    { req , toast , timeGoto ,formatDevice ,toast1 }=u;
const device = wx.getSystemInfoSync();
const width = device.windowWidth,
      height = device.windowHeight,
      deviceRadio =  device.windowWidth /750;
const top=height-96*deviceRadio;

Page({
  data: {
  	carts:[],
    toast:false,
    toastTitle:'',
  	all:false,
  	total:0,
  	type:'edit',
  	all1:false,
    width,
    height,
    top
  },
  onLoad: function (options) {
  	var t=this;
    if(app.globalData.usercode!=4280) {
      toast("尚未注册");
      setTimeout(()=>{
        wx.navigateTo({
          url:'../tip/tip'
        })
      },1500);
    }
  },
  toast1:toast1,
  onShow() {
    var t=this;
    if(app.globalData.usercode==4280) {
      setTimeout(()=>{
        t.getCart();
        t.setData({
          all:false,
          all1:false,
          total:0
        })
      },1000);
    }
  },
  getCart() {
    var t=this,
      items=[];
    req({
      url:`${URL}getTrolley.do`,
      header:{
        Cookie:app.globalData.head
      },
    }).then(res=>{
        var carts=res.data;
        if(carts.length>0) {
          wx.showLoading({title:'加载中'});
        }
        carts.map((v,i)=>{
          setTimeout(()=>{
            req({
              url:`${URL}getLeaseInfo.do?LUID=${v.LUID}`
            }).then(res1=>{
              if(res1.data.code==4280) {
                var _d=formatDevice(res1.data.data);
                _d._num=v.num;
                _d.num=v.num;
                _d._price=res1.data.models.filter(v2=>v2.id==v.MUID)[0].price;
                var _m=res1.data.models.filter(v2=>v2.id==v.MUID)[0];
                _d.id=v.id;
                _d.myDeposit=parseInt(_m.deposit);
                _d.myPrice=parseInt(_m.price)*parseInt(_d.dateCount);
                _d.myTotal=_d.myPrice;
                _d.days=v.days;
                if(_d.type=='无人机') {
                  _d.myPrice=_m.price*_d.km;
                }
                items[i]=_d;
              } else {
                items[i]=null;
              }
              if(i>=carts.length-1) {
                items=items.filter(v=>v)
                  t.setData({
                    carts:items
                  });
                  wx.hideLoading();
                }
            })
          },i*30)
        });
    }).catch(err=>{
      wx.hideLoading();
      toast("获取购物车请求失败");
    })
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
  			total=total+v.myTotal*(v.num||1)*1.1+v.myDeposit;
  		}
  		return v;
  	});
  	t.setData({
  		total:total.toFixed(0),
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
          total=total+v.myTotal*(v.num||1)*1.1+v.myDeposit;
      }
      return v;
    });
    t.setData({
      total:total.toFixed(0),
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
  			total=total+v.myTotal*(v.num||1)*1.1+v.myDeposit;
  		}
  		return v;
  	});
  	t.setData({
  		total:total.toFixed(0),
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
        total+=v.myTotal*(v.num||1)*1.1+v.myDeposit;
        return v;
      })
  	}
  	t.setData({
  		all:all,
  		total:total.toFixed(0),
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
    total=parseInt(total)
  	obj.checked=!obj.checked;
  	carts[i]=obj;
  	if(obj.checked) {
  		total=total+obj.myTotal*(obj.num||1)*1.1+obj.myDeposit;
  	} else {
  		total=total-obj.myTotal*(obj.num||1)*1.1-obj.myDeposit;
  	}
  	t.isAll();console.log(total)
  	t.setData({
  		total:total.toFixed(0),
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
