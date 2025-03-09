// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('Game initialization started');
        
        // Check if all required scripts are loaded
        if (typeof Game === 'undefined' || typeof Player === 'undefined' || 
            typeof Obstacle === 'undefined' || typeof Era === 'undefined') {
            throw new Error('Required game classes are not defined. Script loading may have failed.');
        }
        
        // Create and initialize the game
        const game = new Game();
        
        // Show a welcome message and instructions
        const gameOverElement = document.getElementById('game-over');
        if (!gameOverElement) {
            throw new Error('Game over element not found in the DOM.');
        }
        
        const gameOverContent = document.querySelector('.game-over-content');
        if (!gameOverContent) {
            throw new Error('Game over content element not found in the DOM.');
        }
        
        // Change the game over content to welcome message
        const gameOverTitle = gameOverContent.querySelector('h2');
        if (!gameOverTitle) {
            throw new Error('Game over title element not found in the DOM.');
        }
        gameOverTitle.textContent = 'Time-Traveler\'s Tightrope';
        
        const gameOverScore = gameOverContent.querySelector('p');
        if (!gameOverScore) {
            throw new Error('Game over score element not found in the DOM.');
        }
        gameOverScore.innerHTML = 'Balance on the rope through time!<br>Use ↑ to jump and ↓ to duck.<br>Press Space or Enter to start/restart.<br>Survive as long as possible!';
        
        const restartButton = document.getElementById('restart-button');
        if (!restartButton) {
            throw new Error('Restart button not found in the DOM.');
        }
        restartButton.textContent = 'Start Game';
        
        // Show the welcome screen
        gameOverElement.classList.remove('hidden');
        
        // Start the game when the start button is clicked
        restartButton.addEventListener('click', () => {
            try {
                // Initialize the game
                game.init();
            } catch (error) {
                console.error('Error initializing game:', error);
                redirectToFallback(error.message);
            }
        });
        
        // Start the game when spacebar or enter is pressed
        document.addEventListener('keydown', (event) => {
            if ((event.key === ' ' || event.code === 'Space' || event.key === 'Enter') && 
                !game.isRunning && 
                gameOverElement.classList.contains('hidden') === false) {
                
                try {
                    game.init();
                } catch (error) {
                    console.error('Error initializing game:', error);
                    redirectToFallback(error.message);
                }
            }
        });
        
        console.log('Game initialization completed successfully');
    } catch (error) {
        console.error('Fatal error during game setup:', error);
        redirectToFallback(error.message);
    }
});

// Function to redirect to fallback page with error information
function redirectToFallback(errorMessage) {
    window.location.href = `fallback.html?error=${encodeURIComponent(errorMessage)}`;
} 