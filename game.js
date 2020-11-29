import {update as updateSnake, draw as drawSnake, reset as resetSnake,
  getSnakeHead, snakeIntersection, SNAKE_SPEED} from './snake.js';
import {update as updateFood, draw as drawFood, resetFood} from './food.js';
import {outsideGrid} from './grid.js';

let lastRenderTime = 0;
let gameboard = document.getElementById('gameboard');
let gameStatus = { gameOver: false, gamePaused: false}

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

window.pause = function pause(){
  gameStatus.gamePaused = true;
}

window.resume = function resume(){
  gameStatus.gamePaused = false;
  window.requestAnimationFrame(main);
}

window.restartGame = function restartGame(){

  gameboard.innerHTML = '';
  resetSnake();
  resetFood();
  if (gameStatus.gamePaused == true) {
    gameStatus.gamePaused = false;
    window.requestAnimationFrame(main);
  }
}
