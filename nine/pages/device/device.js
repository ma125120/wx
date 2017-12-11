var app=getApp();
var {u,baseURL:URL, orders }=app,
    { req ,toast , timeGoto ,formatDevice ,addDate ,dateObj ,myDate  }=u;
Page({
  data: {
    headpics:[0,1,2],
    numArray:[0,1,2,3,4,5,6,7,8,9,10],
    isIntro:false,
    isConfig:false,
    info:null,
    config:null,
    start:[0,0,0,0],
    end:[0,0,0,0],
		startDate1:'',
		endDate1:'',
    dateCount:0,
    startTime:'',
    startDay:'',
    endTime:'',
    endDay:'',
    nowDate:null,
    contact:null,
    num:1,
    num1:0,
    num2:0,
    total:0,
    price:0,
    deposit:0,
    km:200,
    wayCode:4280,
    addr_pickup:'',
    addr_giveback:'',
    dates:[{
      name:'200公里',
      count:200,
      dateCount:3
    },{
      name:'500公里',
      count:500,
      dateCount:10
    },{
      name:'1000公里',
      count:1000,
      dateCount:25
    },],
    getWay:'',
    weekdays:[]
  },
  onLoad: function (options) {
  	var t=this,
  			{LUID}=options;
  	t.getInfo(LUID);
    var nowDate=myDate.getNowDate(),
        dateArr=dateObj.dateArray.slice(0),
        contact={
          name:app.globalData.RealNameInfo.name,
          phone:app.globalData.localTel,
          addr_pickup:app.globalData.address.formatted_address
        };
    dateArr[1]=dateObj.dateArray[1].slice(0,dateObj.dateArray[0][nowDate.month1].sep);
    t.setData({ 
      nowDate ,
      dateArray:dateArr,
      dateObj,
      weekdays:u.weekdays,
      contact
    });

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
      info.models=res.data.models.map(v=>{
        v.price=parseInt(v.price);
        v.deposit=parseInt(v.deposit);
        return v;
      });
  		t.setData({
  			info:info,
  		});
      if(info.models[1]) {
        t.setData({
          num1:0,//info.models[1].num,
          num2:0//info.models[2].num
        });
      }
      t.initDate();
      t.countMoney();
      wx.hideLoading();
  	})
  },
  changeKm(e) {
    var index=e.detail.value,
        t=this,
        { dates ,km } = t.data,
        dateCount;
    dateCount=dates[index].dateCount;
    km=dates[index].count;
    t.setData({ dateCount, km  });
    t.countMoney();
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
    if(start[0]<nowDate.month1&&start[0]==0) {
      nowDate.year=nowDate.year+1;
    }
    startDate1=`${nowDate.year}-${dateObj.dateArray[0][start[0]].count}-${dateObj.dateArray[1][start[1]].count}`;
    if(end[0]<nowDate.month1&&end[0]==0) {
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
    });
    t.countMoney();
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
      start:[dateInfo.startDate1.split("-")[1]-1,dateInfo.startDate1.split("-")[2]-1,info.startTime],
      end:[dateInfo.endDate1.split("-")[1]-1,dateInfo.endDate1.split("-")[2]-1,info.endTime]
    });
    if(info.type=='无人机') {
      this.setData({
        dateCount:3
      });
    }
  },
  createOrder() {
  	var t=this,
  	{info , contact }=t.data,
    leases=[];
    if(app.globalData.usercode!=4280) {
      toast("尚未注册");
      setTimeout(()=>{
        wx.navigateTo({
          url: '../tip/tip'
        });
      },1500);
      return false;
    } else if(!app.globalData.isRealName) {
      toast('尚未完成实名认证');
      setTimeout(()=>{
        wx.navigateTo({url:'../tip/tip'});
      },1500);
      return false;
    }
    if(!t.data.wayCode) {
      toast("必须选择取货方式");
      return false;
    }

    if(t.data.getWay=='send'&&!t.data.contact) {
      toast("必须选择地址");
      return false;
    }
    var data={
  		LUID:info.LUID,
  		LMUID:info.models[0].id,
  		date_start:t.data.startDate1,
  		date_end:t.data.endDate1,
  		num:t.data.num||1,
      // pickup:t.data.contact.addr_pickup,
      // giveback:t.data.contact.addr_pickup,
      // name:t.data.contact.name,
      // phone:t.data.contact.phone,
      model_pickup:t.data.wayCode,
      date_pickup:t.data.startDate1,
      date_giveback:t.data.endDate1,
      days:t.data.dateCount,
      name:contact.name,
      phone:contact.phone
  	};
    if(t.data.getWay=='send') {
      data.pickup=contact.addr_pickup;
      data.giveback=contact.addr_pickup;
      // data.name=contact.name;
      // data.phone=contact.phone;
    } else {
      data.phone=app.globalData.localTel;
    }
    if(info.type=='无人机') {
      data.date_end=addDate(t.data.dateCount);
    }
    leases[0]=data;
    if(info.models[1]) {
      leases[0].num=t.data.num1;
      leases[1]={
        LUID:info.LUID,
        LMUID:info.models[1].id,
        date_start:data.date_start,
        date_end:data.date_end,
        num:t.data.num2||1,
        // pickup:t.data.contact.addr_pickup,
        // giveback:t.data.contact.addr_pickup,
        // name:t.data.contact.name,
        // phone:t.data.contact.phone,
        model_pickup:t.data.wayCode,
        date_pickup:t.data.startDate1,
        date_giveback:t.data.endDate1,
        days:t.data.dateCount,
        name:contact.name,
        phone:contact.phone
      };
      if(t.data.getWay=='send') {
        leases[1].pickup=contact.addr_pickup;
        leases[1].giveback=contact.addr_pickup;
      }
    }
    if(leases[0].num>0) {
      req({
        url:`${URL}createOrder.do`,
        header:{
          Cookie:app.globalData.head
        },
        data:{leases}
      }).then(res=>{
        if(res.data.code==4280) {
          var _id=res.data.data;
          toast('提交订单成功');
          app.globalData.ordering={
            info:info,
            leases:leases,
            num:t.data.num,
            num1:t.data.num1||0,
            num2:t.data.num2||0,
            dateCount:t.data.dateCount,
            km:t.data.km
          };
          setTimeout(()=>{
            wx.navigateTo({url:`../pay/pay?id=${_id}`})
          },1500);
        } else if(res.data.code==4288) {
          toast('日期选择不正确');
        } else {
          toast(res.data.message);
        }
        t.setData({ disable:false });
      }).catch(err=>{
        toast("订单提交失败");
        t.setData({ disable:false });
      })
    } else {
      toast("数量至少为1");
    }
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
      num:parseInt(num)
    });
    t.countMoney();
  },
  changeNum1(e) {
    var t=this,
        num=e.detail.value;
    t.setData({
      num1:parseInt(num)
    });
    t.countMoney();
  },
  changeNum2(e) {
    var t=this,num=e.detail.value;
    t.setData({
      num2:parseInt(num)
    });
    t.countMoney();
  },
  countMoney() {
    var t=this,
        {info:{models},num,num1,num2,dateCount,info , km }=t.data,
        total=0,
        price=0,
        deposit=0;
    total=parseInt(models[0].price)*dateCount*num*1.1+parseInt(models[0].deposit);
    price=parseInt(models[0].price)*num*dateCount;
    deposit=parseInt(models[0].deposit);
    if(models[1]) {
      deposit=0;
      price=parseInt(models[0].price)*(num1+num2)*dateCount;
      if(num1>0) {
        deposit=deposit+parseInt(models[0].deposit)
      }
      if(num2>0) {
        deposit=deposit+parseInt(models[1].deposit)
      }
      //deposit=parseInt(models[0].deposit)+parseInt(models[1].deposit);
      total=price*1.1+deposit;
    }
    if(info.type=='无人机') {
      total=parseInt(models[0].price)*km*num*1.1+parseInt(models[0].deposit);
      price=parseInt(models[0].price)*km*num;
    }
    t.setData({
      total:total.toFixed(2),
      price,
      deposit
    });     
  },
  addCart() {
    var t=this,
        { num , info ,num1 ,num2 ,dateCount }=t.data;
    if(app.globalData.usercode!=4280) {
      toast("尚未注册");
      setTimeout(()=>{
        wx.navigateTo({
          url: '../tip/tip'
        });
      },1500);
      return false;
    } else if(!app.globalData.isRealName) {
      toast('尚未完成实名认证');
      setTimeout(()=>{
        wx.navigateTo({url:'../tip/tip'});
      },1500);
      return false;
    }
    var data1={
      LUID:info.LUID,
      MUID:info.models[0].id,
      num:num,
      days:dateCount
    },data2=null,data3=null;
    if(info.models[1]) {
      data1.num=t.data.num1;
    }
    if(data1.num>0) {
      t.uploadCart(data1,'asd');
    } else {
      toast("数量至少为1");
      return false;
    }
    if(info.models[1]) {
      data2={
        LUID:info.LUID,
        MUID:info.models[1].id,
        num:num1,
        dateCount:dateCount
      };

      setTimeout(()=>{
        if(data2.num>0) {
          t.uploadCart(data2);
        }
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
      toast(res.data.message);
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
  },
  changeColumn(e) {
    var { column , value } =e.detail,
        t=this,
        {dateArray,start,end}=t.data;
    if(column==0) {
      dateArray[1]=dateObj.dateArray[1].slice(0,dateObj.dateArray[0][value].sep);
      t.setData({dateArray})
    }
  },
  chooseAddr:function() {
    var t=this;
    wx.chooseAddress({
      success: function (res) {
        t.setData({
          contact:{
            phone:res.telNumber,
            name:res.userName,
            addr_pickup:`${res.provinceName}${res.cityName}${res.countyName}${res.detailInfo}`
          }
        });
      }
    });
  },
  changeGetWay(e) {
    var way=e.currentTarget.dataset.type||e.target.dataset.type,
        t=this,
        flag=false,
        { contact } = t.data,
        wayCode;
    if(way=='send') {
      flag=true;
      wayCode=4281;
      if(!contact) {
        t.chooseAddr();
      }
    } else {
      wayCode=4280;
    }
    t.setData({
      getWay:way,
      sendFlag:flag,
      wayCode
    })
  },
})
