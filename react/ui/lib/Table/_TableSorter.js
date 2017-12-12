'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var TableSorter = (function (_Component) {
  _inherits(TableSorter, _Component);

  function TableSorter(props) {
    _classCallCheck(this, TableSorter);

    _get(Object.getPrototypeOf(TableSorter.prototype), 'constructor', this).call(this, props);
    this.state = {
      sort: props.sort
    };
  }

  _createClass(TableSorter, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('sort' in nextProps) {
        this.setState({
          sort: !!nextProps.sort
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var _props = this.props;
      var children = _props.children;
      var onSort = _props.onSort;
      var className = _props.className;
      var sort = this.state.sort;

      var cls = (0, _classnames3['default'])(_defineProperty({
        'ui-table-sorter': true
      }, className, !!className)),
          sortUpCls = (0, _classnames3['default'])({
        'ui-table-sorter-up': true,
        'ui-table-sorter-active': !!sort
      }),
          sortDownCls = (0, _classnames3['default'])({
        'ui-table-sorter-down': true,
        'ui-table-sorter-active': sort !== undefined && !sort
      });

      return _react2['default'].createElement(
        'span',
        { className: cls, onClick: function () {
            return _this.toggleSort();
          } },
        _react2['default'].createElement('span', { className: sortUpCls }),
        _react2['default'].createElement('span', { className: sortDownCls })
      );
    }
  }, {
    key: 'toggleSort',
    value: function toggleSort() {
      var sort = !this.state.sort;
      this.setState({ sort: sort });
      this.props.onSort(sort);
    }
  }]);

  return TableSorter;
})(_react.Component);

TableSorter.propTypes = {
  sort: _react.PropTypes.bool,
  onSort: _react.PropTypes.func
};

TableSorter.defaultProps = {
  onSort: function onSort() {}
};

exports['default'] = TableSorter;
module.exports = exports['default'];