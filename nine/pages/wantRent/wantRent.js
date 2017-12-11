var app=getApp();

// import weCropper from '../util/pic.js'
const device = wx.getSystemInfoSync();
const width = device.windowWidth;
const height = device.windowHeight;

var {u,baseURL:URL , upPic}=app,
    { req ,toast , timeGoto ,dateObj ,myDate ,toast1 }=u,
    imgs=[];
var getImgInfo=function(obj) {
  	return Object.assign({},obj,app.globalData.uploadInfo);
};

Page({
  data: {
    address:null,
    toast:false,
    toastTitle:'',
    dateObj:null,
    dateArray:[],
    shortFlag:true,
    inputs:[1,2,3],
    city:'',
    start:[0,0,0,0],
    end:[0,0,0,0],
		startDate1:'',
		endDate1:'',
    dateCount:0,
    startDay:'',
    endDay:'',
    isShow:'',
    startTime:'',
    endTime:'',
    nowDate:null,
    types:[],
    ismyOptions:false,
    ismodels:false,
    myOptions:[{}],
    models:[{name:'normal'},{name:'nid'}],
    ti:0,
    picPath1:'',
    picPath2:'',
    picPath3:'',
    localAddr:'',
    localTel:'',
    localUser:'',
    sendData:null,
    cutting:false,
    cutImg:0,
    cropperOpt: {
      id: 'cropper',
      width,
      height:height-120,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 300) / 2,
        y: (height - 440) / 2,
        width: 300,
        height: 300
      }
    },
    weekdays:[]
  },
  onLoad: function (options) {
    var t=this;
    var msg=t.checkLogin();
    //t.initImg();
    if(!msg) {
      var nowDate=myDate.getNowDate(),
        dateArr=dateObj.dateArray.slice(0);
      dateArr[1]=dateObj.dateArray[1].slice(0,dateObj.dateArray[0][nowDate.month1].sep);
      t.setData({ 
        nowDate ,
        dateArray:dateArr,
        dateObj,
        start:[nowDate.month1,nowDate.date1,0],
        end:[nowDate.month1,nowDate.date1,0],
        weekdays:u.weekdays,
        localAddr:app.globalData.address.formatted_address,
        localUser:app.globalData.RealNameInfo.name,
        localTel:app.globalData.localTel,
      });
      t.getAddress();
      t.initDate();
    }
  },
  toast1:toast1,
  checkLogin() {
    var t=this;
    if(app.globalData.usercode!=4280) {
      toast("尚未注册");
      setTimeout(()=>{
        wx.navigateTo({
          url: '../tip/tip'
        });
      },1500);
      return "sda";
    } else if(!app.globalData.isRealName) {
      toast('尚未完成实名认证');
      setTimeout(()=>{
        wx.navigateTo({url:'../tip/tip'});
      },1500);
      return "sda";
    } else {
      return false;
    }
  },
  changeTypes(e) {
  	var data=e.detail.value,t=this,
				typeName=t.data.types[data].name,
  			flag=false,
  			obj=t.data.models;
  	if(typeName=='RTK') {
  			flag=obj.every(v=>{
	  			return v.name&&v.num&&v.price&&v.deposit;
	  		});
  	} else {
  			flag=obj.slice(0,1).every(v=>{
	  			return v.name&&v.num&&v.price&&v.deposit;
	  		});
  	}
  	this.setData({
  		ti:data,
  		ismodels:flag
  	});
  },
  changeTime(e) {
    var {value}=e.detail,
        t=this,
        {  start , nowDate } =t.data;
    if(value[0]<nowDate.month1||(value[0]==nowDate.month1&&value[1]<nowDate.date1)) {
      toast("不得小于当前日期");
      return false;
    }
    t.setData({start:value,dateArray:dateObj.dateArray});
    t.setDate();
  },
  changeTime1(e) {
    var {value}=e.detail,
        t=this,
        {  end } =t.data;
    t.setData({end:value,dateArray:dateObj.dateArray});
    t.setDate();
  },
  setDate() {
    var t=this,
        { start ,end ,nowDate } =t.data,
        startDate1,endDate1,
        startDay,
        endDay,
        dateCount,
        startTime,
        endTime;
    /*开始结束日期*/
    if(start[0]<nowDate.month1) {
      nowDate.year=nowDate.year+1;
    }
    startDate1=`${nowDate.year}-${dateObj.dateArray[0][start[0]].count}-${dateObj.dateArray[1][start[1]].count}`;
    if(end[0]<nowDate.month1) {
      nowDate.year=nowDate.year+1;
    }
    endDate1=`${nowDate.year}-${dateObj.dateArray[0][end[0]].count}-${dateObj.dateArray[1][end[1]].count}`;
    /*星期数*/
    startDay=myDate.getWeek(startDate1);
    endDay=myDate.getWeek(endDate1);
    startTime=dateObj.dateArray[2][start[2]].name;
    endTime=dateObj.dateArray[2][end[2]].name;
    dateCount=myDate.countDate(endDate1,startDate1);
    t.setData({
      startDate1,
      endDate1,
      startDay,
      endDay,
      dateCount,
      startTime,
      endTime
    })
  },
  radioChange(e) {
  	var type=e.detail.value;
  	if(type=='short') {
  		this.setData({
  			shortFlag:true
  		});
  	} else {
  		this.setData({
  			shortFlag:false
  		});
  	}
  },
  getAddress() {
    var t=this;
    if(!app.globalData.address) {
      wx.getLocation({
        type: 'wgs84', //返回可以用于wx.openLocation的经纬度
        success: function(res) {
          req({
            url:`${URL}getPosition.do?location=${res.latitude},${res.longitude}`
          }).then(res=>{
            t.setData({
            	city:res.data.result.addressComponent.city
            })
          });
        }
      });
    } else {
      t.setData({
        city:app.globalData.address.addressComponent.city
      })
    }
  },
  initDate() {
  	var t=this,
  	{nowDate}=t.data;
  	t.setData({
			startDate1:`${nowDate.year}-${nowDate.month}-${nowDate.date}`,
			endDate1:`${nowDate.year}-${nowDate.month}-${nowDate.date}`,
	    dateCount:0,
	    startDay:`${nowDate.day}`,
	    endDay:`${nowDate.day}`,
	    types:app.globalData.types
  	})
  },
  changeCity(e) {
  	var city=e.detail.value[1];
  	this.setData({city});
  },

  readySend(e) {
  	var data=e.detail.value,t=this;
  	if(!t.data.ismodels) {
  		toast('价格设定填写不完整');
  		return false;
  	} else if(!t.data.ismyOptions) {
  		toast('配置参数填写不完整');
  		return false;
  	}
  	data.date_start=t.data.startDate1//+" "+t.data.startTime;
  	data.date_end=t.data.endDate1//+" "+t.data.endTime;
  	data.type=t.data.types[t.data.ti].name;
  	data.city=t.data.city;
  	data.models=t.data.models.slice(0,1);
  	if(data.type=='RTK') {
  		data.models=t.data.models;
  	}
  	data.configure=t.data.myOptions;
  	if(!t.data.shortFlag) {
  		data.date_start=myDate.getNowDate().str;
  		data.date_end="2099-12-31";
  	}

  	t.setData({
  		sendData:data,
  		disable:true
  	});
  	t.uploadImg({index:1});
  },
  sendForm() {
  	var data=this.data.sendData,t=this;
  	data.imgs=imgs.slice(1).join(",");

  	req({
  		url:`${URL}uploadLeaseInfo.do`,
  		header:{
		    Cookie:app.globalData.head
		  },
		  data:data
  	}).then(res=>{
  		if(res.data.code==4280) {
  			toast("信息上传成功");
  			setTimeout(()=>{
		    	wx.switchTab({url:'../index/index'})
		    },1500);
  		} else {
  			toast(res.data.message);
  			t.setData({ disable:false });
  		}
  	}).catch(err=>{
  		toast("信息上传失败");
  		t.setData({ disable:false });
  	});
  },
  uploadImg({index,debug}) {
  	var t=this;
  	var options=getImgInfo({filePath : t.data["picPath"+index] });
  	if(t.data["picPath"+index]) {
  		req(options,upPic)
	  	.then(res=>{
	  		imgs[index]=res; 
	  		index=index+1;
	  		if(index<4) {
	  			t.uploadImg({index:index});
	  		} else {
          //console.log(imgs.slice(1).join(","));
	  			t.sendForm();
	  		}
	  	}).catch(err=>{
	  		console.log(err);
				toast("图片上传失败,可能已上传过相同的图片");
	  		t.setData({ disable:false });
	  	});
  	} else {
  		index=index+1;
  		if(index<4) {
	  		t.uploadImg({index:index});
	  	} else {
	  		t.sendForm();
	  	}
  	}
  },
  setShow(e) {
  	var t=this,
  			type=e.target.dataset.type||e.currentTarget.dataset.type;
  	var obj=t.data[type],typeName=t.data.types[t.data.ti].name,
  			flag=false;
  	if(type=='models') {
  		if(typeName=='RTK') {
  			flag=obj.every(v=>{
	  			return v.name&&v.num&&v.price&&v.deposit;
	  		});
  		} else {
  			flag=obj.slice(0,1).every(v=>{
	  			return v.name&&v.num&&v.price&&v.deposit;
	  		});
  		}
  	} else {
  		flag=obj.every(v=>{
  			return v.name&&v.num&&v.unit;
  		});
  	}
  	this.setData({
  		isShow:'',
  		["is"+type]:flag
  	});
  },
  changeInput(e) {
  	var i=e.target.dataset.i||e.currentTarget.dataset.i,
  			name=e.target.dataset.name||e.currentTarget.dataset.name,
  			v=e.detail.value;
  	var objs=this.data.models,
  			obj=objs[i];
  	obj[name]=v;
  	objs[i]=obj;
  	this.setData({
  		models:objs
  	});
  },
  changeInputR(e) {
    var i=e.target.dataset.i||e.currentTarget.dataset.i,
        name=e.target.dataset.name||e.currentTarget.dataset.name,
        v=e.detail.value;
    var objs=this.data.models;
    objs.map(v1=>{
      v1[name]=v;
      return v1;
    });
    if(!objs[1]) {
      objs[1]=objs[0];
    }
    this.setData({
      models:objs
    });
  },
  changeInput1(e) {
  	var i=e.target.dataset.i||e.currentTarget.dataset.i,
  			name=e.target.dataset.name||e.currentTarget.dataset.name,
  			v=e.detail.value;
  	var objs=this.data.myOptions,
  			obj=objs[i]||{};
  	obj[name]=v;
  	objs[i]=obj;
  	this.setData({
  		myOptions:objs
  	});
  },
  setIsShow(e) {
  	var name=e.target.dataset.name||e.currentTarget.dataset.name,
  			t=this;
  	t.setData({
  		isShow:name
  	});
  },
  chooseImg:function(e) {
    var t=this,
        i=e.target.dataset.i||e.currentTarget.dataset.i;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
      	// var tempFilePath = res.tempFilePaths[0];
       //  t.wecropper.pushOrign(tempFilePath);
       //  t.setData({
       //    cutImg:i,
       //    cutting:true
       //  });
        var tempFilePath = res.tempFilePaths[0];
        t.setData({
          ['picPath'+i]:tempFilePath
        });
      }
    })
  },
  touchStart (e) {
    this.wecropper.touchStart(e)
  },
  touchMove (e) {
    this.wecropper.touchMove(e)
  },
  touchEnd (e) {
    this.wecropper.touchEnd(e)
  },
  exit() {
    this.setData({cutting:false})
  },
  sure(e) {
    var t=this,{cutImg}=t.data;
    this.wecropper.getCropperImage((src) => {
      if (src) {
        t.setData({
          ['picPath'+cutImg]:src,
          cutting:false
        });
      }
    });
  },
  // initImg () {
  //   const { cropperOpt } = this.data

  //   new weCropper(cropperOpt)
  //     .on('ready', (ctx) => {
  //       console.log(`wecropper is ready for work!`)
  //     })
  //     .on('beforeImageLoad', (ctx) => {
  //       wx.showToast({
  //         title: '上传中',
  //         icon: 'loading',
  //         duration: 20000
  //       })
  //     })
  //     .on('imageLoad', (ctx) => {

  //       wx.hideToast()
  //     })
  //     .on('beforeDraw', (ctx, instance) => {

  //     })
  //     .updateCanvas()
  // },
  addInput() {
    var t=this,
        {inputs}=t.data; 
    t.setData({
      inputs:inputs.concat([1])
    })
  },
  test() {
    var t=this;
    t.uploadImg({index:1,debug:true});
  },
  changeColumn(e) {
    var { column , value } =e.detail,
        t=this,
        {dateArray}=t.data;
    if(column==0) {
      dateArray[1]=dateObj.dateArray[1].slice(0,dateObj.dateArray[0][value].sep);
      t.setData({dateArray});
    }
  },
  toast2() {
    toast("测试提示消息");
  }
})
