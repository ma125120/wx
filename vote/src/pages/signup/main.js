$(function() {
	$("img").each(function() {
		var t=$(this);
		if(!t.attr("src")) {
			t.hide();
		}
	});
	var hasTouch=function(){
        var touchObj={};
        touchObj.isSupportTouch = "ontouchend" in document ? true : false;
        touchObj.isEvent=touchObj.isSupportTouch?'touchstart':'click';
        return touchObj.isEvent;
   }
	var isUpload=false,
		u={},
		baseUrl="https://dev.bchltech.cn/",
		form={
			us_pic1:true,
			us_pic2:true,
			us_pic3:true,
			us_name:true,
			us_sex:false,
			us_age:true,
			introduce:true,
			activity_id:false
		},
		up={};
	u.click=hasTouch();
	/*上传图片*/
	function uploadImg(options) {
		var data=options.data,
				name=options.name,
				el=options.el,
				progress1=options.progress;
		progress1.show();
		el.text("正在上传中").attr("class","");
		$.ajax({
				url:'https://dev.bchltech.cn/activity/applyPic.htm',
				data:data,  
        type: 'POST',   
        dataType: 'JSON', 
        xhr:function() {
        	var xhr = $.ajaxSettings.xhr();
        	xhr.upload.addEventListener('progress', function(e) {
        		var num=parseInt((e.loaded/e.total)*100);
        		progress1.attr("value",num);
        		el.text("正在上传中,已完成"+num+"%");
        	}, false);
  				return xhr;//一定要返回，不然jQ没有XHR对象用了
        } , 
        contentType: false,
        processData:false,
        cache:false,
        success:function(json) {
        	if(json.state==0) {
        		var url1=json.data.url1;
        		up[name]=url1;
						el.text("图片上传成功").attr("class","success");
        	} else {
        		alert("图片上传失败").attr("class","fail");
        	}
        	progress1.hide();
        }
		});
	}
	/*获取数据*/
	function getData() {
		up.us_name=$("#us_name1").val();
		up.us_sex=$("[name=us_sex").val();
		up.us_age=$("#us_age1").val();
		up.introduce=$("#introduce1").val();
		up.activity_id=$("#ac_id").val();
		up.us_telephone=$("#tel").val();
		console.log(up)
	}
	/*检查数据是否为空*/
	function checkSpace(data) {
		if(!data.us_telephone||!data.us_pic1||!data.us_pic2||!data.us_pic3||!data.us_name||!data.us_sex||!data.us_age||!data.us_age||!data.introduce||!data.activity_id) {
			return true;
		} else {
			return false;
		}
	}
	/*触发图片选择*/
	// $(document).on(u.click,".file_div,.file_img",function() {
	// 	var id=$(this).data("id");
	// 	$("#"+id).trigger(u.click);
	// });
	/*图片预览*/
	$(document).on("change",".file input",function(e) {
		var t=$(this),file=t[0].files[0],index=t.attr("id").slice(-1); 
	    if(!/image\/\w+/.test(file.type)){  
	        alert("看清楚呦，这个需要图片！");  
	        return false;  
	    }
	    var _data=new FormData(),_name='us_pic'+index;
	    _data.append(_name,file);
	    uploadImg({
	    	data:_data,
	    	name:_name,
	    	el:t.siblings(".comment"),
	    	progress:t.siblings("progress")
	    });
	    var reader = new FileReader();  
	    reader.readAsDataURL(file);  
	    reader.onload=function(e){  
	        var imgEle=t.siblings("img");
	        imgEle.attr("src",this.result).show();
	        t.siblings(".file_div").hide();
	    }   
	});
	/*为空时不进行表单录入*/
	$(document).on(u.click,"#submit",function(e) {
		e.preventDefault();
		getData();
		var age=up.us_age,t=$(this);
		if(!age.match(/^(\d){1,3}$/g)) {
			alert("年龄必须为数字");
			return false;
		} else if(parseInt(age)<=0||parseInt(age)>110) {
			alert("年龄大小填写不合法！");
			return false;
		} else if(up.us_telephone.length!=11) {
			alert("联系电话填写不合法！");
			return false;
		}
 		if(!isUpload) {
 			t.addClass("gray");
			var flag=checkSpace(up);
			if(flag) {
				alert("请检查您的输入是否为空!");
				return false;
			}
			$.ajax({
				url:'https://dev.bchltech.cn/activity/applyForm.htm',
				data:up,  
        type: 'POST',   
        dataType: 'JSON',   
        success:function(json) {
        	if(json.state==0) {
        		alert("报名成功");
        		$("form")[0].reset();
        		$(".file_img").attr("src","");
        		$(".file_div").show();
        		$("img").each(function() {
							var t=$(this);
							if(!t.attr("src")) {
								t.hide();
							}
						});
						$(".comment,.success").text('图片未选择').attr("class","comment hide");
						$("progress").hide();
        	} else {
        		alert("报名失败");
        	}
        	t.removeClass("gray");
        },
        fail:function(err) {
        	alert("报名失败");
        	t.removeClass("gray");
        }
			});
			return false;
		} else {
			return false;
		}
	});

	/*获取活动id*/
	$.getJSON("https://dev.bchltech.cn/activity/getac.htm",function(res) {
		var lists=res.data.activityList,
				str="";
		for(var i=0,len=lists.length;i<len;i++) {
			if(i==0) {
				str+="<option value='"+lists[i]._id+"' selected>"+lists[i].ac_title+"</option>"
			} else {
				str+="<option value='"+lists[i]._id+"'>"+lists[i].ac_title+"</option>";
			}
		}
		$("#ac_id").empty().append(str);
	})
});