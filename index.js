let moleX, moleY, moleSize;
let randX, randY, xPos, yPos, molePosition;
let currentScore, highScore, lives, gameOver; 
let resetTime = 0;
let timeDuration = 0;
let counter = 0;
let song;
let noLives = "Lives: 💔 💔 💔";
let oneLife = "Lives: ❤️‍🔥 💔 💔";
let twoLives = "Lives: ❤️‍🔥 ❤️‍🔥 💔";
let threeLives = "Lives: ❤️‍🔥 ❤️‍🔥 ❤️‍🔥";

function preload() {
  mole = loadImage('happyBobaBee.gif');
  owSong = loadSound('ow.mp3');
  wrongSong = loadSound('wrong.mp3');
  sad = loadImage('sadBobaBee.gif');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(20);
  
  currentScore = 0;
  highScore = 0;
  lives = 3;

  newPos = true;
  moleSize = 60;  
  xPos = [windowWidth/3, windowWidth/2, windowWidth/3*2];
  yPos = [windowHeight/3, windowHeight/2, windowHeight/3*2];
  moleX = xPos[1];
  moleY = yPos[1];
  gameOver = false;
}

function draw() {
  if (!gameOver) {
    playGame();
  }
}

function playGame() {
  fill(0);
  background(200,200,300);
  drawGrid();
  image(mole, moleX, moleY, moleSize, moleSize);
  updateScore();
  
  if (checkTime()) {
    updateMole();
  }
}

function checkTime() {
  if (millis() > resetTime + timeDuration) {
    resetTime = millis();
    timeDuration = random(3)*1000;
    counter = 0;
    return true;
  } else {
    counter++;
  }
}

function updateMole() {
  //image(mole, -50, -50, moleSize, moleSize);
  moleX = random(xPos);
  moleY = random(yPos);
  image(mole, moleX, moleY, moleSize, moleSize);
}


function mousePressed() {
  const disX = (moleX + moleSize / 2) - mouseX;
  const disY = (moleY + moleSize / 2) - mouseY;
  
  // if mole is clicked, increment score
  if (sqrt(sq(disX) + sq(disY)) < moleSize / 2) {
    currentScore += 1;
    owSong.play();
  } else {
    lives--;
    wrongSong.play();
  }
}

function drawGrid() {
  for (var i = 0; i < xPos.length; i++) {
    for (var j = 0; j < xPos.length; j++) {
      rect(xPos[i], yPos[j] + moleSize - 20, moleSize, 20, 25);
    }
  }
}

function updateScore() {
  // display lives and score
  textAlign(LEFT);
  checkLives();
  text(life, windowWidth/11, 30);
  text("Score: " + currentScore, windowWidth/11, 60);
  textAlign(CENTER);
  text("Whack-A-Mole", windowWidth/2, 30);
  textAlign(RIGHT);
  text("High Score: " + highScore, windowWidth/11*10, 30);
    
  // update high score
  checkScore();
  
  if (lives == 0) {
    endGame();
  }
}

function checkLives() {
  if (lives == 3) {
    life = threeLives;
  } else if (lives == 2) {
    life = twoLives;
  } else if (lives == 1) {
    life = oneLife;
  } else {
    life = noLives;
  }
}

function endGame() {
  gameOver = true;
  background(0);
  fill(255);
  textAlign(CENTER);
  textSize(40);
  fill('red');
  text("Game Over 😔", width/2, height/3);
  textSize(20);
  fill(255);
  text("Your High Score: " + highScore, width/2, height/2);
  text("Press space to play again!", width/2, height/3*2);
  image(sad, width/8, height/3*2, 200, 200);
}
  
function keyPressed() {
  if (keyCode == 32) {
    restart();
    playGame();
  } else if (keyCode == 82) {
    restart();
    playGame();
  }
}

function restart() {
  lives = 3;
  currentScore = 0;
  gameOver = false;
}

function checkScore() {
  if (currentScore > highScore) {
    highScore = currentScore;
  }
}
