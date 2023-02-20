let moleX, moleY, moleSize;
let currentScore, highScore, lives; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  updateMole();
  textSize(20);
  
  currentScore = 0;
  highScore = 0;
  lives = 3;
  
  moleX = 200;
  moleY = 200;
  moleSize = 50;  
}

function draw() {
  playGame();
}

function playGame() {
  fill(0);
  background(200,200,300);
  rect(moleX, moleY, moleSize);
  updateScore();
}

function mousePressed() {
  const disX = (moleX+moleSize/2) - mouseX;
  const disY = (moleY+moleSize/2) - mouseY;
  
  // if mole is clicked, increment score
  if (sqrt(sq(disX) + sq(disY)) < moleSize / 2) {
    updateMole();
    currentScore += 1;
  } else {
    lives--;
  }
}

function updateMole() {
  moleX = random(50, windowHeight/2);
  moleY = random(50, windowHeight/2);
}

function updateScore() {
  // display lives and score
  textAlign(LEFT);
  text("Lives: " + lives, 30, 30)
  text("Score: " + currentScore, 30, 60);
  textAlign(RIGHT);
  text("High Score: " + highScore, windowWidth/7*6, 30);
    
  // update high score
  checkScore();
  
  if (lives == 0) {
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
  }
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
}

function checkScore() {
  if (currentScore > highScore) {
    highScore = currentScore;
  }
}