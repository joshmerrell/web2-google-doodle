console.clear();
gsap.registerPlugin(MotionPathPlugin) 
const numAsteroids = 3;
const asteroidPaths = [
    "M128 196.5H105L120.5 224L152 217.5L157 196.5L146.5 180H115L128 196.5Z",
    "M152 105L115 112L120.5 127.5V146L163.5 143L170 117L152 105Z",
    "M207 54.5L180 71.5V93.5L205 110L239.5 102L243.5 75L231 60L207 54.5Z"
]
const svg = document.querySelector("#stage svg");
const svgWidth = svg.viewBox.baseVal.width;
const svgHeight = svg.viewBox.baseVal.height;

function randBetween(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
}

Array.prototype.pickRandom = function() {
    return this[randBetween(0, this.length - 1)];
}

for(let i = 0; i < numAsteroids; i++) {
    const asteroid = document.createElement("path");
    asteroid.className = "asteroid vector-obj";
    asteroid.setAttribute("d", asteroidPaths[Math.floor(Math.random() * asteroidPaths.length)]);
    document.querySelector("#stage svg").appendChild(asteroid);
}

const totalAsteroids = document.querySelectorAll(".asteroid").length;
const tl = gsap.timeline({repeat: -1, repeatDelay: 1});

tl.fromTo(".baddie", {
    x: -50,
}, {
    x: 50,
    duration: 1,
    repeat: -1,
    yoyoEase: true
});


console.log(`Setting up ${totalAsteroids} asteroids`);
const asteroids = document.querySelectorAll(".asteroid");
const xOffset = 20;
const yOffset = 20;

for (const asteroid of asteroids) {
    const ltr = true; // Math.random() > 0.5;
    let fromX = 0;
    let toX = 0;
    let fromY = 0;
    let toY = 0;
    const randXMod = randBetween(0, 10);
    const randYMod = randBetween(0, 10);
    if(ltr) {
        fromX = -xOffset - randXMod;
        toX = svgWidth + xOffset + randXMod;
        fromY = -yOffset - randYMod;
        toY = svgHeight + yOffset + randYMod;
    } else {
        fromX = svgWidth + xOffset + randXMod;
        toX = -xOffset - randXMod;
        fromY = svgHeight + xOffset + randYMod;
        toY = -xOffset - randYMod;
    }
    // console.log(asteroid)
    // console.log(`Asteroid from ${fromX}, ${fromY} to ${toX}, ${toY}`);

    tl.fromTo(asteroid, {
        x: fromX,
        y: fromY,
    }, {
        x: toX,
        y: toY,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "easeInOut"
    });
}

tl.fromTo(".asteroid", {
    rotation: "0deg",
    x: Math.random()-400,
    stagger: 1
}, {
    stagger: 2,
    rotation: "360deg",
    x: 800,
    repeat: -1,
    transformOrigin: "center",
    duration: 10,
    ease: "easeInOut"
});

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
    // yoyo: true,  
    ease: "power1.inOut"
});