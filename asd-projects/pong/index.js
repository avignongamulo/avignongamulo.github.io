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
  var BORDER_RADIUS = parseFloat($('#board').css("border-radius"));

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

var randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);


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
  $(document).on('keydown', handleKeyDown2);
  $(document).on("keyup", handleKeyUp2);
  
  startBall();
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    // update position of the game item
    repositionPaddle1();
    repositionPaddle2();
    repositionBall();
    
    startBall();
    // check for collisions
    checkForBorderCollisions(player1Paddle);
    checkForBorderCollisions(player2Paddle);
  }



  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    // press up key ---> accelerate box in negative y


    changeSpeedY1(-15, event.which, ARROWKEY.W)

    // press down key ---> accelerate box in positive y


    changeSpeedY1(15, event.which, ARROWKEY.S)


  }

  function handleKeyUp(event) {

// if key is released , set speed to 0
    changeSpeedY1(0, event.which, ARROWKEY.W)


    changeSpeedY1(0, event.which, ARROWKEY.S)




  }

  function handleKeyDown2(event) {
    // if up key is pressed, accelerate in negative y (go up)
    changeSpeedY2(-15, event.which, ARROWKEY.UP)

    // if up key is pressed, accelerate in positive y (go down)
    changeSpeedY2(15, event.which, ARROWKEY.DOWN)


  }

  function handleKeyUp2(event) {
    // if key is released set speed to 0
    changeSpeedY2(0, event.which, ARROWKEY.UP)
    changeSpeedY2(0, event.which, ARROWKEY.DOWN)

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



  function repositionPaddle1() {

    // setting x speed by adding xposition + speedx

    player1Paddle.x += player1Paddle.speedX;

    $(player1Paddle.id).css("left", player1Paddle.x);

    // setting y speed by adding yposition + speedY

    player1Paddle.y += player1Paddle.speedY;

    $(player1Paddle.id).css("top", player1Paddle.y);
  }
  function repositionPaddle2() {

    // setting x speed by adding xposition + speedx

    player2Paddle.x += player2Paddle.speedX;

    $(player2Paddle.id).css("left", player2Paddle.x);

    // setting y speed by adding yposition + speedY

    player2Paddle.y += player2Paddle.speedY;

    $(player2Paddle.id).css("top", player2Paddle.y);
  }


  function changeSpeedY1(newSpeed, keycode, arrowKey) {
    // if the key pressed is correct, update the paddle1 y speed
    if (keycode === arrowKey) {
      player1Paddle.speedY = newSpeed;
    }
  }
  function changeSpeedY2(newSpeed, keycode, arrowKey) {
    // if the key pressed is correct, update the paddle2 y speed
    if (keycode === arrowKey) {
      player2Paddle.speedY = newSpeed;
    }
  }



  function checkForBorderCollisions(gameItem) {
    // if the game items x position is greater than the boardwidth - the gameitemwidth , the game item cannot go past
    if (gameItem.x > BOARD_WIDTH - gameItem.width) {
      gameItem.x = BOARD_WIDTH - gameItem.width;
    }
    else if (gameItem.x < 0) {
      gameItem.x = 0;
    }

    // if the game items y position is greater than the boardheight - the gameitemheight - the borderradius divded by two , the game item cannot go past
    if (gameItem.y > BOARD_HEIGHT - gameItem.height - BORDER_RADIUS / 2) {
      gameItem.y = BOARD_HEIGHT - gameItem.height - BORDER_RADIUS / 2;
    }
    else if (gameItem.y < 0) {
      gameItem.y = 0;
    }
  }

  function startBall() {
    ball.x = parseFloat($(ball.id).css('left', 286));
    ball.y = parseFloat($(ball.id).css('top', 145));
    ball.speedX = randomNum;
    ball.speedY = randomNum;



  }

 function repositionBall(){
   
 }


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}
