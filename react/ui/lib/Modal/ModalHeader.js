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

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var ModalHeader = (function (_Component) {
  _inherits(ModalHeader, _Component);

  function ModalHeader() {
    _classCallCheck(this, ModalHeader);

    _get(Object.getPrototypeOf(ModalHeader.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ModalHeader, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var title = _props.title;
      var onClose = _props.onClose;

      var others = _objectWithoutProperties(_props, ['title', 'onClose']);

      var btnClose = onClose ? _react2['default'].createElement(
        'div',
        { className: 'ui-modal-close', onClick: onClose },
        _react2['default'].createElement(_Icon2['default'], { type: 'wrong' })
      ) : null;

      return _react2['default'].createElement(
        'div',
        _extends({ className: 'ui-modal-header' }, others),
        _react2['default'].createElement(
          'div',
          { className: 'ui-modal-title' },
          title
        ),
        btnClose
      );
    }
  }]);

  return ModalHeader;
})(_react.Component);

ModalHeader.propTypes = {
  title: _react.PropTypes.string,
  onClose: _react.PropTypes.func
};

ModalHeader.defaultProps = {
  title: ''
};

exports['default'] = ModalHeader;
module.exports = exports['default'];