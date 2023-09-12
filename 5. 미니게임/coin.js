import App from "./app.js";
import BoundingBox from "./boundingBox.js";

class Coin {
  constructor(x, y, vx) {
    this.spritesCount = 10;
    this.img = document.querySelector("#coin-img");
    this.width = this.img.width / this.spritesCount;

    this.height = this.img.height;

    this.x = x - this.width / 2;
    this.y = y - this.height / 2;

    this.vx = vx;

    this.frameX = 0;
    this.counter = 0;
    this.frameLatency = 1;

    this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
  }
  rotate() {
    this.counter = ++this.counter % this.frameLatency;
    if (!this.counter) {
      this.frameX = ++this.frameX % this.spritesCount;
    }
  }
  update() {
    this.rotate();
    this.x += this.vx;
    this.boundingBox.x = this.x;
  }

  draw() {
    App.ctx.drawImage(
      this.img,
      this.width * this.frameX,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

export default Coin;
