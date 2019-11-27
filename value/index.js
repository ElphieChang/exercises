module.exports = function (input) {

  function recursive(param) {
    if (typeof param === 'function') {
      const result = param.call(this);
      return recursive(result);
    } else {
      return param;
    }
  }

  return recursive(input);
}
