'use strict';

let randomNumber,
  score = 0,
  activePlayer = 0,
  finalPlayerScore = [0, 0];

const dice = document.querySelector('.dice'),
  btnNew = document.querySelector('.btn--new'),
  btnRoll = document.querySelector('.btn--roll'),
  btnHold = document.querySelector('.btn--hold'),
  players = document.querySelectorAll('.player');

//disable roll button function
function disableRollButton() {
  btnRoll.classList.add('hidden');
  setTimeout(function () {
    btnRoll.classList.remove('hidden');
    dice.classList.add('hidden');
  }, 1500);
}

//switch player function
function switchPlayer() {
  players.forEach(v => {
    v.classList.toggle('player--active');
  });
}

//Rolling functionality
btnRoll.addEventListener('click', () => {
  //Generate a random number and displaying the dice
  randomNumber = Math.ceil(Math.random() * 6);
  dice.classList.remove('hidden');
  dice.src = 'images/dice-' + randomNumber + '.png';

  //checking the dice value
  if (randomNumber != 1) {
    score += randomNumber;
    document.querySelector(`#current--${activePlayer}`).textContent = score;
  } else {
    score = 0;
    switchPlayer();
    document.querySelector(`#current--${activePlayer}`).textContent = score;
    activePlayer === 1 ? (activePlayer = 0) : (activePlayer = 1);
    disableRollButton();
  }
});

//Hold functionality
btnHold.addEventListener('click', () => {
  switchPlayer();
  finalPlayerScore[activePlayer] += score;
  document.getElementById(`score--${activePlayer}`).textContent =
    finalPlayerScore[activePlayer];

  //Check if the player wins
  if (finalPlayerScore[activePlayer] >= 100) {
    players[activePlayer].classList.add('player--winner');
    dice.classList.add('hidden');
    btnRoll.classList.add('hidden');
    btnHold.classList.add('hidden');
    players[0].classList.add('player--active');
    players[1].classList.remove('player--active');
  } else {
    score = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = score;
    activePlayer === 1 ? (activePlayer = 0) : (activePlayer = 1);
    disableRollButton();
  }
});

//Reset functionality
btnNew.addEventListener('click', () => {
  score = 0;
  finalPlayerScore = [0, 0];
  players[activePlayer].classList.remove('player--winner');
  activePlayer = 0;
  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');
  document.querySelector(`#current--1`).textContent = 0;
  document.querySelector(`#current--0`).textContent = 0;
  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;
  players[0].classList.add('player--active');
  players[1].classList.remove('player--active');
});
