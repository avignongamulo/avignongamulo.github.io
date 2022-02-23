/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  

function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
 var BOARD_WIDTH = $('#board').width();
 var BOARD_HEIGHT = $('#board').height();
 



  var ARROWKEY = {
    "LEFT": 37,
    "UP": 38,
    "RIGHT": 39,
    "DOWN" : 40
  }
  

  var positionX = 0;
  var positionY = 0;
  var speedX = 0;
  var speedY = 0;

  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
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
    repositionBox();
    // check for collisions
    checkForBorderCollisions();

  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    // press up key ---> accelerate box in negative y
    changeSpeedY(-5, event.which, ARROWKEY.UP)

    
    // press down key ---> accelerate box in positive y
    changeSpeedY(5, event.which, ARROWKEY.DOWN)

    
    // press left key ---> accelerate box in negative x 
    changeSpeedX(-5, event.which, ARROWKEY.LEFT)

  
    // press right key ---> accelerate box in positive x
    changeSpeedX(5, event.which, ARROWKEY.RIGHT)

    
   

  }

  function handleKeyUp(event) {
    
    changeSpeedY(0, event.which, ARROWKEY.UP)
   
    changeSpeedY(0, event.which, ARROWKEY.DOWN)
   
    changeSpeedX(0, event.which, ARROWKEY.LEFT)
    
    changeSpeedX(0, event.which, ARROWKEY.RIGHT)
   

  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function repositionBox(){
    positionX += speedX;
    $("#walker").css("left", positionX);

    positionY += speedY;
    $("#walker").css("top", positionY);
  }
 

  function changeSpeedY(newSpeed, keycode, arrowKey){
    if (keycode === arrowKey){
      speedY = newSpeed;
  }
}

  function changeSpeedX(newSpeed, keycode, arrowKey){
    if (keycode === arrowKey){
      speedX = newSpeed;
  }
}

function checkForBorderCollisions(){
  if (positionX > BOARD_WIDTH - $("#walker").width()){
    positionX = BOARD_WIDTH - $("#walker").width();
  }
  else if (positionX < 0){
   positionX = 0;
  }
  if (positionY > BOARD_HEIGHT - $("#walker").height()){
    positionY = BOARD_HEIGHT - $("#walker").height()
  }
  else if (positionY < 0){
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
