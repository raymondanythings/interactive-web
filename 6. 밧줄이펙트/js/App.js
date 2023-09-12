import Dot from "./Dot.js";

import Stick from "./Stick.js";
import Engine from "./core/Engine.js";

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

    this.dots = [
      new Dot(200, 50),
      new Dot(300, 100),
      new Dot(300, 150),
      new Dot(200, 50),
    ];
    this.sticks = [
      new Stick(this.dots[0], this.dots[1]),
      new Stick(this.dots[1], this.dots[2]),
      new Stick(this.dots[2], this.dots[3]),
    ];
    this.dots[0].pinned = true;
  }
  resize() {
    App.width = innerWidth;
    App.height = innerHeight;

    this.canvas.style.width = App.width + "px";
    this.canvas.style.height = App.height + "px";

    this.canvas.width = App.width * App.dpr;
    this.canvas.height = App.height * App.dpr;
    this.ctx.scale(App.dpr, App.dpr);
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

      this.dots.forEach((dot) => {
        dot.update();
      });
      this.sticks.forEach((stick) => {
        stick.update();
      });
      this.dots.forEach((dot) => {
        dot.draw();
      });
      this.sticks.forEach((stick) => {
        stick.draw();
      });
    };
    requestAnimationFrame(frame);
  }
}
