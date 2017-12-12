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
    CALENDAR_COL_COUNT = 3;

var CalendarYearTable = (function (_Component) {
  _inherits(CalendarYearTable, _Component);

  function CalendarYearTable(props) {
    _classCallCheck(this, CalendarYearTable);

    _get(Object.getPrototypeOf(CalendarYearTable.prototype), 'constructor', this).call(this, props);
    this.state = {
      current: props.value || new Date()
    };
  }

  _createClass(CalendarYearTable, [{
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
          { className: 'ui-calendar-table ui-calendar-year' },
          this.renderYear()
        )
      );
    }

    // 渲染年份
  }, {
    key: 'renderYear',
    value: function renderYear() {
      var dd = new Date(this.state.current),
          current = {
        year: dd.getFullYear(),
        month: dd.getMonth() + 1,
        date: dd.getDate()
      };

      var years = [];

      // 当月日期
      var firstYear = parseInt(current.year / 10) * 10 - 1,
          lastYear = firstYear + 11;

      for (var i = firstYear; i <= lastYear; i++) {
        var type = i == firstYear || i == lastYear ? 'others' : null;

        years.push(this.renderYearCell({
          year: i,
          month: current.month,
          date: current.date
        }, type));
      }

      var tabelCell = [];
      for (var m = 0; m < CALENDAR_ROW_COUNT; m++) {
        var tabelRow = [];
        for (var n = 0; n < CALENDAR_COL_COUNT; n++) {
          var index = m * CALENDAR_COL_COUNT + n;
          tabelRow.push(_react2['default'].createElement(
            'td',
            { key: 'column-' + n, className: 'ui-calendar-cell', role: 'gridcell' },
            years[index]
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

    // 渲染年份单元
  }, {
    key: 'renderYearCell',
    value: function renderYearCell(day, type) {
      var onYearClick = this.props.onYearClick;
      var fullDay = day.year + '/' + day.month + '/' + day.date;

      var cls = (0, _classnames2['default'])({
        'ui-calendar-text': true,
        'ui-calendar-text-others': type === 'others',
        'ui-calendar-text-selected': this.state.current === fullDay
      });

      return _react2['default'].createElement(
        'span',
        { className: cls, title: day.year, onClick: function () {
            return onYearClick(fullDay);
          } },
        day.year
      );
    }
  }]);

  return CalendarYearTable;
})(_react.Component);

CalendarYearTable.propTypes = {
  defaultValue: _react.PropTypes.string,
  value: _react.PropTypes.string,
  onYearClick: _react.PropTypes.func
};

CalendarYearTable.defaultProps = {
  defaultValue: '',
  value: '',
  onYearClick: function onYearClick() {}
};

exports['default'] = CalendarYearTable;
module.exports = exports['default'];