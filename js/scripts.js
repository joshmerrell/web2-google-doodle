console.clear();
gsap.fromTo(".baddie", {
    x: -50,
}, {
    x: 50,
    duration: 1,
    repeat: -1,
    yoyoEase: true
});