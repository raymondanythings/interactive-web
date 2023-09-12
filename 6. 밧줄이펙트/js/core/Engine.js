import Mouse from "./Mouse.js";
import Physic from "./Physic.js";

export default class Engine extends Physic {
  static canvas = document.querySelector("canvas");
  static ctx = Engine.canvas.getContext("2d");
  static mouse;

  constructor() {
    super();
    if (!Engine.mouse) {
      Engine.mouse = new Mouse();
      Engine.canvas.onmousemove = (event) =>
        Engine.mouse.pos.setXY(event.clientX, event.clientY);
      Engine.canvas.ontouchmove = (event) =>
        Engine.mouse.pos.setXY(
          event.touches[0].clientX,
          event.touches[0].clientY
        );
    }
  }

  get mouse() {
    return Engine.mouse;
  }

  get canvas() {
    if (!Engine.canvas) {
      Engine.canvas = document.querySelector("canvas");
    }

    return Engine.canvas;
  }
  get ctx() {
    if (!Engine.ctx) {
      Engine.ctx = canvas.getContext("2d");
    }
    return Engine.ctx;
  }
}
