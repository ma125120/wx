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

var Dropdown = (function (_Component) {
  _inherits(Dropdown, _Component);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    _get(Object.getPrototypeOf(Dropdown.prototype), 'constructor', this).call(this, props);
    this.state = {
      visible: props.visible
      // isShow         : false,
      // animationState : 'leave',
    };
  }

  _createClass(Dropdown, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('visible' in nextProps) {
        this.setState({
          visible: nextProps.visible
        });
      }
    }

    // componentDidMount() {
    //   this.animationEvents = addEndEventListener(this.refs.dropdown, this.animationEnd.bind(this));

    //   if (this.props.visible) {
    //     this.enter();
    //   }
    // }

    // componentWillUnmount() {
    //   if (this.animationEvents) {
    //     this.animationEvents.remove();
    //   }
    // }

    // componentWillReceiveProps(nextProps) {
    //   if (!this.props.visible && nextProps.visible) {
    //     this.enter();
    //   } else if (this.props.visible && !nextProps.visible) {
    //     this.leave();
    //   }
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //   return !!(this.state.isShow || nextState.isShow);
    // }

  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var className = props.className;
      var isRadius = props.isRadius;
      var children = props.children;

      var others = _objectWithoutProperties(props, ['className', 'isRadius', 'children']);

      // const { isShow, animationState } = this.state;
      var visible = this.state.visible;

      var cls = (0, _classnames3['default'])(_defineProperty({
        'ui-dropdown': true,
        'ui-dropdown-hidden': !visible,
        // [`scaleDown-${animationState}`]: true,
        'radius': 'radius' in props || isRadius
      }, className, !!className));

      return _react2['default'].createElement(
        'div',
        _extends({}, others, { className: cls, ref: 'dropdown' }),
        children
      );
    }

    // animationEnd(e) {
    //   let node = this.refs.dialog;
    //   if (e && e.target !== node) {
    //     return;
    //   }

    //   if (this.state.animationState === 'leave') {
    //     this.setState({
    //       isShow: false
    //     });
    //   }
    // }

    // enter() {
    //   this.setState({
    //     isShow: true,
    //     animationState: 'enter',
    //   });
    // }

    // leave() {
    //   if (this.animationEvents) {
    //     this.setState({
    //       animationState: 'leave',
    //     });
    //   } else {
    //     this.setState({
    //       isShow: false,
    //     })
    //   }
    // }
  }]);

  return Dropdown;
})(_react.Component);

Dropdown.propTypes = {
  visible: _react.PropTypes.bool,
  isRadius: _react.PropTypes.bool,
  isDisabled: _react.PropTypes.bool,
  onChange: _react.PropTypes.func
};

Dropdown.defaultProps = {
  visible: false,
  isRadius: false,
  isDisabled: false,
  onChange: function onChange() {}
};

exports['default'] = Dropdown;
module.exports = exports['default'];