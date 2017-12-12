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

var _utilsFormat = require('../utils/format');

var _utilsFormat2 = _interopRequireDefault(_utilsFormat);

var _CalendarHeader = require('./CalendarHeader');

var _CalendarHeader2 = _interopRequireDefault(_CalendarHeader);

var _CalendarDateTable = require('./CalendarDateTable');

var _CalendarDateTable2 = _interopRequireDefault(_CalendarDateTable);

var _CalendarMonthTable = require('./CalendarMonthTable');

var _CalendarMonthTable2 = _interopRequireDefault(_CalendarMonthTable);

var _CalendarYearTable = require('./CalendarYearTable');

var _CalendarYearTable2 = _interopRequireDefault(_CalendarYearTable);

var Calendar = (function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar(props) {
    _classCallCheck(this, Calendar);

    _get(Object.getPrototypeOf(Calendar.prototype), 'constructor', this).call(this, props);
    this.state = {
      current: _utilsFormat2['default'].date(props.value || props.defaultValue || new Date(), 'yyyy/M/d'),
      value: _utilsFormat2['default'].date(props.value || props.defaultValue, 'yyyy/M/d'),
      panel: 'date'
    };
  }

  _createClass(Calendar, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('value' in nextProps) {
        this.setState({
          value: _utilsFormat2['default'].date(nextProps.value, 'yyyy/M/d'),
          current: _utilsFormat2['default'].date(nextProps.value || nextProps.defaultValue || new Date(), 'yyyy/M/d'),
          panel: 'date'
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var props = this.props;
      var className = props.className;
      var hasFooter = props.hasFooter;

      var others = _objectWithoutProperties(props, ['className', 'hasFooter']);

      var _state = this.state;
      var current = _state.current;
      var value = _state.value;
      var panel = _state.panel;

      var cls = (0, _classnames3['default'])(_defineProperty({
        'ui-calendar': true
      }, className, !!className));

      return _react2['default'].createElement(
        'div',
        _extends({ className: cls }, others),
        _react2['default'].createElement(_CalendarHeader2['default'], {
          panel: panel,
          current: current,
          onChange: function (current) {
            return _this.setState({ current: current });
          },
          onChangePanel: function (panel) {
            return _this.setState({ panel: panel });
          }
        }),
        _react2['default'].createElement(
          'div',
          { className: 'ui-calendar-body' },
          _react2['default'].createElement(_CalendarYearTable2['default'], { visible: panel !== 'year', value: value, current: current, onYearClick: function (value) {
              return _this.onYearClick(value);
            } }),
          _react2['default'].createElement(_CalendarMonthTable2['default'], { visible: panel !== 'month', value: value, current: current, onMonthClick: function (value) {
              return _this.onMonthClick(value);
            } }),
          _react2['default'].createElement(_CalendarDateTable2['default'], { visible: panel !== 'date', value: value, current: current, onDateClick: function (value) {
              return _this.onDateClick(value);
            } })
        ),
        hasFooter ? _react2['default'].createElement(
          'div',
          { className: 'ui-calendar-footer' },
          _react2['default'].createElement(
            'a',
            { href: 'javascript:;', onClick: function () {
                return _this.onDateClick(new Date());
              }, className: 'ui-calendar-footer-btn' },
            '今天'
          ),
          _react2['default'].createElement(
            'a',
            { href: 'javascript:;', onClick: function () {
                return _this.onDateClick('');
              }, className: 'ui-calendar-footer-btn' },
            '清除'
          )
        ) : null
      );
    }
  }, {
    key: 'onYearClick',
    value: function onYearClick(value) {
      this.setState({
        current: value,
        panel: 'date'
      });
    }
  }, {
    key: 'onMonthClick',
    value: function onMonthClick(value) {
      this.setState({
        current: value,
        panel: 'date'
      });
    }
  }, {
    key: 'onDateClick',
    value: function onDateClick(value) {
      this.setState({
        value: value,
        current: value
      });
      var _props = this.props;
      var format = _props.format;
      var onChange = _props.onChange;

      onChange && onChange(_utilsFormat2['default'].date(value, format));
    }
  }]);

  return Calendar;
})(_react.Component);

Calendar.propTypes = {
  format: _react.PropTypes.string,
  onChange: _react.PropTypes.func
};

Calendar.defaultProps = {
  format: 'yyyy-MM-dd',
  onChange: function onChange() {}
};

exports['default'] = Calendar;
module.exports = exports['default'];