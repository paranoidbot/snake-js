import {update as updateSnake, draw as drawSnake, reset as resetSnake,
  getSnakeHead, snakeIntersection, SNAKE_SPEED} from './snake.js';
import {update as updateFood, draw as drawFood, resetFood} from './food.js';
import {outsideGrid} from './grid.js';

let lastRenderTime = 0;
let gameboard = document.getElementById('gameboard');
let gameStatus = {
  gameOver: false, gamePaused: false,
  score: 0, highscore: 0
}
//Game loop
function main(currentTime) {
  if (gameStatus.gamePaused == true) {
    return
  }
  else if (gameStatus.gameOver == true){
    restartGame()
  }



  window.requestAnimationFrame(main)
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return


  lastRenderTime = currentTime

  update()
  draw()

}
window.requestAnimationFrame(main);

//Game Status
function update(){
  updateSnake();
  updateFood();
  checkDeath();
}

function draw() {
  gameboard.innerHTML = ''; //clean everything to redraw
  drawSnake(gameboard);
  drawFood(gameboard);
}

function checkDeath(){
  gameStatus.gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

export function incrementScore(){
  gameStatus.score = Number(document.getElementById('current-score-counter').innerHTML);
  gameStatus.score += 1;
  document.getElementById('current-score-counter').innerHTML = gameStatus.score;

  if (gameStatus.score > gameStatus.highscore){
    gameStatus.highscore = gameStatus.score
    document.getElementById('high-score-counter').innerHTML = gameStatus.score;
  }



}

//UI controls
window.pause = function pause(){
  gameStatus.gamePaused = true;
}

window.resume = function resume(){
  gameStatus.gamePaused = false;
  window.requestAnimationFrame(main);
}

window.restartGame = function restartGame(){
  document.getElementById('current-score-counter').innerHTML = 0;
  gameStatus.score = 0;
  gameboard.innerHTML = '';
  resetSnake();
  resetFood();
  if (gameStatus.gamePaused == true) {
    gameStatus.gamePaused = false;
    window.requestAnimationFrame(main);
  }

}
