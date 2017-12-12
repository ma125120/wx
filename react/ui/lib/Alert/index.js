'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Modal = require('../Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var Alert = (function (_Component) {
  _inherits(Alert, _Component);

  function Alert() {
    _classCallCheck(this, Alert);

    _get(Object.getPrototypeOf(Alert.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Alert, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var theme = _props.theme;
      var message = _props.message;
      var onClose = _props.onClose;

      var others = _objectWithoutProperties(_props, ['theme', 'message', 'onClose']);

      var iconType = 'info-round';
      switch (theme) {
        case 'warning':
          iconType = 'warning-round';
          break;
        case 'success':
          iconType = 'right-round';
          break;
        case 'error':
          iconType = 'wrong-round';
          break;
      }

      return _react2['default'].createElement(
        _Modal2['default'],
        others,
        _react2['default'].createElement(
          _Modal2['default'].Body,
          null,
          _react2['default'].createElement(
            'div',
            { className: 'ui-alert' },
            _react2['default'].createElement(_Icon2['default'], { type: iconType, theme: theme }),
            _react2['default'].createElement(
              'span',
              null,
              message
            )
          )
        ),
        _react2['default'].createElement(
          _Modal2['default'].Footer,
          null,
          _react2['default'].createElement(
            _Button2['default'],
            { onClick: onClose },
            '关闭'
          )
        )
      );
    }
  }]);

  return Alert;
})(_react.Component);

Alert.propTypes = {
  theme: _react.PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  message: _react.PropTypes.string,
  width: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  onClose: _react.PropTypes.func
};

Alert.defaultProps = {
  theme: 'info',
  message: '',
  width: 270,
  onClose: function onClose() {}
};

exports['default'] = Alert;
module.exports = exports['default'];