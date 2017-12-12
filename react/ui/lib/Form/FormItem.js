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

var _classnames4 = require('classnames');

var _classnames5 = _interopRequireDefault(_classnames4);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var FormItem = (function (_Component) {
  _inherits(FormItem, _Component);

  function FormItem() {
    _classCallCheck(this, FormItem);

    _get(Object.getPrototypeOf(FormItem.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(FormItem, [{
    key: 'render',
    value: function render() {
      var _classnames2;

      var props = this.props;
      var theme = props.theme;
      var className = props.className;
      var controlCol = props.controlCol;
      var children = props.children;

      var others = _objectWithoutProperties(props, ['theme', 'className', 'controlCol', 'children']);

      var cls = (0, _classnames5['default'])(_defineProperty({
        'ui-form-item': true
      }, className, !!className));

      var controlCls = (0, _classnames5['default'])((_classnames2 = {
        'ui-form-item-control': true
      }, _defineProperty(_classnames2, controlCol, !!controlCol), _defineProperty(_classnames2, 'theme-' + theme, !!theme), _classnames2));

      return _react2['default'].createElement(
        'div',
        _extends({ className: cls }, others),
        this._renderLabel(),
        _react2['default'].createElement(
          'div',
          { className: controlCls },
          children,
          this._renderExplain()
        )
      );
    }
  }, {
    key: '_getId',
    value: function _getId() {
      return this.props.children.props && this.props.children.props.id;
    }
  }, {
    key: '_renderLabel',
    value: function _renderLabel() {
      var props = this.props;
      var id = props.id;
      var label = props.label;
      var labelCol = props.labelCol;
      var isRequired = props.isRequired;

      var labelCls = (0, _classnames5['default'])(_defineProperty({}, labelCol, !!labelCol));

      var star = 'required' in props || isRequired ? _react2['default'].createElement(
        'span',
        { className: 'ui-form-item-required' },
        _react2['default'].createElement(_Icon2['default'], { type: 'required' })
      ) : null;

      return 'label' in props ? _react2['default'].createElement(
        'label',
        { className: labelCls, htmlFor: id || this._getId() },
        star,
        label
      ) : null;
    }
  }, {
    key: '_renderExplain',
    value: function _renderExplain() {
      var help = this.props.help;

      return 'help' in this.props ? _react2['default'].createElement(
        'div',
        { className: 'ui-form-explain' },
        help
      ) : null;
    }
  }]);

  return FormItem;
})(_react.Component);

FormItem.propTypes = {
  theme: _react.PropTypes.oneOf(['success', 'warning', 'error', 'validating'])
};

// FormItem.defaultProps = {
// };

exports['default'] = FormItem;
module.exports = exports['default'];