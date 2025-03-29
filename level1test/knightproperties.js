let knight = {
    x: 0,  // Starting at the bottom-left corner
    y: canvas.height - 100,  // Adjust this if your knight's height is different
    width: 100,  // Adjust size
    height: 100,  // Adjust size
    image: new Image(),
    speed: 5  // Movement speed
};

knight.image.src = 'RightKnight.png';  // Set the knight's image

// Event listener for keydown events
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        knight.x -= knight.speed;  // Move left
    }
    if (event.key === 'ArrowRight') {
        knight.x += knight.speed;  // Move right
    }
    if (event.key === 'ArrowUp') {
        knight.y -= knight.speed;  // Move up
    }
    if (event.key === 'ArrowDown') {
        knight.y += knight.speed;  // Move down
    }

    // Ensure the knight stays within the canvas boundaries
    knight.x = Math.max(0, Math.min(knight.x, canvas.width - knight.width));  // Left/Right bounds
    knight.y = Math.max(0, Math.min(knight.y, canvas.height - knight.height));  // Top/Bottom bounds

    // Redraw the background and knight after moving
    redraw();
});

// Function to redraw everything (background and knight)
function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);  // Draw the background
    ctx.drawImage(knight.image, knight.x, knight.y, knight.width, knight.height);  // Draw the knight
}