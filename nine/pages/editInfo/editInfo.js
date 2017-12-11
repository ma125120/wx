var app=getApp();

import weCropper from '../util/pic.js'
const device = wx.getSystemInfoSync();
const width = device.windowWidth;
const height = device.windowHeight;

var {u,baseURL:URL , upPic}=app,
    { req ,toast , timeGoto ,formatDevice ,dateObj ,myDate }=u,
    imgs=[];
var getImgInfo=function(obj) {
  	return Object.assign({},obj,app.globalData.uploadInfo);
};

Page({
  data: {
    address:null,
    shortFlag:true,
    inputs:[1,2,3],
    city:'',
    info:null,
    startDate:'',
		startDate1:'',
    endDate:'',
		endDate1:'',
    dateCount:0,
    startTime:'',
    startDay:'',
    endTime:'',
    endDay:'',
    isShow:'',
    nowDate:null,
    types:[],
    ismyOptions:false,
    ismodels:false,
    myOptions:[{}],
    models:[],
    ti:0,
    picPath1:'',
    picPath2:'',
    picPath3:'',
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
    weekdays:['星期一','星期二','星期三','星期四','星期五','星期六','星期日']
  },
  onLoad: function (options) {
    var t=this;
    t.initImg();
    var nowDate=myDate.getNowDate(),
        dateArr=dateObj.dateArray.slice(0);
    dateArr[1]=dateObj.dateArray[1].slice(0,dateObj.dateArray[0][nowDate.month1].sep);
    t.setData({ 
      nowDate ,
      dateArray:dateArr,
      dateObj,
      start:[nowDate.month1,nowDate.date1,0,0],
      end:[nowDate.month1,nowDate.date1,0,0],
      weekdays:u.weekdays
    });
    t.getAddress();
    t.getInfo(options.LUID)
  },
  changeTypes(e) {
  	var data=e.detail.value,t=this,
				typeName=t.data.types[data].name,
  			flag=false,
  			obj=t.data.models,
        { info } = t.data;
        info.type=typeName;
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
  		ismodels:flag,
      info
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
      endTime,
      shortFlag:true
    });
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
    { nowDate,info:{dateInfo} ,start ,info }=t.data,
    dateCount=myDate.countDate(dateInfo.endDate1,dateInfo.startDate1);
    if(dateCount>100) {
      dateCount=1;
      dateInfo.startDate1=`${nowDate.year}-${nowDate.month}-${nowDate.date}`;
      dateInfo.endDate1=`${nowDate.year}-${nowDate.month}-${nowDate.date}`;
    }
    t.setData({
      startDate1:dateInfo.startDate1,
      endDate1:dateInfo.endDate1,
      dateCount:dateCount,
      startDay:myDate.getWeek(dateInfo.startDate1),
      endDay:myDate.getWeek(dateInfo.endDate1),
      types:app.globalData.types,
      start:[dateInfo.startDate1.split("-")[1]-1,dateInfo.startDate1.split("-")[2]-1,0,0],
      end:[dateInfo.endDate1.split("-")[1]-1,dateInfo.endDate1.split("-")[2]-1,0,0]
    });

    var ti=0,shortFlag;
    app.globalData.types.map((v,i)=>{
      if(v.name==info.type) {
        ti=i;
        return v;
      }
    });
    if(info.dateCount>300) {
      shortFlag=false;
    }
    imgs=[,...info.imgs1];
  	t.setData({
      ti:ti,
      shortFlag,
      picPath1:info.imgs1[0],
      picPath2:info.imgs1[1],
      picPath3:info.imgs1[2],
  	});
  },
  changeCity(e) {
  	var city=e.detail.value[1];
  	this.setData({city});
  },
  readySend(e) {
  	var data=this.data.info,t=this;
  	data.date_start=t.data.startDate1//+" "+t.data.startTime;
    data.date_end=t.data.endDate1//+" "+t.data.endTime;
  	data.city=t.data.city;
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
  	var data=this.data.info,t=this;
    data.id=data.LUID;
    data.leaseType=4280;
    data.models=data.models.map(v=>{
      return {
        id:v.id,
        name:v.name,
        price:v.price,
        deposit:v.deposit,
        num:v.num
      }
    });
  	data.imgs=imgs.slice(1).join(",");
  	
  	req({
  		url:`${URL}updateLeaseInfo.do`,
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
  	if(imgs[index]!=t.data["picPath"+index]) {
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
  			v=e.detail.value,
        { info }=this.data;
  	info.models[i][name]=v;
  	this.setData({
  		info
  	});
  },
  changeField(e) {
    var type=e.target.dataset.type||e.currentTarget.dataset.type,
        v=e.detail.value,
        t=this,
        { info }=this.data;
    info[type]=v;
    this.setData({
      info
    });
  },
  changeInput1(e) {
  	var i=e.target.dataset.i||e.currentTarget.dataset.i,
  			name=e.target.dataset.name||e.currentTarget.dataset.name,
  			v=e.detail.value,
        t=this,
        { info } =t.data;
    info.configure[i][name]=v;
  	this.setData({
  		info
  	});
  },
  setIsShow(e) {
  	var name=e.target.dataset.name||e.currentTarget.dataset.name,
  			t=this;
  	t.setData({
  		isShow:name
  	});
  },
  changeColumn(e) {
    var { column , value } =e.detail,
        t=this,
        {dateArray}=t.data;
    if(column==0) {
      dateArray[1]=dateObj.dateArray[1].slice(0,dateObj.dateArray[0][value].sep);
      t.setData({dateArray})
    }
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
  initImg () {
    const { cropperOpt } = this.data

    new weCropper(cropperOpt)
      .on('ready', (ctx) => {
        console.log(`wecropper is ready for work!`)
      })
      .on('beforeImageLoad', (ctx) => {

        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000
        })
      })
      .on('imageLoad', (ctx) => {

        wx.hideToast()
      })
      .on('beforeDraw', (ctx, instance) => {

      })
      .updateCanvas()
  },
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
  getInfo(id) {
    var t=this;
    wx.showLoading({title:'加载中'});
    req({
      url:`${URL}getLeaseInfo.do?LUID=${id}`,
      header:{
        Cookie:app.globalData.head
      }
    }).then(res=>{
      var _data=res.data.data;
      var info=formatDevice(_data);
      info.models=res.data.models;
      info.name=info.username;
      t.setData({
        info:info,
      });
      if(info.models[1]) {
        t.setData({
          num1:info.models[0].num,
          num2:info.models[1].num
        });
      }
      setTimeout(()=>{
        t.initDate();
      },50);
      wx.hideLoading();
    });
  },
  up(e) {
    var t=this,
        { info }=t.data;
    info.id=info.LUID;
    info.leaseType=4280;
    info.date_start=myDate.getNowDate().str;
    info.date_end=info.date_end.slice(0,10);
    info.models=info.models.map(v=>{
      v.status=0;
      return v;
    })
    req({
            url:`${URL}/updateLeaseInfo.do`,
            header:{
              Cookie:app.globalData.head
            },
            data:info
          }).then(res=>{
            if(res.data.code==4280) {
              toast('上架成功');
              setTimeout(()=>{
                wx.switchTab({url:'../index/index'})
              },2000);
            } else {
              toast(res.data.message);
            }
          }).catch(err=>{
            toast('出现错误，请重试！')
          });
  },
  down(e) {
    var t=this,
        { info }=t.data;
    info.id=info.LUID;
    info.leaseType=4280;
    info.date_start=myDate.getNowDate().str;
    info.date_end=info.date_end.slice(0,10);
    info.models=info.models.map(v=>{
      v.status=-1;
      return v;
    })
    wx.showModal({
      title: '提示',
      content: '您确定下架该设备吗？',
      success: function(res) {
        if (res.confirm) {
          req({
            url:`${URL}/updateLeaseInfo.do`,
            header:{
              Cookie:app.globalData.head
            },
            data:info
          }).then(res=>{
            if(res.data.code==4280) {
              toast('下架成功');
              setTimeout(()=>{
                wx.switchTab({url:'../index/index'})
              },2000);
            } else {
              toast(res.data.message);
            }
          }).catch(err=>{
            toast('出现错误，请重试！')
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  },
  delete(e) {
    var t=this,
        { info }=t.data;
    info.status=-1;
    info.id=info.LUID;
    info.leaseType=4280;
    info.date_start=myDate.getNowDate().str;
    info.date_end=info.date_end.slice(0,10);
    info.models=info.models.map(v=>{
      v.status=-1;
      return v;
    })
    wx.showModal({
      title: '提示',
      content: '您确定删除该设备信息吗？',
      success: function(res) {
        if (res.confirm) {
          req({
            url:`${URL}/updateLeaseInfo.do`,
            header:{
              Cookie:app.globalData.head
            },
            data:info
          }).then(res=>{
            if(res.data.code==4280) {
              toast('删除成功');
              setTimeout(()=>{
                wx.switchTab({url:'../index/index'})
              },2000);
            } else {
              toast(res.data.message);
            }
          }).catch(err=>{
            toast('出现错误，请重试！')
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  changeInputR(e) {
    var type=e.currentTarget.dataset.name||e.target.dataset.name,
        value=e.detail.value,
        {info ,info:{models}}=this.data,
        t=this;
    info.models=info.models.map(v=>{
      v[type]=value;
      return v;
    });
    t.setData({info})

  }
})
