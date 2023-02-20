let moles = [];
let score = 0;
let timeSpan;

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
  hMole = loadImage('images/happyBobaBee.gif');
  sMole = loadImage('images/sadBobaBee.gif');
  owSong = loadSound('audio/ow.mp3');
  wrongSong = loadSound('audio/wrong.mp3');
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
  
  for (let i = 0; i < 3; i++){
    moles.push(new Mole());
  }
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
  updateScore();
  
  for (let i = 0; i < moles.length; i++){
    let timeSpan = moles[i].timeSpan;
    
    if (moles[i].counter < timeSpan) { //delay before appearance
      moles[i].counter++; 
    } else if (moles[i].counter >= timeSpan && moles[i].counter < timeSpan * 2) { //appearance
      moles[i].drawMole(); 
    } else { // if over time, disappear
      moles.push(new Mole());
      moles.splice(i,1);
    }
  }
}

function mousePressed() {
  for (let i = 0; i < moles.length; i++){
    const disX = (moles[i].x + moles[i].size / 2) - mouseX;
    const disY = (moles[i].y + moles[i].size / 2) - mouseY;
    
    if (sqrt(sq(disX) + sq(disY)) <= moles[i].size / 2) {
      if (moles[i].type != 0) {
        currentScore++; 
        wrongSong.play();
      } else {
        lives--;
        owSong.play();
      }
      moles.push(new Mole());
      moles.splice(i,1);
    } else {
      //owSong.play();
    }
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
  text(life, windowWidth/11, 30)
  text("Score: " + currentScore, windowWidth/11, 60);
  textAlign(CENTER);
  image(sMole, windowWidth/2, windowHeight-75, 30, 30);
  textSize(13);
  text("whack the SAD bees", windowWidth/2, windowHeight - 30);
  text("Whack-A-Bee", windowWidth/2, 30);
  textAlign(RIGHT);
  textSize(20);
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
  image(sMole, width/8, height/3*2, 200, 200);
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
  
class Mole {
  constructor() {
    this.timeSpan = int(random(50, 300));
    this.size = 60;
    this.x = random(xPos);
    this.y = random(yPos);
    this.type = int(random(2)); //determine happy or sad
    this.counter = 0;
  }
  
  drawMole() {
    if(this.type == 0) {
      image(hMole, this.x, this.y, this.size, this.size);
    } else {
      image(sMole, this.x, this.y, this.size, this.size);  
    }
    this.counter++;
  }
}