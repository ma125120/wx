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

var _Option = require('./Option');

var _Option2 = _interopRequireDefault(_Option);

var _Menu = require('../Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var SelectMultiple = (function (_Component) {
  _inherits(SelectMultiple, _Component);

  function SelectMultiple(props) {
    _classCallCheck(this, SelectMultiple);

    _get(Object.getPrototypeOf(SelectMultiple.prototype), 'constructor', this).call(this, props);
    this.state = {
      value: props.value || props.defaultValue || this.getCheckedValue(props.children)
    };
  }

  _createClass(SelectMultiple, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('value' in nextProps || this.getCheckedValue(nextProps.children)) {
        this.setState({
          value: nextProps.value || this.getCheckedValue(nextProps.children)
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var props = this.props;
      var isRadius = props.isRadius;
      var isDisabled = props.isDisabled;
      var size = props.size;

      var others = _objectWithoutProperties(props, ['isRadius', 'isDisabled', 'size']);

      var disabled = 'disabled' in props || isDisabled;
      var radius = 'radius' in props || isRadius;

      var children = _react2['default'].Children.map(props.children, function (option, index) {
        return _react2['default'].createElement(_Option2['default'], _extends({}, option.props, {
          onChange: function (e) {
            return _this.onOptionChange(e, option.props, index);
          },
          checked: !!(_this.state.value.indexOf(option.props.value) > -1) }));
      });

      var cls = (0, _classnames3['default'])(_defineProperty({
        'ui-select': true,
        'ui-select-open': this.state.dropdown,
        'disabled': disabled,
        'radius': radius
      }, 'size-' + size, !!size));

      return _react2['default'].createElement(
        'span',
        _extends({ className: cls }, others),
        _react2['default'].createElement(
          'span',
          { className: 'ui-select-selection', style: { height: '100%' }, role: 'combobox', 'aria-autocomplete': 'list', 'aria-haspopup': 'true', 'aria-expanded': 'false', onClick: function (e) {
              return !disabled && _this.onSelectClick(e);
            } },
          _react2['default'].createElement(
            _Menu2['default'],
            { size: size },
            children
          )
        )
      );
    }
  }, {
    key: 'getCheckedValue',
    value: function getCheckedValue(children) {
      var checkedValue = [];
      _react2['default'].Children.forEach(children, function (option) {
        if (option.props && option.props.checked) {
          checkedValue.push(option.props.value);
        }
      });
      return checkedValue;
    }
  }, {
    key: 'onSelectClick',
    value: function onSelectClick(e) {
      e.preventDefault();
    }
  }, {
    key: 'onOptionChange',
    value: function onOptionChange(e, props, rowIndex) {
      if ('disabled' in props) {
        return;
      }

      var value = this.state.value,
          index = value.indexOf(props.value),
          isSelected = index > -1;

      if (isSelected) {
        value.splice(index, 1);
      } else {
        value.push(props.value);
      }

      var row = {
        index: rowIndex,
        value: props.value,
        text: props.children,
        selected: !isSelected
      };

      this.setState({ value: value }, this.props.onChange(value, row));
    }
  }]);

  return SelectMultiple;
})(_react.Component);

SelectMultiple.propTypes = {
  isRadius: _react.PropTypes.bool,
  isDisabled: _react.PropTypes.bool,
  onChange: _react.PropTypes.func
};

SelectMultiple.defaultProps = {
  isRadius: false,
  isDisabled: false,
  onChange: function onChange() {}
};

exports['default'] = SelectMultiple;
module.exports = exports['default'];