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

function createPlayer(){
        // Create the character using the factory method
        const character = createCharacter('level1graphics/RightKnight.png', canvas.height, 240, 300, 300);  // Initial position and size
        // Ensure the character is drawn only after the image is fully loaded
        character.image.onload = () => {
            character.draw(ctx);  // Draw the character on the canvas
        };
    
        // Check if the character image failed to load
        character.image.onerror = () => {
            console.error("Failed to load character image: RightKnight.png");
        };

    // Listen for keydown events to move the character
    // Pass the character object to the function
    document.addEventListener('keydown', (event) => characterAction(event, character));  
}

// function to create enemies
function createEnemies(){

}