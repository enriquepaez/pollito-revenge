class Knife {

  constructor(direction) {
    this.x = pollito.x;
    this.y = pollito.y;
    this.h = 20;
    this.w = 20;
    this.speed = 10;
    this.direction = direction;


    this.node = document.createElement("img");
    this.node.src = "../images/knife.png";
    this.node.id = "knife";
    gameBoxNode.append(this.node);

    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;
    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  }

  knifeMovement() {

    if (this.direction === "up") {
      this.y -= this.speed;
    }
    if (this.direction === "down") {
      this.y += this.speed;
    }
    if (this.direction === "left") {
      this.x -= this.speed;
    }
    if (this.direction === "right") {
      this.x += this.speed;
    }

    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
  }

}