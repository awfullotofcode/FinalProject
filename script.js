// get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// load ninja images
const ninjaImages = {
    still: new Image(),
    right: [],
    left: [],
};

// set source for each image
ninjaImages.still.src = 'ninja-animations/ninja-still.png';
for (let i = 1; i < 5; i++) {
    // loads right animations onto right array
    const rightImg = new Image();
    rightImg.src = `ninja-animations/ninja-right${i}.png`;
    ninjaImages.right.push(rightImg);

    const leftImg = new Image();
    leftImg.src = `ninja-animations/ninja-left${i}.png`;
    ninjaImages.left.push(leftImg);

}
// ninja properties
const ninja = {
    x: 50, // initial x pos
    y: canvas.height- 60, //inital y
    width: 50,
    height: 50,
    speed: 10, // movement speed
    direction: 'still' // initial direction
};
// floor properties
const floor = {
    y: canvas.height-10,
    height: 10
};


// left and right keyboard movement
document.addEventListener('keydown', (event) => {

    if (event.key === 'ArrowLeft') {
        ninja.x -= ninja.speed;
        ninja.direction = 'left';
    } else if (event.key === 'ArrowRight') {
        ninja.x += ninja.speed;
        ninja.direction = 'right';
    }
});



// update game logic
function update() {
    // character boundaries
    if (ninja.x < 0) {
        ninja.x = 0;
    } else if (ninja.x + ninja.width > canvas.width) {
        ninja.x = canvas.width - ninja.width;
    }
}

let currentFrameIndex = 0;
// draw game
function draw() {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw floor
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, floor.y, canvas.width, floor.height);

    let currentNinjaImg; // Variable to hold the current ninja image

    if (ninja.direction === 'left') {
        currentNinjaImg = ninjaImages.left[currentFrameIndex]; // Get the current left-facing ninja image
    } else if (ninja.direction === 'right') {
        currentNinjaImg = ninjaImages.right[currentFrameIndex]; // Get the current right-facing ninja image
    } else {
        // If the ninja is not moving, use the still image
        currentNinjaImg = ninjaImages.still;
    }

    // Draw the current ninja image at the current position
    ctx.drawImage(currentNinjaImg, ninja.x, ninja.y, ninja.width, ninja.height);

    // Increment the frame index for the next iteration
    currentFrameIndex++;
    // Reset the frame index to 0 when it reaches the last frame
    if (currentFrameIndex >= 4) {
        currentFrameIndex = 0;
    }

}

// game loop
function gameLoop() {


    update();

    draw();

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
