'use strict';
function show() {
  const myDiv = document.querySelector('.modal.hidden');
  const myDiv1 = document.querySelector('.overlay.hidden');
  myDiv.classList.remove('hidden');
  myDiv1.classList.remove('hidden');
}

function hide() {
  const myDiv = document.querySelector('.modal');
  const myDiv1 = document.querySelector('.overlay');
  myDiv.classList.add('hidden');
  myDiv1.classList.add('hidden');
}

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    hide();
  }
});
