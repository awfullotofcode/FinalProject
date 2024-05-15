// Initialize Matter.js
const { Engine, Render, Runner, Bodies, World } = Matter;

// Create an engine
const engine = Engine.create();

// Create a renderer
const render = Render.create({
    element: document.getElementById("gameCanvas"),
    engine: engine,
    options: {
        width: 800,
        height: 400,
        wireframes: false // Set to true for wireframe view
    }
});

// Create two boxes and a ground
const boxA = Bodies.rectangle(400, 200, 80, 80);
const boxB = Bodies.rectangle(450, 50, 80, 80);
const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// Add all of the bodies to the world
World.add(engine.world, [boxA, boxB, ground]);

// Run the renderer
Render.run(render);

// Create runner
const runner = Runner.create();

// Run the engine
Runner.run(runner, engine);
