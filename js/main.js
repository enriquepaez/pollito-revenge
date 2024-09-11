//* ELEMENTOS PRINCIPALES DEL DOM

// pantallas
const splashScreenNode = document.querySelector("#splash-screen")
const gameScreenNode = document.querySelector("#game-screen")
const gameOverScreenNode = document.querySelector("#game-over-screen")

// interfaz
const pointsDiv = document.getElementById("points");
const timer = document.getElementById("timer");

// botones
const startBtnNode = document.querySelector("#start-btn")
const restartBtnNode = document.querySelector("#restart-btn")

// game box
const gameBoxNode = document.querySelector("#game-box")


//* VARIABLES GLOBALES DEL JUEGO

let pollito = null;
let knifesArray = [];
let armsArray = [];
let enemiesArray = [];
let enemiesFrecuency = 500;
let points = 0;
let remainingTime = 59;

let gameIntervalId = null;
let enemiesIntervalId = null;
let armsIntervalId = null;
let timerIntervalId = null;

//* FUNCIONES GLOBALES DEL JUEGO

function startGame() {

  // 1. Cambiar las pantallas
  splashScreenNode.style.display = "none";
  gameOverScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";

  // 2. Añadir todos los elementos iniciales del juego
  pollito = new Pollito();

  // 3. Iniciar el intervalo de juego
  gameIntervalId = setInterval(() => {
    gameLoop();
  }, Math.round(1000/60)); // 60 fps

  // 4. Iniciar otros intervalos que requiera el juego
  enemiesIntervalId = setInterval(() => {
    createEnemy();
  }, enemiesFrecuency);

  armsIntervalId = setInterval (() => {
    enemiesArray.forEach((enemy) => {
      enemy.throwArm();
    });
  }, 1000);

  timerIntervalId = setInterval(() => {
    timer.innerText = `Tiempo restante: 00:${remainingTime}`;
    remainingTime--;

    if (remainingTime <= 0) {
      gameOver();
    }
  }, 1000);
}

function gameLoop() {

  pollito.pollitoMovement();
  pollito.detectCollision(enemiesArray);
  pollito.detectCollision(armsArray);
  
  knifesArray.forEach((eachKnife) => {
    eachKnife.proyectileMovement();
    checkIfObjectLeft(knifesArray);
  })

  enemiesArray.forEach((eachEnemy) => {
    eachEnemy.enemyMovement();
    checkIfObjectLeft(enemiesArray);
  })

  armsArray.forEach((eachArm) => {
    eachArm.proyectileMovement();
    checkIfObjectLeft(armsArray);
  })

  killEnemy();
}

function checkIfObjectLeft(array) {

  if (array.length === 0) {
    return;
  }

  if ((array[0].y <= 0) ||
      (array[0].y >= gameBoxNode.offsetHeight) ||
      (array[0].x <= 0) ||
      (array[0].x >= gameBoxNode.offsetWidth)) {
    
    array[0].node.remove();
    array.shift();
  }
}

function createEnemy() {
  let xRange = 0;
  let yRange = 0;
  let newEnemy = null;
  let startPosition = null;

  let enemyType = null;
  let randomType = Math.floor(Math.random() * 3);
  
  if (randomType === 0) {
    enemyType = "potato";
  } else if (randomType === 1) {
    enemyType = "naruto";
  } else if (randomType === 2) {
    enemyType = "bob";
  }

  let randomPosition = Math.floor(Math.random() * 4);

  if (randomPosition === 0) {
    xRange = Math.floor(Math.random() * (gameBoxNode.offsetWidth - 40));
    yRange = 0;
    startPosition = "top";

  } else if (randomPosition === 1) {
    xRange = Math.floor(Math.random() * (gameBoxNode.offsetWidth - 40));
    yRange = gameBoxNode.offsetHeight;
    startPosition = "bottom";

  } else if (randomPosition === 2) {
    xRange = 0;
    yRange = Math.floor(Math.random() * (gameBoxNode.offsetHeight - 40));
    startPosition = "left";
    
  } else if (randomPosition === 3) {
    xRange = gameBoxNode.offsetWidth;
    yRange = Math.floor(Math.random() * (gameBoxNode.offsetHeight - 40));
    startPosition = "right";
  }

  newEnemy = new Enemy(xRange, yRange, startPosition, enemyType);
  enemiesArray.push(newEnemy);
}

function killEnemy() {
  enemiesArray.forEach((eachEnemy) => {

    knifesArray.forEach((eachKnife) => {
      if (
        eachKnife.x < eachEnemy.x + eachEnemy.w &&
        eachKnife.x + eachKnife.w > eachEnemy.x &&
        eachKnife.y < eachEnemy.y + eachEnemy.h &&
        eachKnife.y + eachKnife.h > eachEnemy.y
      ) {
          eachEnemy.life--;
          eachKnife.node.remove();
          knifesArray.splice(knifesArray.indexOf(eachKnife), 1);
        }
    });

    if (eachEnemy.life <= 0) {
      points += 5;
      pointsDiv.innerHTML = `Puntuación: ${points}`;
      eachEnemy.node.remove();
      enemiesArray.splice(enemiesArray.indexOf(eachEnemy), 1);
    }
  });
}

function gameOver() {

  // 1. Limpiar los intervalos
  clearInterval(gameIntervalId);
  clearInterval(enemiesIntervalId);
  clearInterval(armsIntervalId);
  clearInterval(timerIntervalId);

  // 2. Limpiar la caja de juego
  gameBoxNode.innerHTML = "";

  // 3. Reiniciar todos los elementos del juego
  pollito = null;
  knifesArray = [];
  armsArray = [];
  enemiesArray = [];
  points = 0;
  remainingTime = 59;
  pointsDiv.innerHTML = `Puntuación: ${points}`;
  timer.innerText = `Tiempo restante: 00:${remainingTime}`;


  // 4. Cambiar de pantallas
  gameScreenNode.style.display = "none";
  gameOverScreenNode.style.display = "flex";
}


//* EVENT LISTENERS

startBtnNode.addEventListener("click", startGame);
restartBtnNode.addEventListener("click", startGame);

window.addEventListener("keydown", (event) => {
  if (event.key === "w") {
    pollito.keys.up = true;
  } else if (event.key === "s") {
    pollito.keys.down = true;
  } else if (event.key === "d") {
    pollito.keys.right = true;
  } else if (event.key === "a") {
    pollito.keys.left = true;
  } else if (event.key === "ArrowUp") {
    pollito.throwKnife("up");
  } else if (event.key === "ArrowDown") {
    pollito.throwKnife("down");
  } else if (event.key === "ArrowLeft") {
    pollito.throwKnife("left");
  } else if (event.key === "ArrowRight") {
    pollito.throwKnife("right");
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key === "w") {
    pollito.keys.up = false;
  } else if (event.key === "s") {
    pollito.keys.down = false;
  } else if (event.key === "a") {
    pollito.keys.left = false;
  } else if (event.key === "d") {
    pollito.keys.right = false;
  }
});
