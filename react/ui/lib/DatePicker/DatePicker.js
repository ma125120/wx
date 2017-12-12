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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _utilsEvents = require('../utils/events');

var _utilsEvents2 = _interopRequireDefault(_utilsEvents);

var _utilsIsNodeInTree = require('../utils/isNodeInTree');

var _utilsIsNodeInTree2 = _interopRequireDefault(_utilsIsNodeInTree);

var _utilsFormat = require('../utils/format');

var _utilsFormat2 = _interopRequireDefault(_utilsFormat);

var _Dropdown = require('../Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _Calendar = require('../Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var DatePicker = (function (_Component) {
  _inherits(DatePicker, _Component);

  function DatePicker(props) {
    _classCallCheck(this, DatePicker);

    _get(Object.getPrototypeOf(DatePicker.prototype), 'constructor', this).call(this, props);
    this.unmounted = false;
    this.state = {
      value: _utilsFormat2['default'].date(props.value || props.defaultValue, props.format),
      dropdown: false
    };
  }

  _createClass(DatePicker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.unmounted = true;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unmounted = false;
      this.unbindOuterHandlers();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('value' in nextProps) {
        this.setState({
          value: _utilsFormat2['default'].date(nextProps.value, this.props.format)
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var props = this.props;
      var defaultValue = props.defaultValue;
      var placeholder = props.placeholder;
      var isDisabled = props.isDisabled;
      var isRadius = props.isRadius;
      var size = props.size;
      var format = props.format;

      var others = _objectWithoutProperties(props, ['defaultValue', 'placeholder', 'isDisabled', 'isRadius', 'size', 'format']);

      var _state = this.state;
      var value = _state.value;
      var dropdown = _state.dropdown;

      var disabled = 'disabled' in props || isDisabled;
      var radius = 'radius' in props || isRadius;

      var valueText = placeholder,
          hasValue = false;

      if (value) {
        valueText = value;
        hasValue = true;
      }

      var cls = (0, _classnames3['default'])(_defineProperty({
        'ui-select': true,
        'ui-select-open': dropdown,
        'disabled': disabled,
        'radius': radius
      }, 'size-' + size, !!size));

      var textCls = (0, _classnames3['default'])({
        'ui-select-text': true,
        'ui-select-text-placeholder': !hasValue
      });

      return _react2['default'].createElement(
        'span',
        _extends({ className: cls }, others),
        _react2['default'].createElement(
          'span',
          { className: 'ui-select-selection', role: 'combobox', 'aria-autocomplete': 'list', 'aria-haspopup': 'true', 'aria-expanded': 'false', onClick: function (e) {
              return _this.onSelectClick(e);
            } },
          _react2['default'].createElement(
            'span',
            { className: textCls },
            valueText
          ),
          _react2['default'].createElement(_Icon2['default'], { className: 'ui-select-icon', type: 'date' })
        ),
        _react2['default'].createElement(
          _Dropdown2['default'],
          { isRadius: radius, visible: dropdown },
          _react2['default'].createElement(_Calendar2['default'], { defaultValue: defaultValue, value: value, format: format, hasFooter: true, onChange: function (value) {
              return _this.onDateChange(value);
            } })
        )
      );
    }
  }, {
    key: 'onSelectClick',
    value: function onSelectClick(e) {
      e.preventDefault();
      var disabled = 'disabled' in this.props || this.props.isDisabled;
      !disabled && this.setDropdown(!this.state.dropdown);
    }
  }, {
    key: 'onDateChange',
    value: function onDateChange(value) {
      var _this2 = this;

      this.setState({
        value: value
      }, function () {
        _this2.setDropdown(false, _this2.props.onChange(value));
      });
    }
  }, {
    key: 'setDropdown',
    value: function setDropdown(isOpen, callback) {
      if (!this.unmounted) return;

      if (isOpen) {
        this.bindOuterHandlers();
      } else {
        this.unbindOuterHandlers();
      }

      this.setState({
        dropdown: isOpen
      }, function () {
        callback && callback();
      });
    }
  }, {
    key: 'handleKeyup',
    value: function handleKeyup(e) {
      e.keyCode === 27 && this.setDropdown(false);
    }
  }, {
    key: 'handleOuterClick',
    value: function handleOuterClick(e) {
      if (!this.unmounted || (0, _utilsIsNodeInTree2['default'])(e.target, _reactDom2['default'].findDOMNode(this))) {
        return false;
      }
      this.setDropdown(false);
    }
  }, {
    key: 'bindOuterHandlers',
    value: function bindOuterHandlers() {
      var _this3 = this;

      _utilsEvents2['default'].on(document, 'click', function (e) {
        return _this3.handleOuterClick(e);
      });
      _utilsEvents2['default'].on(document, 'keyup', function (e) {
        return _this3.handleKeyup(e);
      });
    }
  }, {
    key: 'unbindOuterHandlers',
    value: function unbindOuterHandlers() {
      var _this4 = this;

      _utilsEvents2['default'].off(document, 'click', function (e) {
        return _this4.handleOuterClick(e);
      });
      _utilsEvents2['default'].off(document, 'keyup', function (e) {
        return _this4.handleKeyup(e);
      });
    }
  }]);

  return DatePicker;
})(_react.Component);

DatePicker.propTypes = {
  isDisabled: _react.PropTypes.bool,
  format: _react.PropTypes.string,
  onChange: _react.PropTypes.func
};

DatePicker.defaultProps = {
  isDisabled: false,
  format: 'yyyy-MM-dd',
  onChange: function onChange() {}
};

exports['default'] = DatePicker;
module.exports = exports['default'];