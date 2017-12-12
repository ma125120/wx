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

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Progress = require('../Progress');

var _Progress2 = _interopRequireDefault(_Progress);

var Upload = (function (_Component) {
  _inherits(Upload, _Component);

  function Upload(props) {
    _classCallCheck(this, Upload);

    _get(Object.getPrototypeOf(Upload.prototype), 'constructor', this).call(this, props);
    this.state = {
      fileNumber: 0,
      uploading: false
    };
  }

  _createClass(Upload, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this = this;

      if ('startUpload' in nextProps) {
        this.setState({
          startUpload: !!nextProps.startUpload
        }, function () {
          _this.state.startUpload && _this.onUploadClick();
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = this.props;
      var multiple = props.multiple;
      var fileExt = props.fileExt;
      var className = props.className;

      var others = _objectWithoutProperties(props, ['multiple', 'fileExt', 'className']);

      var cls = (0, _classnames3['default'])(_defineProperty({
        'ui-upload': true
      }, className, !!className));

      var children = _react2['default'].Children.map(props.children, function (element, index) {
        if (index > 0) {
          return (0, _react.cloneElement)(element, {
            isLoading: 'loading' in element.props || element.props.isLoading || _this2.state.uploading,
            isDisabled: 'disabled' in element.props || element.props.isDisabled || _this2.state.uploading
          });
        } else {
          return (0, _react.cloneElement)(element, {
            isLoading: 'loading' in element.props || element.props.isLoading || _this2.state.uploading,
            isDisabled: 'disabled' in element.props || element.props.isDisabled || _this2.state.uploading,
            onClick: function onClick() {
              _this2.refs.upload.click();
            }
          });
        }
      });

      return _react2['default'].createElement(
        'div',
        _extends({}, others, { className: cls }),
        _react2['default'].createElement('input', { type: 'file', style: { display: 'none' }, multiple: multiple, accept: fileExt, ref: 'upload', onChange: function (e) {
            return _this2.onSelect(e);
          } }),
        children
      );
    }

    // 选择附件
  }, {
    key: 'onSelect',
    value: function onSelect(e) {
      var files = this.refs.upload.files;
      var _props = this.props;
      var autoUpload = _props.autoUpload;
      var onSelect = _props.onSelect;

      if (files.length == 0 || onSelect(files) === false) {
        return;
      }

      // 自动上传处理
      autoUpload && this.onUploadClick();
    }

    // 点击上传按钮
  }, {
    key: 'onUploadClick',
    value: function onUploadClick() {
      var files = this.refs.upload.files;

      if (files.length == 0 || this.state.uploading) {
        return;
      }

      this.setState({
        uploading: true,
        fileNumber: files.length
      });

      for (var i = 0; i < files.length; i++) {
        this.onUpload(files[i]);
      }
    }

    // 上传附件
  }, {
    key: 'onUpload',
    value: function onUpload(file) {
      var _this3 = this;

      var _props2 = this.props;
      var url = _props2.url;
      var data = _props2.data;
      var onProgress = _props2.onProgress;
      var onComplete = _props2.onComplete;
      var onError = _props2.onError;

      var URL = /^(http:\/\/|https:\/\/|\/\/)/;
      var origin = window.location.origin;

      var fd = new FormData(),
          xhr = new XMLHttpRequest(),
          loaded = undefined,
          total = undefined,
          percent = undefined;

      fd.append('files', file);
      Object.keys(data).forEach(function (key, index) {
        fd.append(key, data[key]);
      });

      if (URL.test(url) && ! ~url.indexOf(origin)) {
        return onComplete(file);
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            onComplete(file, JSON.parse(xhr.responseText));

            var fileNumber = _this3.state.fileNumber,
                uploading = false;

            fileNumber--;

            if (fileNumber == 0) {
              _this3.setState({ fileNumber: fileNumber, uploading: uploading });
              _this3.refs.upload.value = '';
            } else {
              _this3.setState({ fileNumber: fileNumber });
            }
          } else {
            _this3.setState({ uploading: false });
            onError();
          }
        }
      };

      //侦查当前附件上传情况
      // xhr.upload.onprogress = e => {
      //   loaded = e.loaded;
      //   total = e.total;
      //   percent = Math.floor(100 * loaded / total); //已经上传的百分比
      //   onProgress(percent);
      // };

      xhr.open('post', url);
      xhr.send(fd);
    }
  }]);

  return Upload;
})(_react.Component);

Upload.propTypes = {
  fileDesc: _react.PropTypes.string,
  startUpload: _react.PropTypes.bool,
  autoUpload: _react.PropTypes.bool,
  isRadius: _react.PropTypes.bool,
  url: _react.PropTypes.string,
  onSelect: _react.PropTypes.func,
  onProgress: _react.PropTypes.func,
  onComplete: _react.PropTypes.func,
  onError: _react.PropTypes.func
};

Upload.defaultProps = {
  fileDesc: '',
  startUpload: false,
  autoUpload: true,
  isRadius: false,
  url: '',
  onSelect: function onSelect() {},
  onProgress: function onProgress() {},
  onComplete: function onComplete() {},
  onError: function onError() {}
};

exports['default'] = Upload;
module.exports = exports['default'];