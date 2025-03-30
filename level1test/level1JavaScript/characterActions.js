console.log("Character Actions Loaded");

// Listen for keydown events to move the character
function characterAction(event, character) {
    // Save the previous position for boundary checking
    const previousX = character.x;
    const previousY = character.y;

    if (event.key === 'ArrowLeft') {
        character.x -= character.speed;  // Move left
    }
    if (event.key === 'ArrowRight') {
        character.x += character.speed;  // Move right
    }
    if (event.key === 'ArrowUp') {
        character.y -= character.speed;  // Move up
    }
    if (event.key === 'ArrowDown') {
        character.y += character.speed;  // Move down
    }

    // Ensure the character stays within the canvas boundaries (same logic as enemy)
    character.x = Math.max(0, Math.min(character.x, canvas.width - 200));  // Left/Right bounds
    character.y = Math.max(0, Math.min(character.y, canvas.height - 200));  // Top/Bottom bounds

    // Redraw the player (and optionally the enemy) if the player moved
    if (previousX !== character.x || previousY !== character.y) {
        redraw(character);
    }
}

// Function to redraw everything (background, player, and enemy)
function redraw(player, enemy) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas before redrawing
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);  // Draw the background

    // Draw the player
    if (player) {
        player.draw(ctx);  // Draw the player on the canvas
    }

    // Draw the enemy
    if (enemy) {
        enemy.draw(ctx);  // Draw the enemy on the canvas
    }
}
