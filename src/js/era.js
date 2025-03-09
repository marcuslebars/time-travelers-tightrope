class Era {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        // Start with a random era
        this.currentEraIndex = Math.floor(Math.random() * ERAS.length);
        this.currentEra = ERAS[this.currentEraIndex];
        
        // Time tracking for era changes
        this.timeUntilNextEra = this.getRandomEraTime();
        this.transitioning = false;
        this.transitionProgress = 0;
        this.nextEraIndex = null;
        
        // Background elements for parallax effect
        this.backgroundElements = this.generateBackgroundElements();
    }
    
    getRandomEraTime() {
        return Math.random() * (ERA_CHANGE_MAX_TIME - ERA_CHANGE_MIN_TIME) + ERA_CHANGE_MIN_TIME;
    }
    
    generateBackgroundElements() {
        const elements = [];
        const numElements = 5;
        
        for (let i = 0; i < numElements; i++) {
            elements.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * (this.canvas.height - 100) + 50,
                size: Math.random() * 30 + 20,
                speed: Math.random() * 0.5 + 0.5
            });
        }
        
        return elements;
    }
    
    update(deltaTime) {
        // Update background elements
        for (let element of this.backgroundElements) {
            element.x -= element.speed;
            
            // Reset element position when it goes off screen
            if (element.x + element.size < 0) {
                element.x = this.canvas.width;
                element.y = Math.random() * (this.canvas.height - 100) + 50;
                element.size = Math.random() * 30 + 20;
            }
        }
        
        // Handle era transitions
        if (this.transitioning) {
            this.transitionProgress += 0.02;
            
            if (this.transitionProgress >= 1) {
                this.transitioning = false;
                this.currentEraIndex = this.nextEraIndex;
                this.currentEra = ERAS[this.currentEraIndex];
                this.timeUntilNextEra = this.getRandomEraTime();
                this.backgroundElements = this.generateBackgroundElements();
                
                // Update the era display
                document.getElementById('current-era').textContent = this.currentEra.name;
                
                return true; // Era change completed
            }
        } else {
            this.timeUntilNextEra -= deltaTime;
            
            if (this.timeUntilNextEra <= 0) {
                this.startTransition();
            }
        }
        
        return false; // No era change completed
    }
    
    startTransition() {
        this.transitioning = true;
        this.transitionProgress = 0;
        
        // Choose next era (different from current)
        do {
            this.nextEraIndex = Math.floor(Math.random() * ERAS.length);
        } while (this.nextEraIndex === this.currentEraIndex);
    }
    
    getRandomObstacle() {
        const obstacles = this.currentEra.obstacles;
        const randomIndex = Math.floor(Math.random() * obstacles.length);
        return obstacles[randomIndex];
    }
    
    draw() {
        // Draw background
        if (this.transitioning) {
            // Blend between current and next era during transition
            const currentColor = this.hexToRgb(this.currentEra.backgroundColor);
            const nextColor = this.hexToRgb(ERAS[this.nextEraIndex].backgroundColor);
            
            const r = Math.floor(currentColor.r * (1 - this.transitionProgress) + nextColor.r * this.transitionProgress);
            const g = Math.floor(currentColor.g * (1 - this.transitionProgress) + nextColor.g * this.transitionProgress);
            const b = Math.floor(currentColor.b * (1 - this.transitionProgress) + nextColor.b * this.transitionProgress);
            
            this.ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        } else {
            this.ctx.fillStyle = this.currentEra.backgroundColor;
        }
        
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw era-specific background elements
        this.drawBackgroundElements();
    }
    
    drawBackgroundElements() {
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
        
        for (let element of this.backgroundElements) {
            // Draw different shapes based on current era
            switch(this.currentEra.name) {
                case "Jurassic":
                    this.drawTree(element.x, element.y, element.size);
                    break;
                case "Medieval":
                    this.drawCastle(element.x, element.y, element.size);
                    break;
                case "Cyberpunk":
                    this.drawBuilding(element.x, element.y, element.size);
                    break;
            }
        }
    }
    
    drawTree(x, y, size) {
        // Tree trunk
        this.ctx.fillStyle = "#8b4513";
        this.ctx.fillRect(x + size / 3, y, size / 3, size);
        
        // Tree foliage
        this.ctx.fillStyle = "#228b22";
        this.ctx.beginPath();
        this.ctx.arc(x + size / 2, y - size / 2, size / 1.5, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    drawCastle(x, y, size) {
        // Castle base
        this.ctx.fillStyle = "#808080";
        this.ctx.fillRect(x, y, size, size);
        
        // Castle towers
        this.ctx.fillRect(x - size / 4, y, size / 4, size / 1.5);
        this.ctx.fillRect(x + size, y, size / 4, size / 1.5);
        
        // Tower tops
        this.ctx.beginPath();
        this.ctx.moveTo(x - size / 4, y);
        this.ctx.lineTo(x - size / 8, y - size / 4);
        this.ctx.lineTo(x, y);
        this.ctx.fill();
        
        this.ctx.beginPath();
        this.ctx.moveTo(x + size, y);
        this.ctx.lineTo(x + size + size / 8, y - size / 4);
        this.ctx.lineTo(x + size + size / 4, y);
        this.ctx.fill();
    }
    
    drawBuilding(x, y, size) {
        // Building base
        this.ctx.fillStyle = "#333333";
        this.ctx.fillRect(x, y, size / 2, size);
        
        // Windows
        this.ctx.fillStyle = "#00ffaa";
        const windowSize = size / 10;
        const windowGap = size / 8;
        
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                this.ctx.fillRect(
                    x + j * windowGap + windowSize,
                    y + i * windowGap + windowSize,
                    windowSize,
                    windowSize
                );
            }
        }
        
        // Antenna
        this.ctx.fillStyle = "#666666";
        this.ctx.fillRect(x + size / 4, y - size / 3, size / 20, size / 3);
    }
    
    hexToRgb(hex) {
        // Remove # if present
        hex = hex.replace(/^#/, '');
        
        // Parse hex values
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        
        return { r, g, b };
    }
} 