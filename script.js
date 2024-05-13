// get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// ninja properties
const ninja = {
    x: 50, // initial x pos
    y: canvas.height- 60, //inital y
    width: 50,
    height: 50,
    speed: 2.5 // movement speed
};
// floor properties
const floor = {
    y: canvas.height-10,
    height: 10
};

let lastTimestamp = 0;
// left and right keyboard movement
document.addEventListener('keydown', (event) => {

    if (event.key === 'ArrowLeft') {
        ninja.x -= ninja.speed;
    } else if (event.key === 'ArrowRight') {
        ninja.x += ninja.speed;
    }
});



// update game logic
function update(deltaTime) {
    ninja.x += ninja.speed * deltaTime;
    // character boundaries
    if (ninja.x < 0) {
        ninja.x = 0;
    } else if (ninja.x + ninja.width > canvas.width) {
        ninja.x = canvas.width - ninja.width;
    }
}

// draw game
function draw() {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw floor
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, floor.y, canvas.width, floor.height);

    //draw ninja
    ctx.fillStyle = 'blue';
    ctx.fillRect(ninja.x, ninja.y, ninja.width, ninja.height);
}

// game loop
function gameLoop(timestamp) {
    const deltaTime = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;

    update(deltaTime);

    draw();

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
