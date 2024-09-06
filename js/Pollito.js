class Pollito {

  constructor() {

    this.x = 300;
    this.y = 200;
    this.h = 30;
    this.w = 30;
    this.speed = 10;

    this.node = document.createElement("img");
    this.node.src = "../images/baby-chicken.png";
    gameBoxNode.append(this.node);

    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;
    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  }

  pollitoMovement(direction) {
    if (direction === "right") {
      this.x += this.speed;
    } else if (direction === "left") {
      this.x -= this.speed;
    }
    this.node.style.left = `${this.x}px`;

    if (direction === "down") {
      this.y += this.speed;
    } else if (direction === "up") {
      this.y -= this.speed;
    }
    this.node.style.top = `${this.y}px`;
  }
  
}