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
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

// Factory method to create characters
function createCharacter(imageSrc, x, y, width, height) {
    return new Character(imageSrc, x, y, width, height);
}
