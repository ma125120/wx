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

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

// import addEndEventListener from '../utils/animationEvents';

var Modal = (function (_Component) {
  _inherits(Modal, _Component);

  function Modal(props) {
    _classCallCheck(this, Modal);

    _get(Object.getPrototypeOf(Modal.prototype), 'constructor', this).call(this, props);
    this.state = {
      isShow: false,
      isPending: false,
      animationState: 'leave'
    };

    this.resolveAnimationFrame = this.resolveAnimationFrame.bind(this);
  }

  // componentDidMount() {
  //   this.animationEvents = addEndEventListener(this.refs.dialog, this.resolveAnimationFrame);

  //   if (this.props.visible) {
  //     this.enter();
  //   }
  // }

  _createClass(Modal, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      setTimeout(this.resolveAnimationFrame, this.props.animationDuration);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!this.props.visible && nextProps.visible) {
        this.enter();
      } else if (this.props.visible && !nextProps.visible) {
        this.leave();
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !!(this.state.isShow || nextState.isShow);
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames,
          _this = this;

      var _props = this.props;
      var animationType = _props.animationType;
      var animationDuration = _props.animationDuration;
      var width = _props.width;
      var minWidth = _props.minWidth;
      var isRadius = _props.isRadius;
      var isRound = _props.isRound;
      var className = _props.className;
      var onMaskClick = _props.onMaskClick;
      var children = _props.children;

      var others = _objectWithoutProperties(_props, ['animationType', 'animationDuration', 'width', 'minWidth', 'isRadius', 'isRound', 'className', 'onMaskClick', 'children']);

      var _state = this.state;
      var isShow = _state.isShow;
      var isPending = _state.isPending;
      var animationState = _state.animationState;

      var classes = {
        modal: (0, _classnames4['default'])((_classnames = {
          'ui-modal': true,
          'radius': 'radius' in this.props || isRadius,
          'round': 'round' in this.props || isRound
        }, _defineProperty(_classnames, 'fade-' + animationState, isPending), _defineProperty(_classnames, className, !!className), _classnames)),
        dialog: (0, _classnames4['default'])(_defineProperty({
          'ui-modal-dialog': true
        }, animationType + '-' + animationState, true))
      };

      var style = {
        modal: {
          WebkitAnimationDuration: animationDuration + 'ms',
          MozAnimationDuration: animationDuration + 'ms',
          msAnimationDuration: animationDuration + 'ms',
          OAnimationDuration: animationDuration + 'ms',
          animationDuration: animationDuration + 'ms'
        },
        dialog: {
          width: width,
          minWidth: minWidth,
          WebkitAnimationDuration: animationDuration + 'ms',
          MozAnimationDuration: animationDuration + 'ms',
          msAnimationDuration: animationDuration + 'ms',
          OAnimationDuration: animationDuration + 'ms',
          animationDuration: animationDuration + 'ms'
        }
      };

      if (!isShow) {
        style.modal.display = 'none';
      }

      return _react2['default'].createElement(
        'div',
        { className: classes.modal, style: style.modal, onClick: onMaskClick },
        _react2['default'].createElement(
          'div',
          { className: 'ui-modal-wrapper' },
          _react2['default'].createElement(
            'div',
            _extends({}, others, { className: classes.dialog, ref: 'dialog', style: style.dialog, onClick: function (e) {
                return _this.onContainerClick(e);
              } }),
            children
          )
        )
      );
    }
  }, {
    key: 'resolveAnimationFrame',
    value: function resolveAnimationFrame() {
      // let node = this.refs.dialog;
      // if (e && e.target !== node) {
      //   return;
      // }

      if (this.state.animationState === 'leave') {
        this.setState({
          isShow: false,
          isPending: false
        });
      } else {
        this.setState({
          isShow: true,
          isPending: false
        });
      }
    }
  }, {
    key: 'enter',
    value: function enter() {
      this.setState({
        isShow: true,
        isPending: true,
        animationState: 'enter'
      });
    }
  }, {
    key: 'leave',
    value: function leave() {
      this.setState({
        isShow: true,
        isPending: true,
        animationState: 'leave'
      });
    }
  }, {
    key: 'onContainerClick',
    value: function onContainerClick(e) {
      e.stopPropagation();
    }
  }]);

  return Modal;
})(_react.Component);

Modal.propTypes = {
  visible: _react.PropTypes.bool,
  animationType: _react.PropTypes.oneOf(['fade', 'door', 'flip', 'rotate', 'zoom', 'moveUp', 'moveDown', 'moveLeft', 'moveRight', 'slideUp', 'slideDown', 'slideLeft', 'slideRight']),
  animationDuration: _react.PropTypes.number,
  width: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  minWidth: _react.PropTypes.number,
  isRadius: _react.PropTypes.bool,
  isRound: _react.PropTypes.bool,
  onMaskClick: _react.PropTypes.func
};

Modal.defaultProps = {
  visible: false,
  animationType: 'zoom',
  animationDuration: 300,
  width: 600,
  minWidth: 270,
  isRadius: false,
  isRound: false,
  onMaskClick: function onMaskClick() {}
};

exports['default'] = Modal;
module.exports = exports['default'];