class Enemy {

  constructor(x, y, startPosition, type) {

    this.x = x;
    this.y = y;
    this.h = 60;
    this.w = 60;
    this.startPosition = startPosition;
    this.type = type;

    this.node = document.createElement("img");

    if (type === "potato") {
      this.speed = 3;
      this.life = 1;
      this.node.src = "./images/potato.png";
    } else if (type === "naruto") {
      this.speed = 6;
      this.life = 1;
      this.node.src = "./images/naruto.png";
    } else if (type === "bob") {
      this.speed = 3;
      this.life = 2;
      this.node.src = "./images/bob.png";
    }
    
    this.node.id = "enemy";
    gameBoxNode.append(this.node);

    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;
    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  }

  enemyMovement() {
    if (this.startPosition === "top") {
      this.y += this.speed;
    } else if (this.startPosition === "bottom") {
      this.y -= this.speed;
    } else if (this.startPosition === "left") {
      this.x += this.speed;
    } else if (this.startPosition === "right") {
      this.x -= this.speed;
    }

    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
  }

  throwArm() {
    if (this.type === "potato") {
      let direction;
        
      if (this.startPosition === "top") {
        direction = "down";
      } else if (this.startPosition === "bottom") {
        direction = "up";
      } else if (this.startPosition === "left") {
        direction = "right";
      } else if (this.startPosition === "right") {
        direction = "left";
      }

      let newArm = new Proyectile(this.x, this.y, direction, "arm");
      armsArray.push(newArm);
    }
  }
}