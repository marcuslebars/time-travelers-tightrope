// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create and initialize the game
    const game = new Game();
    
    // Show a welcome message and instructions
    const gameOverElement = document.getElementById('game-over');
    const gameOverContent = document.querySelector('.game-over-content');
    
    // Change the game over content to welcome message
    const gameOverTitle = gameOverContent.querySelector('h2');
    gameOverTitle.textContent = 'Time-Traveler\'s Tightrope';
    
    const gameOverScore = gameOverContent.querySelector('p');
    gameOverScore.innerHTML = 'Balance on the rope through time!<br>Use ↑ to jump and ↓ to duck.<br>Press Space or Enter to start/restart.<br>Survive as long as possible!';
    
    const restartButton = document.getElementById('restart-button');
    restartButton.textContent = 'Start Game';
    
    // Show the welcome screen
    gameOverElement.classList.remove('hidden');
    
    // Start the game when the start button is clicked
    restartButton.addEventListener('click', () => {
        // Initialize the game
        game.init();
    });
    
    // Start the game when spacebar or enter is pressed
    document.addEventListener('keydown', (event) => {
        if ((event.key === ' ' || event.code === 'Space' || event.key === 'Enter') && 
            !game.isRunning && 
            gameOverElement.classList.contains('hidden') === false) {
            
            game.init();
        }
    });
}); 