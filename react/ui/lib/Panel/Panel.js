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

var Panel = (function (_Component) {
  _inherits(Panel, _Component);

  function Panel() {
    _classCallCheck(this, Panel);

    _get(Object.getPrototypeOf(Panel.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Panel, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var props = this.props;
      var isRadius = props.isRadius;
      var theme = props.theme;
      var className = props.className;
      var children = props.children;

      var others = _objectWithoutProperties(props, ['isRadius', 'theme', 'className', 'children']);

      var cls = (0, _classnames3['default'])((_classnames = {
        'ui-panel': true,
        'radius': 'radius' in props || isRadius
      }, _defineProperty(_classnames, 'theme-' + theme, !!theme), _defineProperty(_classnames, className, !!className), _classnames));

      return _react2['default'].createElement(
        'div',
        _extends({}, others, { className: cls }),
        children
      );
    }
  }]);

  return Panel;
})(_react.Component);

Panel.propTypes = {
  theme: _react.PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
  isRadius: _react.PropTypes.bool
};

Panel.defaultProps = {
  theme: 'default',
  isRadius: false
};

exports['default'] = Panel;
module.exports = exports['default'];