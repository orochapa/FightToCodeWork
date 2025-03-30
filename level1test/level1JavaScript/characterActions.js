// characterActions.js

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
    character.x = Math.min(character.x, canvas.width - 200);  // Right boundary
    character.y = Math.min(character.y, canvas.height - 200);  // Bottom boundary
    // Left boundary: Ensure character doesn't go past the left edge
    character.x = Math.max(character.x, -125);  // Left boundary

    // Top boundary: Ensure character doesn't go past the top edge
    character.y = Math.max(character.y, -125);  // Top boundary


    // Redraw everything
    redraw(character);
}

// function for ai movements.
function aiActions(){

}

// Function to redraw everything (background and character)
function redraw(character) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);  // Draw the background
    character.draw(ctx);  // Draw the character
}
