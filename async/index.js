/*
 Thanks to Shreyas Basarge for his help in solving this challenge
 */
module.exports={
  sequence: function(list){
    const size = list.length;
    let data = '', finalFun;

    const handleFun = function (sequence) {
      if (sequence === size) {
        finalFun.call(null, null, data);
      } else if (sequence < size) {
            const operateFun = list[sequence];
            operateFun(function (error, param) {
                data = param;
                sequence++;
                handleFun(sequence)
            }, data);
        }
    };

    return function (callback) {
      finalFun = callback;
      handleFun(0);
    }
  },
  parallel:function(list){
    const size = list.length;
    let data = [], finalFun;

    const handleFun = function (sequence) {
      if (sequence === size) {
        finalFun.call(null, null, data);
      } else if (sequence < size) {
        const operateFun = list[sequence];
        operateFun(function (error, param) {
          data.push(param);
          sequence++;
          handleFun(sequence)
        }, data);
      }
    };

    return function (callback) {
      finalFun = callback;
      handleFun(0);
    }
  },
  race:function(list){
    const size = list.length;
    let count = 0, finalFun;

    const handleFun = function () {
      for (let i = 0; i < size; i++) {
        const operateFun = list[i];
        operateFun(function (err, param) {
          count++;
          if (count === 1) {
            finalFun(null, param);
            return;
          }
        });
      }
    };

    return function (callback) {
      finalFun = callback;
      handleFun();
    }
  }
}
