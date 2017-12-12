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

var _utilsFormat = require('../utils/format');

var _utilsFormat2 = _interopRequireDefault(_utilsFormat);

var CALENDAR_ROW_COUNT = 6,
    CALENDAR_COL_COUNT = 7,
    CALENDAR_WEEK_DAYS = ['一', '二', '三', '四', '五', '六', '日'];

var CalendarDateTable = (function (_Component) {
  _inherits(CalendarDateTable, _Component);

  function CalendarDateTable(props) {
    _classCallCheck(this, CalendarDateTable);

    _get(Object.getPrototypeOf(CalendarDateTable.prototype), 'constructor', this).call(this, props);
    this.state = {
      current: props.current || new Date()
    };
  }

  _createClass(CalendarDateTable, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('current' in nextProps) {
        this.setState({
          current: nextProps.current
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var visible = this.props.visible;

      var style = {
        display: visible ? 'none' : 'block'
      };

      return _react2['default'].createElement(
        'div',
        { style: style },
        _react2['default'].createElement(
          'table',
          { className: 'ui-calendar-table' },
          this.renderWeek(),
          this.renderDate()
        )
      );
    }

    // 渲染星期
  }, {
    key: 'renderWeek',
    value: function renderWeek() {
      var weekDays = [];

      for (var i = 0; i < CALENDAR_COL_COUNT; i++) {
        weekDays[i] = CALENDAR_WEEK_DAYS[i];
      }

      return _react2['default'].createElement(
        'thead',
        null,
        _react2['default'].createElement(
          'tr',
          null,
          weekDays.map(function (week, index) {
            return _react2['default'].createElement(
              'th',
              { key: 'weekdays-' + index, className: 'ui-calendar-column', title: '星期' + week },
              week
            );
          })
        )
      );
    }

    // 渲染日期
  }, {
    key: 'renderDate',
    value: function renderDate() {
      var dd = new Date(this.state.current),
          current = {
        year: dd.getFullYear(),
        month: dd.getMonth() + 1
      },
          pre = this.getPreMonth(current),
          next = this.getNextMonth(current);

      current.days = this.getDays(current);
      current.firstDayOfWeek = this.getFirstDayOfWeek(current);
      pre.days = this.getDays(pre);

      var dates = [];

      // 当月第一天不在周一时，前面日期用上个月的日期补齐
      for (var i = pre.days; i > pre.days - current.firstDayOfWeek + 1; i--) {
        dates.unshift(this.renderDateCell({
          year: pre.year,
          month: pre.month,
          date: i
        }, 'others'));
      }

      // 当月日期
      for (var j = 1; j <= current.days; j++) {
        dates.push(this.renderDateCell({
          year: current.year,
          month: current.month,
          date: j
        }));
      }

      // 当月最后一天不在周日时，后面日期用下个月的日期补齐
      for (var k = 1; k <= CALENDAR_ROW_COUNT * CALENDAR_COL_COUNT - current.days - current.firstDayOfWeek + 1; k++) {
        dates.push(this.renderDateCell({
          year: next.year,
          month: next.month,
          date: k
        }, 'others'));
      }

      var tabelCell = [];
      for (var m = 0; m < CALENDAR_ROW_COUNT; m++) {
        var tabelRow = [];
        for (var n = 0; n < CALENDAR_COL_COUNT; n++) {
          var index = m * CALENDAR_COL_COUNT + n;
          tabelRow.push(_react2['default'].createElement(
            'td',
            { key: 'column-' + n, className: 'ui-calendar-cell', role: 'gridcell' },
            dates[index]
          ));
        }
        tabelCell.push(_react2['default'].createElement(
          'tr',
          { key: 'row-' + m, role: 'row' },
          tabelRow
        ));
      }

      return _react2['default'].createElement(
        'tbody',
        null,
        tabelCell
      );
    }

    // 渲染日期单元
  }, {
    key: 'renderDateCell',
    value: function renderDateCell(day, type) {
      var _props = this.props;
      var value = _props.value;
      var onDateClick = _props.onDateClick;
      var fullDay = day.year + '/' + day.month + '/' + day.date;
      var displayDay = day.year + '-' + day.month + '-' + day.date;

      var cls = (0, _classnames2['default'])({
        'ui-calendar-text': true,
        'ui-calendar-text-others': type === 'others',
        'ui-calendar-text-selected': value === fullDay,
        'ui-calendar-text-today': new Date().toLocaleDateString() === new Date(fullDay).toLocaleDateString()
      });

      return _react2['default'].createElement(
        'span',
        { className: cls, title: displayDay, onClick: function () {
            return onDateClick(fullDay);
          } },
        day.date
      );
    }

    // 获取第一天的星期
  }, {
    key: 'getFirstDayOfWeek',
    value: function getFirstDayOfWeek(current) {
      var date = new Date(current.year + '/' + current.month + '/1'),
          week = date.getDay();
      if (week == 0) {
        week = 7;
      }
      return week;
    }

    // 获取下个月
  }, {
    key: 'getNextMonth',
    value: function getNextMonth(current) {
      var result = {};
      if (current.month == 12) {
        result.year = current.year + 1;
        result.month = 1;
      } else {
        result.year = current.year;
        result.month = current.month + 1;
      }
      return result;
    }

    // 获取上个月
  }, {
    key: 'getPreMonth',
    value: function getPreMonth(current) {
      var result = {};
      if (current.month == 1) {
        result.year = current.year - 1;
        result.month = 12;
      } else {
        result.year = current.year;
        result.month = current.month - 1;
      }
      return result;
    }

    // 获取指定月份的天数
  }, {
    key: 'getDays',
    value: function getDays(current) {
      return new Date(current.year, current.month, 0).getDate();
    }
  }]);

  return CalendarDateTable;
})(_react.Component);

CalendarDateTable.propTypes = {
  defaultValue: _react.PropTypes.string,
  value: _react.PropTypes.string,
  onDateClick: _react.PropTypes.func
};

CalendarDateTable.defaultProps = {
  defaultValue: '',
  value: '',
  onDateClick: function onDateClick() {}
};

exports['default'] = CalendarDateTable;
module.exports = exports['default'];