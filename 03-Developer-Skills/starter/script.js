// Remember, we're gonna use strict mode in all scripts now!
'use strict';
const name = {
  name: 'mevlut',
  latname: 'kaymaz',
  age: 34,

  calcYear: birthyear => {
    return 2022 - birthyear;
  },
};
console.table(name.calcYear(34));
console.table(name);
