# Time-Traveler's Tightrope

A side-scrolling action/survival game where you balance on a tightrope across the fabric of time, dodging era-specific obstacles while the world shifts around you.

## Game Concept

In "Time-Traveler's Tightrope," you play as a daring time traveler balancing on a tightrope that stretches across the fabric of history. The rope is your lifeline, wobbling under your weight as you navigate through dynamically shifting eras—each with its own distinct challenges and aesthetic.

One moment you're dodging a pterodactyl's swoop in the Jurassic period, the next you're leaping over a futuristic drone's laser in a neon-lit cyberworld. The goal is to survive as long as possible, racking up points by crossing time zones and avoiding era-specific obstacles.

## How to Play

- **Controls**: Use the **Up Arrow** or **Spacebar** to jump and the **Down Arrow** to duck, avoiding obstacles.
- **Mobile**: Tap the top half of the screen to jump, bottom half to duck.
- **Scoring**: Earn 1 point for each obstacle avoided, with a bonus 5 points for surviving a full time shift.
- **Game Over**: Fall off the rope or collide with an obstacle to end the game. Press Spacebar, Enter, or click/tap to restart.

## Features

- **Dynamic Era Shifts**: Every 5-10 seconds, the time period changes, bringing new obstacles and visuals.
- **Tightrope Physics**: The rope sways with sinusoidal motion, adding challenge to your jumps and ducks.
- **Era-Specific Obstacles**: Each time period has unique hazards to avoid:
  - **Jurassic Era**: Pterodactyls swoop from above, vines hang low.
  - **Medieval Era**: Arrows shoot from the side, castle turrets loom overhead.
  - **Cyberpunk Era**: Drones fire lasers from above, electric barriers spark below.
- **Responsive Design**: Playable on both desktop and mobile devices.

## Technical Details

- Built with vanilla JavaScript and HTML5 Canvas
- No external libraries or dependencies
- Responsive design that works on various screen sizes
- Optimized for deployment on Vercel

## Local Development

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/time-travelers-tightrope.git
   ```

2. Open the project folder:
   ```
   cd time-travelers-tightrope
   ```

3. Open `index.html` in your browser or use a local server:
   ```
   npx serve
   ```

## Deployment to Vercel

### Method 1: Direct Deployment

1. Install the Vercel CLI if you haven't already:
   ```
   npm install -g vercel
   ```

2. Deploy the project:
   ```
   vercel
   ```

### Method 2: Using the Deployment Script

1. Make sure you have Node.js installed.

2. Run the deployment script:
   ```
   node deploy.js
   ```

3. Navigate to the dist directory:
   ```
   cd dist
   ```

4. Deploy with Vercel:
   ```
   vercel
   ```

### Method 3: GitHub Integration

1. Push your code to a GitHub repository.

2. Connect the repository to Vercel through the Vercel dashboard.

3. Configure the build settings:
   - Build Command: Leave empty (static deployment)
   - Output Directory: Leave empty (root directory)
   - Install Command: Leave empty (no dependencies)

4. Deploy with default settings.

## Troubleshooting Deployment Issues

If you encounter issues with the game not working properly on Vercel:

1. Check the browser console for any JavaScript errors.

2. Make sure all file paths are correct (case-sensitive on some servers).

3. Verify that all game files are being properly deployed to Vercel.

4. Try using the debug mode by adding `?debug=true` to the URL.

5. If specific features aren't working, check the debug information displayed on the screen.

## License

MIT License

## Credits

Created as a lightweight browser-based game with minimal dependencies. 