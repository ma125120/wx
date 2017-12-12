'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var CalendarHeader = (function (_Component) {
  _inherits(CalendarHeader, _Component);

  function CalendarHeader(props) {
    _classCallCheck(this, CalendarHeader);

    _get(Object.getPrototypeOf(CalendarHeader.prototype), 'constructor', this).call(this, props);
    this.state = {
      panel: props.panel || 'date'
    };
  }

  _createClass(CalendarHeader, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('panel' in nextProps) {
        this.setState({
          panel: nextProps.panel
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var dd = new Date(this.props.current),
          current = {
        year: dd.getFullYear(),
        month: dd.getMonth() + 1,
        date: dd.getDate()
      },
          beforeYear = parseInt(current.year / 10) * 10;

      return _react2['default'].createElement(
        'div',
        { className: 'ui-calendar-header' },
        _react2['default'].createElement(
          'div',
          { style: { display: this.state.panel !== 'date' ? 'none' : 'block' } },
          _react2['default'].createElement(
            'a',
            { href: 'javascript:;', onClick: function () {
                return _this.onMonthClick(current, 'pre');
              }, className: 'ui-calendar-header-pre-btn', title: '上个月' },
            _react2['default'].createElement(_Icon2['default'], { type: 'arrow-left' })
          ),
          _react2['default'].createElement(
            'span',
            null,
            _react2['default'].createElement(
              'a',
              { href: 'javascript:;', className: 'ui-calendar-header-btn', onClick: function () {
                  return _this.onChangePanel('year');
                } },
              current.year,
              '年'
            ),
            _react2['default'].createElement(
              'a',
              { href: 'javascript:;', className: 'ui-calendar-header-btn', onClick: function () {
                  return _this.onChangePanel('month');
                } },
              current.month,
              '月'
            )
          ),
          _react2['default'].createElement(
            'a',
            { href: 'javascript:;', onClick: function () {
                return _this.onMonthClick(current, 'next');
              }, className: 'ui-calendar-header-next-btn', title: '下个月' },
            _react2['default'].createElement(_Icon2['default'], { type: 'arrow-right' })
          )
        ),
        _react2['default'].createElement(
          'div',
          { style: { display: this.state.panel !== 'month' ? 'none' : 'block' } },
          _react2['default'].createElement(
            'a',
            { href: 'javascript:;', onClick: function () {
                return _this.onYearClick(current, 'pre');
              }, className: 'ui-calendar-header-pre-btn', title: '去年' },
            _react2['default'].createElement(_Icon2['default'], { type: 'arrow-left' })
          ),
          _react2['default'].createElement(
            'span',
            null,
            _react2['default'].createElement(
              'a',
              { href: 'javascript:;', className: 'ui-calendar-header-year-btn', onClick: function () {
                  return _this.onChangePanel('date');
                } },
              current.year,
              '年'
            )
          ),
          _react2['default'].createElement(
            'a',
            { href: 'javascript:;', onClick: function () {
                return _this.onYearClick(current, 'next');
              }, className: 'ui-calendar-header-next-btn', title: '明年' },
            _react2['default'].createElement(_Icon2['default'], { type: 'arrow-right' })
          )
        ),
        _react2['default'].createElement(
          'div',
          { style: { display: this.state.panel !== 'year' ? 'none' : 'block' } },
          _react2['default'].createElement(
            'a',
            { href: 'javascript:;', onClick: function () {
                return _this.onCenturyClick(current, 'pre');
              }, className: 'ui-calendar-header-pre-btn', title: '上个年代' },
            _react2['default'].createElement(_Icon2['default'], { type: 'arrow-left' })
          ),
          _react2['default'].createElement(
            'span',
            null,
            _react2['default'].createElement(
              'a',
              { href: 'javascript:;', className: 'ui-calendar-header-year-btn', onClick: function () {
                  return _this.onChangePanel('date');
                } },
              beforeYear,
              ' - ',
              beforeYear + 9,
              ' 年'
            )
          ),
          _react2['default'].createElement(
            'a',
            { href: 'javascript:;', onClick: function () {
                return _this.onCenturyClick(current, 'next');
              }, className: 'ui-calendar-header-next-btn', title: '下个年代' },
            _react2['default'].createElement(_Icon2['default'], { type: 'arrow-right' })
          )
        )
      );
    }

    // 切换界面
  }, {
    key: 'onChangePanel',
    value: function onChangePanel(panel) {
      this.setState({ panel: panel }, this.props.onChangePanel(panel));
    }

    // 切换世纪
  }, {
    key: 'onCenturyClick',
    value: function onCenturyClick(current, type) {
      var newYear = current;
      if (type === 'pre') {
        newYear.year = current.year - 10;
      } else {
        newYear.year = current.year + 10;
      }
      var currentString = newYear.year + '/' + newYear.month + '/' + newYear.date;

      this.props.onChange(currentString);
    }

    // 切换年份
  }, {
    key: 'onYearClick',
    value: function onYearClick(current, type) {
      var newYear = current;
      if (type === 'pre') {
        newYear.year = current.year - 1;
      } else {
        newYear.year = current.year + 1;
      }
      var currentString = newYear.year + '/' + newYear.month + '/' + newYear.date;

      this.props.onChange(currentString);
    }

    // 切换月份
  }, {
    key: 'onMonthClick',
    value: function onMonthClick(current, type) {
      var newMonth = type === 'pre' ? this.getPreMonth(current) : this.getNextMonth(current);
      var currentString = newMonth.year + '/' + newMonth.month + '/' + newMonth.date;

      this.props.onChange(currentString);
    }

    // 获取下个月
  }, {
    key: 'getNextMonth',
    value: function getNextMonth(current) {
      var result = current;
      if (result.month == 12) {
        result.year = result.year + 1;
        result.month = 1;
      } else {
        result.year = result.year;
        result.month = result.month + 1;
      }
      return result;
    }

    // 获取上个月
  }, {
    key: 'getPreMonth',
    value: function getPreMonth(current) {
      var result = current;
      if (result.month == 1) {
        result.year = result.year - 1;
        result.month = 12;
      } else {
        result.year = result.year;
        result.month = result.month - 1;
      }
      return result;
    }
  }]);

  return CalendarHeader;
})(_react.Component);

exports['default'] = CalendarHeader;
module.exports = exports['default'];