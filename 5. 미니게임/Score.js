import App from "./app.js";
import Coin from "./coin.js";

class Score {
  constructor() {
    this.coin = new Coin(App.width - 50, 50.0);
    this.coin.frameX = 9;
    this.distCount = 0;
    this.coinCount = 0;
  }
  update() {
    this.coin.rotate();
    this.distCount += 0.03;
  }
  draw() {
    App.ctx.font = "55px Jua";
    App.ctx.fillStyle = "#f1f1f1";
    App.ctx.textAlign = "right";
    App.ctx.fillText(this.coinCount, App.width - 90, 69);

    App.ctx.textAlign = "left";
    App.ctx.fillText((this.distCount >> 0) + "m", 25, 69);
    this.coin.draw();
  }
}

export default Score;
