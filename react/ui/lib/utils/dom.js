"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var domUtil = {

	//获取元素的纵坐标（相对于窗口）
	getTop: function getTop(e) {
		var offset = e.offsetTop;
		if (e.offsetParent != null) offset += domUtil.getTop(e.offsetParent);
		return offset;
	},

	//获取元素的横坐标（相对于窗口）
	getLeft: function getLeft(e) {
		var offset = e.offsetLeft;
		if (e.offsetParent != null) offset += domUtil.getLeft(e.offsetParent);
		return offset;
	},

	probTouch: function probTouch(e) {
		return 'ontouchend' in document;
	}
};

exports["default"] = domUtil;
module.exports = exports["default"];