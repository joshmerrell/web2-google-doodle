console.clear();
gsap.fromTo(".baddie", {
    x: -50,
}, {
    x: 50,
    duration: 1,
    repeat: -1,
    yoyoEase: true
});

gsap.fromTo(".asteroid", {
    rotation: "0deg",
    x: -400,
    stagger: 5
}, {
    stagger: 4,
    rotation: "360deg",
    x: 800,
    repeat: -1,
    transformOrigin: "center",
    duration: 10,
    ease: "easeInOut"
});