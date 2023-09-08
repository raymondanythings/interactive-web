import { randomNumBetween } from "./utils.js";

class Particle {
  constructor() {
    this.r = innerHeight / 4;
    this.angle = randomNumBetween(0, 360);
    this.x = innerWidth / 2 + this.r * Math.cos((Math.PI / 180) * this.angle);
    this.y = innerHeight / 2 + this.r * Math.sin((Math.PI / 180) * this.angle);
  }
  update() {}
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
  }
}

export default Particle;
