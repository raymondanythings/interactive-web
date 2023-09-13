import Engine from "./core/Engine.js";
import Vector from "./Vector.js";

export default class Dot extends Engine {
  constructor(x, y) {
    super();
    this.pos = new Vector(x, y);
    this.oldPose = new Vector(x, y);

    this.pinned = false;

    this.mass = 1;

    this.lightImg = document.querySelector("#light-img");
    this.lightSize = 15;
  }
  update() {
    if (this.pinned) return;
    let velocity = Vector.sub(this.pos, this.oldPose);
    this.oldPose.setXY(this.pos.x, this.pos.y);
    velocity.mult(this.friction);
    velocity.add(this.gravity);

    let { x: dx, y: dy } = Vector.sub(this.mouse.pos, this.pos);
    const dist = Math.sqrt(dx ** 2 + dy ** 2);
    const direction = new Vector(dx / dist, dy / dist);
    const force = Math.max((this.mouse.radius - dist) / this.mouse.radius, 0);

    if (force > 0.8) this.pos.setXY(this.mouse.pos.x, this.mouse.pos.y);
    else {
      this.pos.add(velocity);
      this.pos.add(direction.mult(force).mult(5));
    }
  }
  draw() {
    this.ctx.fillStyle = "#999";
    this.ctx.fillRect(
      this.pos.x - this.mass,
      this.pos.y - this.mass,
      this.mass * 2,
      this.mass * 2
    );
  }

  drawLight() {
    this.ctx.drawImage(
      this.lightImg,
      this.pos.x - this.lightSize / 2,
      this.pos.y - this.lightSize / 2,
      this.lightSize,
      this.lightSize
    );
  }
}
