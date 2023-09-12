import App from "./app.js";

class Coin {
  constructor(x, y, vx) {
    this.img = document.querySelector("#coin-img");

    this.x = x;
    this.y = y;
    this.vx = vx;

    this.spritesCount = 10;
    this.width = this.img.width / this.spritesCount;
    this.height = this.img.height;
    this.frameX = 0;
    this.counter = 0;
    this.frameLatency = 1;
  }
  update() {
    this.counter = ++this.counter % this.frameLatency;
    if (!this.counter) {
      this.frameX = ++this.frameX % this.spritesCount;
    }
    this.x += this.vx;
  }

  draw() {
    App.ctx.drawImage(
      this.img,
      this.width * this.frameX,
      0,
      this.width,
      this.height,
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
  }
}

export default Coin;
