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

var Tag = (function (_Component) {
  _inherits(Tag, _Component);

  function Tag() {
    _classCallCheck(this, Tag);

    _get(Object.getPrototypeOf(Tag.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Tag, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var props = this.props;
      var theme = props.theme;
      var size = props.size;
      var isRadius = props.isRadius;
      var isRound = props.isRound;
      var isActive = props.isActive;
      var isFocus = props.isFocus;
      var isDisabled = props.isDisabled;
      var className = props.className;
      var onClose = props.onClose;
      var children = props.children;

      var others = _objectWithoutProperties(props, ['theme', 'size', 'isRadius', 'isRound', 'isActive', 'isFocus', 'isDisabled', 'className', 'onClose', 'children']);

      var disabled = 'disabled' in props || isDisabled;

      var cls = (0, _classnames3['default'])((_classnames = {
        'ui-tag': true,
        'radius': 'radius' in props || isRadius,
        'round': 'round' in props || isRound,
        'active': 'active' in props || isActive,
        'focus': 'focus' in props || isFocus,
        'disabled': disabled
      }, _defineProperty(_classnames, 'theme-' + theme, !!theme), _defineProperty(_classnames, 'size-' + size, !!size), _defineProperty(_classnames, className, !!className), _classnames));

      var closeIcon = onClose ? _react2['default'].createElement(_Icon2['default'], { type: 'wrong', onClick: !disabled && onClose }) : null;
      return _react2['default'].createElement(
        'div',
        _extends({}, others, { className: cls }),
        children,
        closeIcon
      );
    }
  }]);

  return Tag;
})(_react.Component);

Tag.propTypes = {
  theme: _react.PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
  size: _react.PropTypes.oneOf(['xl', 'lg', 'sm', 'xs']),
  onClose: _react.PropTypes.func
};

Tag.defaultProps = {
  theme: 'default',
  size: null
};

exports['default'] = Tag;
module.exports = exports['default'];