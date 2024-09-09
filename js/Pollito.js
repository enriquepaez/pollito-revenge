class Pollito {

  constructor() {

    this.x = 300;
    this.y = 200;
    this.h = 30;
    this.w = 30;
    this.speed = 10;
    this.keys = {
      up: false,
      down: false,
      right: false,
      left: false,
    };

    this.node = document.createElement("img");
    this.node.src = "../images/baby-chicken.png";
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

  throwKnife(mouseX, mouseY) {
    let newKnife = new Knife(mouseX, mouseY);
    knifesArray.push(newKnife);

    console.log(`RATON -> X:${mouseX}, Y:${mouseY}`);
    console.log(`POLLITO -> X:${this.x}, Y:${this.y}`);
  }
  
}
