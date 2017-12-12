'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _ModalHeader = require('./ModalHeader');

var _ModalHeader2 = _interopRequireDefault(_ModalHeader);

var _ModalBody = require('./ModalBody');

var _ModalBody2 = _interopRequireDefault(_ModalBody);

var _ModalFooter = require('./ModalFooter');

var _ModalFooter2 = _interopRequireDefault(_ModalFooter);

_Modal2['default'].Header = _ModalHeader2['default'];
_Modal2['default'].Body = _ModalBody2['default'];
_Modal2['default'].Footer = _ModalFooter2['default'];

exports['default'] = _Modal2['default'];
module.exports = exports['default'];