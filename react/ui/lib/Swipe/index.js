'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

// import addEndEventListener from '../utils/transitionEvents';

var Swipe = (function (_Component) {
  _inherits(Swipe, _Component);

  function Swipe(props) {
    _classCallCheck(this, Swipe);

    _get(Object.getPrototypeOf(Swipe.prototype), 'constructor', this).call(this, props);
    this.moveInterval = null;
    this.state = {
      items: [],
      activeIndex: props.activeIndex,
      translateX: 0,
      pointStart: 0,
      pointEnd: 0,
      timeStart: new Date()
    };
  }

  _createClass(Swipe, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.parseItem(this.props.children);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this = this;

      // 监听窗口变化
      window.addEventListener("resize", function () {
        return _this._updateResize();
      });
      // this.transitionEvents = addEndEventListener(this.refs.swipeItems, this._transitionEnd.bind(this));

      // 设置起始位置编号
      this.onJumpTo(this.props.activeIndex);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('children' in nextProps) {
        this.parseItem(nextProps.children);
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      setTimeout(this._transitionEnd.bind(this), this.props.speed);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this2 = this;

      // 自动轮播结束
      this.pauseAutoPlay();
      // 移除监听窗口变化
      window.removeEventListener("resize", function () {
        return _this2._updateResize();
      });

      // if (this.transitionEvents) {
      //   this.transitionEvents.remove();
      // }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props;
      var className = _props.className;
      var height = _props.height;
      var children = _props.children;

      var others = _objectWithoutProperties(_props, ['className', 'height', 'children']);

      var classes = (0, _classnames3['default'])(_defineProperty({
        'ui-swipe': true
      }, className, !!className));

      var style = {
        items: {},
        pagination: {}
      };

      if (!this._isDirectionX()) {
        style.items.height = height;
        style.pagination.marginTop = 3;
      } else {
        style.items.whiteSpace = 'nowrap';
        style.pagination.display = 'inline-block';
        style.pagination.marginRight = 3;
      }

      return _react2['default'].createElement(
        'div',
        _extends({}, others, { className: classes }),
        _react2['default'].createElement(
          'div',
          { ref: 'swipeItems',
            className: 'ui-swipe-items',
            style: style.items,
            onTouchStart: function (event) {
              return _this3._onTouchStart(event);
            },
            onTouchMove: function (event) {
              return _this3._onTouchMove(event);
            },
            onTouchEnd: function (event) {
              return _this3._onTouchEnd(event);
            } },
          this.state.items
        ),
        _react2['default'].createElement(
          'div',
          { className: 'ui-swipe-pagination' },
          _react2['default'].createElement(
            'ul',
            null,
            _react.Children.map(children, function (result, index) {
              return _react2['default'].createElement('li', { key: "pagination-" + index, className: (0, _classnames3['default'])({ 'active': index == _this3.state.activeIndex }), style: style.pagination, onClick: function () {
                  return _this3.onSlideTo(index);
                } });
            })
          )
        )
      );
    }

    // 滑动到指定编号
  }, {
    key: 'onSlideTo',
    value: function onSlideTo(index) {
      this._onMoveTo(index, this.props.speed);
    }

    // 静默跳到指定编号
  }, {
    key: 'onJumpTo',
    value: function onJumpTo(index) {
      this._onMoveTo(index, 0);
    }
  }, {
    key: 'parseItem',
    value: function parseItem(children) {
      if (children.length == 0) {
        return;
      }

      // 增加头尾拼接节点
      var items = [].concat(children),
          firstItem = items[0],
          lastItem = items[items.length - 1];
      items.push(firstItem);
      items.unshift(lastItem);

      // 节点追加后重排key
      var newItems = _react2['default'].Children.map(items, function (element, index) {
        return (0, _react.cloneElement)(element, {
          key: index
        });
      });

      this.setState({
        items: newItems
      });

      // 自动轮播开始
      !this.moveInterval && this.startAutoPlay();
    }

    // 自动轮播开始
  }, {
    key: 'startAutoPlay',
    value: function startAutoPlay() {
      var _this4 = this;

      this.moveInterval = this.props.autoPlay && setInterval(function () {

        var activeIndex = _this4.state.activeIndex,
            maxLength = _this4.props.children.length;

        activeIndex = ['left', 'top'].indexOf(_this4.props.direction) > -1 ? activeIndex + 1 : activeIndex - 1;

        if (activeIndex > maxLength - 1) {
          activeIndex = 0;
          _this4.onJumpTo(-1);
          _this4.onSlideTo(activeIndex);
        } else if (activeIndex < 0) {
          activeIndex = maxLength - 1;
          _this4.onJumpTo(maxLength);
          _this4.onSlideTo(activeIndex);
        } else {
          _this4.onSlideTo(activeIndex);
        }
        _this4.onSlideTo(activeIndex);
      }, this.props.autoPlayIntervalTime);
    }

    // 暂停自动轮播
  }, {
    key: 'pauseAutoPlay',
    value: function pauseAutoPlay() {
      if (this.moveInterval) {
        clearInterval(this.moveInterval);
      }
    }

    // 更新窗口变化的位置偏移
  }, {
    key: '_updateResize',
    value: function _updateResize() {
      this.onJumpTo(this.props.activeIndex);
    }

    // 移动到指定编号
  }, {
    key: '_onMoveTo',
    value: function _onMoveTo(index, speed) {
      var dom = this.refs.swipeItems,
          px = this._isDirectionX() ? -dom.offsetWidth * (index + 1) : -dom.offsetHeight * (index + 1);

      this._doTransition(dom, px, speed);

      this.setState({
        activeIndex: index,
        translateX: px
      });
    }

    // 执行过渡动画
  }, {
    key: '_doTransition',
    value: function _doTransition(dom, offset, duration) {
      var x = 0,
          y = 0;

      if (this._isDirectionX()) {
        x = offset;
      } else {
        y = offset;
      }

      dom.style.webkitTransitionDuration = duration + "ms";
      dom.style.mozTransitionDuration = duration + "ms";
      dom.style.oTransitionDuration = duration + "ms";
      dom.style.transitionDuration = duration + "ms";
      dom.style.webkitTransform = "translate3d(" + x + "px, " + y + "px, 0)";
      dom.style.mozTransform = "translate3d(" + x + "px, " + y + "px, 0)";
      dom.style.oTransform = "translate3d(" + x + "px, " + y + "px, 0)";
      dom.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";
    }
  }, {
    key: '_transitionEnd',
    value: function _transitionEnd() {
      var activeIndex = this.state.activeIndex,
          maxLength = this.props.children.length;

      if (activeIndex > maxLength - 1) {
        this.onJumpTo(0);
      } else if (activeIndex < 0) {
        this.onJumpTo(maxLength - 1);
      }
    }

    // 触屏事件
  }, {
    key: '_onTouchStart',
    value: function _onTouchStart(event) {
      this.pauseAutoPlay();

      var pointX = this._getCurrentPoint(event),
          activeIndex = this.state.activeIndex,
          maxLength = this.props.children.length;

      // 跳转到头尾
      if (activeIndex <= 0) {
        this.onJumpTo(0);
      } else if (activeIndex >= maxLength - 1) {
        this.onJumpTo(maxLength - 1);
      }

      this.setState({
        pointStart: pointX,
        timeStart: new Date()
      });
    }
  }, {
    key: '_onTouchMove',
    value: function _onTouchMove(event) {
      event.preventDefault();

      var pointX = this._getCurrentPoint(event),
          px = this.state.translateX + (pointX - this.state.pointStart),
          dom = this.refs.swipeItems;

      this._doTransition(dom, px, 0);
      this.setState({
        pointEnd: pointX
      });
    }
  }, {
    key: '_onTouchEnd',
    value: function _onTouchEnd(event) {

      var px = this.state.pointEnd !== 0 ? this.state.pointEnd - this.state.pointStart : 0,
          timeSpan = new Date().getTime() - this.state.timeStart.getTime(),
          dom = this.refs.swipeItems;

      var activeIndex = this.state.activeIndex;

      // 判断滑动临界点
      // 1.滑动距离比超过moveDistanceRatio
      // 2.滑动释放时间差低于moveTimeSpan
      if (Math.abs(px / dom.offsetWidth) >= this.props.moveDistanceRatio || timeSpan <= this.props.moveTimeSpan) {

        activeIndex = px > 0 ? this.state.activeIndex - 1 : this.state.activeIndex + 1;

        this.onSlideTo(activeIndex);
      } else {
        this.onSlideTo(activeIndex);
      }

      // dom.removeEventListener("transitionend", () => this._aaa());

      // 恢复自动轮播
      this.startAutoPlay();

      this.setState({
        pointStart: 0,
        pointEnd: 0,
        activeIndex: activeIndex
      });
    }

    // 获取鼠标/触摸点坐标
  }, {
    key: '_getCurrentPoint',
    value: function _getCurrentPoint(event, type) {
      var touch = type == 'mouse' ? event : event.touches[0];

      var offset = this._isDirectionX() ? touch.pageX : touch.pageY;
      return offset;
    }

    // 是否横向移动
  }, {
    key: '_isDirectionX',
    value: function _isDirectionX() {
      var dir = ['left', 'right'].indexOf(this.props.direction) > -1 ? true : false;
      return dir;
    }
  }]);

  return Swipe;
})(_react.Component);

Swipe.propTypes = {
  direction: _react.PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  height: _react.PropTypes.number,
  activeIndex: _react.PropTypes.number,
  speed: _react.PropTypes.number,
  autoPlay: _react.PropTypes.bool,
  autoPlayIntervalTime: _react.PropTypes.number,
  moveDistanceRatio: _react.PropTypes.number,
  moveTimeSpan: _react.PropTypes.number
};

Swipe.defaultProps = {
  direction: 'left',
  height: 160,
  activeIndex: 0,
  speed: 300,
  autoPlay: true,
  autoPlayIntervalTime: 3000,
  moveDistanceRatio: 0.5,
  moveTimeSpan: 300
};

exports['default'] = Swipe;
module.exports = exports['default'];