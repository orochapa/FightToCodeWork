console.log("Level Loaded");

// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Background image
const background = new Image();
background.src = 'level1graphics/OpenMapField.webp';

// Game objects (player and enemy)
let player = null;
let enemy = null;

// Game initialization
background.onload = function() {
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Draw background
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Create player (assuming createPlayer exists)
    player = createPlayer(
        'level1graphics/RightKnight.png',
        canvas.width / 2,
        canvas.height - 150,
        300, 300,
        25, 5, 10
    );

    // Create enemy (Killer Bunny version)
    enemy = createEnemy(
        'level1graphics/KillerBunny2.webp',
        canvas.width / 2,
        canvas.height / 2,
        100, 100,
        25, 5, 2, 200
    );

    gameLoop();
};

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear canvas before redrawing
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);  // Redraw the background

    // Move the enemy and draw it
    if (enemy) {
        enemy.move();  // Move the enemy smoothly
        enemy.draw(ctx);  // Draw the enemy on the canvas
    }

    // Draw the player (if needed)
    if (player) {
        player.draw(ctx);  // Draw player
    }

    requestAnimationFrame(gameLoop);  // Recursively call the game loop to keep updating
}
