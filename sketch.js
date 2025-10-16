let targetX =100;
let targetY =100;
let targetRadius = 150;
let score = 0;
let timeLeft = 30;
let gameRunning = false;
let timer;

function setup() {
  createCanvas(800, 800);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(24);
  resetTarget();
}

function draw() {
  background(240);
  drawTarget();

  // Вивід очок і часу  
  fill(0);
  text(`Очки: ${score}`, width / 2, 30);
  text(`Час: ${timeLeft}`, width / 2, 60);

  if (!gameRunning && timeLeft === 0) {
    fill(227, 38, 54);
    textSize(32);
     textAlign(RIGHT, TOP);
    text("Час вийшов!", width , 0 );
    textSize(24);
    
  }
}

function drawTarget() {
  // Зовнішнє чорне коло
  fill(0,0,0);
  ellipse(targetX, targetY, targetRadius * 4);

  // Біле коло //fill('red');
  fill(255,255,255);
  ellipse(targetX, targetY, targetRadius * 3);

  // Внутрішнє чорне коло
  fill(0,0,0);
  ellipse(targetX, targetY, targetRadius * 2);
  
  
  // Біле коло //fill('red');
  fill(255,255,255);
  ellipse(targetX, targetY, targetRadius / 1);

  // Червоне центр
  fill(255,0,0);
  ellipse(targetX, targetY, targetRadius / 3);
}
//Процес натискання
function mousePressed() {
  if (!gameRunning) return;

  let d = dist(mouseX, mouseY, targetX, targetY);
  if (d < targetRadius / 2) {
    score++;
    resetTarget();
  }
}
//Керування з клавіатури початок і оновити результат
function keyPressed() {
  if (keyCode === ENTER) {
    startGame();
  } else if (key === ' ') {
    togglePause();
  } else if (keyCode === ESCAPE) {
    resetGame();
  }
}

function startGame() {
  if (gameRunning) return;
  gameRunning = true;
  if (timeLeft <= 0) {
    timeLeft = 30;
    score = 0;
  }
  timer = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      stopGame();
    }
  }, 1000);
}

function stopGame() {
  gameRunning = false;
  clearInterval(timer);
}

function togglePause() {
  if (gameRunning) {
    stopGame();
  } else if (timeLeft > 0) {
    startGame();
  }
}

function resetGame() {
  stopGame();
  score = 0;
  timeLeft = 30;
  resetTarget();
}
//випадкове переміщення мішені
function resetTarget() {
  targetX = random(targetRadius * 1.5, width - targetRadius * 1.5);
  targetY = random(targetRadius * 1.5 + 60, height - targetRadius * 1.5);
}