import  {onSnake, expandSnake} from './snake.js';
import {randomGridPosition} from './grid.js';
import {incrementScore} from './game.js';

let food = getRandomFoodPosition();
const EXPANSION_RATE = 1;

export function update(){
  if(onSnake(food)){
      expandSnake(EXPANSION_RATE);
      food = getRandomFoodPosition();
      incrementScore();
    }

}

export function draw(gameboard){

    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameboard.appendChild(foodElement);

}
export function resetFood() {
  food = getRandomFoodPosition();
}

function getRandomFoodPosition() {
  let newFoodPosition;

  while(newFoodPosition == null || onSnake(newFoodPosition)){
    newFoodPosition = randomGridPosition()
  }
  return newFoodPosition;
}
