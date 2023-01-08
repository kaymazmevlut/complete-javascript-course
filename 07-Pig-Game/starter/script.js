'use strict';
let isFirstPlayer = true;
let id0 = true;
let currentScorePlayer1 = document.getElementById('score--0');
let currentScorePlayer2 = document.getElementById('score--1');

function roll() {
  player();
}

function player() {
  let randomNumber = Math.floor(Math.random() * 6) + 1;
  let imgElement = document.getElementById('dice');
  let score = 0;
  let activePlayer = '';
  if (id0) {
    score = document.getElementById('current--0');
  } else {
    score = document.getElementById('current--1');
  }
  if (randomNumber != 1) {
    score.textContent = Number(score.textContent) + randomNumber;
  } else {
    score.textContent = 0;
    isFirstPlayer = !isFirstPlayer;
    id0 = !id0;
  }
  imgElement.src = 'dice-' + randomNumber + '.png';
}

function hold() {
  if (id0) {
    currentScorePlayer1.textContent =
      document.getElementById('current--0').textContent;
    document.getElementById('current--0').textContent = 0;
    id0 = !id0;
  } else {
    currentScorePlayer2.textContent =
      document.getElementById('current--1').textContent;
    document.getElementById('current--1').textContent = 0;
    id0 = !id0;
  }
  if (
    Number(currentScorePlayer1.textContent) >= 100 ||
    Number(currentScorePlayer2.textContent) >= 100
  ) {
    if (!id0) {
      alert('Game Over Player 1 won!!!');
    } else {
      alert('Game Over Player 2 won!!!');
    }
  }
}

function newGame() {
  isFirstPlayer = true;
  id0 = true;
  currentScorePlayer1.textContent = 0;
  currentScorePlayer2.textContent = 0;
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
}
