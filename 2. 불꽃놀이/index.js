import CanvasOption from "./CanvasOption.js";
import Particle from "./Particle.js";
import Tail from "./Tail.js";
import Spark from "./Spark.js";
import { hypotenuse, randomNumBetween } from "./utils.js";

class Canvas extends CanvasOption {
  constructor(props) {
    super(props);

    this.tails = [];
    this.particles = [];
    this.sparks = [];
  }

  init() {
    this.canvasWidth = innerWidth;
    this.canvasHeight = innerHeight;
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    this.ctx.scale(this.dpr, this.dpr);

    this.canvas.style.width = this.canvasWidth + "px";
    this.canvas.style.height = this.canvasHeight + "px";
  }

  createTails() {
    const x = randomNumBetween(this.canvasWidth * 0.2, this.canvasWidth * 0.8);
    const vy = this.canvasHeight * randomNumBetween(0.001, 0.015) * -1;
    const colorDeg = randomNumBetween(0, 360);
    this.tails.push(new Tail(x, vy, colorDeg));
  }

  createParticles(tailX, tailY, tailColorDeg) {
    const PARTICLE_LENGTH = 400;
    const x = tailX || randomNumBetween(0, this.canvasWidth);
    const y = tailY || randomNumBetween(0, this.canvasHeight);
    Array(PARTICLE_LENGTH)
      .fill()
      .forEach((_) => {
        const r =
          randomNumBetween(2, 100) *
          hypotenuse(innerWidth, innerHeight) *
          0.0001;
        const angle = (Math.PI / 180) * randomNumBetween(0, 360);
        const vx = r * Math.cos(angle);
        const vy = r * Math.sin(angle);
        const opacity = randomNumBetween(0.6, 0.9);
        const _colorDeg = randomNumBetween(-20, 20) + tailColorDeg;
        this.particles.push(new Particle(x, y, vx, vy, opacity, _colorDeg));
      });
  }

  render() {
    let now, delta;
    let then = Date.now();

    const frame = () => {
      requestAnimationFrame(frame);
      now = Date.now();
      delta = now - then;
      if (delta < this.interval) return;
      this.ctx.fillStyle = this.bgColor + "40";
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${this.particles.length})`;
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeights);

      if (Math.random() < 0.03) this.createTails();
      this.tails.forEach((tail, tailIndex) => {
        tail.update();
        tail.draw();

        for (let i = 0; i < Math.round(-tail.vy * 0.5); i++) {
          const vx = randomNumBetween(-5, 5) * 0.05;
          const vy = randomNumBetween(-5, 5) * 0.05;
          const opacity = Math.min(-tail.vy, 0.5);
          this.sparks.push(
            new Spark(tail.x, tail.y, vx, vy, opacity, tail.colorDeg)
          );
        }

        if (tail.vy > -0.7) {
          this.tails.splice(tailIndex, 1);
          this.createParticles(tail.x, tail.y, tail.colorDeg);
        }
      });
      this.particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (Math.random() < 0.1)
          this.sparks.push(new Spark(particle.x, particle.y, 0, 0, 0.3));
        if (particle.opacity < 0) this.particles.splice(index, 1);
      });

      this.sparks.forEach((spark, sparkIndex) => {
        spark.update();
        spark.draw();
        if (spark.opacity < 0) this.sparks.splice(sparkIndex, 1);
      });
      then = now - (delta % this.interval);
    };
    requestAnimationFrame(frame);
  }
}
const canvas = new Canvas();
window.addEventListener("load", () => {
  canvas.init();
  canvas.render();
});

window.addEventListener("resize", () => {
  canvas.init();
});
