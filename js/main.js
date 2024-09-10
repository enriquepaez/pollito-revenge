//* ELEMENTOS PRINCIPALES DEL DOM

// pantallas
const splashScreenNode = document.querySelector("#splash-screen")
const gameScreenNode = document.querySelector("#game-screen")
const gameOverScreenNode = document.querySelector("#game-over-screen")

// botones
const startBtnNode = document.querySelector("#start-btn")
const restartBtnNode = document.querySelector("#restart-btn")

// game box
const gameBoxNode = document.querySelector("#game-box")


//* VARIABLES GLOBALES DEL JUEGO

let pollito = null;
let knifesArray = [];
let enemiesArray = [];
let enemiesFrecuency = 500;

let gameIntervalId = null;
let enemiesIntervalId = null;

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
}

function gameLoop() {

  pollito.pollitoMovement();
  
  knifesArray.forEach((eachKnife) => {
    eachKnife.knifeMovement();
    checkIfKnifeLeft();
  })

  enemiesArray.forEach((eachEnemy) => {
    eachEnemy.enemyMovement();
    checkIfEnemyLeft();
  })

  detectCollisionWithEnemy();
  killEnemy();
}

function checkIfKnifeLeft() {

  if (knifesArray.length === 0) {
    return;
  }

  if ((knifesArray[0].y <= 0) ||
      (knifesArray[0].y >= gameBoxNode.offsetHeight) ||
      (knifesArray[0].x <= 0) ||
      (knifesArray[0].x >= gameBoxNode.offsetWidth)) {
    
    knifesArray[0].node.remove();
    knifesArray.shift();
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

function checkIfEnemyLeft() {

  if (enemiesArray.length === 0) {
    return;
  }

  if ((enemiesArray[0].y <= 0) ||
      (enemiesArray[0].y >= gameBoxNode.offsetHeight) ||
      (enemiesArray[0].x <= 0) ||
      (enemiesArray[0].x >= gameBoxNode.offsetWidth)) {
    
    enemiesArray[0].node.remove();
    enemiesArray.shift();
  }
}

function detectCollisionWithEnemy() {

  enemiesArray.forEach((eachEnemy) => {

    if (
      pollito.x < eachEnemy.x + eachEnemy.w &&
      pollito.x + pollito.w > eachEnemy.x &&
      pollito.y < eachEnemy.y + eachEnemy.h &&
      pollito.y + pollito.h > eachEnemy.y
    ) {
      gameOver();
    }
  })
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
      console.log("muerto");
      eachEnemy.node.remove();
      enemiesArray.splice(enemiesArray.indexOf(eachEnemy), 1);
    }
  });
}

function gameOver() {

  // 1. Limpiar los intervalos
  clearInterval(gameIntervalId);
  clearInterval(enemiesIntervalId);

  // 2. Limpiar la caja de juego
  gameBoxNode.innerHTML = "";

  // 3. Reiniciar todos los elementos del juego
  pollito = null;
  knifesArray = [];
  enemiesArray = [];

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




//* PLANIFICACION

// crear caja de juego
// crear pantalla inicio
// crear pantalla juego
// crear pantalla final

// hacer imagen

// pollito (x, y, w, h)
// enemigos (x, y, w, h)

// el pollito aparece una vez al inicio del juego
// aparecen enemigos

// colisiones pollito contra enemigos (game over)

// movimiento del pollito
// movimiento enemigos

// score => por tiempo


// *BONUS

// incrementar dificultad (enemigos mas rapidos, mas enemigos)
// mejoras para el personaje
// enemigos se mueven hacia jugador