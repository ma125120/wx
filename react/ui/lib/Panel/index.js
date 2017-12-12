'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Panel = require('./Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _PanelHeader = require('./PanelHeader');

var _PanelHeader2 = _interopRequireDefault(_PanelHeader);

var _PanelBody = require('./PanelBody');

var _PanelBody2 = _interopRequireDefault(_PanelBody);

var _PanelFooter = require('./PanelFooter');

var _PanelFooter2 = _interopRequireDefault(_PanelFooter);

var _PanelTitle = require('./PanelTitle');

var _PanelTitle2 = _interopRequireDefault(_PanelTitle);

var _PanelMore = require('./PanelMore');

var _PanelMore2 = _interopRequireDefault(_PanelMore);

_Panel2['default'].Header = _PanelHeader2['default'];
_Panel2['default'].Body = _PanelBody2['default'];
_Panel2['default'].Footer = _PanelFooter2['default'];
_Panel2['default'].Title = _PanelTitle2['default'];
_Panel2['default'].More = _PanelMore2['default'];

exports['default'] = _Panel2['default'];
module.exports = exports['default'];