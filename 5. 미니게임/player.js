import App from "./app.js";
import BoundingBox from "./boundingBox.js";

class Player {
  constructor() {
    this.img = document.querySelector("#bird-img");
    this.spritesCount = 15;
    this.x = App.width * 0.1;
    this.y = App.height * 0.5;
    this.width = this.img.width / this.spritesCount;
    this.height = this.width * (96 / 140);
    this.frameX = 0;
    this.counter = 0;
    this.frameLatency = 1;

    this.boundingBox = new BoundingBox(
      this.x + 10,
      this.y + 16,
      this.width - 20,
      this.height - 20
    );

    this.vy = -10;
    this.gravity = 0.3;
    App.canvas.addEventListener("click", () => {
      this.vy += -5;
    });
  }
  update() {
    this.counter = ++this.counter % this.frameLatency;
    if (!this.counter) {
      this.frameX = ++this.frameX % this.spritesCount;
    }
    this.vy += this.gravity;
    this.y += this.vy;
    this.boundingBox.updatePosition(
      this.x,
      this.y + 16,
      this.width,
      this.height - 20
    );
  }
  draw() {
    App.ctx.drawImage(
      this.img,
      (this.img.width / this.spritesCount) * this.frameX,
      0,
      this.img.width / this.spritesCount,
      this.img.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.boundingBox.draw();
  }
}

export default Player;
