// Debug script to help identify issues on Vercel
document.addEventListener('DOMContentLoaded', () => {
    console.log('Debug script loaded');
    
    // Check if all required scripts are loaded
    const scripts = [
        'constants.js',
        'player.js',
        'obstacle.js',
        'era.js',
        'game.js',
        'main.js'
    ];
    
    const debugElement = document.createElement('div');
    debugElement.style.position = 'fixed';
    debugElement.style.bottom = '10px';
    debugElement.style.left = '10px';
    debugElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    debugElement.style.color = 'white';
    debugElement.style.padding = '10px';
    debugElement.style.borderRadius = '5px';
    debugElement.style.zIndex = '1000';
    debugElement.style.maxWidth = '80%';
    debugElement.style.maxHeight = '200px';
    debugElement.style.overflow = 'auto';
    
    let debugLog = 'Debug Info:<br>';
    
    // Check if canvas exists
    const canvas = document.getElementById('gameCanvas');
    if (canvas) {
        debugLog += '✅ Canvas element found<br>';
    } else {
        debugLog += '❌ Canvas element NOT found<br>';
    }
    
    // Check if all script elements exist in the DOM
    scripts.forEach(script => {
        const scriptElement = Array.from(document.scripts).find(s => s.src.includes(script));
        if (scriptElement) {
            debugLog += `✅ ${script} found<br>`;
        } else {
            debugLog += `❌ ${script} NOT found<br>`;
        }
    });
    
    // Check if game elements are accessible
    if (typeof Game !== 'undefined') {
        debugLog += '✅ Game class is defined<br>';
    } else {
        debugLog += '❌ Game class is NOT defined<br>';
    }
    
    if (typeof Player !== 'undefined') {
        debugLog += '✅ Player class is defined<br>';
    } else {
        debugLog += '❌ Player class is NOT defined<br>';
    }
    
    // Log any errors that occur
    window.addEventListener('error', (event) => {
        debugLog += `❌ ERROR: ${event.message} at ${event.filename}:${event.lineno}<br>`;
        debugElement.innerHTML = debugLog;
    });
    
    debugElement.innerHTML = debugLog;
    document.body.appendChild(debugElement);
}); 