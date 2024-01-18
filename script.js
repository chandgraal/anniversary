document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Firework constructor
    function Firework() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.vx = Math.random() * 4 - 2; // Random horizontal velocity
        this.vy = Math.random() * -15 - 5; // Random vertical velocity
        this.color = getRandomColor();
        this.radius = 3;
    }

    // Draw method for Firework
    Firework.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    };

    // Update method for Firework
    Firework.prototype.update = function () {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.2; // Gravity effect
        this.radius *= 0.95; // Fade out effect
        this.draw();
    };

    // Create an array to store fireworks
    const fireworks = [];

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Create new fireworks at a certain interval
        if (Math.random() < 0.05) {
            fireworks.push(new Firework());
        }

        // Update and draw each firework
        for (let i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].update();
            if (fireworks[i].radius < 1) {
                fireworks.splice(i, 1);
            }
        }

        requestAnimationFrame(animate);
    }

    // Utility function to get a random color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Start the animation
    animate();
});
