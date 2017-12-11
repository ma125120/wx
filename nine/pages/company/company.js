var app=getApp();
var {u,baseURL:URL , upPic }=app,
    { req ,toast , timeGoto }=u,
    imgs=[];
var getImgInfo=function(obj) {
  	return Object.assign({},obj,app.globalData.uploadInfo);
};
Page({
  data: {
    picPath1:'',
    picPath2:'',
    picPath3:'',
    picPath4:'',
    disable:false,
    sendData:null,
    addr:'',
    companyInfo:null
  },
  onLoad: function (options) {
  	var t=this;
  	t.setData({
  		disable:app.globalData.isCompany
  	});
    app.getLogin();
    t.initForm();
  },
  initForm() {
    var t=this,
        { companyInfo } =app.globalData;
    t.setData({
      companyInfo
    })
  },
  uploadImg({index}) {
  	var t=this;
  	var options=getImgInfo({filePath : t.data["picPath"+index] });
  	req(options,upPic)
  	.then(res=>{
  		imgs[index]=res;
  		index=index+1;
  		if(index<3) {
  			t.uploadImg({index:index});
  		} else {
  			t.sendForm();
  		}
  	}).catch(err=>{
			toast("图片上传失败");
  		t.setData({ disable:false });
  	});
  },
  send_form(e) {
  	var t=this,
        data=e.detail.value;
    data.addr=t.data.addr;
    if(!data.name||!t.data.addr||!data.industry||!data.occupation) {
      toast("输入不能为空");
      return false;
    }
  	this.setData({ disable:true,sendData:data });
  	t.uploadImg({
  		index:1
  	})
  },
  sendForm() {
  	var t=this,
        {sendData}=t.data;
    sendData.qualifications=imgs[2];
    sendData.license=imgs[1];
  	// var data={
  	// 	license:imgs[1],
  	// 	qualifications1:imgs[2],
  	// 	qualifications2:imgs[3],
  	// 	qualifications3:imgs[4]
  	// };
  			req({
  				url:`${URL}uploadCompany.do`,
  				header:{
		        Cookie:app.globalData.head
		      },
		      data:sendData
  			}).then(res=>{
  				if(res.data.code==4280) {
  					toast("公司信息上传成功");
            app.globalData.isCompany=true;
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
  changeCity(e) {
    var addr=e.detail.value.join("");
    this.setData({
      addr
    })
  }
})
