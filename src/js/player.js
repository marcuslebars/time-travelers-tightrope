class Player {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        this.width = PLAYER_WIDTH;
        this.height = PLAYER_HEIGHT;
        this.x = PLAYER_START_X;
        this.y = canvas.height / 2; // Start in the middle of the canvas
        
        this.velocityY = 0;
        this.isJumping = false;
        this.isDucking = false;
        
        // For rope physics
        this.baseY = canvas.height / 2;
        this.time = 0;
        
        // Collision box (smaller than visual representation)
        this.collisionBox = {
            x: this.x + 5,
            y: this.y + 5,
            width: this.width - 10,
            height: this.height - 10
        };
    }
    
    update() {
        // Apply gravity
        this.velocityY += GRAVITY;
        this.y += this.velocityY;
        
        // Calculate rope physics (sinusoidal motion)
        this.time += 1;
        const ropeY = this.baseY + Math.sin(this.time * ROPE_FREQUENCY) * ROPE_AMPLITUDE;
        
        // If not jumping or ducking, follow the rope
        if (!this.isJumping && !this.isDucking) {
            this.y = ropeY;
            this.velocityY = 0;
        }
        
        // If ducking, stay on the rope but in ducking position
        if (this.isDucking && !this.isJumping) {
            this.y = ropeY + PLAYER_HEIGHT / 4; // Adjust position for ducking
            this.velocityY = 0;
        }
        
        // Update collision box position
        this.updateCollisionBox();
        
        // Check if player fell off the rope (too high or too low)
        const maxHeight = this.baseY - 150;
        const minHeight = this.baseY + 150;
        
        if (this.y < maxHeight || this.y > minHeight) {
            return false; // Game over
        }
        
        return true; // Still alive
    }
    
    jump() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.velocityY = -PLAYER_JUMP_FORCE;
            
            // If was ducking, restore height
            if (this.isDucking) {
                this.isDucking = false;
                this.height = PLAYER_HEIGHT;
            }
        }
    }
    
    duck() {
        if (!this.isDucking && !this.isJumping) {
            this.isDucking = true;
            this.height = PLAYER_HEIGHT / 2; // Half height when ducking
            
            // Get current rope position
            const ropeY = this.baseY + Math.sin(this.time * ROPE_FREQUENCY) * ROPE_AMPLITUDE;
            this.y = ropeY + PLAYER_HEIGHT / 4; // Adjust position to stay on rope
        }
    }
    
    stopDucking() {
        if (this.isDucking) {
            this.isDucking = false;
            this.height = PLAYER_HEIGHT;
            
            // Get current rope position
            const ropeY = this.baseY + Math.sin(this.time * ROPE_FREQUENCY) * ROPE_AMPLITUDE;
            this.y = ropeY; // Return to rope position
        }
    }
    
    updateCollisionBox() {
        this.collisionBox = {
            x: this.x + 5,
            y: this.y + 5,
            width: this.width - 10,
            height: this.height - 10
        };
    }
    
    checkCollision(obstacle) {
        return (
            this.collisionBox.x < obstacle.x + obstacle.width &&
            this.collisionBox.x + this.collisionBox.width > obstacle.x &&
            this.collisionBox.y < obstacle.y + obstacle.height &&
            this.collisionBox.y + this.collisionBox.height > obstacle.y
        );
    }
    
    draw(currentEra) {
        // Draw the rope
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.baseY);
        
        // Draw a wavy rope
        for (let x = 0; x < this.canvas.width; x += 10) {
            const y = this.baseY + Math.sin((this.time + x) * ROPE_FREQUENCY) * ROPE_AMPLITUDE;
            this.ctx.lineTo(x, y);
        }
        
        this.ctx.strokeStyle = currentEra.ropeColor;
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
        
        // Draw the player
        this.ctx.fillStyle = '#ffffff';
        
        // Draw body
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Draw head (circle on top of rectangle)
        this.ctx.beginPath();
        this.ctx.arc(this.x + this.width / 2, this.y - 10, 15, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw arms when not ducking
        if (!this.isDucking) {
            // Left arm
            this.ctx.fillRect(this.x - 15, this.y + 10, 15, 5);
            // Right arm
            this.ctx.fillRect(this.x + this.width, this.y + 10, 15, 5);
        }
        
        // Draw eyes
        this.ctx.fillStyle = '#000000';
        this.ctx.beginPath();
        this.ctx.arc(this.x + this.width / 2 - 5, this.y - 12, 3, 0, Math.PI * 2);
        this.ctx.arc(this.x + this.width / 2 + 5, this.y - 12, 3, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Reset jumping if back on the rope
        const ropeY = this.baseY + Math.sin(this.time * ROPE_FREQUENCY) * ROPE_AMPLITUDE;
        if (Math.abs(this.y - ropeY) < 5 && this.velocityY > 0) {
            this.isJumping = false;
            this.y = ropeY;
            this.velocityY = 0;
        }
    }
} 