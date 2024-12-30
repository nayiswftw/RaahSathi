const section = document.querySelector('.carousel_section'),
    sectionContainer = section.querySelector('.section_container'),
    sectionCol = section.querySelectorAll('.section_col'),
    sectionCaptions = section.querySelectorAll('.section_col_caption');

const isDesktop = window.matchMedia('(min-width: 768px)');
let isDesktopMatched = isDesktop.matches; // Store match state to avoid re-querying

// Optimize for resizing events (debounce the check)
const handleResize = () => {
    const isCurrentlyDesktop = isDesktop.matches;
    if (isCurrentlyDesktop !== isDesktopMatched) {
        isDesktopMatched = isCurrentlyDesktop;
        if (isDesktopMatched) addEventListeners();
    }
};

window.addEventListener('resize', () => {
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(handleResize, 200); // debounce resize check
});

const init = () => {
    if (isDesktopMatched) addEventListeners();
    else mobileWarning();
};

const mobileWarning = () => {
    document.body.innerHTML = '<h1>Please use a desktop for the best experience.</h1>';
};

const addEventListeners = () => {
    sectionCol[0].classList.add('active');
    sectionCol.forEach((col, index) => {
        col.addEventListener('mouseenter', () => {
            sectionCol.forEach((el) => el.classList.remove('active'));
            col.classList.add('active');
        });
    });
};
init();

// PRELOADER STUFF (Use requestAnimationFrame for smooth counter update)
let counter = 0;
const updateCounter = () => {
    counter = Math.min(counter + 1, 100);
    const h1Element = document.querySelector(".preloader .counter h1");
    h1Element.textContent = `${counter}%`;

    if (counter < 100) {
        requestAnimationFrame(updateCounter);
    } else {
        gsap.to(".preloader", {
            opacity: 0,
            duration: 2.5,
            onComplete: () => document.querySelector(".preloader").remove()
        });
    }
};
requestAnimationFrame(updateCounter);

gsap.to(".preloader-video", {
    ease: "power4.inOut",
    scale: 0.95,
    duration: 2,
    repeat: 1,
    yoyo: true,
});

// SCROLLING STUFF (Optimize smooth scrolling and cloud animations)
gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

gsap.to(".cloud_1", {
    ease: "power4.inOut",
    scale: 1.05,
    duration: 4,
    repeat: -1,
    yoyo: true,
    repeatDelay: 0.5
});

