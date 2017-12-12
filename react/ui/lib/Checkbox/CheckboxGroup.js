'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Checkbox = require('./Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var CheckboxGroup = (function (_Component) {
  _inherits(CheckboxGroup, _Component);

  function CheckboxGroup(props) {
    _classCallCheck(this, CheckboxGroup);

    _get(Object.getPrototypeOf(CheckboxGroup.prototype), 'constructor', this).call(this, props);
    this.state = {
      value: props.value || props.defaultValue || this.getCheckedValue(props.children)
    };
  }

  _createClass(CheckboxGroup, [{
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

      var children = _react2['default'].Children.map(props.children, function (checkbox) {
        return _react2['default'].createElement(_Checkbox2['default'], _extends({}, checkbox.props, {
          onChange: function (e) {
            return _this.onCheckboxChange(e);
          },
          checked: !!(_this.state.value.indexOf(checkbox.props.value) > -1) }));
      });

      return _react2['default'].createElement(
        'div',
        { className: 'ui-checkbox-group' },
        children
      );
    }
  }, {
    key: 'getCheckedValue',
    value: function getCheckedValue(children) {
      var checkedValue = [];
      _react2['default'].Children.forEach(children, function (checkbox) {
        if (checkbox.props && checkbox.props.checked) {
          checkedValue.push(checkbox.props.value);
        }
      });
      return checkedValue;
    }
  }, {
    key: 'onCheckboxChange',
    value: function onCheckboxChange(e) {
      var value = this.state.value,
          index = value.indexOf(e.target.value);

      if (index < 0) {
        value.push(e.target.value);
      } else {
        value.splice(index, 1);
      }

      this.setState({
        value: value
      });
      this.props.onChange(value);
    }
  }]);

  return CheckboxGroup;
})(_react.Component);

CheckboxGroup.propTypes = {
  onChange: _react.PropTypes.func
};

CheckboxGroup.defaultProps = {
  onChange: function onChange() {}
};

exports['default'] = CheckboxGroup;
module.exports = exports['default'];