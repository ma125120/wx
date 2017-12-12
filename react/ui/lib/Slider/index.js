'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _utilsDom = require('../utils/dom');

var _utilsDom2 = _interopRequireDefault(_utilsDom);

var Slider = (function (_Component) {
	_inherits(Slider, _Component);

	function Slider(props) {
		_classCallCheck(this, Slider);

		_get(Object.getPrototypeOf(Slider.prototype), 'constructor', this).call(this, props);
		var HandleAmount = this.props.HandleAmount;

		var states = {},
		    prevXs = {},
		    i = 0;
		while (i < HandleAmount) {
			states['currentValue' + i] = 0;
			i++;
		}
		this.state = states;

		this.onHandleDown = this.onHandleDown.bind(this);
		this.onHandleMove = this.onHandleMove.bind(this);
		this.onHandleUp = this.onHandleUp.bind(this);
		this.clickhandler = this.clickhandler.bind(this);

		this.draggingPayload = {
			isDragging: false,
			prevX: 0,
			isThreshhold: false, // 是否到达阈值
			handleMove: undefined, //记录匿名函数的指针
			handleUp: undefined };
	}

	_createClass(Slider, [{
		key: 'componentDidMount',
		//记录匿名函数的指针
		value: function componentDidMount() {
			var _this = this;

			setTimeout(function () {
				var _props = _this.props;
				var min = _props.min;
				var max = _props.max;
				var HandleAmount = _props.HandleAmount;
				var defaultValue = _props.defaultValue;

				var states = {},
				    i = 0;
				var dv = _this.isArray(defaultValue) ? defaultValue : [defaultValue];

				while (i < HandleAmount) {
					if (dv[i] === undefined) dv[i] = min;
					states['currentValue' + i] = _this.validateDefault(dv[i], min, max);
					i++;
				}
				_this.setState(states);
			}, 0);

			this.offsetLeft = _utilsDom2['default'].getLeft(this.refs.sliderBody);
			this.isTouchSuported = _utilsDom2['default'].probTouch();
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var _this2 = this;

			setTimeout(function () {
				var min = nextProps.min;
				var max = nextProps.max;
				var HandleAmount = nextProps.HandleAmount;
				var defaultValue = nextProps.defaultValue;

				var states = {},
				    i = 0;
				var dv = _this2.isArray(defaultValue) ? defaultValue : [defaultValue];

				while (i < HandleAmount) {
					if (dv[i] === undefined) dv[i] = min;
					states['currentValue' + i] = _this2.validateDefault(dv[i], min, max);
					i++;
				}
				_this2.setState(states);
			}, 0);
		}
	}, {
		key: 'onHandleDown',
		value: function onHandleDown(i) {
			var _this3 = this;

			return function (e) {
				e.stopPropagation();
				e.preventDefault();
				var addBodyListener = document.body.addEventListener.bind(document.body);

				_this3.draggingPayload.handleMove = _this3.onHandleMove(i);
				_this3.draggingPayload.handleUp = _this3.onHandleUp(i);

				if (!_this3.isTouchSuported) {
					addBodyListener('mousemove', _this3.draggingPayload.handleMove, false);
					addBodyListener('mouseup', _this3.draggingPayload.handleUp, false);
				} else {
					addBodyListener('touchmove', _this3.draggingPayload.handleMove, false);
					addBodyListener('touchend', _this3.draggingPayload.handleUp, false);
				}
				// 移除初始化时的transition效果，否则会影响slider的推动
				_this3.removeTransition = true;
				_this3.draggingPayload.isDragging = true;
				_this3.draggingPayload.prevX = _this3.isTouchSuported ? e.touches[0].clientX : e.clientX;
			};
		}
	}, {
		key: 'onHandleMove',
		value: function onHandleMove(i) {
			var _this4 = this;

			return function (e) {
				e.stopPropagation();
				e.preventDefault();
				if (_this4.draggingPayload.isDragging) {
					var _props2 = _this4.props;
					var min = _props2.min;
					var max = _props2.max;
					var step = _props2.step;
					var styleWidth = _props2.styleWidth;
					var getValue = _props2.getValue;
					var isPass = _props2.isPass;

					var mouseMovedDist = (_this4.isTouchSuported && e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX) - _this4.draggingPayload.prevX;

					var percent = mouseMovedDist / (styleWidth || 200);
					var value = percent * (max - min);
					if (Math.abs(value) >= step) {
						//寻找最接近value的step倍数
						var closestStepToValue = Math.round(value / step) * step;
						var newValue = _this4.state['currentValue' + i] + closestStepToValue;

						if (!isPass && _this4.isHandleMeet(i, newValue)) return;

						_this4.draggingPayload.prevX = _this4.isTouchSuported && e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX;
						if (newValue <= max && newValue >= min) {
							getValue && getValue(newValue, i);
							_this4.draggingPayload.isThreshhold = false;
							_this4.setState(_defineProperty({}, 'currentValue' + i, newValue));
						} else if (newValue > max && !_this4.draggingPayload.isThreshhold) {
							getValue && getValue(max, i);
							_this4.draggingPayload.isThreshhold = true;
							_this4.setState(_defineProperty({}, 'currentValue' + i, max));
						} else if (newValue < min && !_this4.draggingPayload.isThreshhold) {
							getValue && getValue(min, i);
							_this4.draggingPayload.isThreshhold = true;
							_this4.setState(_defineProperty({}, 'currentValue' + i, min));
						}
					}
				}
			};
		}
	}, {
		key: 'onHandleUp',
		value: function onHandleUp(i) {
			var _this5 = this;

			return function (e) {
				e.stopPropagation();
				e.preventDefault();
				var removeBodyListener = document.body.removeEventListener.bind(document.body);

				if (!_this5.isTouchSuported) {
					removeBodyListener('mousemove', _this5.draggingPayload.handleMove, false);
					removeBodyListener('mouseup', _this5.draggingPayload.handleUp, false);
				} else {
					removeBodyListener('touchmove', _this5.draggingPayload.handleMove, false);
					removeBodyListener('touchend', _this5.draggingPayload.handleUp, false);
				}
				//fix ‘click event triggered after mouseup’ bug
				setTimeout(function () {
					_this5.draggingPayload.isDragging = false;
				}, 0);
			};
		}
	}, {
		key: 'clickhandler',
		value: function clickhandler(e) {
			e.stopPropagation();
			e.preventDefault();
			if (this.draggingPayload.isDragging) return;

			this.removeTransition = false;
			var _props3 = this.props;
			var min = _props3.min;
			var max = _props3.max;
			var step = _props3.step;
			var styleWidth = _props3.styleWidth;
			var getValue = _props3.getValue;

			//此处用pageX,兼容有x轴滚动条的情况
			var mouseLeft = e.pageX - this.offsetLeft;
			if (mouseLeft < 0 || mouseLeft > (styleWidth || 200)) return;
			var percent = mouseLeft / (styleWidth || 200);
			var value = Math.floor(percent * (max - min)) + min;

			//寻找最接近的handle的value值
			var closestHandleValue = this.findClosestHandle(value);
			var handleIndex = this.findHandleIndex(this.state, closestHandleValue);

			var delta = value - closestHandleValue;
			if (Math.abs(delta) >= step) {
				var closestStepToDelta = Math.round(delta / step) * step;
				getValue && getValue(this.state['currentValue' + handleIndex] + closestStepToDelta, handleIndex);
				this.setState(_defineProperty({}, 'currentValue' + handleIndex, this.state['currentValue' + handleIndex] + closestStepToDelta));
			}
		}
	}, {
		key: 'validateDefault',
		value: function validateDefault(defaultValue, min, max) {
			return defaultValue < min ? min : defaultValue > max ? max : defaultValue;
		}
	}, {
		key: 'isArray',
		value: function isArray(ele) {
			return Object.prototype.toString.call(ele) === '[object Array]';
		}
	}, {
		key: 'findClosestHandle',
		value: function findClosestHandle(value) {
			var _this6 = this;

			var states = Object.keys(this.state);
			states = states.map(function (v) {
				return _this6.state[v];
			});
			return states.reduce(function (pre, cur, index) {
				return value > Math.max(pre, cur) ? Math.max(pre, cur) : value < Math.min(pre, cur) ? Math.min(pre, cur) : Math.abs(value - pre) < Math.abs(value - cur) ? pre : cur;
			}, this.state['currentValue' + 0]);
		}
	}, {
		key: 'findHandleIndex',
		value: function findHandleIndex(state, v) {
			var _this7 = this;

			var states = Object.keys(state);
			states = states.map(function (v) {
				return _this7.state[v];
			});
			return states.indexOf(v);
		}

		//判断handle是否互相接触
	}, {
		key: 'isHandleMeet',
		value: function isHandleMeet(index, value) {
			var _this8 = this;

			var _props4 = this.props;
			var max = _props4.max;
			var min = _props4.min;

			var states = Object.keys(this.state);
			states = states.map(function (v) {
				return _this8.state[v];
			});
			states.sort(function (a, b) {
				return a - b;
			});

			var v = this.state['currentValue' + index];
			var vIndex = states.indexOf(v);
			var vMax = states[vIndex + 1] ? states[vIndex + 1] : max;
			var vMin = states[vIndex - 1] ? states[vIndex - 1] : min;
			return value > vMin && value < vMax ? false : true;
		}
	}, {
		key: 'render',
		value: function render() {
			var _classnames;

			var _props5 = this.props;
			var min = _props5.min;
			var max = _props5.max;
			var step = _props5.step;
			var defaultValue = _props5.defaultValue;
			var styleWidth = _props5.styleWidth;
			var isRound = _props5.isRound;
			var isSolid = _props5.isSolid;
			var showTip = _props5.showTip;
			var tipAlwayShow = _props5.tipAlwayShow;
			var customCls = _props5.customCls;
			var theme = _props5.theme;
			var HandleAmount = _props5.HandleAmount;
			var isRange = _props5.isRange;
			var rangeColors = _props5.rangeColors;

			var dv = this.isArray(defaultValue) ? defaultValue : [defaultValue];

			var styleWidthObj = {
				width: (styleWidth || 200) + 'px'
			};
			var tipClass = (0, _classnames3['default'])({
				'ui-slider-tip': true,
				'ui-slider-tip-show': tipAlwayShow
			});
			var customClass = (0, _classnames3['default'])((_classnames = {
				'ui-slider-wraper': true
			}, _defineProperty(_classnames, customCls, customCls), _defineProperty(_classnames, 'round', 'round' in this.props || isRound), _defineProperty(_classnames, 'solid', 'solid' in this.props || isSolid), _defineProperty(_classnames, 'theme-' + theme, !!theme), _classnames));

			var transitionArray = ['WebkitTransition', 'MozTransition', 'msTransition', 'OTransition', 'Transition'];

			var rangeColorArray = rangeColors ? this.isArray(rangeColors) ? rangeColors : [rangeColors] : ['#fff', '#eee'];

			var handles = [];
			var i = 0,
			    styleObjArr = undefined;
			while (i < HandleAmount) {
				var percent = (this.state['currentValue' + i] - min) / (max - min) * 100;

				styleObjArr = {
					handle: { left: percent + '%' },
					back: { width: percent + '%',
						backgroundColor: isRange && rangeColorArray[i],
						zIndex: 10 - i
					}
				};
				if (!this.removeTransition) {
					transitionArray.forEach(function (transition) {
						styleObjArr.handle[transition] = 'left 0.6s ease-out';
						styleObjArr.back[transition] = 'width 0.6s ease-out';
					});
				}

				handles.push(_react2['default'].createElement(
					'div',
					{ key: 'handleBack' + i },
					_react2['default'].createElement(
						'span',
						{
							key: 'handle' + i,
							className: 'ui-slider-handle',
							style: styleObjArr.handle,
							onMouseDown: !this.isTouchSuported && this.onHandleDown(i),
							onMouseMove: !this.isTouchSuported && this.onHandleMove(i),
							onMouseUp: !this.isTouchSuported && this.onHandleUp(i),
							onClick: function (e) {
								return e.stopPropagation();
							},
							onTouchStart: this.isTouchSuported && this.onHandleDown(i),
							onTouchMove: this.isTouchSuported && this.onHandleMove(i),
							onTouchEnd: this.isTouchSuported && this.onHandleMove(i) },
						showTip && _react2['default'].createElement(
							'em',
							{ className: tipClass },
							this.state['currentValue' + i]
						)
					),
					_react2['default'].createElement('div', { key: 'Back' + i, className: 'ui-slider-back', style: styleObjArr.back })
				));
				i++;
			}

			return _react2['default'].createElement(
				'div',
				{ className: customClass },
				_react2['default'].createElement(
					'div',
					{ className: 'ui-slider-horizontal', style: styleWidthObj, ref: 'sliderBody', onClick: this.clickhandler },
					handles
				)
			);
		}
	}]);

	return Slider;
})(_react.Component);

exports['default'] = Slider;

Slider.propTypes = {
	min: _react.PropTypes.number,
	max: _react.PropTypes.number.isRequired,
	step: _react.PropTypes.number,
	defaultValue: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.array]),
	styleWidth: _react.PropTypes.number,
	getValue: _react.PropTypes.func,
	showTip: _react.PropTypes.bool,
	isRound: _react.PropTypes.bool,
	isSolid: _react.PropTypes.bool,
	isRange: _react.PropTypes.bool,
	isPass: _react.PropTypes.bool,
	tipAlwayShow: _react.PropTypes.bool,
	customCls: _react.PropTypes.string,
	HandleAmount: _react.PropTypes.number,
	theme: _react.PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
	rangeColor: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.array])
};

Slider.defaultProps = {
	min: 0,
	step: 1,
	defaultValue: 0,
	showTip: true,
	tipAlwayShow: false,
	HandleAmount: 1,
	isRound: false,
	isSolid: false,
	isRange: false,
	isPass: true,
	theme: 'default'
};
module.exports = exports['default'];