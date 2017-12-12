'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = addEndEventListener;

var EVENT_NAME_MAP = {
  'animation': 'animationend',
  'OAnimation': 'oAnimationEnd',
  'msAnimation': 'MSAnimationEnd',
  'MozAnimation': 'mozAnimationEnd',
  'WebkitAnimation': 'webkitAnimationEnd'
};

var endEvents = ['WebkitTransition', 'MozTransition', 'msTransition', 'OTransition', 'Transition'];
// let testStyle = document.createElement('div').style;

// if (!('AnimationEvent' in window)) {
//   delete EVENT_NAME_MAP.animation;
// }

// for (let styleName in EVENT_NAME_MAP) {
//   if (styleName in testStyle) {
//     endEvents.push(EVENT_NAME_MAP[styleName]);
//     break;
//   }
// }

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