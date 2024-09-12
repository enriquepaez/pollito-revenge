//* ELEMENTOS PRINCIPALES DEL DOM

// pantallas
const splashScreenNode = document.getElementById("splash-screen");
const gameScreenNode = document.getElementById("game-screen");
const gameOverScreenNode = document.getElementById("game-over-screen");

// interfaz
const scoreDisplay = document.getElementById("score");
const timer = document.getElementById("timer");
const inputName = document.getElementById("name");
const gameOverImage = document.getElementById("game-over-image");
const h2Score = document.getElementById("h2-ranking");
const scoreRanking = document.getElementById("score-ranking");

// audio
const gameMusic = new Audio("./audio/game-music.mp3");
const stabSound = new Audio("./audio/stab-sound.wav");
const chickenSound = new Audio("./audio/chicken-sound.wav");

// botones
const startBtnNode = document.getElementById("start-btn");
const restartBtnNode = document.getElementById("restart-btn");
const musicPlayBtn = document.getElementById("music-play-btn");

// game box
const gameBoxNode = document.getElementById("game-box");


//* VARIABLES GLOBALES DEL JUEGO

let pollito = null;
let knifesArray = [];
let armsArray = [];
let enemiesArray = [];
let enemiesFrecuency = 500;
let score = 0;
let remainingTime = 30;
let playerName = "";
let totalScores = [];
let bestScores = [];

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
  scoreDisplay.innerHTML = `Puntuación: ${score}`;
  timer.innerText = `Tiempo restante: 00:${remainingTime}`;
  playerName = inputName.value;

  if (playerName === "") {
    playerName = "Desconocido";
  }

  // 3. Ajustar volúmenes de sonido e iniciar música
  gameMusic.volume = 0.05;
  stabSound.volume = 0.1;
  chickenSound.volume = 0.1;
  gameMusic.play();

  // 4. Iniciar el intervalo de juego
  gameIntervalId = setInterval(() => {
    gameLoop();
  }, Math.round(1000/60)); // 60 fps

  // 5. Iniciar otros intervalos que requiera el juego
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

  hitEnemy();
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

function hitEnemy() {
  enemiesArray.forEach((eachEnemy) => {

    knifesArray.forEach((eachKnife) => {
      if (
        eachKnife.x < eachEnemy.x + eachEnemy.w &&
        eachKnife.x + eachKnife.w > eachEnemy.x &&
        eachKnife.y < eachEnemy.y + eachEnemy.h &&
        eachKnife.y + eachKnife.h > eachEnemy.y
      ) { 
          stabSound.play();
          eachEnemy.life--;

          if (eachEnemy.type === "bob") {
            eachEnemy.node.src = "./images/bob-hit.png";
          }

          eachKnife.node.remove();
          knifesArray.splice(knifesArray.indexOf(eachKnife), 1);
        }
    });

    if (eachEnemy.life <= 0) {
      score += 5;
      scoreDisplay.innerHTML = `Puntuación: ${score}`;
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


  // 3. Preparar pantalla final
  const previousEndMessage = gameOverScreenNode.querySelector("h3");

  if (previousEndMessage) {
    previousEndMessage.remove();
  }

  const endMessage = document.createElement("h3");

  if (remainingTime <= 0) {
    score += 100;
    gameOverImage.setAttribute("src", "./images/winner.png")
    endMessage.innerText = `¡Victoria del pollito! La venganza se sirve caliente y el granjero no sabe lo que le espera.\n\n${playerName}, has conseguido ${score} puntos.`;
  } else {
    endMessage.innerText = `El pollito ha fracasado y lo han metido al horno. A veces la venganza no se sirve fría.\n\n${playerName}, has conseguido ${score} puntos.`;
  }

  gameOverScreenNode.insertBefore(endMessage, h2Score);
  scoreRanking.innerHTML = "";

  saveScore(playerName, score);
  showScores();

  // 4. Reiniciar todos los elementos del juego
  pollito = null;
  knifesArray = [];
  armsArray = [];
  enemiesArray = [];
  score = 0;
  remainingTime = 30;
  score.innerHTML = `Puntuación: ${score}`;
  timer.innerText = `Tiempo restante: 00:${remainingTime}`;
  gameMusic.pause();
  gameMusic.currentTime = 0;

  // 5. Cambiar de pantallas
  gameScreenNode.style.display = "none";
  gameOverScreenNode.style.display = "flex";
}

// * FUNCIONES PARA LOCALSTORAGE

function saveScore(name, score) {
  const newScore = { name, score };

  // Obtener puntuaciones existentes
  totalScores = JSON.parse(localStorage.getItem("total-scores")) || [];

  // Agregar la nueva puntuación
  totalScores.push(newScore);

  // Guardar en localStorage
  localStorage.setItem("total-scores", JSON.stringify(totalScores));
}

function showScores() {
  // Obtener las puntuaciones de localStorage
  const totalScores = JSON.parse(localStorage.getItem("total-scores")) || [];

  // Ordenar las puntuaciones de mayor a menor y sacar solo 10 primeras
  totalScores.sort((a, b) => b.score - a.score);
  bestScores = totalScores.slice(0, 5);

  // Mostrar las puntuaciones
  bestScores.forEach(eachScore => {
      const li = document.createElement('li');
      li.innerText = `${eachScore.name} - ${eachScore.score} puntos`;
      scoreRanking.appendChild(li);
  });
}


//* EVENT LISTENERS

// botones
startBtnNode.addEventListener("click", startGame);
restartBtnNode.addEventListener("click", startGame);

// controles
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

// audio
musicPlayBtn.addEventListener("click", () => {
  if (gameMusic.paused) {
    gameMusic.play();
  } else {
    gameMusic.pause();
  }
  
});
