const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const messageEl = document.getElementById('message');
const fireworksSound = document.getElementById('fireworksSound');
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let countdownActive = true;

function updateCountdown() {
    const now = new Date();
    const newYear = new Date(now.getFullYear() + 1, 0, 1);
    const diff = newYear - now;

    if (diff <= 0) {
        countdownActive = false;
        messageEl.classList.add('show');
        startFireworks();
        playMusic();
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = days.toString().padStart(2, '0');
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
}

function startFireworks() {
    setInterval(() => {
        createFirework();
    }, 200);
}

function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    const colors = ['#ff0040', '#ff4080', '#40ff80', '#4080ff', '#ffff40'];

    for (let i = 0; i < 20; i++) {
        const particle = {
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: 60
        };
        animateParticle(particle);
    }
}

function animateParticle(particle) {
    const animate = () => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.1; // gravity
        particle.life--;

        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fill();

        if (particle.life > 0) {
            requestAnimationFrame(animate);
        }
    };
    animate();
}

function playMusic() {
    fireworksSound.play().catch(e => console.log('Audio play failed:', e));
}

// Clear canvas each frame
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

setInterval(() => {
    if (countdownActive) {
        updateCountdown();
    } else {
        clearCanvas();
    }
}, 1000);

// Initial call
updateCountdown();
