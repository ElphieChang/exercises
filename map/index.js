module.exports = function(arr, fn, ctx) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    const newItem = fn.call(ctx, arr[i], i, arr);
    newArr.push(newItem);
  }

  return newArr;
};
