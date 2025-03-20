console.clear();
gsap.registerPlugin(MotionPathPlugin); // allows us to have the ship follow a path
const numAsteroids = 50;
const asteroidPaths = [
    "M128 196.5H105L120.5 224L152 217.5L157 196.5L146.5 180H115L128 196.5Z",
    "M152 105L115 112L120.5 127.5V146L163.5 143L170 117L152 105Z",
    "M207 54.5L180 71.5V93.5L205 110L239.5 102L243.5 75L231 60L207 54.5Z"
];
const numStars = 50;
const svg = document.querySelector("#stage svg");
const svgWidth = svg.viewBox.baseVal.width;
const svgHeight = svg.viewBox.baseVal.height;

function randBetween(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
}

function makeStar(x,y) {
    const starPath = document.createElementNS("http://www.w3.org/2000/svg", "path"); // path must be self-closing, otherwise it will not render
    starPath.setAttribute("class", "star vector-obj");
    starPath.setAttribute("d", `m ${x},${y} 1,0`);
    document.querySelector("#stage svg").appendChild(starPath);
}

// Create stars for the background
for(let i = 0; i < numStars; i++) {
    makeStar(randBetween(0, svgWidth), randBetween(0, svgHeight));
}

// Add asteroids to the stage
for(let i = 0; i < numAsteroids; i++) {
    const asteroid = document.createElement("path");
    asteroid.className = "asteroid vector-obj";
    asteroid.setAttribute("d", asteroidPaths[Math.floor(Math.random() * asteroidPaths.length)]);
    document.querySelector("#stage svg").appendChild(asteroid);
}

const totalAsteroids = document.querySelectorAll(".asteroid").length;
const tl = gsap.timeline({repeat: -1, repeatDelay: 1});


// have UFO move back and forth
tl.fromTo(".ufo", {
    x: -50,
}, {
    transformOrigin: "center",
    ease: "power1.inOut",
    x: 50,
    duration: 1,
    repeat: -1,
    yoyoEase: true
});

tl.fromTo(".thrust", {
    opacity: 0
}, {
    opacity: 1,
    duration: 0.01,
    repeat: -1,
    yoyo: true
})

console.log(`Setting up ${totalAsteroids} asteroids`);
const asteroids = document.querySelectorAll(".asteroid");
const xOffset = 200;
const yOffset = 200;

for (const asteroid of asteroids) {
    let fromX = 0;
    let toX = 0;
    let fromY = 0;
    let toY = 0;
    const fromWhere = randBetween(0, 3); // 0 = top, 1 = right, 2 = bottom, 3 = left
    const toWhere = randBetween(0, 3);
    switch(fromWhere) {
        case 0:
            fromX = randBetween(-xOffset, svgWidth + xOffset);
            fromY = -yOffset;
            break;
        case 1:
            fromX = svgWidth + xOffset;
            fromY = randBetween(-yOffset, svgHeight + yOffset);
            break;
        case 2:
            fromX = randBetween(-xOffset, svgWidth + xOffset);
            fromY = svgHeight + yOffset;
            break;
        case 3:
            fromX = -xOffset;
            fromY = randBetween(-xOffset, svgHeight + yOffset);
            break;
    }
    switch(toWhere) {
        case 0:
            toX = randBetween(-xOffset, svgWidth + xOffset);
            toY = -yOffset;
            break;
        case 1:
            toX = svgWidth + xOffset;
            toY = randBetween(-xOffset, svgHeight + yOffset);
            break;
        case 2:
            toX = randBetween(-xOffset, svgWidth + xOffset);
            toY = svgHeight + yOffset;
            break;
        case 3:
            toX = -xOffset;
            toY = randBetween(-xOffset, svgHeight + yOffset);
            break;
    }
    
    // console.log(`Asteroid from ${fromX}, ${fromY} to ${toX}, ${toY}`);

    gsap.fromTo(asteroid, {
        x: fromX,
        y: fromY,
        rotation: randBetween(0, 360)
    }, {
        x: toX,
        y: toY,
        rotation: randBetween(0, 360),
        duration: 5,
        repeat: -1,
        // yoyo: true,
        transformOrigin: "center",
        ease: "none"
    });
}

gsap.to(".ship", {
    motionPath: {
        path: "#ship-path",
        align: "#ship-path",
        alignOrigin: [0.5, 0.5],
        autoRotate: 90,
    },
    transformOrigin: "50% 50%",
    duration: 5,
    repeat: -1,
    ease: "power1.inOut"
});