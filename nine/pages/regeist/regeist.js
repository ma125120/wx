var app=getApp();
var {u,baseURL:URL , upPic }=app,
    { req ,toast , timeGoto ,checkForm }=u;
var getImgInfo=function(obj) {
  	return Object.assign({},obj,app.globalData.uploadInfo);
};
Page({
  data: {
    num:'获取验证码',
    send:false,
    _num:60,
    _tId:'',
    getCode:false,
    disable:false,
    picPath1:'',
    picPath2:'',
    isRegeist:false,
    isRealName:app.globalData.isRealName
  },
  onLoad: function (options) {
  	var t=this;

  },
  setTel(e) {
    var tel=e.detail.value;
    this.setData({tel});
  },
  getCode() {
    var t=this,tel=t.data.tel,
        _num=t.data._num,_tId=t.data._tId;
    t.setData({getCode:true});
    if(!/^\d{11}$/.test(tel)) {
      toast('手机号格式不符合！');
      return false;
    }
    if(_num==60) {
      _tId=setInterval(()=>{
        if(_num<=0) {
          t.setData({num:`重新发送`,send:false,_tId,_num:60});
          clearInterval(_tId);
        } else {
          t.setData({num:`${_num}秒后可重试`,send:true,_tId,_num});
          _num=_num-1;
        }
      },1000);
    }
    if(_num==60) {
      req({
        url:`${URL}sendMsgCode.do?phone=${tel}&type=4280`,
	  		header:{
	        Cookie:app.globalData.head
	      }
      }).then(res=>{
        if(res.data.code!=4280) {
        	toast(res.data.message)
        }
      });
    }
  },
  nextBtn(e) {
  	var data=e.detail.value,t=this;
  	if(!data.phone||!data.msgCode) {
  		toast("手机号和验证码不能为空");
  		return false;
  	}
  	wx.request({
  		url:`${URL}wxregist.do`,
  		data:data,
  		header:{
        Cookie:app.globalData.head
      },
      dataType:'json',
      success(res) {
      	if(res.data.code==4280) {
		  		app.globalData.usercode=4280;
		  		wx.redirectTo({
		  			url:'../info/info'
		  		});
	  		} else {
	  			toast(res.data.message);
	  		}
      },
      fail(err) {
      	toast('请求发送失败');
      }
  	});
  },
})
