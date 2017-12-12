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

var Confirm = (function (_Component) {
  _inherits(Confirm, _Component);

  function Confirm() {
    _classCallCheck(this, Confirm);

    _get(Object.getPrototypeOf(Confirm.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Confirm, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var message = _props.message;
      var okText = _props.okText;
      var cancelText = _props.cancelText;
      var onOk = _props.onOk;
      var onCancel = _props.onCancel;

      var others = _objectWithoutProperties(_props, ['message', 'okText', 'cancelText', 'onOk', 'onCancel']);

      return _react2['default'].createElement(
        _Modal2['default'],
        others,
        _react2['default'].createElement(
          _Modal2['default'].Body,
          null,
          _react2['default'].createElement(
            'div',
            { className: 'ui-confirm' },
            _react2['default'].createElement(_Icon2['default'], { type: 'question-round' }),
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
            { onClick: onCancel },
            cancelText
          ),
          _react2['default'].createElement(
            _Button2['default'],
            { theme: 'success', onClick: onOk },
            okText
          )
        )
      );
    }
  }]);

  return Confirm;
})(_react.Component);

Confirm.propTypes = {
  message: _react.PropTypes.string,
  width: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  okText: _react.PropTypes.string,
  cancelText: _react.PropTypes.string,
  onOk: _react.PropTypes.func,
  onCancel: _react.PropTypes.func
};

Confirm.defaultProps = {
  message: '',
  width: 270,
  okText: '确定',
  cancelText: '取消',
  onOk: function onOk() {},
  onCancel: function onCancel() {}
};

exports['default'] = Confirm;
module.exports = exports['default'];