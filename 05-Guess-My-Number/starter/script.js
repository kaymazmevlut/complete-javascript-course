'use strict';
let highestNum = 20;
let numToGuess = Math.floor(Math.random() * 20) + 1;

function check() {
  const guess = document.querySelector('.guess').value;
  if (highestNum > 0 && guess) {
    if (Number(guess) > numToGuess) {
      refactorCode('Too high...');
    } else if (Number(guess) < numToGuess) {
      refactorCode('Too low...');
    } else {
      document.body.style.backgroundColor = 'green';
      highestNum--;
      document.querySelector('.score').textContent = highestNum;
      document.querySelector('.message').textContent = 'Good guess...';
      document.querySelector('.number').textContent = numToGuess;
      document.querySelector('.check').disabled = true;
      let highScore = document.querySelector('.highscore').textContent;
      if (highestNum > Number(highScore)) {
        document.querySelector('.highscore').textContent = highestNum;
      }
    }
  } else {
    document.querySelector('.message').textContent =
      "You don't have chances or it is not a number";
    document.querySelector('.check').disabled = true;
  }
}

function again() {
  document.querySelector('.check').disabled = false;
  numToGuess = Math.floor(Math.random() * 20) + 1;
  document.querySelector('.message').textContent = 'Start guessing...';
  highestNum = 20;
  document.querySelector('.score').textContent = highestNum;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.body.style.backgroundColor = 'black';
}

function refactorCode(lowOrHigh) {
  highestNum--;
  document.querySelector('.score').textContent = highestNum;
  document.querySelector('.message').textContent = lowOrHigh;
}
