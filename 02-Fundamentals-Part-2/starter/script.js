"use strict";
const myobject = {
  name: "mevlut",
  age: 34,
  collage_grad: true,

  birthyear: function (year) {
    return year - this.age;
  },
};

console.log(myobject.birthyear(2022));
