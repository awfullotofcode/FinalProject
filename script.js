// get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let currentFrameIndex = 0;
// load ninja images
const ninjaImages = {
    still: new Image(),
    right: [],
    left: []
}
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



// game properties
const gameProperties = {
    gravity: 9.8
}
// ninja properties
const ninja = {
    x: 50, // Initial x (375)
    y: canvas.height - 60, // Initial y (340)
    width: 50,
    height: 50,
    //movement
    speed: 5, // movement speed
    canJump: true,
    jumpStart: 0,
    jumpHeight: 120, // maximum height of the jump
    jumpSpeed: 10, // speed of the jump
    jumping: false, // jumping state
    direction: 'still', // initial direction
    movingLeft: false,
    movingRight: false,
}
// game environment properties
const gameEnvironment = {
    floorColor: 'grey',
    floorX: 0,
    floorY: canvas.height-10,
    floorHeight: 10,
}
const firstPlat = {
    x:375,
    y:340,
    width: 200,
    height: 1
}
document.addEventListener('keydown', (event) => {

    if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
        ninja.movingLeft = true;
        ninja.direction = 'left'; // Update direction when moving left
    } else if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
        ninja.movingRight = true;
        ninja.direction = 'right'; // Update direction when moving right
    } else if ((event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W' || event.key === ' ') && ninja.canJump) {
        ninja.jumping = true;
        ninja.jumpStart = ninja.y;
        ninja.canJump = false;
    }

});
// when key released
document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
        ninja.movingLeft = false;
    } else if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
        ninja.movingRight = false;
    }
});

// assets
function drawPlatform() {
    ctx.fillStyle = 'red';
    ctx.fillRect(firstPlat.x, firstPlat.y, firstPlat.width, firstPlat.height);
}

function drawNinja () {
    let currentNinjaImg; // Variable to hold the current ninja image

    if (ninja.direction === 'left') {
        currentNinjaImg = ninjaImages.left[currentFrameIndex]; // Get the current left-facing ninja image
    } else if (ninja.direction === 'right') {
        currentNinjaImg = ninjaImages.right[currentFrameIndex]; // Get the current right-facing ninja image
    } else if (ninja.direction === 'still') {
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
    console.log("Ninja position: x =", ninja.x, ", y =", ninja.y);
}
// draw game
function draw() {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw floor
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, gameEnvironment.floorY, canvas.width, gameEnvironment.floorHeight);

    // draw platform
    drawPlatform();


    drawNinja();
}

function checkCollision() {

    ninja.feet = ninja.y + ninja.height;
    ninja.hCenter = ninja.x + (ninja.width / 2);

    if (ninja.feet < firstPlat.y && ninja.hCenter > firstPlat.x &&
        ninja.hCenter < (firstPlat.x + firstPlat.width)) {
            ninja.y = firstPlat.y - ninja.height;
    }
}

function boundaries() {
    // left/right bounds
    if (ninja.x < 0) {
        ninja.x = 0;
    } else if (ninja.x + ninja.width > canvas.width) {
        ninja.x = canvas.width - ninja.width;
    }
    // up/down bounds
    if (ninja.y < 0) { // Ensure ninja cannot go above the top of the canvas
        ninja.y = 0;
    } else if (ninja.y + ninja.height > gameEnvironment.floorY) { // Ensure ninja cannot go below the floor
        ninja.y = gameEnvironment.floorY - ninja.height;
    }
}

function movement() {
    // movement
    if (ninja.movingLeft) {
        ninja.x -= ninja.speed;
    }
    if (ninja.movingRight) {
        ninja.x += ninja.speed;
    }
    // Check if ninja is currently jumping
    if (ninja.jumping) {
        ninja.y -= ninja.jumpSpeed;

        // Check if the ninja has reached the maximum jump height
        if (ninja.y <= ninja.jumpStart - ninja.jumpHeight) {
            ninja.jumping = false;
        }
    } else {
        // check collision
        // If falling, apply gravity until collide
        if (ninja.y < gameEnvironment.floorY - ninja.height /* || !checkCollision */) {
            ninja.y += gameProperties.gravity;
        } else /* if !ninja.y => gameEnvironment.floorY - ninja.height*/{
            // Once the ninja reaches the floor, stop its vertical movement
            ninja.y = gameEnvironment.floorY - ninja.height;
            ninja.canJump = true;
        }
    }
}

// update game logic
function update() {
    movement();
    boundaries();
}

// game loop
function gameLoop() {

    update();
    draw();
    checkCollision();
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
