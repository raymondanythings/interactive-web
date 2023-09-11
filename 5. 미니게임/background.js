import App from "./app.js";

class Background {
  constructor(config) {
    this.img = config.img;
    this.height = App.height;
    this.width = App.height * (this.img.width / this.img.height);
    this.leftPose = { x: 0, y: 0 };
    this.rightPost = { x: this.width - 4, y: 0 };
    this.speed = config.speed;
  }
  update() {
    if (this.leftPose.x + this.width < 0) {
      this.leftPose.x = this.rightPost.x + this.width - 4;
    }
    if (this.rightPost.x + this.width < 0) {
      this.rightPost.x = this.leftPose.x + this.width - 4;
    }

    this.leftPose.x -= this.speed;
    this.rightPost.x -= this.speed;
  }
  draw() {
    App.ctx.drawImage(
      this.img,
      this.leftPose.x,
      this.leftPose.y,
      this.width,
      this.height
    );
    App.ctx.drawImage(
      this.img,
      this.rightPost.x,
      this.rightPost.y,
      this.width,
      this.height
    );
  }
}

export default Background;
