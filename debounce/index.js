module.exports = function (fn, time) {
  let timer;
  return function () {
    const ctx = this;
    const args = arguments;

    const later = function () {
      timer = null;
      fn.apply(ctx, args);
    }

    clearTimeout(timer);
    timer = setTimeout(later, time);
  };
};
