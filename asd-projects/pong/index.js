/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()


function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
   var BOARD_WIDTH = $('#board').width();
   var BOARD_HEIGHT = $('#board').height();

  var ARROWKEY = {
    "LEFT": 37,
    "UP": 38,
    "RIGHT": 39,
    "DOWN": 40,
    "W": 87,
    "A": 65,
    "S": 83,
    "D": 68
  }

   var positionX = 0;
   var positionY = 0;
   var speedX = 0;
   var speedY = 0;

  // Game Item Objects
  var ball = factory("#ball");
  var player1Paddle = factory("#player1Paddle");
  var player2Paddle = factory("#player2Paddle");
  var player1Score = factory("#player1Score");
  var player2Score = factory("#player2Score");

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on("keyup", handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    // update position of the game item
    repositionPaddle();
   
    // check for collisions
    checkForBorderCollisions();
  

  }

}

/* 
Called in response to events.
*/
function handleKeyDown(event) {
  // press up key ---> accelerate box in negative y
  changeSpeedY(-5, event.which, ARROWKEY.UP)

  changeSpeedY(-5, event.which, ARROWKEY.W)

  // press down key ---> accelerate box in positive y
  changeSpeedY(5, event.which, ARROWKEY.DOWN)

  changeSpeedY(5, event.which, ARROWKEY.S)

  // press left key ---> accelerate box in negative x 
  changeSpeedX(-5, event.which, ARROWKEY.LEFT)

  changeSpeedX(-5, event.which, ARROWKEY.A)

  // press right key ---> accelerate box in positive x
  changeSpeedX(5, event.which, ARROWKEY.RIGHT)

  changeSpeedX(5, event.which, ARROWKEY.D)


}

function handleKeyUp(event) {

  changeSpeedY(0, event.which, ARROWKEY.UP)
  changeSpeedY(0, event.which, ARROWKEY.W)

  changeSpeedY(0, event.which, ARROWKEY.DOWN)
  changeSpeedY(0, event.which, ARROWKEY.S)

  changeSpeedX(0, event.which, ARROWKEY.LEFT)
  changeSpeedX(0, event.which, ARROWKEY.A)

  changeSpeedX(0, event.which, ARROWKEY.RIGHT)
  changeSpeedX(0, event.which, ARROWKEY.D)

}

////////////////////////////////////////////////////////////////////////////////
////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function factory(id) {
  var element = {};
  element.id = id;
  element.width = $(id).width();
  element.height = $(id).height();
  element.x = parseFloat($(id).css('left'));
  element.y = parseFloat($(id).css('top'));
  element.speedX = 0;
  element.speedY = 0;
  return element;
}

function doCollide(square1, square2) {
  // TODO: calculate and store the remaining
  // sides of the square1
  square1.leftX = square1.x;
  square1.topY = square1.y;
  square1.rightX = square1.x + square1.width;
  square1.bottomY = square1.y + square1.height;
  // TODO: Do the same for square2
  square2.leftX = square2.x;
  square2.topY = square2.y;
  square2.rightX = square2.x + square2.width;
  square2.bottomY = square2.y + square2.height;
  // TODO: Return true if they are overlapping, false otherwise

  if ((square1.leftX < square2.rightX) &&
    (square1.rightX > square2.leftX) &&
    (square1.topY < square2.bottomY) &&
    (square1.bottomY > square2.topY)) {
    return true;
  }
  else {
    return false;
  }
}



function repositionPaddle() {
  positionX += speedX;
  $("#player1Paddle").css("left", positionX);

  positionY += speedY;
  $("#player1Paddle").css("top", positionY);
}


function changeSpeedY(newSpeed, keycode, arrowKey) {
  if (keycode === arrowKey) {
    speedY = newSpeed;
  }
}

function changeSpeedX(newSpeed, keycode, arrowKey) {
  if (keycode === arrowKey) {
    speedX = newSpeed;
  }
}


function checkForBorderCollisions() {
  if (positionX > BOARD_WIDTH - $("#player1Paddle").width()) {
    positionX = BOARD_WIDTH - $("#player1Paddle").width();
  }
  else if (positionX < 0) {
    positionX = 0;
  }
  if (positionY > BOARD_HEIGHT - $("#player1Paddle").height()) {
    positionY = BOARD_HEIGHT - $("#player1Paddle").height()
  }
  else if (positionY < 0) {
    positionY = 0;
  }
}


function endGame() {
  // stop the interval timer
  clearInterval(interval);

  // turn off event handlers
  $(document).off();
}
  
}
