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

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Progress = require('../Progress');

var _Progress2 = _interopRequireDefault(_Progress);

var UploadList = (function (_Component) {
  _inherits(UploadList, _Component);

  function UploadList() {
    _classCallCheck(this, UploadList);

    _get(Object.getPrototypeOf(UploadList.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(UploadList, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var props = this.props;
      var className = props.className;
      var type = props.type;
      var dataSource = props.dataSource;
      var isRadius = props.isRadius;
      var onDelete = props.onDelete;

      var listCls = (0, _classnames3['default'])((_classnames = {
        'ui-upload-list': true,
        'ui-upload-list-inline': 'inline' in props
      }, _defineProperty(_classnames, 'ui-upload-list-' + type, 'type' in props), _defineProperty(_classnames, className, !!className), _classnames));

      var itemCls = (0, _classnames3['default'])({
        'ui-upload-list-item': true,
        'radius': 'radius' in props || isRadius
      });

      return _react2['default'].createElement(
        'div',
        { className: 'ui-upload' },
        _react2['default'].createElement(
          'div',
          { className: listCls },
          dataSource.map(function (item, index) {
            var progress = item.percent ? _react2['default'].createElement(_Progress2['default'], { className: 'ui-upload-list-item-progress', percent: item.percent, theme: 'info', size: 'sm' }) : null;

            return _react2['default'].createElement(
              'div',
              { key: 'upload-list-item-' + index, className: itemCls },
              _react2['default'].createElement(
                'a',
                { className: 'ui-upload-list-item-thumbnail', href: item.url || item.thumbUrl, target: '_blank' },
                _react2['default'].createElement('img', { src: item.thumbUrl || item.url, alt: item.name })
              ),
              _react2['default'].createElement(
                'span',
                { className: 'ui-upload-list-item-name' },
                _react2['default'].createElement(
                  'a',
                  { href: item.url || item.thumbUrl, title: item.name, target: '_blank' },
                  item.name
                )
              ),
              _react2['default'].createElement(_Icon2['default'], { type: 'wrong', title: '删除', className: 'ui-upload-list-item-icon', onClick: function () {
                  return onDelete(item);
                } }),
              progress
            );
          })
        )
      );
    }
  }]);

  return UploadList;
})(_react.Component);

UploadList.propTypes = {
  type: _react.PropTypes.oneOf(['text', 'picture']),
  isRadius: _react.PropTypes.bool,
  dataSource: _react.PropTypes.array,
  onRemove: _react.PropTypes.func
};

UploadList.defaultProps = {
  type: 'text',
  isRadius: false,
  dataSource: [],
  onRemove: function onRemove() {}
};

exports['default'] = UploadList;
module.exports = exports['default'];

// <div className="ui-upload-list-item-size">{item.size}</div>