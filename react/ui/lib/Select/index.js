'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _SelectMultiple = require('./SelectMultiple');

var _SelectMultiple2 = _interopRequireDefault(_SelectMultiple);

var _Option = require('./Option');

var _Option2 = _interopRequireDefault(_Option);

_Select2['default'].Multiple = _SelectMultiple2['default'];
_Select2['default'].Option = _Option2['default'];

exports['default'] = _Select2['default'];
module.exports = exports['default'];