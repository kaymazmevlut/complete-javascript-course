'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2023-11-18T21:31:17.178Z',
    '2023-12-23T07:42:02.383Z',
    '2023-01-07T09:15:04.904Z',
    '2023-01-10T10:17:24.185Z',
    '2023-05-28T14:11:59.604Z',
    '2023-05-27T17:01:17.194Z',
    '2023-07-11T23:36:17.929Z',
    '2023-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-11-25T06:04:23.907Z',
    '2023-01-09T14:18:46.235Z',
    '2023-01-07T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-06-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const updateUI = function (currentAcc) {
  displayMovements(currentAcc.movements);
  calcTotalFunc(currentAcc.movements);
  calcInAndOut(currentAcc, '>');
  calcInAndOut(currentAcc, '<');
};

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  labelDate.innerHTML = '';
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };
  const locale = currentAccount.locale;
  document.querySelector('.date').textContent = Intl.DateTimeFormat(
    locale,
    options
  ).format(new Date());
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date_html = find_date(currentAccount.movementsDates[i], locale);

    const html = `<div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${date_html}</div>
      <div class="movements__value">${numberFormat().format(mov)}</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

accounts.forEach(value => {
  const username = (() =>
    value.owner
      .split(' ')
      .map(word => word[0])
      .join('')
      .toLowerCase())();
  value['username'] = username;
});
const calcTotalFunc = function (movements) {
  const calcTotal = movements.reduce((acc, curr) => acc + curr);
  labelBalance.textContent = numberFormat().format(calcTotal);
  return calcTotal;
};

const max = account1.movements.reduce((acc, curr) => {
  if (acc > curr) {
    return acc;
  } else {
    return curr;
  }
}, account1.movements[0]);

const calcInAndOut = function (currentAccount, inOrOut) {
  const results = currentAccount.movements
    .filter(x => {
      if (inOrOut === '>') {
        return x > 0;
      } else {
        return x < 0;
      }
    })
    // .map(val => val * 1.1)
    .reduce((acc, curr) => acc + curr, 0);

  const interest = currentAccount.movements
    .filter(m => m > 0)
    .map(a => (a * currentAccount.interestRate) / 100)
    .filter(x => {
      return x > 1;
    })
    .reduce((y, z) => y + z, 0);
  if (inOrOut === '>') {
    labelSumIn.textContent = numberFormat().format(Math.trunc(results));
    labelSumInterest.textContent = numberFormat().format(interest.toFixed(2));
  } else {
    labelSumOut.textContent = numberFormat().format(
      Math.abs(Math.trunc(results))
    );
  }
};

let currentAccount;
let setIntervalFunc;
btnLogin.addEventListener('click', function (e) {
  if (setIntervalFunc) {
    clearInterval(setIntervalFunc);
  }
  //prevent form from submitting
  setTimeout(() => {
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
    currentAccount = null;
  }, 60000);
  let timer = 600;
  setIntervalFunc = setInterval(() => {
    const sec = timer % 60;
    const min = (timer - sec) / 60;
    labelTimer.textContent = `${min}:${sec}`;
    timer = min * 60 + sec - 1;
  }, 1000);
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === +inputLoginPin.value) {
    labelWelcome.textContent =
      'Welcome back, ' + currentAccount.owner.split(' ')[0];
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const whomToTransfer = inputTransferTo.value;
  const howMuchToTransfer = Number(inputTransferAmount.value);
  const theAccount = accounts.find(val => val.username === whomToTransfer);
  if (
    whomToTransfer &&
    howMuchToTransfer &&
    theAccount &&
    howMuchToTransfer > 0 &&
    theAccount != currentAccount &&
    calcTotalFunc(currentAccount.movements) >= howMuchToTransfer
  ) {
    theAccount.movements.push(howMuchToTransfer);
    currentAccount.movements.push(-howMuchToTransfer);
    currentAccount.movementsDates.push(new Date().toISOString());
    inputTransferTo.value = inputTransferAmount.value = '';
    updateUI(currentAccount);
  } else {
    alert(
      "Such user doesn't exist or you put negative value or you don't have enough to send"
    );
  }
});

btnLoan.addEventListener('click', function (e) {
  const loan = +inputLoanAmount.value;
  e.preventDefault();
  const isLoanApproved = currentAccount.movements.some(mov => {
    if (loan > 0 && mov > 0 && mov >= loan * 0.1) {
      return true;
    }
    return false;
  });
  const countDown = setTimeout(
    ln => {
      if (isLoanApproved) {
        currentAccount.movements.push(loan);
        currentAccount.movementsDates.push(new Date().toISOString());
        inputLoanAmount.value = '';
        updateUI(currentAccount);
        alert('It is approved');
      }
    },
    3000,
    loan
  );
  if (!isLoanApproved) {
    alert('It is not approved');
    clearTimeout(countDown);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const usernameToDelete = inputCloseUsername.value;
  const pinToDelete = inputClosePin.value;
  const indexOfTheAccount = accounts.findIndex(account => {
    return (
      account.username === usernameToDelete && account.pin === +pinToDelete
    );
  });
  if (indexOfTheAccount >= 0) {
    inputCloseUsername.value = inputClosePin.value = '';
    alert('deleted');
    if (indexOfTheAccount === accounts.indexOf(currentAccount)) {
      logout();
    }
    accounts.splice(indexOfTheAccount, 1);
  } else {
    alert('Not deleted');
  }
});

const logout = function () {
  containerApp.style.opacity = 0;
  labelWelcome.textContent = 'Log in to get started';
  currentAccount = '';
};

let sortIt = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault;
  displayMovements(currentAccount.movements, !sortIt);
  sortIt = !sortIt;
});
const find_date = function (date, locale) {
  let date_to;
  if (date) {
    date_to = new Date(date);
  } else {
    date_to = new Date();
  }
  let shortDate = Intl.DateTimeFormat(locale).format(date_to);
  const convertToAgo = Math.round(
    Math.abs(new Date().getTime() - date_to.getTime()) / (24 * 60 * 60 * 1000)
  );
  if (convertToAgo > 1 && convertToAgo < 5) {
    return convertToAgo.toString() + ' days ago';
  } else if (convertToAgo === 0) {
    return 'Today';
  } else if (convertToAgo === 1) {
    return 'Yesterday';
  }
  return shortDate.toString();
};

const numberFormat = function () {
  const formattedNum = Intl.NumberFormat(currentAccount.locale, {
    style: 'currency',
    currency: currentAccount.currency,
  });

  return formattedNum;
};
