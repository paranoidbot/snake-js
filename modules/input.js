let inputDirection = { x:0, y:0};
let lastInputDirection = {x:0, y:0};

//change direction according to input
window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp':
      if (lastInputDirection.y !== 0) break;
      inputDirection = {x:0, y:-1};
      break;
    case 'ArrowDown':
        if (lastInputDirection.y !== 0) break;
        inputDirection = {x:0, y:1}
        break;
    case 'ArrowLeft':
      if (lastInputDirection.x !== 0) break;
      inputDirection = {x:-1, y:0}
      break;
    case 'ArrowRight':
    if (lastInputDirection.x !== 0) break;
      inputDirection = {x:1, y:0}
    default:

  }
})

export function getInputDirection(){
  lastInputDirection = inputDirection; //this prevents the snake makin 180 degrees turns
  return inputDirection;
}

export function reset() {
  inputDirection = { x:0, y:0};
  lastInputDirection = {x:0, y:0};
}
