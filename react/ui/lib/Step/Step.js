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

var _utilsEvents = require('../utils/events');

var _utilsEvents2 = _interopRequireDefault(_utilsEvents);

var _StepItem = require('./StepItem');

var _StepItem2 = _interopRequireDefault(_StepItem);

var Step = (function (_Component) {
  _inherits(Step, _Component);

  function Step(props) {
    _classCallCheck(this, Step);

    _get(Object.getPrototypeOf(Step.prototype), 'constructor', this).call(this, props);
    this.unmounted = false;
    this.state = {
      itemWidth: '100%'
    };
  }

  _createClass(Step, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.unmounted = true;
      this.handleUpdate();
      this.bindHandlers();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unmounted = false;
      this.unbindHandlers();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var props = this.props;
      var className = props.className;
      var current = props.current;

      var others = _objectWithoutProperties(props, ['className', 'current']);

      var cls = (0, _classnames3['default'])(_defineProperty({
        'ui-step': true
      }, className, !!className));

      var children = _react2['default'].Children.map(props.children, function (item, index) {
        return _react2['default'].createElement(_StepItem2['default'], _extends({}, item.props, {
          isFinished: index + 1 < current,
          isProcess: index + 1 == current,
          index: index + 1,
          style: { width: '' + _this.state.itemWidth }
        }));
      });

      return _react2['default'].createElement(
        'div',
        _extends({}, others, { className: cls }),
        children
      );
    }
  }, {
    key: 'handleUpdate',
    value: function handleUpdate(e) {
      if (!this.unmounted) {
        return;
      }

      var num = _react2['default'].Children.count(this.props.children),
          itemWidth = 100 / num + '%';

      this.setState({ itemWidth: itemWidth });
    }
  }, {
    key: 'bindHandlers',
    value: function bindHandlers() {
      var _this2 = this;

      _utilsEvents2['default'].on(window, 'resize', function (e) {
        return _this2.handleUpdate(e);
      });
    }
  }, {
    key: 'unbindHandlers',
    value: function unbindHandlers() {
      var _this3 = this;

      _utilsEvents2['default'].off(window, 'resize', function (e) {
        return _this3.handleUpdate(e);
      });
    }
  }]);

  return Step;
})(_react.Component);

exports['default'] = Step;
module.exports = exports['default'];