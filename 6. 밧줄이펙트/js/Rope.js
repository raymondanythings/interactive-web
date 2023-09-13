import App from "./App.js";
import Dot from "./Dot.js";
import Stick from "./Stick.js";

export default class Rope {
  constructor(config) {
    this.x = config.x;
    this.y = config.y;
    this.segments = config.segments || 10;
    this.gap = config.gap || 50;
    this.iterations = config.iterations || 10;

    this.dots = [];
    this.sticks = [];

    this.isDisappeared = false;

    this.create();
  }

  pin(index) {
    this.dots[index].pinned = true;
  }

  checkPullingOut() {
    const dist = this.dots[0].pos.distance(this.dots[1].pos);
    if (dist / this.sticks[0].length > 1.3) {
      this.dots[0].pinned = false;
    }
  }

  create() {
    for (let i = 0; i < this.segments; i++) {
      this.dots.push(new Dot(this.x, this.y + i * this.gap));
    }

    for (let i = 0; i < this.segments - 1; i++) {
      this.sticks.push(new Stick(this.dots[i], this.dots[i + 1]));
    }
  }
  update() {
    this.checkPullingOut();
    this.dots.forEach((dot) => {
      dot.update();
    });
    for (let i = 0; i < this.iterations; i++) {
      this.sticks.forEach((stick) => {
        stick.update();
      });
    }
  }
  draw() {
    this.dots.forEach((dot) => {
      dot.draw();
    });
    this.sticks.forEach((stick) => {
      stick.draw();
    });

    this.dots[this.dots.length - 1]?.drawLight();
    if (App.height < this.dots[0].pos.y - this.dots[0].mass) {
      this.isDisappeared = true;
    }
  }
}
