'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Upload = require('./Upload');

var _Upload2 = _interopRequireDefault(_Upload);

var _UploadList = require('./UploadList');

var _UploadList2 = _interopRequireDefault(_UploadList);

_Upload2['default'].List = _UploadList2['default'];

exports['default'] = _Upload2['default'];
module.exports = exports['default'];