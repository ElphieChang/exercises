module.exports = function (callback) {
  let isExecuted = false, result;
  return function (...args) {
    if (isExecuted) {
      return result;
    } else {
      result = callback.call(this, ...args);
      isExecuted = true;
      return result;
    }
  }
}
