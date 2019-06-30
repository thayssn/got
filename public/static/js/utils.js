"use strict";

Element.prototype.toggleClass = function (cls) {
  this.classList.toggle(cls);
  return this;
};