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

var Button = (function (_Component) {
  _inherits(Button, _Component);

  function Button() {
    _classCallCheck(this, Button);

    _get(Object.getPrototypeOf(Button.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Button, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var props = this.props;
      var _props = this.props;
      var type = _props.type;
      var theme = _props.theme;
      var size = _props.size;
      var isBlock = _props.isBlock;
      var isRadius = _props.isRadius;
      var isRound = _props.isRound;
      var isCircle = _props.isCircle;
      var isActive = _props.isActive;
      var isFocus = _props.isFocus;
      var isDisabled = _props.isDisabled;
      var isLoading = _props.isLoading;
      var className = _props.className;
      var onClick = _props.onClick;
      var children = _props.children;

      var others = _objectWithoutProperties(_props, ['type', 'theme', 'size', 'isBlock', 'isRadius', 'isRound', 'isCircle', 'isActive', 'isFocus', 'isDisabled', 'isLoading', 'className', 'onClick', 'children']);

      var disabled = 'disabled' in props || isDisabled;

      var classes = (0, _classnames3['default'])((_classnames = {
        'ui-button': true,
        'block': 'block' in props || isBlock,
        'radius': 'radius' in props || isRadius,
        'round': 'round' in props || isRound,
        'circle': 'circle' in props || isCircle,
        'active': 'active' in props || isActive,
        'focus': 'focus' in props || isFocus,
        'disabled': disabled
      }, _defineProperty(_classnames, 'theme-' + theme, !!theme), _defineProperty(_classnames, 'size-' + size, !!size), _defineProperty(_classnames, className, !!className), _classnames));

      var textContent = 'loading' in props || isLoading ? _react2['default'].createElement(
        'span',
        null,
        _react2['default'].createElement(_Icon2['default'], { type: 'loading', className: 'rotate360' }),
        ' ',
        children
      ) : children;
      return _react2['default'].createElement(
        'button',
        _extends({}, others, { type: type, className: classes, disabled: disabled, onClick: function (e) {
            return !disabled && onClick(e);
          } }),
        textContent
      );
    }
  }]);

  return Button;
})(_react.Component);

Button.propTypes = {
  type: _react.PropTypes.string,
  theme: _react.PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
  size: _react.PropTypes.oneOf(['xl', 'lg', 'sm', 'xs']),
  isBlock: _react.PropTypes.bool,
  isRadius: _react.PropTypes.bool,
  isRound: _react.PropTypes.bool,
  isCircle: _react.PropTypes.bool,
  isActive: _react.PropTypes.bool,
  isFocus: _react.PropTypes.bool,
  isDisabled: _react.PropTypes.bool,
  isLoading: _react.PropTypes.bool,
  className: _react.PropTypes.string,
  onClick: _react.PropTypes.func
};

Button.defaultProps = {
  type: 'button',
  theme: 'default',
  size: null,
  isBlock: false,
  isRadius: false,
  isRound: false,
  isCircle: false,
  isActive: false,
  isFocus: false,
  isDisabled: false,
  isLoading: false,
  className: null,
  onClick: function onClick() {}
};

exports['default'] = Button;
module.exports = exports['default'];