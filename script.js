'use strict';

class Game {
  correctNumber = document.querySelector('.number');
  score = document.querySelector('.score');
  highScore = document.querySelector('.highscore');
  message = document.querySelector('.message');
  check = document.querySelector('.check');
  AGAIN = document.querySelector('.again');
  guess = document.querySelector('.guess');
  randomValue = this.randomizer();

  constructor() {
    this.startGame = this.startGame.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.checkInput = this.checkInput.bind(this);
    this.initSetup = this.initSetup.bind(this);
  }

  // Define methods
  randomizer() {
    return Math.trunc(Math.random() * 1000) + 1;
  }

  winTheGame() {
    document.body.style.backgroundColor = '#60b347';
    this.correctNumber.innerHTML = this.randomValue;
    this.highScore.innerHTML =
      Number(this.highScore.innerHTML) + Number(this.guess.value);
    this.message.innerHTML = 'Correct number! 🏆';
    this.randomValue = this.randomizer();
  }

  missCorrectValue() {
    document.body.style.backgroundColor = '#222';
    this.score.innerHTML -= 1;
    if (this.guess.value === '') {
      this.message.innerHTML = 'Enter Number!';
    } else if (this.guess.value > this.randomValue) {
      this.message.innerHTML = 'Too Height!';
    } else if (this.guess.value < this.randomValue) {
      this.message.innerHTML = 'Too Low!';
    }
  }

  initSetup() {
    this.message.innerHTML = 'Start guessing...⏳';
    this.checkNum();
    this.checkInputValue();

    if (this.guess.value == this.randomValue) {
      this.winTheGame();
    } else if (this.score.innerHTML == 0) {
      this.gameOver();
    } else {
      this.correctNumber.innerHTML = '?';
      this.missCorrectValue();
    }
  }

  startGame() {
    this.check.addEventListener('click', this.initSetup);
  }

  gameOver() {
    this.check.removeEventListener('click', this.startGame);
    this.message.innerHTML = 'Game Over!💀';
  }

  restartGame() {
    this.check.addEventListener('click', this.startGame);
    this.score.innerHTML = 20;
    this.highScore.innerHTML = 0;
    document.body.style.backgroundColor = '#222';
    this.message.innerHTML = 'Start guessing...⏳';
  }

  checkInput(event) {
    this.guess.value = event.target.value;
    if (this.guess.value < 0) this.guess.value = 0;
    return Number(this.guess.value);
  }

  checkInputValue() {
    this.guess.addEventListener('input', this.checkInput);
  }

  checkNum() {
    if (this.score.innerHTML <= 0) {
      this.gameOver();
    }
    this.check.addEventListener('click', this.startGame);
    this.AGAIN.addEventListener('click', this.restartGame);
  }
}

let game = new Game('Guess My Number');
game.startGame();
