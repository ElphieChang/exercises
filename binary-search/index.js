module.exports = function (arr, data) {
  let index = -1;

  if (arr.length <= 2) {
    arr.forEach((item, idx) => {
        if (item === data) {
          index = idx;
        }
      }
    )

    return index;
  } else {
    let endIndex = arr.length - 1, beginIndex = 0;
    let processing = true;
    while (processing) {
      if ((endIndex - beginIndex) % 2 === 0) {
        //二分的数组是奇数个
        const middleIndex = (endIndex - beginIndex) / 2;
        if (middleIndex < 1) {
          //最后只剩下一个数需要比较的情况
          if (arr[beginIndex] === data) {
            index = beginIndex;
          }
          processing = false;
        } else {
          const numIndex = beginIndex + middleIndex;
          if (arr[numIndex] === data) {
            index = numIndex;
            processing = false;
          } else if (arr[numIndex] > data) {
            endIndex = numIndex - 1;
          } else {
            beginIndex = numIndex + 1;
          }
        }
      } else {
        //二分数组是偶数个
        const middleIndex = (endIndex - beginIndex) / 2;
        if (middleIndex < 1) {
          //最后只剩下二个数值需要比较的情况
          if (arr[beginIndex] === data) {
            index = beginIndex;
          } else if (arr[endIndex] === data) {
            index = endIndex;
          }
          processing = false;
        } else {
          const beforeIndex = beginIndex + Math.floor(middleIndex), afterIndex = beginIndex + Math.floor(middleIndex) + 1;
          if (arr[beforeIndex] === data || arr[afterIndex] === data) {
            arr[beforeIndex] === data && (index = beginIndex);
            arr[afterIndex] === data && (index = afterIndex);
            processing = false;
          } else if (arr[beforeIndex] < data && arr[afterIndex] > data) {
            processing = false;
          } else if (arr[beforeIndex] > data) {
            endIndex = beforeIndex - 1;
          } else {
            beginIndex = afterIndex + 1;
          }
        }
      }
    }

    return index;
  }
}
