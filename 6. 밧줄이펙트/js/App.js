import Rope from "./Rope.js";
import Engine from "./core/Engine.js";
import { randomNumberBetween } from "./utils.js";

export default class App extends Engine {
  static width = innerWidth;
  static height = innerHeight;
  static dpr = devicePixelRatio > 1 ? 2 : 1;
  static interval = 1000 / 60;

  constructor() {
    super();

    this.resize();
    window.addEventListener("resize", () => {
      this.resize();
    });
  }

  createRopes() {
    this.ropes = [];
    const TOTAL = App.width * 0.06;
    for (let i = 0; i < TOTAL; i++) {
      const rope = new Rope({
        x: randomNumberBetween(App.width * 0.3, App.width * 0.7),
        y: 0,
        gap: randomNumberBetween(App.height * 0.05, App.height * 0.08),
      });
      rope.pin(0);
      this.ropes.push(rope);
    }
  }

  resize() {
    App.width = innerWidth;
    App.height = innerHeight;

    this.canvas.style.width = App.width + "px";
    this.canvas.style.height = App.height + "px";

    this.canvas.width = App.width * App.dpr;
    this.canvas.height = App.height * App.dpr;
    this.ctx.scale(App.dpr, App.dpr);
    this.createRopes();
  }

  render() {
    let now, delta;
    let then = Date.now();

    const frame = () => {
      requestAnimationFrame(frame);
      now = Date.now();
      delta = now - then;
      if (delta < App.interval) return;
      then = now - (delta % App.interval);

      this.ctx.clearRect(0, 0, App.width, App.height);

      for (let i = this.ropes.length - 1; i >= 0; i--) {
        this.ropes[i].update();
        this.ropes[i].draw();
        if (this.ropes[i].isDisappeared) this.ropes.splice(i, 1);
      }
    };
    requestAnimationFrame(frame);
  }
}
