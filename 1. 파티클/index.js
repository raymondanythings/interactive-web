const DPR = window.devicePixelRatio;

const feGaussianBlur = document.querySelector("feGaussianBlur");
const feColorMatrix = document.querySelector("feColorMatrix");
const controls = new (function () {
  this.blurValue = 40;
  this.alphaChannel = 100;
  this.alphaOffset = -23;
  this.acc = 1.00980665;
})();

const gui = new dat.GUI();

const f1 = gui.addFolder("Gooey Effect");
f1.open();

f1.add(controls, "blurValue", 0, 100).onChange((value) => {
  feGaussianBlur.setAttribute("stdDeviation", value);
});
f1.add(controls, "alphaChannel", 1, 200).onChange((value) => {
  feColorMatrix.setAttribute(
    "values",
    `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${value} ${controls.alphaOffset}`
  );
});
f1.add(controls, "alphaOffset", -40, 40).onChange((value) => {
  feColorMatrix.setAttribute(
    "values",
    `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${controls.alphaChannel} ${value}`
  );
});
const f2 = gui.addFolder("Particle Property");
f2.open();
f2.add(controls, "acc", 1, 1.5, 0.001).onChange((value) => {
  particles.forEach((particle) => (particle.acc = value));
});

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const canvasWidth = innerWidth;
const canvasHeight = innerHeight;

canvas.style.width = canvasWidth + "px";
canvas.style.height = canvasHeight + "px";
canvas.width = canvasWidth * DPR;
canvas.height = canvasHeight * DPR;
ctx.scale(DPR, DPR);
ctx.fillRect(10, 10, 50, 50);

class Particle {
  constructor(x, y, radius, vy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vy = vy;
    this.acc = 1.00980665;
  }
  update() {
    this.vy *= this.acc;
    this.y += this.vy;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();
  }
}

const TOTAL = 20;
const randomNumBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

const particles = Array(TOTAL)
  .fill()
  .map(
    (_) =>
      new Particle(
        randomNumBetween(0, canvasWidth),
        randomNumBetween(0, canvasHeight),
        randomNumBetween(50, 100),
        randomNumBetween(1, 5)
      )
  );

let interval = 1000 / 60;
let now, delta;
let then = Date.now();

const animate = () => {
  requestAnimationFrame(animate);
  now = Date.now();
  delta = now - then;
  if (delta < interval) return;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
    if (particle.y - particle.radius > canvasHeight) {
      particle.y = -particle.radius;

      particle.x = randomNumBetween(0, canvasWidth);
      particle.radius = randomNumBetween(50, 100);
      particle.vy = randomNumBetween(1, 5);
    }
  });
  then = now - (delta % interval);
};

animate();
