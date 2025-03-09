class Obstacle {
    constructor(canvas, eraObstacle, baseY) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        this.type = eraObstacle.type;
        this.position = eraObstacle.position;
        this.width = eraObstacle.width;
        this.height = eraObstacle.height;
        this.color = eraObstacle.color;
        
        this.x = canvas.width; // Start at the right edge of the canvas
        
        // Set y position based on obstacle type
        this.baseY = baseY;
        this.setYPosition();
        
        this.passed = false;
    }
    
    setYPosition() {
        switch(this.position) {
            case "high":
                this.y = this.baseY - this.height - 20;
                break;
            case "middle":
                this.y = this.baseY - this.height / 2;
                break;
            case "low":
                this.y = this.baseY + 10;
                break;
            default:
                this.y = this.baseY;
        }
    }
    
    update() {
        this.x -= GAME_SPEED;
        
        // Check if obstacle has passed the player
        if (!this.passed && this.x + this.width < PLAYER_START_X) {
            this.passed = true;
            return true; // Obstacle passed successfully
        }
        
        // Check if obstacle is off screen
        if (this.x + this.width < 0) {
            return false; // Remove obstacle
        }
        
        return null; // Keep obstacle
    }
    
    draw() {
        this.ctx.fillStyle = this.color;
        
        // Draw different shapes based on obstacle type
        switch(this.type) {
            case "pterodactyl":
                this.drawPterodactyl();
                break;
            case "vine":
                this.drawVine();
                break;
            case "arrow":
                this.drawArrow();
                break;
            case "turret":
                this.drawTurret();
                break;
            case "drone":
                this.drawDrone();
                break;
            case "barrier":
                this.drawBarrier();
                break;
            default:
                // Default rectangle
                this.ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    
    drawPterodactyl() {
        // Body
        this.ctx.fillRect(this.x + 20, this.y + 15, 20, 15);
        
        // Wings
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + 30, this.y + 15);
        this.ctx.lineTo(this.x, this.y);
        this.ctx.lineTo(this.x, this.y + 20);
        this.ctx.fill();
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + 30, this.y + 15);
        this.ctx.lineTo(this.x + 60, this.y);
        this.ctx.lineTo(this.x + 60, this.y + 20);
        this.ctx.fill();
        
        // Head and beak
        this.ctx.beginPath();
        this.ctx.arc(this.x + 50, this.y + 15, 8, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + 55, this.y + 15);
        this.ctx.lineTo(this.x + 65, this.y + 10);
        this.ctx.lineTo(this.x + 65, this.y + 20);
        this.ctx.fill();
    }
    
    drawVine() {
        // Main vine
        this.ctx.fillRect(this.x + this.width / 2 - 5, this.y - 100, 10, 100 + this.height);
        
        // Leaves
        this.ctx.beginPath();
        this.ctx.ellipse(this.x + 10, this.y + 20, 15, 8, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.beginPath();
        this.ctx.ellipse(this.x + this.width - 10, this.y + 40, 15, 8, 0, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    drawArrow() {
        // Arrow shaft
        this.ctx.fillRect(this.x, this.y + this.height / 2 - 2, this.width - 10, 4);
        
        // Arrow head
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + this.width - 10, this.y);
        this.ctx.lineTo(this.x + this.width, this.y + this.height / 2);
        this.ctx.lineTo(this.x + this.width - 10, this.y + this.height);
        this.ctx.fill();
        
        // Arrow fletching
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x + 10, this.y + this.height / 2);
        this.ctx.lineTo(this.x, this.y + this.height);
        this.ctx.fill();
    }
    
    drawTurret() {
        // Base
        this.ctx.fillRect(this.x, this.y + this.height - 20, this.width, 20);
        
        // Tower
        this.ctx.fillRect(this.x + 10, this.y, 30, this.height - 20);
        
        // Top
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + 5, this.y);
        this.ctx.lineTo(this.x + this.width - 5, this.y);
        this.ctx.lineTo(this.x + this.width / 2, this.y - 10);
        this.ctx.fill();
        
        // Window
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(this.x + 20, this.y + 15, 10, 15);
    }
    
    drawDrone() {
        // Body
        this.ctx.fillRect(this.x + 10, this.y + 10, 30, 10);
        
        // Rotors
        this.ctx.beginPath();
        this.ctx.arc(this.x + 15, this.y + 5, 10, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.beginPath();
        this.ctx.arc(this.x + 35, this.y + 5, 10, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Lights
        this.ctx.fillStyle = "#ffffff";
        this.ctx.beginPath();
        this.ctx.arc(this.x + 15, this.y + 20, 3, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.fillStyle = "#ff0000";
        this.ctx.beginPath();
        this.ctx.arc(this.x + 35, this.y + 20, 3, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    drawBarrier() {
        // Main barrier
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Electric effect (zigzag lines)
        this.ctx.strokeStyle = "#ffffff";
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        
        for (let i = 0; i < 5; i++) {
            const segmentWidth = this.width / 5;
            const segmentHeight = this.height / 5;
            
            if (i % 2 === 0) {
                this.ctx.lineTo(this.x + segmentWidth * (i + 1), this.y + segmentHeight);
            } else {
                this.ctx.lineTo(this.x + segmentWidth * (i + 1), this.y - segmentHeight);
            }
        }
        
        this.ctx.stroke();
    }
} 