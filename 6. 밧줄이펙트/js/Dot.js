import Engine from "./core/Engine.js";
import Vector from "./Vector.js";

export default class Dot extends Engine {
  constructor(x, y) {
    super();
    this.pos = new Vector(x, y);
    this.oldPose = new Vector(x, y);
    this.pinned = false;
    this.mass = 1;
  }
  update() {
    if (this.pinned) return;
    let velocity = Vector.sub(this.pos, this.oldPose);
    this.oldPose.setXY(this.pos.x, this.pos.y);
    velocity.mult(this.friction);
    velocity.add(this.gravity);
    this.pos.add(velocity);

    let { x: dx, y: dy } = Vector.sub(this.mouse.pos, this.pos);
    const dist = Math.sqrt(dx ** 2 + dy ** 2);
    if (dist > this.mouse.radius) return;
    const direction = new Vector(dx / dist, dy / dist);
    const force = (this.mouse.radius - dist) / this.mouse.radius;

    if (force > 0.8) this.pos.setXY(this.mouse.pos.x, this.mouse.pos.y);
    else {
      this.pos.add(direction.mult(force).mult(5));
    }
  }
  draw() {
    this.ctx.fillStyle = "#000";
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
