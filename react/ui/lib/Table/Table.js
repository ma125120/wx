'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x5, _x6, _x7) { var _again = true; _function: while (_again) { var object = _x5, property = _x6, receiver = _x7; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x5 = parent; _x6 = property; _x7 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Loading = require('../Loading');

var _Loading2 = _interopRequireDefault(_Loading);

var _Checkbox = require('../Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var Table = (function (_Component) {
  _inherits(Table, _Component);

  function Table(props) {
    _classCallCheck(this, Table);

    _get(Object.getPrototypeOf(Table.prototype), 'constructor', this).call(this, props);
    var selectedRows = 'rowSelection' in props ? props.rowSelection.value || props.rowSelection.defaultValue || [] : [];
    this.state = {
      selectedRows: selectedRows,
      sort: {}
    };
  }

  _createClass(Table, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('rowSelection' in nextProps && 'value' in nextProps.rowSelection) {
        this.setState({
          selectedRows: nextProps.rowSelection.value
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var props = this.props;
      var isBordered = props.isBordered;
      var isStriped = props.isStriped;
      var isRadius = props.isRadius;
      var isHover = props.isHover;
      var isLoading = props.isLoading;
      var size = props.size;
      var className = props.className;

      var cls = (0, _classnames3['default'])((_classnames = {
        'ui-table': true,
        'ui-table-bordered': 'bordered' in props || isBordered,
        'ui-table-striped': 'striped' in props || isStriped,
        'ui-table-radius': 'radius' in props || isRadius,
        'ui-table-hover': 'hover' in props || isHover
      }, _defineProperty(_classnames, 'size-' + size, !!size), _defineProperty(_classnames, className, !!className), _classnames));

      var content = isLoading ? _react2['default'].createElement(
        _Loading2['default'],
        { visible: true },
        this.renderTable()
      ) : this.renderTable();
      return _react2['default'].createElement(
        'div',
        { className: cls },
        _react2['default'].createElement(
          'div',
          { className: 'ui-table-body' },
          content
        )
      );
    }
  }, {
    key: 'renderTable',
    value: function renderTable() {
      var _this = this;

      var _props = this.props;
      var columns = _props.columns;
      var dataSource = _props.dataSource;
      var rowClick = _props.rowClick;
      var rowSelection = _props.rowSelection;

      var others = _objectWithoutProperties(_props, ['columns', 'dataSource', 'rowClick', 'rowSelection']);

      var _groupColumns = this.groupColumns(columns);

      var headRows = _groupColumns.headRows;
      var dataColumns = _groupColumns.dataColumns;

      var cls = (0, _classnames3['default'])({
        'ui-table-multi-headrow': headRows.length > 1
      });

      return _react2['default'].createElement(
        'table',
        _extends({}, others, { className: cls }),
        _react2['default'].createElement(
          'thead',
          null,
          headRows.map(function (row, index) {
            return _react2['default'].createElement(
              'tr',
              { key: index },
              rowSelection && index === 0 ? _this.renderSelectAll(rowSelection, dataSource, headRows.length) : null,
              row.map(function (column, columnIndex) {
                return _this.renderColumn(column, columnIndex);
              })
            );
          })
        ),
        _react2['default'].createElement(
          'tbody',
          null,
          dataSource.map(function (row, rowIndex) {
            var renderSelect = rowSelection ? _this.renderSelect(rowSelection, row) : null;
            var renderCell = dataColumns.map(function (column, columnIndex) {
              return _this.renderCell(column, row, rowIndex, columnIndex);
            });

            return _react2['default'].createElement(
              'tr',
              { key: rowIndex, onClick: function () {
                  return rowClick(row);
                } },
              renderSelect,
              renderCell
            );
          })
        )
      );
    }

    // 全选所有行
  }, {
    key: 'renderSelectAll',
    value: function renderSelectAll(rowSelection, dataSource, rowSpan) {
      var _this2 = this;

      return _react2['default'].createElement(
        'th',
        { style: { width: 50, textAlign: 'center' }, rowSpan: rowSpan },
        _react2['default'].createElement(_Checkbox2['default'], { checked: this.state.selectedRows.length === dataSource.length, onChange: function (e) {
            var selected = e.target.checked;
            var selectedRows = selected ? dataSource.map(function (data) {
              return data;
            }) : [];

            _this2.setState({ selectedRows: selectedRows });
            rowSelection.onSelectAll && rowSelection.onSelectAll(selected, selectedRows);
          } })
      );
    }

    // 单选指定行
  }, {
    key: 'renderSelect',
    value: function renderSelect(rowSelection, row) {
      var _this3 = this;

      return _react2['default'].createElement(
        'td',
        { style: { width: 50, textAlign: 'center' } },
        _react2['default'].createElement(_Checkbox2['default'], { value: row, checked: this.state.selectedRows.indexOf(row) > -1, onChange: function (e) {
            var selected = e.target.checked;
            var selectedRows = _this3.state.selectedRows;

            if (selectedRows.indexOf(row) === -1) {
              selectedRows.push(row);
            } else {
              selectedRows.splice(selectedRows.indexOf(row), 1);
            }
            _this3.setState({ selectedRows: selectedRows });
            rowSelection.onSelect && rowSelection.onSelect(selected, row, selectedRows);
          } })
      );
    }

    // 表头渲染
  }, {
    key: 'renderColumn',
    value: function renderColumn(column, index) {
      var render = 'columnRender' in column ? column.columnRender(column, index) : column.title;

      return _react2['default'].createElement(
        'th',
        {
          key: column.dataIndex + index,
          width: column.width,
          rowSpan: column.rowSpan,
          colSpan: column.colSpan },
        render,
        this.renderSorter(column)
      );
    }

    // 排序渲染
  }, {
    key: 'renderSorter',
    value: function renderSorter(column) {
      var _this4 = this;

      var sort = this.state.sort[column.dataIndex];
      var sortUpCls = (0, _classnames3['default'])({
        'ui-table-sorter-up': true,
        'ui-table-sorter-active': !!sort
      });
      var sortDownCls = (0, _classnames3['default'])({
        'ui-table-sorter-down': true,
        'ui-table-sorter-active': sort !== undefined && !sort
      });

      return column.sorter ? _react2['default'].createElement(
        'span',
        { className: 'ui-table-sorter', onClick: function () {
            return _this4.onSort(column);
          } },
        _react2['default'].createElement('span', { className: sortUpCls }),
        _react2['default'].createElement('span', { className: sortDownCls })
      ) : null;
    }

    // 单元格渲染
  }, {
    key: 'renderCell',
    value: function renderCell(column, row, rowIndex, columnIndex) {
      var value = row[column.dataIndex];
      var render = 'render' in column ? column.render(value, row, rowIndex) : value;

      // 渲染需合并的单元格
      if (typeof render === 'object' && ('colSpan' in render || 'rowSpan' in render)) {
        return this.renderMergedCell(column, columnIndex, render);
      }
      return _react2['default'].createElement(
        'td',
        { key: column.dataIndex + columnIndex },
        render
      );
    }

    // 合并单元格
  }, {
    key: 'renderMergedCell',
    value: function renderMergedCell(column, columnIndex, render) {
      var colSpan = render.colSpan;
      var rowSpan = render.rowSpan;
      var value = render.value;

      if (colSpan === 0 || rowSpan === 0) {
        return null;
      }
      return _react2['default'].createElement(
        'td',
        {
          key: column.dataIndex + columnIndex,
          colSpan: colSpan,
          rowSpan: rowSpan
        },
        value
      );
    }
  }, {
    key: 'onSort',
    value: function onSort(column) {
      var dataSource = this.props.dataSource;

      var sort = !this.state.sort[column.dataIndex];

      sort ? dataSource.sort(column.sorter) : dataSource.reverse(column.sorter);

      this.setState({
        dataSource: dataSource,
        sort: _defineProperty({}, '' + column.dataIndex, sort)
      });
    }

    // 表头分组
  }, {
    key: 'groupColumns',
    value: function groupColumns(columns) {
      var currentRow = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var parentColumn = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      var _this5 = this;

      var rows = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];
      var dataColumns = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];

      rows[currentRow] = rows[currentRow] || [];
      var group = [];

      function setRowSpan(column) {
        var rowSpan = rows.length - currentRow;
        if (column && !column.children && rowSpan > 1 && (!column.rowSpan || column.rowSpan < rowSpan)) {
          column.rowSpan = rowSpan;
        }
      }
      columns.forEach(function (column, index) {
        var newColumn = _extends({}, column);
        rows[currentRow].push(newColumn);
        parentColumn.colSpan = parentColumn.colSpan || 0;
        if (newColumn.children && newColumn.children.length > 0) {
          newColumn.children = _this5.groupColumns(newColumn.children, currentRow + 1, newColumn, rows, dataColumns).group;
          parentColumn.colSpan = parentColumn.colSpan + newColumn.colSpan;
        } else {
          dataColumns.push(newColumn);
          parentColumn.colSpan++;
        }

        for (var i = 0; i < rows[currentRow].length - 1; ++i) {
          setRowSpan(rows[currentRow][i]);
        }
        if (index + 1 === columns.length) {
          setRowSpan(newColumn);
        }
        group.push(newColumn);
      });
      return { group: group, headRows: rows, dataColumns: dataColumns };
    }
  }]);

  return Table;
})(_react.Component);

Table.propTypes = {
  size: _react.PropTypes.oneOf(['xl', 'lg', 'sm', 'xs']),
  isBordered: _react.PropTypes.bool,
  isStriped: _react.PropTypes.bool,
  isRadius: _react.PropTypes.bool,
  isHover: _react.PropTypes.bool
};

Table.defaultProps = {
  isBordered: false,
  isStriped: false,
  isRadius: false,
  isHover: false
};

exports['default'] = Table;
module.exports = exports['default'];