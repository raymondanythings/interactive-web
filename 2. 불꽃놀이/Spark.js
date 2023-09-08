import CanvasOption from "./CanvasOption.js";

class Spark extends CanvasOption {
  constructor(x, y, vx, vy, opacity, colorDeg) {
    super();
    this.x = x;
    this.y = y;
    this.opacity = opacity;
    this.vx = vx;
    this.vy = vy;
    this.colorDeg = colorDeg;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.opacity -= 0.01;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
    this.ctx.fillStyle = `hsla(${this.colorDeg}, 100%, 65%, ${this.opacity})`;
    this.ctx.fill();
    this.ctx.closePath();
  }
}

export default Spark;
