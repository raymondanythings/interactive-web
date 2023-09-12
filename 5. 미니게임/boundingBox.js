import App from "./app.js";

class BoundingBox {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = `rgba(255, 0, 0, 0.3)`;
  }

  draw() {
    App.ctx.fillStyle = this.color;

    App.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  isColliding(target) {
    return (
      target.x + target.width >= this.x &&
      target.x <= this.x + this.width &&
      target.y + target.height >= this.y &&
      target.y <= this.y + this.height
    );
  }

  updatePosition(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
export default BoundingBox;
