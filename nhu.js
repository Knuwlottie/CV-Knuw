// Particle Background
const particleCanvas = document.getElementById('particle-bg');
const ctx = particleCanvas.getContext('2d');
let particles = [];
const particleCount = 100;

function resizeCanvas() {
  particleCanvas.width = window.innerWidth;
  particleCanvas.height = window.innerHeight;
}
resizeCanvas();

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * particleCanvas.width;
    this.y = Math.random() * particleCanvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > particleCanvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > particleCanvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = 'rgba(248, 113, 113, 0.5)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();
window.addEventListener('resize', resizeCanvas);

// Three.js 3D Spheres
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, canvas: document.getElementById('three-canvas') });

function setupRenderer() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
}
setupRenderer();
camera.position.z = 5;

const spheres = [];
const sphereCount = 10;
for (let i = 0; i < sphereCount; i++) {
  const geometry = new THREE.SphereGeometry(0.3, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0xf87171, wireframe: true });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(
    (Math.random() - 0.5) * 8,
    (Math.random() - 0.5) * 8,
    (Math.random() - 0.5) * 8
  );
  sphere.userData = {
    speedX: (Math.random() - 0.5) * 0.02,
    speedY: (Math.random() - 0.5) * 0.02,
    speedZ: (Math.random() - 0.5) * 0.02
  };
  scene.add(sphere);
  spheres.push(sphere);
}

function animate3D() {
  requestAnimationFrame(animate3D);
  spheres.forEach(sphere => {
    sphere.position.x += sphere.userData.speedX;
    sphere.position.y += sphere.userData.speedY;
    sphere.position.z += sphere.userData.speedZ;
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    if (Math.abs(sphere.position.x) > 4) sphere.userData.speedX *= -1;
    if (Math.abs(sphere.position.y) > 4) sphere.userData.speedY *= -1;
    if (Math.abs(sphere.position.z) > 4) sphere.userData.speedZ *= -1;
  });
  renderer.render(scene, camera);
}
animate3D();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  setupRenderer();
});

// Portfolio Animations
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('intro').classList.add('visible');
  }, 200);
});

const lines = [
  {id: 'hello', text: 'XIN CHÀO, TÊN TỚ LÀ ', delay: 40, nextDelay: 250},
  {id: 'name', text: 'KHẢ NHƯ', delay: 70, nextDelay: 350},
  {id: 'job', text: 'Front-end Developer', delay: 45, nextDelay: 400}
];
function typeLine(idx = 0) {
  if (idx >= lines.length) {
    setTimeout(() => {
      document.getElementById('contact').classList.add('visible');
    }, 200);
    return;
  }
  const el = document.getElementById(lines[idx].id);
  const txt = lines[idx].text;
  let i = 0;
  el.classList.remove('visible');
  function typing() {
    el.textContent = txt.slice(0, i) + (i % 2 ? '|' : '');
    if (i < txt.length) {
      i++;
      setTimeout(typing, lines[idx].delay);
    } else {
      el.textContent = txt;
      el.classList.add('visible');
      setTimeout(() => typeLine(idx + 1), lines[idx].nextDelay);
    }
  }
  typing();
}
document.getElementById('hello').classList.remove('visible');
document.getElementById('name').classList.remove('visible');
document.getElementById('job').classList.remove('visible');
document.getElementById('contact').classList.remove('visible');
setTimeout(typeLine, 700);

document.querySelector('.avata').addEventListener('click', function() {
  this.animate([
    { transform: 'scale(1.07) rotate(-2deg)' },
    { transform: 'scale(1.11) rotate(6deg)' },
    { transform: 'scale(1.07) rotate(-2deg)' }
  ], {
    duration: 400,
    easing: 'cubic-bezier(.4,2,.3,1)'
  });
});

// Smooth Scroll and Active Menu
document.querySelectorAll('nav li a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
    document.querySelectorAll('nav li').forEach(li => li.classList.remove('active'));
    link.parentElement.classList.add('active');
  });
});

// CV Sections Fade-In on Scroll
const cvSections = document.querySelectorAll('.cv-section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
cvSections.forEach(section => observer.observe(section));

// Animate Skill Bars on Scroll
const skillBars = document.querySelectorAll('.skill-bar');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const width = bar.getAttribute('data-width');
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
      skillObserver.unobserve(bar);
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));
