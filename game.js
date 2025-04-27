let score = 0;
let scoreInterval = setInterval(updateScore, 1000);

let paused = false;

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        paused = !paused;
        const pausedMessage = document.getElementById('pausedMessage');
        pausedMessage.style.display = paused ? 'block' : 'none';
    }

    if (paused) return;

    const rocket = document.getElementById('rocket');
    let left = parseInt(window.getComputedStyle(rocket).left);

    if (e.key === 'ArrowLeft' && left > 0) {
        rocket.style.left = (left - 20) + 'px';
    }

    if (e.key === 'ArrowRight' && left < 450) {
        rocket.style.left = (left + 20) + 'px';
    }

    if (e.key === ' ' || e.key === 'Spacebar') {
        createProjectile();
    }
});

function createAsteroid() {
    if (paused) return;

    const gamearea = document.getElementById('gameArea');
    const asteroid = document.createElement('div');
    asteroid.classList.add('asteroid');
    asteroid.style.left = Math.random() * 450 + 'px';
    asteroid.style.top = '0px';
    gamearea.appendChild(asteroid);

    moveAsteroid(asteroid);
}

function moveAsteroid(asteroid) {
    if (paused) return;

    let top = 0;
    const interval = setInterval(() => {
        if (top > 700) {
            asteroid.remove();
            clearInterval(interval);
        } else {
            top += 5;
            asteroid.style.top = top + 'px';

            checkCollision(asteroid);
        }
    }, 20);
}

function checkCollision(asteroid) {
    if (paused) return;

    const rocket = document.getElementById('rocket');
    const rocketRect = rocket.getBoundingClientRect();
    const asteroidRect = asteroid.getBoundingClientRect();

    if (rocketRect.left + 10 < asteroidRect.right - 10 &&
        rocketRect.right - 10 > asteroidRect.left + 10 &&
        rocketRect.top + 10 < asteroidRect.bottom - 10 &&
        rocketRect.bottom - 10 > asteroidRect.top + 10) {
        alert('Game Over! 🚀💥 Your Score: ' + score);
        asteroid.remove();
        window.location.reload();
    }
}

function createProjectile() {
    if (paused) return;

    const gamearea = document.getElementById('gameArea');
    const rocket = document.getElementById('rocket');
    const projectile = document.createElement('div');
    projectile.classList.add('projectile');

    let rocketLeft = parseInt(window.getComputedStyle(rocket).left);
    projectile.style.left = (rocketLeft + 22) + 'px'; // Center the projectile over the rocket
    projectile.style.bottom = '60px'; // Position just above the rocket
    projectile.style.width = '5px'; // Width of projectile
    projectile.style.height = '15px'; // Height of projectile
    projectile.style.backgroundColor = 'yellow'; // Make projectile visible
    projectile.style.position = 'absolute'; // Set absolute positioning for movement
    gamearea.appendChild(projectile);

    moveProjectile(projectile);
}

function moveProjectile(projectile) {
    if (paused) return;

    let bottom = 60;
    const interval = setInterval(() => {
        if (bottom > 550) { // if projectile reaches top of screen, remove it
            projectile.remove();
            clearInterval(interval);
        } else {
            bottom += 5; // Move projectile up
            projectile.style.bottom = bottom + 'px';

            checkProjectileCollision(projectile, interval);
        }
    }, 10);
}

function checkProjectileCollision(projectile, interval) {
    const asteroids = document.querySelectorAll('.asteroid');

    asteroids.forEach(asteroid => {
        const projRect = projectile.getBoundingClientRect();
        const astRect = asteroid.getBoundingClientRect();
        if (projRect.left < astRect.right && projRect.right > astRect.left && projRect.top < astRect.bottom && projRect.bottom > astRect.top) {
            asteroid.remove();
            projectile.remove();
            clearInterval(interval);
            score += 5; // Increase score for hit
            document.getElementById('score').innerText = 'Score: ' + score;
        }
    })
}


function updateScore() {
    if (paused) return;
    score++;
    document.getElementById('score').innerText = 'Score: ' + score;
}

setInterval(createAsteroid, 500);  // Create a new asteroid every second