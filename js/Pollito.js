class Pollito {

  constructor() {

    this.x = 300;
    this.y = 200;
    this.h = 30;
    this.w = 30;
    this.speed = 10;
    this.canThrowKnife = true;
    this.lastKnifeDirection = null;
    this.keys = {
      up: false,
      down: false,
      right: false,
      left: false,
    };

    this.node = document.createElement("img");
    this.node.src = "./images/baby-chicken.png";
    gameBoxNode.append(this.node);

    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;
    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  }

  pollitoMovement() {
    if (this.keys.up && this.y >= 0) {
      this.y -= this.speed;
    }
    if (this.keys.down && this.y <= (gameBoxNode.offsetHeight - this.h)) {
      this.y += this.speed;
    }
    if (this.keys.left && this.x >= 0) {
      this.x -= this.speed;
    }
    if (this.keys.right && this.x <= (gameBoxNode.offsetWidth - this.w)) {
      this.x += this.speed;
    }

    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
  }

  throwKnife(direction) {
    const knifeTimer = 150;

    if (this.canThrowKnife && this.lastKnifeDirection !== direction) {
      let newKnife = new Proyectile(this.x, this.y, direction, "knife");
      knifesArray.push(newKnife);

      this.canThrowKnife = false;
      this.lastDirection = direction;

      setTimeout(() => {
        this.canThrowKnife = true;
        this.lastDirection = null;
      }, knifeTimer);
    }
  }

  detectCollision(array) {
    array.forEach((element) => {
      if (
        this.x < element.x + element.w &&
        this.x + this.w > element.x &&
        this.y < element.y + element.h &&
        this.y + this.h > element.y
      ) {
        chickenSound.play();
        gameOver();
      }
    })
  }
  
}
