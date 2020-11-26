import {update as updateSnake, draw as drawSnake,
  getSnakeHead, snakeIntersection, SNAKE_SPEED} from './snake.js';
import {update as updateFood, draw as drawFood} from './food.js';
import {outsideGrid} from './grid.js';

let lastRenderTime = 0;
let gameboard = document.getElementById('gameboard');
let gameOver = false;

//Game loop
function main(currentTime) {
  if (gameOver) {
    if (confirm('You lost. Press ok to restart.')) {
      window.location.reload();
    }
    return
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
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
