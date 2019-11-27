const recursiveFun = function (arr, fn, index, map, ) {
  if (arr.length === 1) {
    return arr[arr.length - 1];
  } else {
    //如果数组个数不为偶数 则将最后一个数补足为偶数
    if (arr.length % 2 !== 0) {
      arr.push(arr[arr.length - 1]);
    }

    //设置每一个层级需要提供的hash值以及对应在数组中的索引位置
    if (map && map.length >= 0) {
      if ((index + 1) % 2 === 0) {
        map.push(index - 1, arr[index - 1]);
      } else {
        map.push(index + 1, arr[index + 1]);
      }

      index = Math.floor(index / 2);
    }

    let newArr = [];
    for (let i = 0; i < arr.length - 1; i += 2) {
      newArr.push(fn.call(null, (arr[i] + arr[i + 1])));
    }

    return recursiveFun(newArr, fn, index, map);
  }
}

const exam = function (str, arr, fn, count) {
  if (count < arr.length) {
    //hash值索引位置为奇数 则该hash值在指定字符串前进行运算
    if ((arr[count] + 1) % 2 !== 0) {
      str = fn.call(null, (arr[count + 1] + str));
    } else {
      str = fn.call(null, (str + arr[count + 1]));
    }

    count += 2;
    return exam(str, arr, fn, count);
  } else {
    return str;
  }
}

const verify = function (str, root, obj, fn) {
  if (typeof obj === 'object') {
    const result = exam(str, obj.breadCrums, fn, 0);
    return root === result;
  } else {
    return false;
  }
}

let merkle = function (arr, fn) {
  const root = recursiveFun(arr, fn);
  //获取指定字符串在数组中的索引位置，以及计算该指定字符串需要的所有hash值
  const getVerification = function (str) {
    var index = arr.findIndex(item => {
      return item === str;
    });

    if (index === -1) {
      return false;
    } else {
      let breadCrums = [];
      recursiveFun(arr, fn, index, breadCrums);
      return {
        index : index,
        breadCrums: breadCrums
      }
    }
  };

  return {
    root: root,
    getVerification: getVerification
  };
};

merkle.verify = verify;

module.exports = merkle;


