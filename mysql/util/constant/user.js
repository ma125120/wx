const SUCCESS={
	code:4000,
	msg:'请求成功'
},USERNAME_OR_PWD_ERROR={
	code:4001,
	msg:'用户名或者密码错误'
},USERNAME_HAS_EXIST={
	code:4002,
	msg:'用户名已存在'
},USERNAME_EMPTY={
	code:4003,
	msg:'用户名为空'
},PWD_EMPTY={
	code:4004,
	msg:'密码为空'
},REGIST_FAIL={
	code:4005,
	msg:'注册失败'
}

module.exports={
	SUCCESS,
	USERNAME_OR_PWD_ERROR,
	USERNAME_HAS_EXIST,
	USERNAME_EMPTY,
	PWD_EMPTY,
	REGIST_FAIL
}