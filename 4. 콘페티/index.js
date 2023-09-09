import Particle from "./Particle.js";
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const dpr = 1 || window.devicePixelRatio;
const fps = 60;
let canvasWidth = innerWidth;
let canvasHeight = innerHeight;

const interval = 1000 / fps;

const particles = [];

function init() {
  canvasWidth = innerWidth;
  canvasHeight = innerHeight;
  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";
  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  ctx.scale(dpr, dpr);

  confetti({
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    count: 10,
  });
}

function confetti({ x, y, count }) {
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y));
  }
}

function render() {
  let now, delta;
  let then = Date.now();

  const x = innerWidth / 2;
  let y = innerHeight / 2;
  const width = 50;
  const height = 50;

  let widthAlpha = 0;
  let deg = 0.1;

  const frame = () => {
    requestAnimationFrame(frame);
    now = Date.now();
    delta = now - then;
    if (delta < interval) return;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    widthAlpha += 0.1;
    deg += 0.1;
    y += 1;

    ctx.translate(x + width, y + height);
    ctx.rotate(deg);
    ctx.translate(-x - width, -y - height);

    ctx.fillStyle = "red";
    ctx.fillRect(
      x,
      y,
      width * Math.cos(widthAlpha),
      height * Math.sin(widthAlpha)
    );

    ctx.resetTransform();

    then = now - (delta % interval);
  };

  requestAnimationFrame(frame);
}

window.addEventListener("resize", init);
window.addEventListener("load", () => {
  init();
  render();
});
