var months1=[31,29,31,30,31,30,31,31,30,31,30,31];
var months=(function() {
	var _i,months=[];
	for(let i=0,len=12;i<len;i++) {
		_i=i+1;
		months[i]={
			name:(_i>=10?_i:('0'+_i))+'月',
			num:_i,
			count:(_i>=10?_i:('0'+_i)),
			sep:months1[i]
		}
	}
	return months
})(),
dates=(function() {
	var _i,dates=[];
	for(let i=0,len=31;i<len;i++) {
		_i=i+1;
		dates[i]={
			name:(_i>=10?_i:('0'+_i))+'日',
			num:_i,
			count:(_i>=10?_i:('0'+_i))
		}
	}
	return dates
})(),
hours=(function() {
	var _i,hours=[];
	for(let i=0,len=24;i<len;i++) {
		_i=i;
		hours[i]={
			name:(_i>=10?_i:('0'+_i))+':00',
			num:_i,
			count:(_i>=10?_i:('0'+_i))
		}
	}
	return hours
})(),
minutes=(function() {
	var _i,minutes=[];
	for(let i=0,len=60;i<len;i++) {
		_i=i;
		minutes[i]={
			name:(_i>=10?_i:('0'+_i))+'分',
			num:_i,
			count:(_i>=10?_i:('0'+_i))
		}
	}
	return minutes
})(),
dateArray=[months,dates,hours],
dateObj={
	dateArray,
	dates
};

var getNowDate=function() {
  var _date=new Date(),
  		year=_date.getFullYear(),
  		month=_date.getMonth()+1,
  		date=_date.getDate(),
  		day=_date.getDay();
  return {
  	year,
  	month:month>=10?month:('0'+month),
  	date:date>=10?date:('0'+date),
  	day,
  	month1:_date.getMonth(),
  	date1:_date.getDate()-1,
  	str:`${year}-${month>=10?month:('0'+month)}-${date>=10?date:('0'+date)}`
  }
},
getWeek=function(date) {
	var time=date.split("-"),
			_time=new Date(time[0],time[1]-1,time[2]).getDay();
	return _time
},
countDate=function(date1,date2) {
	var time1=date1.split("-"),
			time2=date2.split("-"),
			_time1=new Date(time1[0],time1[1]-1,time1[2]).getTime(),
			_time2=new Date(time2[0],time2[1]-1,time2[2]).getTime();
	return (_time1-_time2)/(1000*60*60*24);
};

var myDate={
	getNowDate,
	getWeek,
	countDate
}
 
export {
	myDate,
	dateObj
}


