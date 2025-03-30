// createCharacter.js

console.log("Character Creation Loaded");

// Factory method to create the character
function createCharacter(imageSrc, x, y, width, height) {
    const character = {
        x: x,
        y: y,
        width: width,
        height: height,
        image: new Image(),
        speed: 5, // Movement speed

        // Load character image
        image: new Image(),
        draw: function(ctx) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);  // Draw character
        }
    };

    character.image.src = imageSrc;  // Set the character's image source
    return character;
}
