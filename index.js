/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top);

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;

    const rockLeftEdge = positionToInteger(rock.style.left);

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = positionToInteger(rock.style.left) + 20;

    if ( ( rockLeftEdge < dodgerLeftEdge  && rockRightEdge > dodgerLeftEdge ) ||
         ( rockLeftEdge > dodgerLeftEdge && rockRightEdge < dodgerRightEdge ) ||
         ( rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge ) ||
         ( rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge)) {
      return true;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  // Hmmm, why would we have used `var` here?
  var top = 0;

  rock.style.top = top;

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
  GAME.appendChild(rock);

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    rock.style.top = `${top += 2}px`;

    if ( top < 360 ) {
      window.requestAnimationFrame(moveRock);
    } else { 
      rock.remove()
    }

    if ( checkCollision(rock) === true ) {
       endGame();
     } /*else {
      if ( rock.style.top < 360 ) {
         moveRock();
       } else {
        $(GAME).detach(rock);
      }
     }*/
  }
  window.requestAnimationFrame(moveRock);

  ROCKS.push(rock);

  return rock;
}

function endGame() {

  clearInterval(gameInterval);
  window.removeEventListener('keydown', moveDodger);
  for ( let i in ROCKS ) {
    $(ROCKS.splice(i, 1));
  }
  alert("You LOSE!");
}

function moveDodger(e) {
  if ( e.which === LEFT_ARROW ) {
    e.stopPropagation();
    e.preventDefault();
    moveDodgerLeft();
  }
  if ( e.which === RIGHT_ARROW ) {
    e.preventDefault();
    moveDodgerRight();
  }
}

function moveDodgerLeft() {
  function step() {
    console.log(DODGER.style.left)
    var left = positionToInteger(DODGER.style.left);
    if(left < 180) DODGER.style.left = `${left - 4}px`;

  /*  if ( left > 0 ) {
       window.requestAnimationFrame(step);
     }*/
   }

   window.requestAnimationFrame(step);
}

function moveDodgerRight() {

  var left = positionToInteger(DODGER.style.left)-4;

  function step() {
    DODGER.style.left = `${left += 4}px`;

    if ( left < 360 ) {
       window.requestAnimationFrame(step);
     }
   }

   window.requestAnimationFrame(step);
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
