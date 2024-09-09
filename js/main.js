//* ELEMENTOS PRINCIPALES DEL DOM

// pantallas
const splashScreenNode = document.querySelector("#splash-screen")
const gameScreenNode = document.querySelector("#game-screen")
const gameOverScreenNode = document.querySelector("#game-over-screen")

// botones
const startBtnNode = document.querySelector("#start-btn")

// game box
const gameBoxNode = document.querySelector("#game-box")


//* VARIABLES GLOBALES DEL JUEGO

let pollito = null;
let knifesArray = [];


//* FUNCIONES GLOBALES DEL JUEGO

function startGame() {

  // 1. Cambiar las pantallas
  splashScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";

  // 2. Añadir todos los elementos iniciales del juego
  pollito = new Pollito();

  // 3. Iniciar el intervalo de juego
  gameIntervalId = setInterval(() => {
    gameLoop();
  }, Math.round(1000/60)); // 60 fps
}

function gameLoop() {
  pollito.pollitoMovement();
  
  knifesArray.forEach((eachKnife) => {
    eachKnife.knifeMovement();
    checkIfKnifeLeft();
  })
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


//* EVENT LISTENERS

startBtnNode.addEventListener('click', startGame);

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