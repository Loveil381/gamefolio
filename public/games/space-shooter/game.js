/**
 * Space Shooter Game
 * A vanilla JS HTML5 Canvas game with zero dependencies.
 */

// Game Configuration
const CONFIG = {
    PLAYER_SPEED: 5,
    PLAYER_WIDTH: 40,
    PLAYER_HEIGHT: 40,
    BULLET_SPEED: 10,
    ENEMY_BASE_SPEED: 2,
    ENEMY_WIDTH: 35,
    ENEMY_HEIGHT: 35,
    PARTICLE_COUNT: 20,
    FIRE_COOLDOWN: 15, // frames
    COLORS: {
        BG: '#0a0a0f',
        PLAYER: '#00f0ff',
        ENEMY: '#a855f7',
        BULLET: '#00f0ff',
        PARTICLE: '#f59e0b',
        STARS: ['#ffffff', '#aaaaaa', '#555555']
    }
};

// Game State
const GAME_STATE = {
    MENU: 0,
    PLAYING: 1,
    GAME_OVER: 2
};

// Core Game variables
let canvas, ctx;
let lastTime = 0;
let requestID;
let currentState = GAME_STATE.MENU;
let scale = 1;

// Entities
let player;
let bullets = [];
let enemies = [];
let particles = [];
let backgroundStars = [];

// Progression & Stats
let score = 0;
let lives = 3;
let wave = 1;

let frames = 0; // For timing
let enemySpawnTimer = 0;
let enemySpawnRate = 120; // Spawn every X frames initially

// Input Handling
const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    Space: false
};

const touchInput = {
    left: false,
    right: false,
    active: false
};

// Initialization
function init() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d', { alpha: false }); // Optimize for no alpha background

    // Resize handling
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    setupInputs();
    setupUI();

    // Create initial stars for background
    for (let i = 0; i < 100; i++) {
        backgroundStars.push(new Star());
    }

    // Start loop
    requestAnimationFrame(gameLoop);
}

function resizeCanvas() {
    // Keep a consistent aspect ratio or fill screen
    // We'll aim for a specific internal resolution, scaled up
    const targetWidth = 800;
    const targetHeight = 1000;

    const scaleX = window.innerWidth / targetWidth;
    const scaleY = window.innerHeight / targetHeight;
    scale = Math.min(scaleX, scaleY);

    if (scale > 1 && window.innerWidth > 800) {
        // Don't scale up too much on large screens, keep it centered
        canvas.width = targetWidth;
        canvas.height = window.innerHeight; // Fill vertically
        scale = 1;
    } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Disable smooth scaling for pixel art feel if desired
    ctx.imageSmoothingEnabled = false;

    // Reset player position on resize
    if (player) {
        player.y = canvas.height - 80;
        player.x = Math.max(0, Math.min(canvas.width - CONFIG.PLAYER_WIDTH, player.x));
    }
}

// ---------------------- INPUTS ----------------------

function setupInputs() {
    // Keyboard
    window.addEventListener('keydown', (e) => {
        if (keys.hasOwnProperty(e.code) || e.code === 'Space') {
            if (e.code === 'Space') keys.Space = true;
            if (e.code === 'ArrowLeft') keys.ArrowLeft = true;
            if (e.code === 'ArrowRight') keys.ArrowRight = true;
        }
    });

    window.addEventListener('keyup', (e) => {
        if (keys.hasOwnProperty(e.code) || e.code === 'Space') {
            if (e.code === 'Space') keys.Space = false;
            if (e.code === 'ArrowLeft') keys.ArrowLeft = false;
            if (e.code === 'ArrowRight') keys.ArrowRight = false;
        }
    });

    // Touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
        document.getElementById('touch-controls').style.display = 'block';

        const leftZone = document.getElementById('touch-left');
        const rightZone = document.getElementById('touch-right');

        // Prevent default actions like scrolling
        const preventDefault = (e) => e.preventDefault();

        // Left zone
        leftZone.addEventListener('touchstart', (e) => { preventDefault(e); touchInput.left = true; touchInput.active = true; }, { passive: false });
        leftZone.addEventListener('touchend', (e) => { preventDefault(e); touchInput.left = false; }, { passive: false });
        leftZone.addEventListener('touchcancel', (e) => { preventDefault(e); touchInput.left = false; }, { passive: false });

        // Right zone
        rightZone.addEventListener('touchstart', (e) => { preventDefault(e); touchInput.right = true; touchInput.active = true; }, { passive: false });
        rightZone.addEventListener('touchend', (e) => { preventDefault(e); touchInput.right = false; }, { passive: false });
        rightZone.addEventListener('touchcancel', (e) => { preventDefault(e); touchInput.right = false; }, { passive: false });

        // Hide touch zones on desktop
        window.addEventListener('mousedown', () => { touchInput.active = false; });
    }
}

// ---------------------- UI HELPERS ----------------------

function setupUI() {
    document.getElementById('start-btn').addEventListener('click', startGame);
    document.getElementById('restart-btn').addEventListener('click', startGame);
}

function updateHUD() {
    document.getElementById('score').innerText = score;
    document.getElementById('wave').innerText = wave;

    const livesContainer = document.getElementById('lives-display');
    livesContainer.innerHTML = '';
    for (let i = 0; i < lives; i++) {
        const span = document.createElement('span');
        span.className = 'life-icon';
        span.innerText = '♥';
        livesContainer.appendChild(span);
    }
}

// ---------------------- GAME LOOP ----------------------

function startGame() {
    // Reset stats
    score = 0;
    lives = 3;
    wave = 1;
    frames = 0;
    enemySpawnRate = 120;

    // Clear entities
    bullets = [];
    enemies = [];
    particles = [];

    // Setup player
    player = new Player(canvas.width / 2 - CONFIG.PLAYER_WIDTH / 2, canvas.height - 80);

    // Setup UI screens
    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('game-over-screen').classList.remove('active');
    document.getElementById('hud').classList.add('visible');

    updateHUD();
    currentState = GAME_STATE.PLAYING;
}

function gameOver() {
    currentState = GAME_STATE.GAME_OVER;
    document.getElementById('hud').classList.remove('visible');

    const goScreen = document.getElementById('game-over-screen');
    document.getElementById('final-score').innerText = score;
    document.getElementById('final-wave').innerText = wave;
    goScreen.classList.add('active');
}

function gameLoop(timestamp) {
    // Calculate delta time if needed, though we use fixed updates here based on frames
    // const deltaTime = timestamp - lastTime;
    // lastTime = timestamp;

    update();
    draw();

    requestID = requestAnimationFrame(gameLoop);
}

function update() {
    if (currentState === GAME_STATE.MENU) {
        // Just animate background
        updateBackground();
        return;
    }

    if (currentState === GAME_STATE.PLAYING) {
        frames++;

        updateBackground();
        player.update();

        // Update bullets
        for (let i = bullets.length - 1; i >= 0; i--) {
            bullets[i].update();
            if (bullets[i].markedForDeletion) {
                bullets.splice(i, 1);
            }
        }

        // Wave progression / spawning
        enemySpawnTimer++;
        if (enemySpawnTimer >= enemySpawnRate) {
            spawnEnemy();
            enemySpawnTimer = 0;
        }

        // Update enemies
        for (let i = enemies.length - 1; i >= 0; i--) {
            enemies[i].update();

            // Check collision with player
            if (checkCollision(player, enemies[i])) {
                createExplosion(player.x + player.width / 2, player.y + player.height / 2, CONFIG.COLORS.PLAYER);
                createExplosion(enemies[i].x + enemies[i].width / 2, enemies[i].y + enemies[i].height / 2, CONFIG.COLORS.ENEMY);

                enemies.splice(i, 1);
                handlePlayerHit();
                continue; // Skip bullet check
            }

            // Check collision with bullets
            let enemyDestroyed = false;
            for (let j = bullets.length - 1; j >= 0; j--) {
                if (checkCollision(bullets[j], enemies[i])) {
                    // Enemy hit!
                    createExplosion(enemies[i].x + enemies[i].width / 2, enemies[i].y + enemies[i].height / 2, CONFIG.COLORS.ENEMY);
                    score += 10;

                    // Wave progression
                    if (score > 0 && score % 150 === 0) {
                        wave++;
                        enemySpawnRate = Math.max(30, enemySpawnRate - 15); // Faster spawns
                    }

                    updateHUD();

                    bullets.splice(j, 1);
                    enemies.splice(i, 1);
                    enemyDestroyed = true;
                    break;
                }
            }

            if (!enemyDestroyed && enemies[i].markedForDeletion) {
                enemies.splice(i, 1);
            }
        }

        // Update particles
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            if (particles[i].markedForDeletion) {
                particles.splice(i, 1);
            }
        }
    }
}

function handlePlayerHit() {
    lives--;
    updateHUD();

    // Screen shake could go here

    if (lives <= 0) {
        gameOver();
    } else {
        // Invulnerability frames could go here
        player.x = canvas.width / 2 - CONFIG.PLAYER_WIDTH / 2;
    }
}

function updateBackground() {
    for (let star of backgroundStars) {
        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    }
}

function spawnEnemy() {
    const x = Math.random() * (canvas.width - CONFIG.ENEMY_WIDTH);
    // Speed increases slightly with waves
    const speed = CONFIG.ENEMY_BASE_SPEED + (wave * 0.2) + Math.random();
    enemies.push(new Enemy(x, -CONFIG.ENEMY_HEIGHT, speed));
}

function createExplosion(x, y, color) {
    for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
        particles.push(new Particle(x, y, color));
    }
}

function checkCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

// ---------------------- DRAWING ----------------------

function draw() {
    // Clear canvas
    ctx.fillStyle = CONFIG.COLORS.BG;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw background
    for (let star of backgroundStars) {
        ctx.fillStyle = star.color;
        ctx.fillRect(star.x, star.y, star.size, star.size);
    }

    if (currentState === GAME_STATE.PLAYING || currentState === GAME_STATE.GAME_OVER) {

        // Draw entities
        for (let particle of particles) particle.draw(ctx);
        for (let bullet of bullets) bullet.draw(ctx);
        for (let enemy of enemies) enemy.draw(ctx);

        if (currentState === GAME_STATE.PLAYING) {
            player.draw(ctx);
        }
    }
}

// ---------------------- CLASSES ----------------------

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = CONFIG.PLAYER_WIDTH;
        this.height = CONFIG.PLAYER_HEIGHT;
        this.speed = CONFIG.PLAYER_SPEED;
        this.cooldown = 0;
    }

    update() {
        // Movement
        if ((keys.ArrowLeft || touchInput.left) && this.x > 0) {
            this.x -= this.speed;
        }
        if ((keys.ArrowRight || touchInput.right) && this.x < canvas.width - this.width) {
            this.x += this.speed;
        }

        // Shooting
        if (this.cooldown > 0) this.cooldown--;

        if ((keys.Space || touchInput.active) && this.cooldown === 0) {
            this.shoot();
        }
    }

    shoot() {
        // Create 2 bullets from the sides
        bullets.push(new Bullet(this.x + 5, this.y));
        bullets.push(new Bullet(this.x + this.width - 9, this.y));
        this.cooldown = CONFIG.FIRE_COOLDOWN;
    }

    draw(ctx) {
        // Draw abstract ship
        ctx.fillStyle = CONFIG.COLORS.PLAYER;

        ctx.beginPath();
        // Nose
        ctx.moveTo(this.x + this.width / 2, this.y);
        // Bottom Right
        ctx.lineTo(this.x + this.width, this.y + this.height);
        // Bottom middle inset
        ctx.lineTo(this.x + this.width / 2, this.y + this.height - 10);
        // Bottom left
        ctx.lineTo(this.x, this.y + this.height);
        ctx.closePath();

        ctx.shadowBlur = 10;
        ctx.shadowColor = CONFIG.COLORS.PLAYER;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Engine glow
        ctx.fillStyle = CONFIG.COLORS.PARTICLE;
        ctx.fillRect(this.x + this.width / 2 - 5, this.y + this.height - 8, 10, 5 + Math.random() * 10);
    }
}

class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.width = CONFIG.ENEMY_WIDTH;
        this.height = CONFIG.ENEMY_HEIGHT;
        this.speed = speed;
        this.markedForDeletion = false;
        // Wiggle movement
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = Math.random() * 0.05 + 0.02;
    }

    update() {
        this.y += this.speed;

        // Slight horizontal sway
        this.x += Math.sin(this.angle) * 1;
        this.angle += this.angleSpeed;

        // Keep in bounds bounds
        if (this.x < 0) this.x = 0;
        if (this.x > canvas.width - this.width) this.x = canvas.width - this.width;

        if (this.y > canvas.height) {
            this.markedForDeletion = true;
            // Penalty for letting enemies pass?
            score = Math.max(0, score - 5);
            updateHUD();
        }
    }

    draw(ctx) {
        ctx.fillStyle = CONFIG.COLORS.ENEMY;

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width, this.y);
        ctx.lineTo(this.x + this.width / 2, this.y + this.height);
        ctx.closePath();

        ctx.shadowBlur = 15;
        ctx.shadowColor = CONFIG.COLORS.ENEMY;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 4;
        this.height = 15;
        this.speed = CONFIG.BULLET_SPEED;
        this.markedForDeletion = false;
    }

    update() {
        this.y -= this.speed;
        if (this.y + this.height < 0) {
            this.markedForDeletion = true;
        }
    }

    draw(ctx) {
        ctx.fillStyle = CONFIG.COLORS.BULLET;
        ctx.shadowBlur = 5;
        ctx.shadowColor = CONFIG.COLORS.BULLET;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 0;
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color || CONFIG.COLORS.PARTICLE;
        this.size = Math.random() * 4 + 1;
        this.speedX = (Math.random() - 0.5) * 8;
        this.speedY = (Math.random() - 0.5) * 8;
        this.life = 1.0; // Acts as opacity
        this.decay = Math.random() * 0.05 + 0.02;
        this.markedForDeletion = false;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;

        if (this.life <= 0) {
            this.markedForDeletion = true;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.restore();
    }
}

class Star {
    constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 2;
        this.speed = Math.random() * 0.5 + 0.1;
        this.color = CONFIG.COLORS.STARS[Math.floor(Math.random() * CONFIG.COLORS.STARS.length)];
    }
}

// Start everything when DOM completes
window.addEventListener('load', init);
