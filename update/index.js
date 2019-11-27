module.exports = function (state, obj) {
  var that = this;

  this.$push = function (args) {
    Array.prototype.push.call(this, ...args);
  }

  this.$unshift = function (args) {
    Array.prototype.unshift.call(this, ...args);
  }

  this.$splice =  function (args) {
    Array.prototype.splice.apply(this, ...args);
  }

  this.$merge = function (obj2) {
    Object.assign(this, obj2);
  }

  this.$apply = function (fn) {
    return fn.call(null, this);
  }

  this.$set = function (props, value, obj) {
    if (props.length > 1) {
      return that.$set(props.slice(1), value, obj[props[0]]);
    } else if (props.length === 1) {
      obj[props[0]] = value;
      return true;
    } else {
      return false;
    }
  }

  function recursiveState(origin, target) {
    for (let key in target) {
      if (origin.hasOwnProperty(key)) {
        props.push(key);
        recursiveState(origin[key], target[key]);
      } else {
        if (key === '$set') {
          var res = that.$set(props, target[key], state);
          if (!res) {
            state = target[key];
          }
        } else if (key === '$apply') {
          state = that[key].call(origin, target[key]);
        } else if (that.hasOwnProperty(key)) {
          that[key].call(origin, target[key]);
        } else {
          props.push(key);
          recursiveState({}, target[key]);
        }
      }
    }
  }

  var props = [];
  recursiveState(state, obj);

  return state;
}
