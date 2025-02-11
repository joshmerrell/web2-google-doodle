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
}, {
    stagger: 0.1,
    rotation: "360deg",
    repeat: -1,
    transformOrigin: "center",
    duration: 10,
    ease: "easeInOut"
});