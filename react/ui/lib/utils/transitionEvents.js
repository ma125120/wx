'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = addEndEventListener;

var EVENT_NAME_MAP = {
  'transition': 'transitionend',
  'OTransition': 'oTransitionEnd',
  'MsTransition': 'MSTransitionEnd',
  'MozTransition': 'mozTransitionEnd',
  'WebkitTransition': 'webkitTransitionEnd'
};

var endEvents = [];
var testStyle = document.createElement('div').style;

if (!('TransitionEvent' in window)) {
  delete EVENT_NAME_MAP.transition;
}

for (var styleName in EVENT_NAME_MAP) {
  if (styleName in testStyle) {
    endEvents.push(EVENT_NAME_MAP[styleName]);
    break;
  }
}

function addEndEventListener(node, eventListener) {
  if (endEvents.length === 0) {
    window.setTimeout(eventListener, 0);
    return;
  }

  endEvents.forEach(function (event) {
    node.addEventListener(event, eventListener, false);
  });

  return {
    remove: function remove() {
      endEvents.forEach(function (event) {
        node.removeEventListener(event, eventListener, false);
      });
    }
  };
}

;
module.exports = exports['default'];