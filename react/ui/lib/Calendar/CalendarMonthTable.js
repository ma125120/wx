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

var CALENDAR_ROW_COUNT = 4,
    CALENDAR_COL_COUNT = 3,
    CALENDAR_MONTHS = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];

var CalendarMonthTable = (function (_Component) {
  _inherits(CalendarMonthTable, _Component);

  function CalendarMonthTable(props) {
    _classCallCheck(this, CalendarMonthTable);

    _get(Object.getPrototypeOf(CalendarMonthTable.prototype), 'constructor', this).call(this, props);
    this.state = {
      current: props.value || new Date()
    };
  }

  _createClass(CalendarMonthTable, [{
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
          { className: 'ui-calendar-table ui-calendar-month' },
          this.renderMonth()
        )
      );
    }

    // 渲染月份
  }, {
    key: 'renderMonth',
    value: function renderMonth() {
      var dd = new Date(this.state.current),
          current = {
        year: dd.getFullYear(),
        month: dd.getMonth() + 1,
        date: dd.getDate()
      };

      var months = [];
      for (var i = 1; i <= 12; i++) {
        months.push(this.renderMonthCell({
          year: current.year,
          month: i,
          date: current.date
        }));
      }

      var tabelCell = [];
      for (var m = 0; m < CALENDAR_ROW_COUNT; m++) {
        var tabelRow = [];
        for (var n = 0; n < CALENDAR_COL_COUNT; n++) {
          var index = m * CALENDAR_COL_COUNT + n;
          tabelRow.push(_react2['default'].createElement(
            'td',
            { key: 'column-' + n, className: 'ui-calendar-cell', role: 'gridcell' },
            months[index]
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

    // 渲染月份单元
  }, {
    key: 'renderMonthCell',
    value: function renderMonthCell(day) {
      var onMonthClick = this.props.onMonthClick;
      var fullDay = day.year + '/' + day.month + '/' + day.date;

      var cls = (0, _classnames2['default'])({
        'ui-calendar-text': true,
        'ui-calendar-text-selected': this.state.current === fullDay
      });

      return _react2['default'].createElement(
        'span',
        { className: cls, title: CALENDAR_MONTHS[day.month - 1] + '月', onClick: function () {
            return onMonthClick(fullDay);
          } },
        CALENDAR_MONTHS[day.month - 1],
        '月'
      );
    }
  }]);

  return CalendarMonthTable;
})(_react.Component);

CalendarMonthTable.propTypes = {
  defaultValue: _react.PropTypes.string,
  value: _react.PropTypes.string,
  onMonthClick: _react.PropTypes.func
};

CalendarMonthTable.defaultProps = {
  defaultValue: '',
  value: '',
  onMonthClick: function onMonthClick() {}
};

exports['default'] = CalendarMonthTable;
module.exports = exports['default'];