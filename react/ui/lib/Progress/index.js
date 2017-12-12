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

var Progress = (function (_Component) {
  _inherits(Progress, _Component);

  function Progress() {
    _classCallCheck(this, Progress);

    _get(Object.getPrototypeOf(Progress.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Progress, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var props = this.props;
      var _props = this.props;
      var isRadius = _props.isRadius;
      var isRound = _props.isRound;
      var percent = _props.percent;
      var theme = _props.theme;
      var size = _props.size;
      var className = _props.className;

      var others = _objectWithoutProperties(_props, ['isRadius', 'isRound', 'percent', 'theme', 'size', 'className']);

      var cls = (0, _classnames3['default'])((_classnames = {
        'ui-progress': true,
        'radius': 'radius' in props || isRadius,
        'round': 'round' in props || isRound
      }, _defineProperty(_classnames, 'theme-' + theme, !!theme), _defineProperty(_classnames, 'size-' + size, !!size), _defineProperty(_classnames, className, !!className), _classnames));

      return _react2['default'].createElement(
        'div',
        _extends({ className: cls }, others),
        _react2['default'].createElement(
          'div',
          { className: 'ui-progress-line-outer' },
          _react2['default'].createElement(
            'div',
            { className: 'ui-progress-line-inner' },
            _react2['default'].createElement('div', { className: 'ui-progress-bg', style: { width: percent + '%' } })
          )
        ),
        this.textRender(percent)
      );
    }
  }, {
    key: 'textRender',
    value: function textRender(percent) {
      var render = 'render' in this.props ? this.props.render(percent) : _react2['default'].createElement(
        'span',
        { className: 'ui-progress-line-text' },
        percent,
        '%'
      );
      return render;
    }
  }]);

  return Progress;
})(_react.Component);

Progress.propTypes = {
  theme: _react.PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
  size: _react.PropTypes.oneOf(['xl', 'lg', 'sm', 'xs']),
  isBlock: _react.PropTypes.bool,
  isRadius: _react.PropTypes.bool,
  isRound: _react.PropTypes.bool,
  className: _react.PropTypes.string
};

Progress.defaultProps = {
  theme: 'default',
  size: null,
  isBlock: false,
  isRadius: false,
  isRound: false,
  className: null
};

exports['default'] = Progress;
module.exports = exports['default'];