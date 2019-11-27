const curry = function (fn) {
  if (fn.length > 0) {
    return function (...args) {
      return curry(fn.bind(null, ...args));
    }
  } else {
    return fn();
  }
}

module.exports = curry;
