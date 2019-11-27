module.exports = function (fn) {
  let finalFun;

  const handleFun = function (operateFun) {
    operateFun(function (err, param) {
      if (typeof param === 'function') {
        handleFun(param);
      } else {
        finalFun(null, param);
      }
    });
  }

  return function (callback) {
    finalFun = callback;
    handleFun(fn);
  }
}
