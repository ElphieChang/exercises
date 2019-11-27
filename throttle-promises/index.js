
module.exports = function (limit, arr) {
  let result = new Array(arr.length), count = 0;

  function doNext() {
    if (count < arr.length) {
      let actIndex = count++;
      let nextAction = arr[actIndex];
      return Promise.resolve(nextAction()).then(function (res) {
        result[actIndex] = res;
        return;
      }).then(doNext);
    }
  }

  let promiseArr = [];
  while(count < limit && count < arr.length) {
    promiseArr.push(doNext());
  }
  return Promise.all(promiseArr).then(() => result);
};


