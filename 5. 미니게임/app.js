import Background from "./background.js";

class App {
  static canvas = document.querySelector("canvas");
  static ctx = App.canvas.getContext("2d");
  static dpr = devicePixelRatio > 1 ? 2 : 1;
  static interval = 1000 / 60;

  static width = 1024;
  static height = 768;
  constructor() {
    this.background = new Background();
    this.resize();
    window.addEventListener("resize", () => {
      this.resize();
    });
  }

  resize() {
    App.canvas.width = App.width * App.dpr;
    App.canvas.height = App.height * App.dpr;
    App.ctx.scale(App.dpr, App.dpr);

    const width =
      innerWidth > innerHeight ? innerHeight * 0.9 : innerWidth * 0.9;
    App.canvas.style.width = width + "px";
    App.canvas.style.height = width * (3 / 4) + "px";
  }

  render() {
    let now, delta;
    let then = Date.now();
    const frame = () => {
      requestAnimationFrame(frame);
      now = Date.now();
      delta = now - delta;
      if (delta < App.interval) return;
      App.ctx.clearRect(0, 0, App.width, App.height);
      this.background.draw();

      then = now - (delta % App.interval);
    };
    requestAnimationFrame(frame);
  }
}

export default App;
