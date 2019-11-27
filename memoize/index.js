module.exports = function (fn) {
  let memoryObj = {};
  return function (...args) {
    const key = [...args].join('|');
    if (!memoryObj[key]) {
      const result = fn.call(this, ...args);
      memoryObj[key] = result;
    }

    return memoryObj[key];
  };
}
