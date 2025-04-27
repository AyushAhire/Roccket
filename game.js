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

function updateScore() {
    if (paused) return;
    score++;
    document.getElementById('score').innerText = 'Score: ' + score;
}

setInterval(createAsteroid, 1000);
