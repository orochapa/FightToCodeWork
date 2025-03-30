console.log("Hello World");

// Need a window to come up when the program starts check
// We now need this window to be the backgound of the game
// We are working on character right now.
// We need a factory method to produce characters.

// level.js

console.log("Level Loaded");

// Get the canvas element by ID
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');  // 2D drawing context

// Set the background image
const background = new Image();
background.src = 'OpenMapField.png';  // Replace with your actual image path

background.onload = () => {
    // Resize canvas to fill the window
    canvas.width = canvas.offsetWidth;   // Match the CSS width
    canvas.height = canvas.offsetHeight; // Match the CSS height

    // Draw the background image once it's loaded
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);  // Stretch it to fit the canvas

    // Create the character using the factory method
    const character = createCharacter('RightKnight.png', canvas.height, 240, 300, 300);  // Initial position and size

    // Ensure the character is drawn only after the image is fully loaded
    character.image.onload = () => {
        character.draw(ctx);  // Draw the character on the canvas
    };

    // Check if the character image failed to load
    character.image.onerror = () => {
        console.error("Failed to load character image: RightKnight.png");
    };

    // Listen for keydown events to move the character
    document.addEventListener('keydown', (event) => characterAction(event, character));  // Pass the character object to the function
};