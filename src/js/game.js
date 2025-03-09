class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas dimensions
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;
        
        // Game state
        this.isRunning = false;
        this.gameOver = false;
        this.score = 0;
        
        // Game objects
        this.player = null;
        this.era = null;
        this.obstacles = [];
        
        // Time tracking
        this.lastTime = 0;
        this.obstacleTimer = 0;
        
        // Input handling
        this.setupInputHandlers();
        
        // DOM elements
        this.scoreElement = document.getElementById('score');
        this.gameOverElement = document.getElementById('game-over');
        this.finalScoreElement = document.getElementById('final-score');
        this.restartButton = document.getElementById('restart-button');
        
        // Setup restart button
        this.restartButton.addEventListener('click', () => this.restart());
    }
    
    init() {
        // Create game objects
        this.player = new Player(this.canvas);
        this.era = new Era(this.canvas);
        this.obstacles = [];
        
        // Reset game state
        this.isRunning = true;
        this.gameOver = false;
        this.score = 0;
        this.obstacleTimer = 0;
        
        // Update score display
        this.updateScore(0);
        
        // Hide game over screen
        this.gameOverElement.classList.add('hidden');
        
        // Start game loop
        this.lastTime = performance.now();
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    
    gameLoop(timestamp) {
        // Calculate delta time
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (this.isRunning && !this.gameOver) {
            // Update game state
            this.update(deltaTime);
            
            // Draw game objects
            this.draw();
            
            // Continue game loop
            requestAnimationFrame(this.gameLoop.bind(this));
        } else if (this.gameOver) {
            // Draw the final state before showing game over
            this.draw();
            
            // Show game over screen
            this.showGameOver();
        }
    }
    
    update(deltaTime) {
        // Update era (background, time period)
        const eraChanged = this.era.update(deltaTime);
        if (eraChanged) {
            this.updateScore(ERA_CHANGE_BONUS);
        }
        
        // Update player
        const playerAlive = this.player.update();
        if (!playerAlive) {
            this.endGame();
            return;
        }
        
        // Spawn obstacles
        this.obstacleTimer += deltaTime;
        if (this.obstacleTimer >= OBSTACLE_SPAWN_RATE) {
            this.obstacleTimer = 0;
            this.spawnObstacle();
        }
        
        // Update obstacles
        this.updateObstacles();
        
        // Check collisions
        this.checkCollisions();
    }
    
    updateObstacles() {
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            const result = this.obstacles[i].update();
            
            if (result === true) {
                // Obstacle passed successfully
                this.updateScore(OBSTACLE_AVOID_SCORE);
            } else if (result === false) {
                // Remove obstacle (off screen)
                this.obstacles.splice(i, 1);
            }
        }
    }
    
    spawnObstacle() {
        const obstacleTemplate = this.era.getRandomObstacle();
        const obstacle = new Obstacle(this.canvas, obstacleTemplate, this.player.baseY);
        this.obstacles.push(obstacle);
    }
    
    checkCollisions() {
        for (const obstacle of this.obstacles) {
            if (this.player.checkCollision(obstacle)) {
                this.endGame();
                return;
            }
        }
    }
    
    draw() {
        // Draw background and era elements
        this.era.draw();
        
        // Draw player
        this.player.draw(this.era.currentEra);
        
        // Draw obstacles
        for (const obstacle of this.obstacles) {
            obstacle.draw();
        }
    }
    
    updateScore(points) {
        this.score += points;
        this.scoreElement.textContent = this.score;
    }
    
    endGame() {
        this.isRunning = false;
        this.gameOver = true;
    }
    
    showGameOver() {
        // Update final score
        this.finalScoreElement.textContent = this.score;
        
        // Update game over title and message
        const gameOverContent = this.gameOverElement.querySelector('.game-over-content');
        const gameOverTitle = gameOverContent.querySelector('h2');
        gameOverTitle.textContent = 'Game Over!';
        
        const gameOverScore = gameOverContent.querySelector('p');
        gameOverScore.innerHTML = `Your score: <span id="final-score">${this.score}</span>`;
        
        const restartButton = document.getElementById('restart-button');
        restartButton.textContent = 'Play Again';
        
        // Show game over screen
        this.gameOverElement.classList.remove('hidden');
    }
    
    restart() {
        this.init();
    }
    
    setupInputHandlers() {
        // Keyboard input
        document.addEventListener('keydown', (event) => {
            if (!this.isRunning) {
                if (event.key === 'Enter' || event.key === ' ' || event.code === 'Space') {
                    this.restart();
                }
                return;
            }
            
            switch (event.key) {
                case 'ArrowUp':
                    this.player.jump();
                    break;
                case 'ArrowDown':
                    this.player.duck();
                    break;
                case ' ':
                case 'Space':
                    this.player.jump(); // Spacebar can also be used to jump
                    break;
            }
        });
        
        document.addEventListener('keyup', (event) => {
            if (!this.isRunning) return;
            
            if (event.key === 'ArrowDown') {
                this.player.stopDucking();
            }
        });
        
        // Touch input for mobile
        this.canvas.addEventListener('touchstart', (event) => {
            if (!this.isRunning) {
                this.restart();
                return;
            }
            
            const touch = event.touches[0];
            const canvasRect = this.canvas.getBoundingClientRect();
            const touchY = touch.clientY - canvasRect.top;
            
            if (touchY > this.canvas.height / 2) {
                this.player.duck();
            } else {
                this.player.jump();
            }
            
            event.preventDefault();
        });
        
        this.canvas.addEventListener('touchend', (event) => {
            if (!this.isRunning) return;
            
            this.player.stopDucking();
            event.preventDefault();
        });
    }
} 