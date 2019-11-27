module.exports = function (fn, time) {
  let timer = null, isFirstCall = true;

  return function () {
    let ctx = this;
    let args = arguments;

    if (isFirstCall) {
      fn.apply(ctx, args);
      isFirstCall = false;
      return;
    }

    if (timer) {
      return;
    }

    timer = setTimeout(function () {
      clearTimeout(timer);
      timer = null;
      fn.apply(ctx, args);
    }, time);
  }
}
