var app=getApp();
var {u,baseURL:URL}=app,
    { req ,toast , timeGoto }=u;
Page({
  data: {
    city:'',
    sendData:{},
    disable:false
  },
  onLoad: function (options) {
  	var t=this;

  },
  readySend(e) {
  	var data=e.detail.value,
  			t=this,
  			{city,sendData}=t.data;
  	data=Object.assign({},data,{city},sendData);
  	if(!city) {
  		toast("城市名不能为空");
  		return false;
  	} else if(!sendData.lon||!sendData.lat||!sendData.position){
  		toast("必须选择公司地址");
  		return false;
  	} else if(!data.person||!data.name||!data.phone) {
  		toast("输入不能为空");
  		return false;
  	}
  	t.setData({ disable:true });
  	req({
  		url:`${URL}uploadServiceNetwork.do`,
  		header:{
		    Cookie:app.globalData.head
		  },
		  data:data
  	}).then(res=>{
  		if(res.data.code==4280) {
  			toast("数据上传成功");
  		} else {
  			toast(res.data.message);
  		}
  		t.setData({ disable:false });
  	}).catch(err=>{
  		toast("信息上传失败");
  		t.setData({ disable:false });
  	});
  },
  changeCity(e) {
  	var city=e.detail.value[0]+e.detail.value[1];
  	this.setData({city});
  },
  chooseAddr() {
    var t=this,
    		{sendData}=t.data;
    req({},wx.chooseLocation)
    .then(res=>{
    	sendData.position=res.name;
    	sendData.lat=res.latitude;
    	sendData.lon=res.longitude;
      t.setData({
        sendData
      });
      req({
          url:`${URL}/getPosition.do?location=${res.latitude},${res.longitude}`
      }).then(res=>{
      	sendData.citycode=res.data.result.addressComponent.adcode;
          t.setData({ 
            sendData
          });
      });
    }).catch(err=>{
      console.log(err);
    })
  },
})
