'use strict';
// const bookings = [];
// const createBooking = function (
//   flightNum,
//   numPessengers = 1,
//   price = 199 * numPessengers
// ) {
//   //before ES6
//   //   numPessengers = numPessengers || 1;
//   //   price = price || 199;
//   const booking = {
//     flightNum,
//     numPessengers,
//     price,
//   };

//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH123');
// createBooking('LH123', 2, 800);
// createBooking('LH123', 2);
// createBooking('LH123', 5);
// createBooking('LH123', undefined, 100);
// const flight = 'LH234';
// const mevlut = {
//   name1: 'Mevlut Kaymaz',
//   passportNo: 234567890,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'LH999';
//   passenger.name1 = 'Mr. ' + passenger.name1;

//   if (passenger.passportNo === 234567890) {
//     alert('checked in');
//   } else {
//     alert('Wrong passprot');
//   }
// };

// checkIn(flight, mevlut);
// console.log(flight);
// console.log(mevlut);

// const newPassportNum = function (person) {
//   person.passportNo = Math.trunc(Math.random() * 1000000000000);
// };
// newPassportNum(mevlut);
// checkIn(flight, mevlut);

// const oneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };

// const transform = function (str, fn) {
//   console.log(`string:, ${str}`);
//   console.log(`Transformed string:, ${fn(str)}`);

//   console.log(`Transformed by: ${fn.name}`);
// };
// transform('Javascript is the best', upperFirstWord);
// transform('Javascript is the best', oneWord);
// const high5 = function () {
//   console.log('👌');
// };
// document.body.addEventListener('click', high5);
// const luftansa = {
//   airline: 'Luftansa',
//   iataCode: 'LH',
//   bookings: [],

//   book(flightNum, passanger) {
//     console.log(
//       `${passanger} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
//     );
//     this.bookings.push({ fligt: `${this.iataCode}${flightNum}`, passanger });
//   },
// };

// luftansa.book(239, 'Mevlut Kaymaz');
// console.log(luftansa);

// const euroWings = {
//   airline: 'Eurowings',
//   iataCode: 'EW',
//   bookings: [],
// };

// const book = luftansa.book;
// // book(23, 'Mirac Kaymaz');

// book.call(euroWings, 23, 'Cemre Hale Kaymaz');
// console.log(euroWings);
// book.call(luftansa, 24, 'Emre Baran Kaymaz');
// console.log(luftansa);

// const swiss = {
//   airline: 'Swiss Airlines',
//   iataCode: 'LX',
//   bookings: [],
// };

// book.call(swiss, 25, 'Mirac Eyub Kaymaz');
// console.log(swiss);

// const flightDate = [583, 'Hatice Kaymaz'];
// book.apply(swiss, flightDate);
// console.log(swiss);

// book.call(swiss, ...flightDate);
// console.log(swiss);

// const bookEW = book.bind(euroWings);
// const bookEW23 = book.bind(euroWings, 23);
// const bookLH = book.bind(luftansa);
// const bookLX = book.bind(swiss);
// bookEW(26, 'Someone SomeLastName');
// bookLH(26, 'Someone SomeLastName');
// bookLX(26, 'Someone SomeLastName');
// bookEW23('Hello SomeLastName');

// luftansa.planes = 300;
// luftansa.buyPlanes = function () {
//   console.log(this);
//   this.planes++;
//   console.log(this.planes);
// };
// luftansa.buyPlanes();

// document
//   .querySelector('.buy')
//   .addEventListener('click', luftansa.buyPlanes.bind(luftansa));

// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));
// const addVAT = addTax.bind(null, 0.23);
// console.log(addVAT(100));

// const addTaxRate = function (rate) {
//   return function (value) {
//     return value + value * rate;
//   };
// };

// const addVAT2 = addTaxRate(0.23);
// console.log(addVAT2(100));
// console.log(addVAT2(200));

const poll = {
  question: 'What is your favorite programming language?',
  options: ['0:Javascript', '1:Python', '2:Rust', '3:Java'],
  answers: new Array(4).fill(0),

  registerNewAnswer() {
    const value = prompt(
      'What is your favorite programming language?\n0:Javascript\n1:Python\n2:Rust\n3:Java'
    );
    this.answers[new Number(value)]++;
    this.displayResults();
  },

  displayResults() {
    console.log(...this.answers);
  },
};
const pollCall = poll.registerNewAnswer;
const pollButton = document.querySelector('.poll');
pollButton.addEventListener('click', pollCall.bind(poll));
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.body.addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
