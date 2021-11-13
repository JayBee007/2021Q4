const PARTICLE_COUNT = 500;

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;

let particles;

class Particle {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.xDirection = options.xDirection;
    this.yDirection = options.yDirection;
    this.size = options.size;
    this.color = options.color;
  }

  draw() {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    context.fill();
  }

  update() {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.xDirection = -this.xDirection;
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.yDirection = -this.yDirection;
    }

    this.x += this.xDirection;
    this.y += this.yDirection;
    this.draw();
  }
}

function init() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const size = Math.random() * 20;
    const x = Math.random() * (window.innerWidth - size * 2);
    const y = Math.random() * (window.innerHeight - size * 2);
    const xDirection = Math.random() * 0.4 - 0.2;
    const yDirection = Math.random() * 0.4 - 0.2;
    const particle = new Particle({
      x,
      y,
      xDirection,
      yDirection,
      size,
      color: "#fff",
    });
    particles.push(particle);
  }
}
function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles[i].update();
  }
}

init();
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});
