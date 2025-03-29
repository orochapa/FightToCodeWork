// Character class to handle character properties and drawing
class Character {
    constructor(imageSrc, x, y, width, height) {
        this.image = new Image();
        this.image.src = imageSrc;  // Character image source
        this.x = x;                 // X position on the canvas
        this.y = y;                 // Y position on the canvas
        this.width = width;         // Width of the character
        this.height = height;       // Height of the character
    }

    // Draw the character on the canvas
    draw(ctx) {
        console.log("Drawing character at:", this.x, this.y);  // Debugging log
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    
}

// Factory method to create characters
function createCharacter(imageSrc, x, y, width, height) {
    return new Character(imageSrc, x, y, width, height);
}


// Function to handle the character movement
function characterAction(event) {
    const moveSpeed = 10;  // Number of pixels the character moves per key press

    if (event.key === "ArrowRight") {
        // Move right
        character.x += moveSpeed;
    } else if (event.key === "ArrowLeft") {
        // Move left
        character.x -= moveSpeed;
    }

    // Prevent character from moving off the canvas boundaries
    if (characterX < 0) characterX = 0;  // Don't allow going past the left edge
    if (characterX + 250 > canvas.width) characterX = canvas.width - 250;  // Don't allow going past the right edge

    // Redraw the background and character with the new position
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before redrawing
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);  // Redraw background
    character.draw(ctx);  // Redraw the character at the new position
}