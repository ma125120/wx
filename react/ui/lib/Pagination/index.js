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

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var Pagination = (function (_Component) {
  _inherits(Pagination, _Component);

  function Pagination(props) {
    _classCallCheck(this, Pagination);

    _get(Object.getPrototypeOf(Pagination.prototype), 'constructor', this).call(this, props);
    this.state = {
      value: props.value || props.defaultValue
    };
  }

  _createClass(Pagination, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('value' in nextProps) {
        this.setState({
          value: nextProps.value
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var props = this.props;
      var isBordered = props.isBordered;
      var isRadius = props.isRadius;
      var className = props.className;
      var total = props.total;
      var pageSize = props.pageSize;
      var addonBefore = props.addonBefore;
      var addonAfter = props.addonAfter;

      var others = _objectWithoutProperties(props, ['isBordered', 'isRadius', 'className', 'total', 'pageSize', 'addonBefore', 'addonAfter']);

      var cls = (0, _classnames3['default'])(_defineProperty({
        'ui-pagination': true,
        'bordered': 'bordered' in props || isBordered,
        'radius': 'radius' in props || isRadius
      }, className, !!className));

      var pageCount = Math.ceil(total / pageSize);
      var pagerList = [];
      var value = this.state.value;

      value = value < 1 ? 1 : value;
      value = value > pageCount ? pageCount : value;

      if (pageCount <= 9) {
        var _loop = function (i) {
          pagerList.push(_react2['default'].createElement(
            'li',
            { key: i,
              title: i,
              className: (0, _classnames3['default'])({ 'ui-pagination-item': true, 'ui-pagination-item-active': value === i }),
              onClick: function () {
                return _this._onPagerClick(i);
              }
            },
            i
          ));
        };

        for (var i = 1; i <= pageCount; i++) {
          _loop(i);
        }
      } else {
        var firstPager = _react2['default'].createElement(
          'li',
          { key: 1, title: '第一页', className: 'ui-pagination-item', onClick: function () {
              return _this._onPagerClick(1);
            } },
          '1'
        ),
            lastPager = _react2['default'].createElement(
          'li',
          { key: pageCount, title: '最后一页', className: 'ui-pagination-item', onClick: function () {
              return _this._onPagerClick(pageCount);
            } },
          pageCount
        ),
            prevPager = _react2['default'].createElement(
          'li',
          { key: 'prev', title: '上一页', className: (0, _classnames3['default'])({ 'ui-pagination-item': true, 'ui-pagination-item-prev': true, 'ui-pagination-item-disabled': value == 1 }), onClick: function () {
              return value > 1 && _this._onPagerClick(value - 1);
            } },
          _react2['default'].createElement(_Icon2['default'], { type: 'arrow-left' })
        ),
            nextPager = _react2['default'].createElement(
          'li',
          { key: 'next', title: '下一页', className: (0, _classnames3['default'])({ 'ui-pagination-item': true, 'ui-pagination-item-next': true, 'ui-pagination-item-disabled': value == pageCount }), onClick: function () {
              return value < pageCount && _this._onPagerClick(value + 1);
            } },
          _react2['default'].createElement(_Icon2['default'], { type: 'arrow-right' })
        ),
            jumpPrev = _react2['default'].createElement('li', { key: 'jump-prev', title: '向前 5 页', className: 'ui-pagination-item ui-pagination-item-jump-prev', onClick: function () {
            return _this._onPagerClick(value - 5);
          } }),
            jumpNext = _react2['default'].createElement('li', { key: 'jump-next', title: '向后 5 页', className: 'ui-pagination-item ui-pagination-item-jump-next', onClick: function () {
            return _this._onPagerClick(value + 5);
          } });

        var left = Math.max(1, value - 2),
            right = Math.min(value + 2, pageCount);

        if (value - 1 <= 2) {
          right = 1 + 4;
        }

        if (pageCount - value <= 2) {
          left = pageCount - 4;
        }

        var _loop2 = function (i) {
          pagerList.push(_react2['default'].createElement(
            'li',
            { key: i,
              title: i,
              className: (0, _classnames3['default'])({ 'ui-pagination-item': true, 'ui-pagination-item-active': value === i }),
              onClick: function () {
                return _this._onPagerClick(i);
              }
            },
            i
          ));
        };

        for (var i = left; i <= right; i++) {
          _loop2(i);
        }

        if (value - 1 >= 4) {
          pagerList.unshift(jumpPrev);
        }
        if (pageCount - value >= 4) {
          pagerList.push(jumpNext);
        }

        if (left !== 1) {
          pagerList.unshift(firstPager);
        }
        if (right !== pageCount) {
          pagerList.push(lastPager);
        }

        pagerList.unshift(prevPager);
        pagerList.push(nextPager);
      }

      if (addonBefore) {
        pagerList.unshift(_react2['default'].createElement(
          'div',
          { key: 'addon-before', className: 'ui-pagination-addon-before' },
          addonBefore
        ));
      }

      if (addonAfter) {
        pagerList.push(_react2['default'].createElement(
          'div',
          { key: 'addon-after', className: 'ui-pagination-addon-after' },
          addonAfter
        ));
      }

      return _react2['default'].createElement(
        'ul',
        _extends({}, others, { className: cls }),
        pagerList
      );
    }
  }, {
    key: '_onPagerClick',
    value: function _onPagerClick(value) {
      this.setState({
        value: value
      });
      this.props.onPageChange(value);
    }
  }]);

  return Pagination;
})(_react.Component);

Pagination.propTypes = {
  isBordered: _react.PropTypes.bool,
  isRadius: _react.PropTypes.bool,
  total: _react.PropTypes.number,
  pageSize: _react.PropTypes.number,
  onPageChange: _react.PropTypes.func
};

Pagination.defaultProps = {
  defaultValue: 1,
  isBordered: false,
  isRadius: false,
  total: 0,
  pageSize: 10,
  onPageChange: function onPageChange() {}
};

exports['default'] = Pagination;
module.exports = exports['default'];