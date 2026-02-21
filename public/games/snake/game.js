/**
 * Standalone Snake Game
 * Implemented with pure HTML5 Canvas and Vanilla JavaScript
 */

// --- Constants & Config ---
const CANVAS_SIZE = 400;
const GRID_SIZE = 20; // 20x20 grid
const TILE_SIZE = CANVAS_SIZE / GRID_SIZE;

const STYLES = {
    snakeHead: '#00f0ff',
    snakeBody: 'rgba(0, 240, 255, 0.7)',
    food: '#a855f7',
    foodGlow: 'rgba(168, 85, 247, 0.5)'
};

const INITIAL_SNAKE = [
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 }
];
const INITIAL_DIRECTION = { x: 0, y: -1 }; // UP
const BASE_SPEED_MS = 150;
const MIN_SPEED_MS = 60;
const SPEED_DECREMENT = 2; // ms decrease per food eaten

// --- Game State ---
let canvas, ctx;
let snake = [];
let direction = { x: 0, y: 0 };
let nextDirection = { x: 0, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;
let highScore = 0;

// Loop control
let lastRenderTime = 0;
let gameOver = false;
let isPaused = false;
let gameStarted = false;
let animationFrameId = null;

// DOM Elements
let scoreEl, highScoreEl;
let startScreen, gameOverScreen, pauseScreen;
let finalScoreEl;

// Touch tracking
let touchStartX = 0;
let touchStartY = 0;

// --- Initialization ---
function init() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    // Ensure internal resolution matches constants
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;

    // Get DOM elements
    scoreEl = document.getElementById('score');
    highScoreEl = document.getElementById('highScore');
    startScreen = document.getElementById('startScreen');
    gameOverScreen = document.getElementById('gameOverScreen');
    pauseScreen = document.getElementById('pauseScreen');
    finalScoreEl = document.getElementById('finalScore');

    // Load high score
    const savedScore = localStorage.getItem('snakeHighScore');
    if (savedScore) {
        highScore = parseInt(savedScore, 10);
        updateScoreBoard();
    }

    // Set up event listeners
    document.addEventListener('keydown', handleInput);

    // Touch events for mobile
    const wrapper = document.querySelector('.game-container');
    wrapper.addEventListener('touchstart', handleTouchStart, { passive: false });
    wrapper.addEventListener('touchmove', handleTouchMove, { passive: false });

    // UI Buttons
    document.getElementById('startBtn').addEventListener('click', startGame);
    document.getElementById('restartBtn').addEventListener('click', startGame);

    // Pause on unfocus
    window.addEventListener('blur', () => {
        if (gameStarted && !gameOver && !isPaused) {
            togglePause();
        }
    });

    // Initial render
    resetGameState();
    drawBackground();
}

function resetGameState() {
    snake = JSON.parse(JSON.stringify(INITIAL_SNAKE)); // Deep copy
    direction = { ...INITIAL_DIRECTION };
    nextDirection = { ...INITIAL_DIRECTION };
    score = 0;
    gameOver = false;
    isPaused = false;

    updateScoreBoard();
    placeFood();
}

function startGame() {
    resetGameState();
    gameStarted = true;

    startScreen.classList.remove('active');
    gameOverScreen.classList.remove('active');
    pauseScreen.classList.remove('active');

    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    lastRenderTime = performance.now();
    animationFrameId = requestAnimationFrame(gameLoop);
}

// --- Main Game Loop ---
function gameLoop(currentTime) {
    if (gameOver) {
        handleGameOver();
        return;
    }

    if (isPaused) {
        // Stop requesting frames while paused if we wanted, but keeping loop running is easier
        animationFrameId = requestAnimationFrame(gameLoop);
        return;
    }

    animationFrameId = requestAnimationFrame(gameLoop);

    // Calculate dynamic speed based on score
    const currentSpeed = Math.max(MIN_SPEED_MS, BASE_SPEED_MS - (score * SPEED_DECREMENT));

    // Time since last update
    const secondsSinceLastRender = (currentTime - lastRenderTime);

    if (secondsSinceLastRender < currentSpeed) return;

    lastRenderTime = currentTime;

    update();
    draw();
}

// --- Logic Update ---
function update() {
    // Update direction
    direction = nextDirection;

    // Calculate new head position
    const head = { ...snake[0] };
    head.x += direction.x;
    head.y += direction.y;

    // Check collisions
    if (checkCollision(head)) {
        gameOver = true;
        return;
    }

    // Move snake
    snake.unshift(head);

    // Check food
    if (head.x === food.x && head.y === food.y) {
        // Eaten food
        score++;
        updateScoreBoard();
        placeFood();
        // Skip pop() to grow snake
    } else {
        snake.pop(); // Remove tail
    }
}

function checkCollision(position) {
    // Wall collision
    if (
        position.x < 0 ||
        position.x >= GRID_SIZE ||
        position.y < 0 ||
        position.y >= GRID_SIZE
    ) {
        return true;
    }

    // Self collision
    // (excluding tail because it will move out of the way, unless we just ate)
    // Actually, simple array includes check is safer:
    for (let i = 0; i < snake.length; i++) {
        if (position.x === snake[i].x && position.y === snake[i].y) return true;
    }

    return false;
}

function placeFood() {
    let newFoodPos;
    let isOccupied = true;

    while (isOccupied) {
        newFoodPos = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
        };

        // Check if food spawned on snake
        isOccupied = snake.some(segment => segment.x === newFoodPos.x && segment.y === newFoodPos.y);
    }

    food = newFoodPos;
}

// --- Drawing ---
function drawBackground() {
    // In actual impl, clearing is enough because CSS handles the background and grid
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function draw() {
    drawBackground();

    // Draw Food
    drawFood();

    // Draw Snake
    drawSnake();
}

function drawFood() {
    const cx = food.x * TILE_SIZE + TILE_SIZE / 2;
    const cy = food.y * TILE_SIZE + TILE_SIZE / 2;
    const radius = (TILE_SIZE / 2) - 2;

    // Glow effect
    ctx.shadowColor = STYLES.foodGlow;
    ctx.shadowBlur = 10;

    ctx.fillStyle = STYLES.food;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();

    // Reset shadow
    ctx.shadowBlur = 0;
}

function drawSnake() {
    snake.forEach((segment, index) => {
        const isHead = index === 0;

        // Calculate drawing coordinates
        const x = segment.x * TILE_SIZE;
        const y = segment.y * TILE_SIZE;
        const padding = 1; // Gap between segments
        const drawSize = TILE_SIZE - (padding * 2);

        if (isHead) {
            // Head styling
            ctx.fillStyle = STYLES.snakeHead;
            ctx.shadowColor = STYLES.snakeHead;
            ctx.shadowBlur = 8;
        } else {
            // Body styling
            ctx.fillStyle = STYLES.snakeBody;
            ctx.shadowBlur = 0;
        }

        ctx.fillRect(x + padding, y + padding, drawSize, drawSize);

        // Draw eyes on head
        if (isHead) {
            ctx.shadowBlur = 0; // No shadow for eyes
            ctx.fillStyle = '#0a0a0f'; // Dark eye color

            const eyeSize = 3;
            const eyeOffset = 4;
            let eye1X, eye1Y, eye2X, eye2Y;

            // Position eyes based on direction
            if (direction.y === -1) { // UP
                eye1X = x + eyeOffset; eye1Y = y + eyeOffset;
                eye2X = x + TILE_SIZE - eyeOffset - eyeSize; eye2Y = y + eyeOffset;
            } else if (direction.y === 1) { // DOWN
                eye1X = x + eyeOffset; eye1Y = y + TILE_SIZE - eyeOffset - eyeSize;
                eye2X = x + TILE_SIZE - eyeOffset - eyeSize; eye2Y = y + TILE_SIZE - eyeOffset - eyeSize;
            } else if (direction.x === -1) { // LEFT
                eye1X = x + eyeOffset; eye1Y = y + eyeOffset;
                eye2X = x + eyeOffset; eye2Y = y + TILE_SIZE - eyeOffset - eyeSize;
            } else { // RIGHT
                eye1X = x + TILE_SIZE - eyeOffset - eyeSize; eye1Y = y + eyeOffset;
                eye2X = x + TILE_SIZE - eyeOffset - eyeSize; eye2Y = y + TILE_SIZE - eyeOffset - eyeSize;
            }

            ctx.fillRect(eye1X, eye1Y, eyeSize, eyeSize);
            ctx.fillRect(eye2X, eye2Y, eyeSize, eyeSize);
        }
    });

    ctx.shadowBlur = 0; // Reset shadow for next frame
}

// --- Input Handling ---
function handleInput(e) {
    // Prevent default scrolling for game keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code) && gameStarted) {
        e.preventDefault();
    }

    if (!gameStarted) {
        if (e.code === 'Enter' || e.code === 'Space') startGame();
        return;
    }

    if (e.code === 'Space') {
        togglePause();
        return;
    }

    if (isPaused) return;

    changeDirection(e.key);
}

function changeDirection(key) {
    const k = key.toLowerCase();

    const goingUp = direction.y === -1;
    const goingDown = direction.y === 1;
    const goingRight = direction.x === 1;
    const goingLeft = direction.x === -1;

    if ((k === 'arrowup' || k === 'w') && !goingDown) {
        nextDirection = { x: 0, y: -1 };
    } else if ((k === 'arrowdown' || k === 's') && !goingUp) {
        nextDirection = { x: 0, y: 1 };
    } else if ((k === 'arrowleft' || k === 'a') && !goingRight) {
        nextDirection = { x: -1, y: 0 };
    } else if ((k === 'arrowright' || k === 'd') && !goingLeft) {
        nextDirection = { x: 1, y: 0 };
    }
}

// --- Touch handling for swipe ---
function handleTouchStart(e) {
    if (!gameStarted) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;

    if (e.target.tagName !== 'BUTTON') {
        e.preventDefault(); // Prevent scrolling on canvas interaction
    }
}

function handleTouchMove(e) {
    if (!gameStarted || isPaused || e.touches.length === 0) return;

    e.preventDefault(); // Prevent scrolling

    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;

    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;

    // Swipe needs a minimum distance to trigger
    const MIN_SWIPE_DISTANCE = 30;

    if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal swipe
        if (Math.abs(dx) > MIN_SWIPE_DISTANCE) {
            if (dx > 0) changeDirection('ArrowRight');
            else changeDirection('ArrowLeft');

            // Reset start to prevent multiple continuous events
            touchStartX = touchEndX;
            touchStartY = touchEndY;
        }
    } else {
        // Vertical swipe
        if (Math.abs(dy) > MIN_SWIPE_DISTANCE) {
            if (dy > 0) changeDirection('ArrowDown');
            else changeDirection('ArrowUp');

            // Reset start
            touchStartX = touchEndX;
            touchStartY = touchEndY;
        }
    }
}

// --- Utilities & State Management ---
function updateScoreBoard() {
    scoreEl.textContent = score;

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore.toString());

        // Add minimal animation classes if desired
    }

    highScoreEl.textContent = highScore;
}

function togglePause() {
    if (gameOver) return;

    isPaused = !isPaused;

    if (isPaused) {
        pauseScreen.classList.add('active');
    } else {
        pauseScreen.classList.remove('active');
    }
}

function handleGameOver() {
    gameStarted = false;
    finalScoreEl.textContent = score;
    gameOverScreen.classList.add('active');

    // Draw grid overlay for dramatic effect
    ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

// Start app
window.onload = init;
