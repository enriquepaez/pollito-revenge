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
  })
}



//* EVENT LISTENERS

startBtnNode.addEventListener('click', startGame);

window.addEventListener("keydown", (event) => {
  if (event.key === "w" || event.key === "ArrowUp") {
    pollito.keys.up = true;
  } else if (event.key === "s" || event.key === "ArrowDown") {
    pollito.keys.down = true;
  } else if (event.key === "d" || event.key === "ArrowRight") {
    pollito.keys.right = true;
  } else if (event.key === "a" || event.key === "ArrowLeft") {
    pollito.keys.left = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key === "w" || event.key === "ArrowUp") {
    pollito.keys.up = false;
  } else if (event.key === "s" || event.key === "ArrowDown") {
    pollito.keys.down = false;
  } else if (event.key === "d" || event.key === "ArrowRight") {
    pollito.keys.right = false;
  } else if (event.key === "a" || event.key === "ArrowLeft") {
    pollito.keys.left = false;
  }
});

window.addEventListener("click", (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  if (pollito) {
    pollito.throwKnife(mouseX, mouseY);
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