const transmitter = function (option, callback) {
  let ms = 0;

  option.timeouter(option.toggle, ms);

  const msgArr = option.message.split(' ');

  for (let i = 0; i < msgArr.length; i++) {
    const word = msgArr[i];
    for (let z = 0; z < word.length; z++) {
      const mose = option.codes[word[z]];
      for (let j = 0; j < mose.length; j++) {
        const m = mose[j];
        if (m === '.') {
          ms += 1;
        }

        if (m === '-') {
          ms += 3;
        }

        option.timeouter(option.toggle, ms);

        if (j !== mose.length - 1) {
          ms += 1;
          option.timeouter(option.toggle, ms);
        }
      }

      if (z !== word.length - 1) {
        ms += 3;
        option.timeouter(option.toggle, ms);
      }
    }

    if (i !== msgArr.length - 1) {
      ms += 7;
      option.timeouter(option.toggle, ms);
    }
  }

  option.timeouter(callback, ms);
};

module.exports = transmitter;
