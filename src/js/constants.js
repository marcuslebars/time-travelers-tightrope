// Game canvas dimensions
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;

// Player constants
const PLAYER_WIDTH = 30;
const PLAYER_HEIGHT = 50;
const PLAYER_START_X = 100;
const PLAYER_JUMP_FORCE = 12;
const GRAVITY = 0.6;

// Game speed and difficulty
const GAME_SPEED = 5;
const OBSTACLE_SPAWN_RATE = 1500; // milliseconds
const ERA_CHANGE_MIN_TIME = 5000; // milliseconds
const ERA_CHANGE_MAX_TIME = 10000; // milliseconds

// Scoring
const OBSTACLE_AVOID_SCORE = 1;
const ERA_CHANGE_BONUS = 5;

// Tightrope physics
const ROPE_AMPLITUDE = 15; // How high/low the rope can go
const ROPE_FREQUENCY = 0.005; // How fast the rope oscillates

// Era definitions
const ERAS = [
    {
        name: "Jurassic",
        backgroundColor: "#1a472a", // Dark green
        ropeColor: "#8b4513", // Brown
        obstacles: [
            {
                type: "pterodactyl",
                position: "high", // Requires jumping
                width: 60,
                height: 40,
                color: "#5d8aa8" // Blue-gray
            },
            {
                type: "vine",
                position: "low", // Requires ducking
                width: 40,
                height: 60,
                color: "#228b22" // Forest green
            }
        ]
    },
    {
        name: "Medieval",
        backgroundColor: "#4a4a4a", // Dark gray
        ropeColor: "#8b4513", // Brown
        obstacles: [
            {
                type: "arrow",
                position: "middle", // Requires jumping
                width: 70,
                height: 10,
                color: "#cd7f32" // Bronze
            },
            {
                type: "turret",
                position: "high", // Requires ducking
                width: 50,
                height: 70,
                color: "#808080" // Gray
            }
        ]
    },
    {
        name: "Cyberpunk",
        backgroundColor: "#1a1a2e", // Dark blue
        ropeColor: "#00ffaa", // Neon green
        obstacles: [
            {
                type: "drone",
                position: "high", // Requires jumping
                width: 50,
                height: 30,
                color: "#ff3366" // Neon pink
            },
            {
                type: "barrier",
                position: "low", // Requires ducking
                width: 40,
                height: 50,
                color: "#00ffaa" // Neon green
            }
        ]
    }
]; 