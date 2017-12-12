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

var _Tab = require('./Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var TabGroup = (function (_Component) {
  _inherits(TabGroup, _Component);

  function TabGroup(props) {
    _classCallCheck(this, TabGroup);

    _get(Object.getPrototypeOf(TabGroup.prototype), 'constructor', this).call(this, props);
    this.state = {
      value: props.value || props.defaultValue || this.getSelectIndex(props.children) || 0
    };
  }

  _createClass(TabGroup, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('value' in nextProps || this.getSelectIndex(nextProps.children)) {
        this.setState({
          value: nextProps.value
        });
      }
    }
  }, {
    key: 'getSelectIndex',
    value: function getSelectIndex(children) {
      var selectIndex = undefined;
      _react2['default'].Children.forEach(children, function (item, $index) {
        if (item.props && item.props.selected) {
          selectIndex = $index;
        }
      });
      return selectIndex;
    }
  }, {
    key: 'getTitleItemCls',
    value: function getTitleItemCls(idx) {
      return idx === this.state.value ? 'ui-tab-header-item active' : 'ui-tab-header-item';
    }
  }, {
    key: 'getContentItemCls',
    value: function getContentItemCls(idx) {
      return idx === this.state.value ? 'ui-tab-body-item active' : 'ui-tab-body-item';
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames,
          _this = this;

      var props = this.props;
      var isRadius = props.isRadius;
      var theme = props.theme;
      var className = props.className;
      var children = props.children;
      var onChange = props.onChange;

      var others = _objectWithoutProperties(props, ['isRadius', 'theme', 'className', 'children', 'onChange']);

      var cls = (0, _classnames3['default'])((_classnames = {
        'ui-tab': true,
        'radius': 'radius' in props || isRadius
      }, _defineProperty(_classnames, 'theme-' + theme, !!theme), _defineProperty(_classnames, className, !!className), _classnames));

      var items = _react2['default'].Children.map(children, function (item, $index) {
        return _react2['default'].createElement(
          'li',
          { key: $index, className: _this.getTitleItemCls($index), onClick: function () {
              _this.setState({ value: $index }, onChange($index));
            } },
          item.props.title
        );
      });

      var content = _react2['default'].Children.map(children, function (item, $index) {
        return _react2['default'].createElement(
          _Tab2['default'],
          _extends({}, item.props, { selected: !!(_this.state.value === $index) }),
          item.props.children
        );
      });

      return _react2['default'].createElement(
        'div',
        _extends({}, others, { className: cls }),
        _react2['default'].createElement(
          'ul',
          { className: 'ui-tab-header' },
          items
        ),
        _react2['default'].createElement(
          'div',
          { className: 'ui-tab-body' },
          content
        )
      );
    }
  }]);

  return TabGroup;
})(_react.Component);

TabGroup.propTypes = {
  theme: _react.PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
  isRadius: _react.PropTypes.bool,
  onChange: _react.PropTypes.func
};

TabGroup.defaultProps = {
  theme: 'default',
  isRadius: false,
  onChange: function onChange() {}
};

exports['default'] = TabGroup;
module.exports = exports['default'];