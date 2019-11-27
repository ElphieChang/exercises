module.exports = function (callFn) {
  let doneFlag = false;
  const doneFun = function () {
    doneFlag = true;
  }

  const args = callFn();

  const initFun = function () {
    runs(args.setup.bind(null, doneFun));
    waitsFor(function () {
      return doneFlag;
    });
    runs(args.test);
  };

  it(args.desc, initFun);
}
