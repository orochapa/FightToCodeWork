console.log("Character Actions Loaded");

// Listen for keydown events to move the character
function characterAction(event, character) {
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

    // Ensure the character stays within the canvas boundaries
    character.x = Math.min(character.x, canvas.width - character.width);  // Right boundary
    character.y = Math.min(character.y, canvas.height - character.height);  // Bottom boundary
    character.x = Math.max(character.x, 0);  // Left boundary: Ensure character doesn't go past the left edge
    character.y = Math.max(character.y, 0);  // Top boundary: Ensure character doesn't go past the top edge

    // Redraw everything
    redraw(character);
}

// Function to redraw everything (background, player, and enemy)
function redraw(player, enemy) {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);  // Draw the background

    // Draw the player
    if (player) {
        player.draw(ctx);  // Draw the player on the canvas
    }

    if (enemy) {
        enemy.draw(ctx);  // Draw the enemy on the canvas
    }
}

