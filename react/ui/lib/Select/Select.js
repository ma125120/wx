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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _utilsEvents = require('../utils/events');

var _utilsEvents2 = _interopRequireDefault(_utilsEvents);

var _utilsIsNodeInTree = require('../utils/isNodeInTree');

var _utilsIsNodeInTree2 = _interopRequireDefault(_utilsIsNodeInTree);

var _Option = require('./Option');

var _Option2 = _interopRequireDefault(_Option);

var _Dropdown = require('../Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _Input = require('../Input');

var _Input2 = _interopRequireDefault(_Input);

var _Menu = require('../Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var Select = (function (_Component) {
  _inherits(Select, _Component);

  function Select(props) {
    _classCallCheck(this, Select);

    _get(Object.getPrototypeOf(Select.prototype), 'constructor', this).call(this, props);
    this.unmounted = false;
    this.state = {
      value: props.value || props.defaultValue || this.getCheckedValue(props.children),
      dropdown: false,
      searchValue: ''
    };
  }

  _createClass(Select, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.unmounted = true;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('value' in nextProps || this.getCheckedValue(nextProps.children)) {
        this.setState({
          value: nextProps.value || this.getCheckedValue(nextProps.children)
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unmounted = false;
      this.unbindOuterHandlers();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var props = this.props;
      var placeholder = props.placeholder;
      var searchPlaceholder = props.searchPlaceholder;
      var isRadius = props.isRadius;
      var isDisabled = props.isDisabled;
      var isSearch = props.isSearch;
      var size = props.size;
      var onChange = props.onChange;
      var onSearchChange = props.onSearchChange;

      var others = _objectWithoutProperties(props, ['placeholder', 'searchPlaceholder', 'isRadius', 'isDisabled', 'isSearch', 'size', 'onChange', 'onSearchChange']);

      var disabled = 'disabled' in props || isDisabled;
      var radius = 'radius' in props || isRadius;
      var search = 'search' in props || isSearch;

      var valueText = placeholder,
          hasValue = false;

      var children = _react2['default'].Children.map(props.children, function (option, index) {
        if (_this.state.value == option.props.value) {
          valueText = option.props.children;
          hasValue = true;
        }

        if (search && option.props.children.toString().indexOf(_this.state.searchValue) < 0) {
          return null;
        }

        return _react2['default'].createElement(_Option2['default'], _extends({}, option.props, {
          onChange: function (e) {
            return _this.onOptionChange(e, option.props, index);
          },
          checked: _this.state.value === option.props.value }));
      });

      var cls = (0, _classnames3['default'])(_defineProperty({
        'ui-select': true,
        'ui-select-open': this.state.dropdown,
        'disabled': disabled,
        'radius': radius
      }, 'size-' + size, !!size));

      var textCls = (0, _classnames3['default'])({
        'ui-select-text': true,
        'ui-select-text-placeholder': !hasValue || search && hasValue && this.state.dropdown
      });

      var menus = children.length > 0 ? _react2['default'].createElement(
        _Menu2['default'],
        { size: size },
        children
      ) : _react2['default'].createElement(
        'span',
        { className: 'ui-select-notfound' },
        '没有找到数据'
      );

      var inputPlaceholder = this.state.dropdown ? hasValue ? valueText : searchPlaceholder : valueText;

      var textRender = !(search && this.state.searchValue.length > 0) && _react2['default'].createElement(
        'span',
        { className: textCls },
        inputPlaceholder
      );

      var inputRender = search && _react2['default'].createElement(
        'span',
        { className: textCls },
        _react2['default'].createElement('input', { ref: 'searchInput', value: this.state.searchValue, onChange: function (e) {
            var searchValue = e.target.value;
            _this.setState({ searchValue: searchValue }, function () {
              return onSearchChange(searchValue);
            });
          } })
      );

      return _react2['default'].createElement(
        'span',
        _extends({ className: cls }, others),
        _react2['default'].createElement(
          'span',
          { className: 'ui-select-selection', role: 'combobox', 'aria-autocomplete': 'list', 'aria-haspopup': 'true', 'aria-expanded': 'false', onClick: function (e) {
              return !disabled && _this.onSelectClick(e);
            } },
          textRender,
          inputRender,
          _react2['default'].createElement(_Icon2['default'], { type: 'arrow-bottom', className: 'ui-select-arrow' })
        ),
        _react2['default'].createElement(
          _Dropdown2['default'],
          { visible: this.state.dropdown, isRadius: radius },
          menus
        )
      );
    }
  }, {
    key: 'getCheckedValue',
    value: function getCheckedValue(children) {
      var checkedValue = null;
      _react2['default'].Children.forEach(children, function (option) {
        if (option.props && option.props.checked) {
          checkedValue = option.props.value;
        }
      });
      return checkedValue;
    }
  }, {
    key: 'onSelectClick',
    value: function onSelectClick(e) {
      e.preventDefault();
      !this.state.dropdown && this.setDropdown(!this.state.dropdown);
    }
  }, {
    key: 'onOptionChange',
    value: function onOptionChange(e, props, index) {
      if ('disabled' in props || props.isDisabled) {
        return;
      }

      this.setState({
        value: props.value,
        searchValue: ''
      });

      var selected = {
        index: index,
        value: props.value,
        text: props.children
      };
      this.setDropdown(false, this.props.onChange(selected));
    }
  }, {
    key: 'setDropdown',
    value: function setDropdown(isOpen, callback) {
      if (!this.unmounted) return;

      if (isOpen) {
        this.bindOuterHandlers();
      } else {
        this.unbindOuterHandlers();
      }

      this.setState({
        dropdown: isOpen,
        searchValue: ''
      }, function () {
        callback && callback();
      });
    }
  }, {
    key: 'handleKeyup',
    value: function handleKeyup(e) {
      e.keyCode === 27 && this.setDropdown(false);
    }
  }, {
    key: 'handleOuterClick',
    value: function handleOuterClick(e) {
      if (!this.unmounted || (0, _utilsIsNodeInTree2['default'])(e.target, _reactDom2['default'].findDOMNode(this))) {
        return;
      }
      this.setDropdown(false);
    }
  }, {
    key: 'bindOuterHandlers',
    value: function bindOuterHandlers() {
      var _this2 = this;

      _utilsEvents2['default'].on(document, 'click', function (e) {
        return _this2.handleOuterClick(e);
      });
      _utilsEvents2['default'].on(document, 'keyup', function (e) {
        return _this2.handleKeyup(e);
      });
    }
  }, {
    key: 'unbindOuterHandlers',
    value: function unbindOuterHandlers() {
      var _this3 = this;

      _utilsEvents2['default'].off(document, 'click', function (e) {
        return _this3.handleOuterClick(e);
      });
      _utilsEvents2['default'].off(document, 'keyup', function (e) {
        return _this3.handleKeyup(e);
      });
    }
  }]);

  return Select;
})(_react.Component);

Select.propTypes = {
  isRadius: _react.PropTypes.bool,
  isDisabled: _react.PropTypes.bool,
  isSearch: _react.PropTypes.bool,
  onSearchChange: _react.PropTypes.func,
  onChange: _react.PropTypes.func
};

Select.defaultProps = {
  isRadius: false,
  isDisabled: false,
  isSearch: false,
  onSearchChange: function onSearchChange() {},
  onChange: function onChange() {}
};

exports['default'] = Select;
module.exports = exports['default'];