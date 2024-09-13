class Proyectile {

  constructor(x, y, direction, type) {
    this.x = x;
    this.y = y;
    this.h = 30;
    this.w = 30;
    this.speed = 10;
    this.direction = direction;
    this.type = type;

    this.node = document.createElement("img");

    if (this.type === "knife") {
      this.node.src = "./images/knife.png";
    } else if (this.type === "arm") {
      this.node.src = "./images/potato-arm.png";
    }
    
    this.node.id = "proyectile";
    gameBoxNode.append(this.node);

    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;
    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  }

  proyectileMovement() {

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