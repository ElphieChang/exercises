const deepInArray = function (item, array) {
  if (typeof item !== 'object') {
    array.push(item);
  } else {
    item.forEach(i => {
      deepInArray(i, array);
    });
  }
}

module.exports = function (arr) {
  let array = [];
  deepInArray(arr, array);
  return array;
}
