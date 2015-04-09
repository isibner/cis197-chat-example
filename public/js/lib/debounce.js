// Plucked from http://davidwalsh.name/javascript-debounce-function

var debounce = function (func, wait, immediate) {
  var timeout = null;
  return function () {
    var context = this;
    var args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !(timeout === null);
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
};

// Load the script in browser/node/commonJS environments
this.debounce = debounce;

if (typeof module !== 'undefined' && module !== null && module.exports) {
  module.exports = debounce;
}
