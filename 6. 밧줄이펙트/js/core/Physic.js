import Vector from "../Vector.js";

export default class Physic {
  constructor() {
    this.gravity = new Vector(0, 1);
    this.friction = new Vector(0.97, 0.97);
  }
}
