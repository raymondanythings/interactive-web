import Engine from "./core/Engine.js";

export default class Stick extends Engine {
  constructor(p1, p2) {
    super();
    this.startPoint = p1;
    this.endPoint = p2;

    this.length = this.startPoint.pos.distance(this.endPoint.pos);

    this.tension = 0.2;
  }

  update() {
    const dx = this.endPoint.pos.x - this.startPoint.pos.x;
    const dy = this.endPoint.pos.y - this.startPoint.pos.y;
    const dist = Math.sqrt(dx ** 2 + dy ** 2);

    const diff = (dist - this.length) / dist;
    const offsetX = diff * dx * this.tension;
    const offsetY = diff * dy * this.tension;

    const m = this.startPoint.mass + this.endPoint.mass;
    const m1 = this.endPoint.mass / m;
    const m2 = this.startPoint.mass / m;

    if (!this.startPoint.pinned) {
      this.startPoint.pos.x += offsetX * m1;
      this.startPoint.pos.y += offsetY * m1;
    }
    if (!this.endPoint.pinned) {
      this.endPoint.pos.x -= offsetX * m2;
      this.endPoint.pos.y -= offsetY * m2;
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#999";
    this.ctx.lineWidth = 1;
    this.ctx.moveTo(this.startPoint.pos.x, this.startPoint.pos.y);
    this.ctx.lineTo(this.endPoint.pos.x, this.endPoint.pos.y);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}
