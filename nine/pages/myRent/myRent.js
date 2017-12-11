var app=getApp();
var {u,baseURL:URL, orders }=app,
    { req ,toast , timeGoto ,formatDevice ,addDate }=u;
Page({
  data: {
    headpics:[0,1,2],
    isIntro:false,
    isConfig:false,
    info:null,
    config:null,
    startDate:'',
		startDate1:'',
    endDate:'',
		endDate1:'',
    dateCount:0,
    startTime:'',
    startDay:'',
    endTime:'',
    endDay:'',
    nowDate:null,
    num:1,
    num1:1,
    num2:1,
    total:0,
    price:0,
    deposit:0,
    dates:[{
      name:'200公里',
      count:200
    },{
      name:'500公里',
      count:500
    },{
      name:'1000公里',
      count:1000
    },],
    getWay:'',
    weekdays:['星期一','星期二','星期三','星期四','星期五','星期六','星期日']
  },
  onLoad: function (options) {
  	var t=this,
  			{LUID}=options;
  	t.getInfo(LUID);

  	var nowDate=(function() {
  		var _date=new Date(),
  				year=_date.getFullYear(),
  				month=_date.getMonth()+1,
  				date=_date.getDate(),
  				day=_date.getDay(),
          date1=date+1;
  		return {
  			year,
  			month:month>10?month:('0'+month),
  			date:date>10?date:('0'+date),
  			day,
        date1:date1>10?date1:('0'+date1),
        timestamp:Date.now()
  		}
  	})();
  	t.setData({ nowDate });

  	//t.initDate();
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
  		t.setData({
  			info:info,
  		});
      if(info.models[1]) {
        t.setData({
          num1:info.models[1].num,
          num2:info.models[2].num
        });
      }
      t.initDate();
      t.countMoney();
      wx.hideLoading();
  	})
  },
  checkDate(date,type) {
  	var t=this;
  	var flag=t.isVailate(date),count=0,weekday;
    var DateDiff=function DateDiff(sDate1, sDate2){ //sDate1和sDate2是2002-12-18格式   
      var aDate, oDate1, oDate2, iDays   
      aDate = sDate1.slice(0,10).split("-")   
      oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) //转换为12-18-2002格式   
      aDate = sDate2.slice(0,10).split("-")   
      oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])   
      iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 /24) //把相差的毫秒数转换为天数   
      return iDays   
    } 
  	if(flag) {
  		var {startDate1,endDate1}=t.data;
  		if(type=='start') {
  			if(endDate1.split("-").join("")<date.split("-").join("")) {
  				return {
  					msg:'归还日期不得小于租赁日期'
  				}
  			}
  			count=DateDiff(endDate1,date);//new Date(new Date(endDate1)-new Date(date)).getDate()-1;
  			weekday=new Date(date).getDay();
  			t.setData({ startDay : weekday });
  		} else {
  			if(date.split("-").join("")<startDate1.split("-").join("")) {
  				return {
  					msg:'归还日期不得小于租赁日期'
  				}
  			}
  			count=DateDiff(date,startDate1);//new Date(new Date(date)-new Date(startDate1)).getDate()-1;
  			weekday=new Date(date).getDay();
  			t.setData({ endDay : weekday });
  		}
  		t.setData({ dateCount: count||0 });
      t.countMoney();
  	} else {
  		return {
  			msg:'选择的时间不得小于当前时间'
  		}
  	}
  },
  isVailate(date) {
  	var arr=date.split("-"),
  			year1=arr[0],
  			month1=arr[1],
  			date1=arr[2],
  			{ nowDate }=this.data;
  	if(year1>nowDate.year) {
  		return true;
  	} else if(year1==nowDate.year) {
  		if(month1>nowDate.month) {
  			return true;
  		} else if(month1==nowDate.month) {
  			if(date1>=nowDate.date) {
  				return true;
  			} else {
  				return false;
  			}
  		} else {
  			return false;
  		}
  	} else {
  		return false;
  	}
  },
  changeDate(e) {
  	var startDate=e.detail.value.toString();
  	var msg=this.checkDate(startDate,'start');
  	if(msg) {
  		toast(msg.msg);
  		return false;
  	}
  	this.setData({
  		startDate:startDate.slice(5),
  		startDate1:startDate
  	});
  },
  changeTime(e) {
  	var startTime=e.detail.value.toString();
  	this.setData({
  		startTime
  	});
  },
  changeDate1(e) {
  	var endDate=e.detail.value.toString(),
  			startDate=this.data.startDate;
  	var msg=this.checkDate(endDate,'end');
  	if(msg) {
  		toast(msg.msg);
  		return false;
  	}
  	this.setData({
  		endDate1:endDate,
  		endDate:endDate.slice(5)
  	});
  },
  changeTime1(e) {
  	var endTime=e.detail.value.toString();
  	this.setData({
  		endTime
  	});
  },
  initDate() {
    var t=this,
    {nowDate,info}=t.data;
    t.setData({
      startDate:`${nowDate.month}-${nowDate.date}`,
      startDate1:`${nowDate.year}-${nowDate.month}-${nowDate.date}`,
      endDate:`${nowDate.month}-${nowDate.date}`,
      endDate1:`${nowDate.year}-${nowDate.month}-${nowDate.date}`,
      dateCount:1,
      startTime:'00:00',
      startDay:`${nowDate.day}`,
      endTime:'23:59',
      endDay:`${(nowDate.day)}`,
      types:app.globalData.types
    });
    if(info.type=='无人机') {
      this.setData({
        dateCount:200
      });
    }
  },
  // initDate() {
  // 	var t=this,
  // 	{nowDate,info:{dateInfo}}=t.data;
  // 	t.setData({
  // 		startDate:dateInfo.startDate,
		// 	startDate1:dateInfo.startDate1,
	 //    endDate:dateInfo.endDate,
		// 	endDate1:dateInfo.endDate1,
	 //    dateCount:dateInfo.dateCount,
	 //    startTime:'12:00',
	 //    startDay:dateInfo.startDay,
	 //    endTime:'12:00',
	 //    endDay:dateInfo.endDay,
	 //    types:app.globalData.types
  // 	})
  // },
  createOrder() {
  	var t=this,
  	info=t.data.info,
    leases=[],
  	data={
  		LUID:info.LUID,
  		id:info.models[0].id,
  		date_start:t.data.startDate1,
  		date_end:t.data.endDate1,
  		num:t.data.num||1
  	};
    if(info.type=='无人机') {
      data.date_end=addDate(t.data.dateCount);
    }
    leases[0]=data;
    if(info.models[1]) {
      leases[1]={
        LUID:info.LUID,
        id:info.models[1].id,
        date_start:data.date_start,
        date_end:data.date_end,
        num:t.data.num1||1
      };
      leases[2]={
        LUID:info.LUID,
        id:info.models[2].id,
        date_start:data.date_start,
        date_end:data.date_end,
        num:t.data.num2||1
      };
    }
  	req({
  		url:`${URL}createOrder.do`,
  		header:{
		    Cookie:app.globalData.head
		  },
		  data:{leases}
  	}).then(res=>{
  		if(res.data.code==4280) {
  			toast('提交订单成功');
        app.globalData.ordering={
          info:info,
          leases:leases,
          num:t.data.num,
          num1:t.data.num1||0,
          num2:t.data.num2||0,
          dateCount:t.data.dateCount
        };
  			setTimeout(()=>{
		    	wx.navigateTo({url:'../pay/pay'})
		   	},1500);
  		} else {
  			toast(res.data.message);
  		}
      t.setData({ disable:false });
  	}).catch(err=>{
  		toast("订单提交失败");
  		t.setData({ disable:false });
  	})
  },
  display(e) {
    var type=e.target.dataset.type||e.currentTarget.dataset.type,
        t=this;
    t.setData({
      [type]:!t.data[type]
    })
  },
  changeNum(e) {
    var t=this,num=e.detail.value;
    t.setData({
      num
    });
    t.countMoney();
  },
  changeNum1(e) {
    var t=this,num=e.detail.value;
    t.setData({
      num1:num
    });
    t.countMoney();
  },
  changeNum2(e) {
    var t=this,num=e.detail.value;
    t.setData({
      num2:num
    });
    t.countMoney();
  },
  countMoney() {
    var t=this,
        {info:{models},num,num1,num2,dateCount}=t.data,
        total=0,
        price=0,
        deposit=0;
    total=parseInt(models[0].price)*dateCount*num+parseInt(models[0].deposit);
    price=parseInt(models[0].price)*num//*dateCount*num;
    deposit=parseInt(models[0].deposit);
    if(models[1]) {
      total=total+parseInt(models[1].price)*dateCount*num1+parseInt(models[1].deposit)
          +parseInt(models[2].price)*dateCount*num2+parseInt(models[2].deposit);
      price=price+parseInt(models[1].price)*num1+parseInt(models[2].price)*num2;
      deposit=deposit+parseInt(models[1].deposit)+parseInt(models[2].deposit);
    }
    t.setData({
      total:total,
      price,
      deposit
    });
          
  },
  addCart() {
    var t=this,
        { num , info ,num1 ,num2 }=t.data;
    var data1={
      LUID:info.LUID,
      MUID:info.models[0].id,
      num:num
    },data2=null,data3=null;
    t.uploadCart(data1,'asd');
    if(info.models[1]) {
      data2={
        LUID:info.LUID,
        MUID:info.models[1].id,
        num:num1
      };
      data3={
        LUID:info.LUID,
        MUID:info.models[2].id,
        num:num2
      };
      setTimeout(()=>{
        t.uploadCart(data2);
      },30);
      setTimeout(()=>{
        t.uploadCart(data3);
      },60);
    } 
  },
  uploadCart(data,type) {
    var t=this;
    req({
      url:`${URL}addTrolley.do`,
      header:{
        Cookie:app.globalData.head
      },
      data:data
    }).then(res=>{
      if(res&&res.data.code==4280) {
        type&&toast('提交购物车请求成功');
      } else if(res) {
        toast(res.data.message);
      }
      t.setData({ isRealName:false });
    }).catch(err=>{
      toast("提交购物车请求失败");
      t.setData({ isRealName:false });
    });
  },
  changeDateCount(e) {
    var i=e.detail.value,t=this,
        { dates }=t.data,
        dateCount=dates[i].count;
    t.setData({ dateCount });
    t.countMoney();
  },
  changeGetWay(e) {
    var way=e.currentTarget.dataset.type||e.target.dataset.type,
        t=this;
    t.setData({
      getWay:way
    })
  }
})
