var app=getApp();
var {u,baseURL:URL}=app,
    { req ,toast , timeGoto }=u;
Page({
  data: {
    disable:false,
    ticketInfo:null
  },
  onLoad: function (options) {
  	var t=this;
  	this.setData({
  		disable:app.globalData.isTicket
  	});
  },
  initForm() {
  	var t=this,
  			{ ticketInfo } = app.globalData;
  	t.setData({ ticketInfo });
  },
  send_form(e) {
  	var data=e.detail.value,
  	t=this;
  	if(!data.addr||!data.code||!data.unit||!data.phone||!data.bank||!data.bank_account) {
  		toast("输入不能为空");
  		return false;
  	}
		t.setData({ disable:true });
  	req({
  		url:`${URL}uploadInvoiceQualification.do`,
  		header:{
        Cookie:app.globalData.head
      },
      data:data
  	}).then(res=>{
	  	if(res.data.code==4280) {
		  	toast("信息上传成功");
		  	app.globalData.isTicket=true;
		  	setTimeout(()=>{
			    wx.switchTab({url:'../my/my'})
			  },1500);
  		} else {
			  toast(res.data.message);
			  t.setData({ disable:false });
  		}
  	}).catch(err=>{
  				toast("信息上传失败");
  				t.setData({ disable:false });
  	})
  }
})
