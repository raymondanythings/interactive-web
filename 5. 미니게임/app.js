import Wall from "./Wall.js";
import Background from "./background.js";
import Coin from "./coin.js";
import Player from "./player.js";

class App {
  static canvas = document.querySelector("canvas");
  static ctx = App.canvas.getContext("2d");
  static dpr = devicePixelRatio > 1 ? 2 : 1;
  static interval = 1000 / 60;

  static width = 1024;
  static height = 768;
  constructor() {
    this.backgrounds = [
      new Background({ img: document.querySelector("#bg3-img"), speed: 1 }),
      new Background({ img: document.querySelector("#bg2-img"), speed: 2 }),
      new Background({ img: document.querySelector("#bg1-img"), speed: 4 }),
    ];

    this.coins = [];

    this.walls = [];
    this.player = new Player();
    this.resize();
    window.addEventListener("resize", () => {
      this.resize();
    });
  }

  resize() {
    App.canvas.width = App.width * App.dpr;
    App.canvas.height = App.height * App.dpr;
    App.ctx.scale(App.dpr, App.dpr);

    const width =
      innerWidth > innerHeight ? innerHeight * 0.9 : innerWidth * 0.9;
    App.canvas.style.width = width + "px";
    App.canvas.style.height = width * (3 / 4) + "px";
  }

  render() {
    let now, delta;
    let then = Date.now();
    const frame = () => {
      requestAnimationFrame(frame);
      now = Date.now();
      delta = now - then;
      if (delta < App.interval) return;
      App.ctx.clearRect(0, 0, App.width, App.height);
      this.backgrounds.forEach((background) => {
        background.update();
        background.draw();
      });

      if (this.walls.length) {
        for (let i = this.walls.length - 1; i >= 0; i--) {
          this.walls[i].update();
          this.walls[i].draw();
          if (this.walls[i].isOutside) {
            this.walls.splice(i, 1);
            continue;
          }

          if (this.walls[i].canGenerateNext) {
            this.walls[i].generatedNext = true;
            this.createWall();
          }

          if (this.walls[i].isColliding(this.player.boundingBox)) {
            this.player.boundingBox.color = `rgba(255, 0, 0, 0.3)`;
          } else {
            this.player.boundingBox.color = `rgba(0, 0, 255, 0.3)`;
          }
        }
      } else {
        this.createWall();
      }
      for (let j = this.coins.length - 1; j >= 0; j--) {
        this.coins[j].update();
        this.coins[j].draw();
        if (this.coins[j].x + this.coins[j].width < 0) {
          this.coins.splice(j, 1);
        }
      }
      this.player.update();
      this.player.draw();

      then = now - (delta % App.interval);
    };
    requestAnimationFrame(frame);
  }
  createWall() {
    const newWall = new Wall({
      type: Math.random() > 0.3 ? "SMALL" : "BIG",
    });
    this.walls.push(newWall);

    if (Math.random() < 0.5) {
      const x = newWall.x + newWall.width / 2;
      const y = newWall.y2 - newWall.gapY / 2;
      this.coins.push(new Coin(x, y, newWall.vx));
    }
  }
}

export default App;
