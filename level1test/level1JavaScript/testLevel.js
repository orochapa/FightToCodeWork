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
        25, 5, 7
    );

    // Create enemy
    enemy = createEnemies(
        'level1graphics/KillerBunny2.png',
        canvas.width / 2,
        canvas.height -150,
        300, 300,
        3, 25, 5
    );

    // Start game loop when images are loaded
    let loadedCount = 0;
    const requiredImages = 2;

    function attemptGameStart() {
        loadedCount++;
        if (loadedCount >= requiredImages) {
            gameLoop();
        }
    }

    // Set up load handlers for player and enemy
    player.image.onload = attemptGameStart;
    enemy.image.onload = attemptGameStart;  // Make sure enemy's image is loaded too
};

function gameLoop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear canvas
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);  // Redraw background
    
    // Move and draw the enemy
    moveEnemyRandomly(enemy);  // Move the enemy randomly
    enemy.draw(ctx);            // Draw the enemy

    // Continue the game loop
    requestAnimationFrame(gameLoop);
}

gameLoop();