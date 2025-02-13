console.clear();
const numAsteroids = 10;
const asteroidPaths = [
    "M128 196.5H105L120.5 224L152 217.5L157 196.5L146.5 180H115L128 196.5Z",
    "M152 105L115 112L120.5 127.5V146L163.5 143L170 117L152 105Z",
    "M207 54.5L180 71.5V93.5L205 110L239.5 102L243.5 75L231 60L207 54.5Z"
]

gsap.fromTo(".baddie", {
    x: -50,
}, {
    x: 50,
    duration: 1,
    repeat: -1,
    yoyoEase: true
});

for(let i = 0; i < numAsteroids; i++) {
    const asteroid = document.createElement("path");
    asteroid.className = "asteroid vector-obj";
    asteroid.setAttribute("d", asteroidPaths[Math.floor(Math.random() * asteroidPaths.length)]);
    document.querySelector("#stage svg").appendChild(asteroid);
}

const totalAsteroids = document.querySelectorAll(".asteroid").length;
for(let i = 0; i < totalAsteroids; i++) {
    gsap.fromTo(".asteroid", {
        x: Math.random() * -400,
    }, {
        x: Math.random() * 800,
        duration: 10
    });
}

gsap.fromTo(".asteroid", {
    rotation: "0deg",
    x: Math.random()-400,
    stagger: 2
}, {
    stagger: 2,
    rotation: "360deg",
    x: 800,
    repeat: -1,
    transformOrigin: "center",
    duration: 10,
    ease: "easeInOut"
});