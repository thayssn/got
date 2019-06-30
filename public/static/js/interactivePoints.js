"use strict";

function InteractivePoint(selector) {
  var _this = this;

  this.element = typeof selector === 'string' ? document.querySelector(selector) : selector;

  this.click = function (fn) {
    if (_this.element) {
      _this.element.addEventListener('click', function (e) {
        fn.apply(this);
      });
    } else {
      console.error('No element found with provided selector', selector);
    }
  };

  return this;
}