'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MessageItem = require('./MessageItem');

var _MessageItem2 = _interopRequireDefault(_MessageItem);

var Message = (function (_Component) {
  _inherits(Message, _Component);

  function Message(props) {
    _classCallCheck(this, Message);

    _get(Object.getPrototypeOf(Message.prototype), 'constructor', this).call(this, props);
    this.state = {
      timer: undefined,
      active: 0
    };
  }

  _createClass(Message, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      clearTimeout(this.state.timer);
      this.enter();
    }
  }, {
    key: 'enter',
    value: function enter() {
      var _this = this;

      this.state.timer = setTimeout(function () {

        var node = _this.refs.message.children;

        if (!node[_this.state.active]) return;

        node[_this.state.active].className = 'ui-message-wrapper';

        _this.state.active++;

        if (_this.state.active != _this.refs.message.children.length) _this.enter();
      }, this.props.duration);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var msg = _props.msg;
      var duration = _props.duration;
      var theme = _props.theme;

      var others = _objectWithoutProperties(_props, ['msg', 'duration', 'theme']);

      var items = msg.map(function (o, i) {
        return _react2['default'].createElement(_MessageItem2['default'], { key: i, content: o.m, duration: duration, theme: theme });
      });

      return _react2['default'].createElement(
        'div',
        _extends({ className: 'ui-message', ref: 'message' }, others),
        items
      );
    }
  }]);

  return Message;
})(_react.Component);

Message.propTypes = {
  msg: _react.PropTypes.array,
  duration: _react.PropTypes.number,
  theme: _react.PropTypes.oneOf(['info', 'warning', 'success', 'error'])
};

Message.defaultProps = {
  msg: [],
  duration: 1500,
  theme: 'info'
};

exports['default'] = Message;
module.exports = exports['default'];