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
    isRealName:app.globalData.isRealName,
    RealNameInfo:null
  },
  onLoad: function (options) {
  	var t=this;
  	if(app.globalData.usercode!=4280) {
  		t.setData({
  			isRegeist:false,
  			isRealName:app.globalData.isRealName
  		});
  	} else {
  		t.setData({
  			isRegeist:true,
  			isRealName:app.globalData.isRealName
  		});
      t.initForm();
  	}
  },
  initForm() {
    var t=this,
        { RealNameInfo } =app.globalData;
    t.setData({
      RealNameInfo
    })
  },
  chooseImg:function(e) {
    var t=this,
        i=e.target.dataset.i||e.currentTarget.dataset.i;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePath = res.tempFilePaths[0];
        t.setData({
          ['picPath'+i]:tempFilePath
        });
      }
    })
  },
  send_form(e) {
  	var data=e.detail.value,t=this;
  	data.ID_FRONT='';
  	data.ID_BACK='';
  	var r=checkForm(data,{
      name:'ID_CODE',
      reg:/^\d{18}$/,
      msg:'身份证号格式不符'
    });
    if(r.msg) {
      toast(r.msg);
      return false;
    }
    t.setData({ isRealName:true });

    req(getImgInfo({
    	filePath:t.data.picPath1
    }),upPic).then(res=>{
      if(res) {
        data.ID_FRONT=res;
        return req(getImgInfo({
                	filePath: t.data.picPath2,
              	}),upPic);
      } else {
        toast("图片上传失败，请重试！");
        t.setData({ disable:false });
      }
    }).then(res=>{
    	if(res) {
    		data.ID_BACK=res;
    		return req({
    			url:`${URL}uploadRealName.do`,
    			data:data,
		  		header:{
		        Cookie:app.globalData.head
		      },
    		})
    	} else {
    		toast("图片上传失败，请重试！");
        t.setData({ isRealName:false });
    	}
    }).then(res=>{
    	console.log(res.data)
    	if(res&&res.data.code==4280) {
    		toast('信息完善成功');
        app.globalData.isRealName=true;
    		setTimeout(()=>{
    			wx.switchTab({url:'../my/my'})
    		},1500);
    	} else if(res) {
    		toast(res.data.message);
    	}
    	t.setData({ isRealName:false });
    }).catch(err=>{
    	toast("上传错误");
    	t.setData({ isRealName:false });
    })
  }
})
