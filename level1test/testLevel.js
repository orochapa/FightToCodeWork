console.log("Hello World");

// Need a window to come up when the program starts check
// We now need this window to be the backgound of the game
// We are working on character right now.
// We need a factory method to produce characters.

// Get the canvas element by ID
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');  // 2D drawing context

// Set the background image
const background = new Image();
background.src = 'HappyForest.webp';  // Replace with your actual image path

background.onload = () => {
    // Resize canvas to fill the window
    canvas.width = canvas.offsetWidth;   // Match the CSS width
    canvas.height = canvas.offsetHeight; // Match the CSS height

    // Draw the background image once it's loaded
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);  // Stretch it to fit the canvas


    // Create a character using the factory method
    const character = createCharacter('RightKnight.png', 0, 200, 500, 500);  // Adjust size and position
    character.image.onload = () => {
        character.draw(ctx);  // Draw the character on the canvas
    };

};

