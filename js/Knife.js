class Knife {

  constructor(mouseX, mouseY) {
    this.x = pollito.x;
    this.y = pollito.y;
    this.h = 20;
    this.w = 20;
    this.speed = 10;
    this.mouseX = mouseX;
    this.mouseY = mouseY;

    this.node = document.createElement("img");
    this.node.src = "../images/knife.png";
    gameBoxNode.append(this.node);

    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;
    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  }

  knifeMovement() {
    
    if (this.mouseY <= this.x) {
      this.y -= this.speed;
    } else if (this.mouseY >= this.x) {
      this.y += this.speed;
    }

    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
  }

}