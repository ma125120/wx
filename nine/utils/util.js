import {dateObj  ,myDate } from './date.js'
var delay=function(fn) {
  setTimeout(()=>{
    fn();
  },1000);
},robot={
  3:'200',
  10:'500',
  25:'1000'
};
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')

  //return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
var req=function(options,fn=wx.request) {
    var options=options||{},url,
        head=wx.getStorageSync('head');
    return new Promise((resolve, reject) => {
      options.success=resolve;
      options.fail=reject;
      options.dataType='json';
      fn(options);
    });
}
var timeToDate=function(timestamp) {
  var _date=new Date(timestamp),
      year=_date.getFullYear(),
      month=_date.getMonth()+1,
      date=_date.getDate(),
      day=_date.getDay(),
      date1=date+1;
  var _month=month>10?month:('0'+month),
      _date=date>10?date:('0'+date);
  return {
    year,
    month:month>10?month:('0'+month),
    date:date>10?date:('0'+date),
    day,
    date1:date1>10?date1:('0'+date1),
    timestamp:Date.now(),
    dateStr:`${year}-${_month}-${_date}`
  }
}
var addDate=function(day) {
  var time1=Date.now(),
      time2=time1+day*24*60*60*1000;
  return timeToDate(time2).dateStr;
}
var toDate=function(data) {
  var obj=data;
  for(let i=0,len=obj.length;i<len;i++) {
    obj[i].times=formatTime(new Date(obj[i].created));
  }
  return obj
}
var toast=function(title='未知错误') {
  wx.showToast({
    title: title,
    duration: 1500
  })
};
var sort=function(array,type,asc) {
    array.sort(function(a,b) {
      if(asc=='asc') {
        return parseFloat(b[type])-parseFloat(a[type]);
      } else {
        return parseFloat(a[type])-parseFloat(b[type]);
      }
    });
};

var checkForm=function(data,...args) {
  var result={},flag=true;
  var reg={
    username:/^\w{4,}$/,
    password:/^\w{4,}$/,
    tel:/^\d{11}$/,
    real_name:/^\w{2,5}$/
  };
  for( let i=0,len=args.length;i<len;i++) {
    let r=args[i].reg||reg[args[i].type];
    if(data[args[i].name]=="") {
      result={
        flag:false,
        msg:'输入不能为空'
      };
      break;
    }
    if(!r.test(data[args[i].name])) {
      result={
        flag:false,
        msg:args[i].msg
      };
      break;
    }
  }
  return result;
};
var filter=function(array,type,value) {
    var arr=[];
    arr=array.filter(function(a) { 
      if(a[type])
      return a[type].toString().indexOf(value)!=-1;
    });
    return arr;
};

var checkSpace=function(data,...args) {
  var space=false;
  if(args.length>0) {
    for(let i=0,len=args.length;i<len;i++) {
      if(data[args[i]]=="") {
        space=true;
        break;
      }
    }
  } else {
    for(let i in data) {
      if(data.hasOwnProperty(i)&&data[i]==""&&data[i]!=0) {
        space=true;
      }
    }
  }
  return space;
}
var timeGOto=function({url,type}) {
  setTimeout(()=>{
    if(!type) {
      wx.navigateTo({
        url:url
      });
    } else {
      wx.switchTab({
        url:url
      });
    }
  },1500);
}
var isObject=function(obj) {
  return Object.prototype.toString.call(obj)=="[object Object]";
}

var formatDevice=function(obj) {
  if(!isObject(obj)) {
    throw new Error("formatDevice传入的数据不是对象!")
  }
  var o=obj;
  if(o.imgs) {
    o.img=o.imgs.split(",")[0];
    o.imgs1=o.imgs.split(",");
  }
  o.dateCount=myDate.countDate(o.date_end,o.date_start)||1;
  if(o.dateCount>100) {
    o.dateCount=1;
  }
  /*起止日期*/
  var dateInfo={
        startDate:o.date_start.slice(0,10).slice(5),
        startDate1:o.date_start.slice(0,10),
        endDate:o.date_end.slice(0,10).slice(5),
        endDate1:o.date_end.slice(0,10),
        dateCount:DateDiff(o.date_end,o.date_start),
        startDay:getWeekDay(o.date_start),
        endDay:getWeekDay(o.date_end),
  };
  o.startTime=0//parseInt(o.date_start.split(" ")[1].split(":")[0]);
  o.endTime=0//parseInt(o.date_end.split(" ")[1].split(":")[0]);
  o.dateInfo=dateInfo;
  o.intro=o.note.slice(0,14)+"...";
  if(typeof o.models=='string') {
    o.models=JSON.parse(o.models);
  }
  if(typeof o.configure=='string') {
    o.configure=JSON.parse(o.configure);
  }
  
  o.models=o.models.map(v=>{
    v.price=parseInt(v.price);
    v.deposit=parseInt(v.deposit);
    return v;
  });
  o.price1=o.models[0].price*0.6;
  o.price2=o.models[0].price;
    o.total=parseInt(o.models[0].price);
    o.total1=parseInt(o.models[0].price)+parseInt(o.models[0].deposit);
    o.total2=parseInt(o.models[0].deposit);
    if(o.type=='无人机') {
      o.km=robot[o.dateCount]||200;
      o.total=parseInt(o.models[0].price)*200;
      o.total1=parseInt(o.models[0].price)*200+parseInt(o.models[0].deposit);
    }
  o.username=o.name;
  
  o.name=o.product+"+"+o.model;
  return o;
}
var DateDiff=function DateDiff(sDate1, sDate2){ //sDate1和sDate2是2002-12-18格式   
      var aDate, oDate1, oDate2, iDays   
      aDate = sDate1.slice(0,10).split("-")   
      oDate1 = new Date(aDate[0],aDate[1],aDate[2]) //转换为12-18-2002格式   
      aDate = sDate2.slice(0,10).split("-")   
      oDate2 = new Date(aDate[0],aDate[1],aDate[2])   
      iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 /24) //把相差的毫秒数转换为天数   
      return iDays   
} 
var getWeekDay=function(date) {
  var s=date.slice(0,10).split("-");
  return new Date(s[1] + '-' + s[2] + '-' + s[0]).getDay()
}
var toast1=function(title) {
  var t=this;
  t.setData({
    toast:true,
    toastTitle:title
  });
  setTimeout(()=>{
    t.setData({
      toast:false
    })
  },1400);
}
var u={
  req,
  filter,
  toast,
  toast1,
  checkSpace,
  checkForm,
  sort,
  toDate,
  timeGOto,
  DateDiff,
  formatDevice,
  addDate,
  delay,
  dateObj,
  myDate,
  weekdays:['星期日','星期一','星期二','星期三','星期四','星期五','星期六',]
}
export default u;

