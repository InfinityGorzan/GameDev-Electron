
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}

var modal = document.getElementById("clrsmodal");
var btn = document.getElementById("colors");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

    // Game variables
    var tileSize = 20;
var canvasWidth = Math.floor(window.innerWidth / tileSize);
var canvasHeight = Math.floor((window.innerHeight - (5 * parseFloat(getComputedStyle(document.documentElement).fontSize) + 90)) / tileSize);
    var snake;
    var apples = [];
    var score = 0;
    var scoreElement = document.getElementById("score");
    var red = document.getElementById("red")
    var orange = document.getElementById("orange")
    var yellow = document.getElementById("yellow")
    var green = document.getElementById("green")
    var blue = document.getElementById("blue")
    var pink = document.getElementById("pink")
    var purple = document.getElementById("purple")
    var invertDT = document.getElementById("invertDT")

    var gcolor = "invertDT";

    red.onclick = function() {
    gcolor = "red";
  startGame("red");
  modal.style.display = "none";
};
orange.onclick = function() {
  gcolor = "orange";
  startGame("orange");
  modal.style.display = "none";
};
yellow.onclick = function() {
  gcolor = "yellow";
  startGame("yellow");
  modal.style.display = "none";
};
green.onclick = function() {
  gcolor = "green";
  startGame("green");
  modal.style.display = "none";
};
blue.onclick = function() {
  gcolor = "blue";
  startGame("blue");
  modal.style.display = "none";
};
pink.onclick = function() {
  gcolor = "pink";
  startGame("pink");
  modal.style.display = "none";
};
purple.onclick = function() {
  gcolor = "purple";
  startGame("purple");
  modal.style.display = "none";
};
invertDT.onclick = function() {
  gcolor = "invertDT";
  startGame("invertDT");
  modal.style.display = "none";
};

    function isDarkMode() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      }

    // Direction constants
    var UP = "up";
    var DOWN = "down";
    var LEFT = "left";
    var RIGHT = "right";

    // Initial game setup
    function startGame(color) {
      gameBoard.style.width = canvasWidth * tileSize + "px";
      gameBoard.style.height = canvasHeight * tileSize + "px";
      score = -1; // Start at 0
      scoreElement.textContent = "Score: " + score;
      snake = new Snake(color);
      snake.draw();
      createApple();
      drawApples();
    }

    // Snake constructor
    function Snake(color) {
      this.x = Math.floor(canvasWidth / 2);
      this.y = Math.floor(canvasHeight / 2);
      this.xSpeed = 0;
      this.ySpeed = 0;
      this.tail = 1;
      this.tailPositions = [];

      // Update snake position
      this.update = function() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        // Check collision with walls
        if (this.x < 0 || this.x >= canvasWidth || this.y < 0 || this.y >= canvasHeight) {
          gameOver();
        }

          // Check collision with apple
  if (isColliding(this.x, this.y, apples[0])) {
    this.tail++;
    createApple();
  }

// Check collision with tail
for (var i = 0; i < this.tailPositions.length - 1; i++) {
  var pos = this.tailPositions[i];
  if (pos[0] === this.x && pos[1] === this.y) {
    gameOver();
  }     
}


        // Add current position to tailPositions
        this.tailPositions.push([this.x, this.y]);

        // Remove old tail positions
        while (this.tailPositions.length > this.tail) {
          this.tailPositions.shift();
        }

        // Check collision with apples
        for (var i = 0; i < apples.length; i++) {
          var apple = apples[i];
          if (apple.x === this.x && apple.y === this.y) {
            this.tail++;
            apples.splice(i, 1);
            createApple();
          }
        }

        scoreElement.textContent = "Score: " + score;
      };

      document.getElementById("invertDeviceTheme").innerText = isDarkMode() ? "White" : "Black"

      // Draw snake on the game board
      this.draw = function() {
        var gameBoard = document.getElementById("game-board");
        gameBoard.innerHTML = "";

        for (var i = 0; i < this.tailPositions.length; i++) {
          var pos = this.tailPositions[i];
          var snakePart = document.createElement("div");
          snakePart.style.width = tileSize + "px";
          snakePart.style.height = tileSize + "px";
          if (color == "invertDT") {
            snakePart.style.backgroundColor = isDarkMode() ? "#ddd" : "#333";
          } else {
            snakePart.style.backgroundColor = color;
          }

          snakePart.style.position = "absolute";
          snakePart.style.left = pos[0] * tileSize + "px";
          snakePart.style.top = pos[1] * tileSize + "px";
          gameBoard.appendChild(snakePart);
        }
      };

      // Change snake direction
      this.changeDirection = function(newDirection) {
        switch (newDirection) {
          case UP:
            if (this.ySpeed !== 1) {
              this.xSpeed = 0;
              this.ySpeed = -1;

            }
            break;
          case DOWN:
            if (this.ySpeed !== -1) {
              this.xSpeed = 0;
              this.ySpeed = 1;

            }
            break;
          case LEFT:
            if (this.xSpeed !== 1) {
              this.xSpeed = -1;
              this.ySpeed = 0;

            }
            break;
          case RIGHT:
            if (this.xSpeed !== -1) {
              this.xSpeed = 1;
              this.ySpeed = 0;

            }
            break;
        }
      };
    }

    // Apple constructor
    function Apple(x, y) {
  this.x = x;
  this.y = y;

  // Draw apple on the game board
  this.draw = function() {
    var gameBoard = document.getElementById("game-board");
    var appleElement = document.createElement("img");
    appleElement.src = "apple.png";
    appleElement.style.width = tileSize + "px";
    appleElement.style.height = tileSize + "px";
    appleElement.style.position = "absolute";
    appleElement.style.left = this.x * tileSize + "px";
    appleElement.style.top = this.y * tileSize + "px";
    gameBoard.appendChild(appleElement);
  };
}

    // Add touch event listeners to the game board element
var gameBoard = document.getElementById("game-board");
gameBoard.addEventListener("touchstart", handleTouchStart);
gameBoard.addEventListener("touchmove", handleTouchMove);


    // Create a single apple at a random position
function createApple() {
  var apple = new Apple(
    Math.floor(Math.random() * canvasWidth),
    Math.floor(Math.random() * canvasHeight)
  );

  // Check collision with snake
  while (isColliding(apple.x, apple.y, snake)) {
    apple.x = Math.floor(Math.random() * canvasWidth);
    apple.y = Math.floor(Math.random() * canvasHeight);
  }

  // Check collision with walls
  if (apple.x < 0 || apple.x >= canvasWidth || apple.y < 0 || apple.y >= canvasHeight) {
    createApple(); // If the apple is outside the boundaries, try again
  } else {
    apples = [apple];
  }

  score++;
  scoreElement.textContent = "Score: " + score;
}


    // Check collision between two objects
    function isColliding(x, y, obj) {
      return x === obj.x && y === obj.y;
    }

// Draw all the apples on the game board
function drawApples() {
  for (var i = 0; i < apples.length; i++) {
    var apple = apples[i];
    apple.draw();
  }
}

function gameOver() {
      alert("Game Over! Your score is " + score);
      score = 0;
      scoreElement.textContent = "Score: " + score;
      startGame(gcolor);
    }

// Change snake direction
this.changeDirection = function(newDirection) {
  switch (newDirection) {
    case UP:
      if (this.ySpeed !== 1 || this.tail === 1) {
        this.xSpeed = 0;
        this.ySpeed = -1;
      }
      break;
    case DOWN:
      if (this.ySpeed !== -1 || this.tail === 1) {
        this.xSpeed = 0;
        this.ySpeed = 1;
      }
      break;
    case LEFT:
      if (this.xSpeed !== 1 || this.tail === 1) {
        this.xSpeed = -1;
        this.ySpeed = 0;
      }
      break;
    case RIGHT:
      if (this.xSpeed !== -1 || this.tail === 1) {
        this.xSpeed = 1;
        this.ySpeed = 0;
      }
      break;
  }
};

// Handle keyboard events
window.addEventListener("keydown", function(event) {
  var key = event.keyCode;

  if (key === 38) {
    snake.changeDirection(UP);
  } else if (key === 40) {
    snake.changeDirection(DOWN);
  } else if (key === 37) {
    snake.changeDirection(LEFT);
  } else if (key === 39) {
    snake.changeDirection(RIGHT);
  }
});
function updateGamepad() {
  var gamepads = navigator.getGamepads();
  
  // Iterate over connected gamepads
  for (var i = 0; i < gamepads.length; i++) {
    var gamepad = gamepads[i];
    
    if (gamepad) {
    var axes = gamepad.axes;
  var xAxis = axes[0];
  var yAxis = axes[1];

  // Determine the direction based on analog stick values
  var direction = "";

  if (xAxis < -0.5) {
    direction = LEFT;
  } else if (xAxis > 0.5) {
    direction = RIGHT;
  }

  if (yAxis < -0.5) {
    direction = UP;
  } else if (yAxis > 0.5) {
    direction = DOWN;
  }

  snake.changeDirection(direction)
    }
  }
  
  requestAnimationFrame(updateGamepad);
}

// Start the update loop
updateGamepad();

    // Game loop
    function gameLoop() {
      snake.update();
      snake.draw();
      drawApples();

      setTimeout(gameLoop, 100);
    }

    // Touch event handlers
var xStart = null;
var yStart = null;

function handleTouchStart(event) {
  var touch = event.touches[0];
  xStart = touch.clientX;
  yStart = touch.clientY;
}

function handleTouchMove(event) {
  if (!xStart || !yStart) {
    return;
  }

  var touch = event.touches[0];
  var xEnd = touch.clientX;
  var yEnd = touch.clientY;
  var xDiff = xEnd - xStart;
  var yDiff = yEnd - yStart;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      snake.changeDirection(RIGHT);
    } else {
      snake.changeDirection(LEFT);
    }
  } else {
    if (yDiff > 0) {
      snake.changeDirection(DOWN);
    } else {
      snake.changeDirection(UP);
    }
  }

  // Reset touch start coordinates
  xStart = null;
  yStart = null;

  // Prevent scrolling the page
  event.preventDefault();
}

    // Start the game
    startGame("invertDT");
    gameLoop();