/*
========================================================
💗 OUR MAGICAL ANNIVERSARY PROJECT
GOD LEVEL MASTER STARTING ENGINE
PART 0 - CORE INITIALIZER
========================================================
*/

const ANNIVERSARY_ENGINE = {

    version: "Ultra Romance Patch v1",

    debug: false,

    state: {
        hiddenGameCompleted: false
    }

};

/* ===============================
GLOBAL SHORTCUT VARIABLES
=============================== */

let hiddenGameCompleted = false;

/* ===============================
DOM SAFE INITIALIZATION
=============================== */

document.addEventListener("DOMContentLoaded", () => {

    if (ANNIVERSARY_ENGINE.debug) {
        console.log("💗 Anniversary Engine Loaded");
    }

    unlockMobileMusic();
    initializeParticles();
    initializeTyping();

});

/* ===============================
MOBILE MUSIC AUTO START PATCH
=============================== */

function unlockMobileMusic() {

    document.addEventListener("click", () => {

        let music = document.getElementById("bgMusic");

        if (music) {
            music.volume = 0.5;

            music.play().catch(() => {});

        }

    }, { once: true });

}

/* ===============================
PARTICLE STARTER PATCH
=============================== */

async function initializeParticles() {

    if (typeof tsParticles === "undefined") return;

    try {

        await tsParticles.load("particle-container", {

            particles: {

                number: { value: 35 },

                shape: { type: "heart" },

                opacity: { value: 0.7 },

                size: {
                    value: { min: 1, max: 4 }
                },

                move: {
                    enable: true,
                    speed: 1.2,
                    direction: "top",
                    random: true
                }

            }

        });

    } catch (e) {}

}

/* ===============================
TYPEWRITER PATCH STARTER
=============================== */

function initializeTyping() {

    let text = document.getElementById("typingText");
    if (!text) return;

    let content = text.innerText;
    text.innerText = "";

    let index = 0;

    function typeEngine() {

        if (index < content.length) {

            text.innerText += content.charAt(index);
            index++;

            setTimeout(typeEngine, 40);
        }

    }

    typeEngine();

}

//////////////////////////////////////////////////////////////
// 💗 GOD LEVEL PAGE NAVIGATION PATCH
// PART 1 - SMOOTH ROMANCE FADE ENGINE
//////////////////////////////////////////////////////////////

function goToPage(page){

    let pages = document.querySelectorAll(".page");

    pages.forEach(p=>{
        p.style.opacity = "0";
        p.style.transition = "0.45s ease";
    });

    setTimeout(()=>{

        pages.forEach(p=>{
            p.classList.remove("active");
        });

        let target = document.getElementById("page"+page);

        if(target){

            target.classList.add("active");

            setTimeout(()=>{
                target.style.opacity = "1";
            },50);

        }

    },200);

    playClick();

}

//////////////////////////////////////////////////////////////
// 💗 GOD LEVEL ESCAPE AI PATCH
// PART 2 - ADVANCED NO BUTTON MOVEMENT ENGINE
//////////////////////////////////////////////////////////////

function moveNoButton(){

    let btn = document.getElementById("noBtn");

    if(!btn) return;

    let maxX = window.innerWidth - btn.offsetWidth - 40;
    let maxY = window.innerHeight - btn.offsetHeight - 40;

    let randomX = Math.random() * maxX;
    let randomY = Math.random() * maxY;

    try{

        if(typeof gsap !== "undefined"){

            gsap.to(btn,{
                x: randomX,
                y: randomY,
                duration: 0.55,
                ease: "power2.out"
            });

        }else{

            btn.style.position = "absolute";
            btn.style.left = randomX + "px";
            btn.style.top = randomY + "px";
        }

    }catch(e){

        btn.style.position = "absolute";
        btn.style.left = randomX + "px";
        btn.style.top = randomY + "px";

    }

    playClick();
}

//////////////////////////////////////////////////////////////
// 💗 HIDDEN GAME MASTER SAFETY PATCH
// PART 3 - GOD LEVEL DUPLICATE EVENT PROTECTION
//////////////////////////////////////////////////////////////

let hiddenGameLock = false;

function foundHeart(){

    if(hiddenGameLock) return;

    hiddenGameLock = true;

    hiddenGameCompleted = true;

    playHeart();

    let layer = document.querySelector(".explosion-layer");

    if(layer){

        layer.style.display = "block";

        try{

            if(typeof gsap !== "undefined"){

                gsap.fromTo(layer,
                {scale:0.6, opacity:0},
                {scale:1, opacity:1, duration:0.4});

            }

        }catch(e){}

        setTimeout(()=>{

            try{

                if(typeof gsap !== "undefined"){

                    gsap.to(layer,{
                        opacity:0,
                        duration:0.5
                    });

                }

            }catch(e){}

        },900);

        setTimeout(()=>{

            layer.style.display = "none";
            goToPage(4);

        },1500);

    }else{

        setTimeout(()=>{
            goToPage(4);
        },800);

    }

}

//////////////////////////////////////////////////////////////
// 💗 CINEMATIC EXPLOSION GOD CONTROLLER
// PART 4 - SAFE CINEMATIC ANIMATION PATCH
//////////////////////////////////////////////////////////////

let explosionLock = false;

function openGift(){

    if(explosionLock) return;

    explosionLock = true;

    playHeart();

    let layer = document.querySelector(".explosion-layer");

    if(layer){

        layer.style.display = "block";

        try{

            if(typeof gsap !== "undefined"){

                gsap.fromTo(layer,
                {scale:0.6, opacity:0},
                {scale:1, opacity:1, duration:0.4});

            }

        }catch(e){}

        setTimeout(()=>{

            try{

                if(typeof gsap !== "undefined"){

                    gsap.to(layer,{
                        opacity:0,
                        duration:0.5
                    });

                }

            }catch(e){}

        },900);

        setTimeout(()=>{

            layer.style.display = "none";

            goToPage(5);

            explosionLock = false;

        },1500);

    }else{

        setTimeout(()=>{
            goToPage(5);
            explosionLock = false;
        },800);
    }
}

//////////////////////////////////////////////////////////////
// 💗 ULTRA MEMORY GALLERY GOD PATCH
// PART 5 - MEMORY HOVER STABILITY ENGINE
//////////////////////////////////////////////////////////////

let memoryHoverInitialized = false;

function initMemoryHoverEngine(){

    if(memoryHoverInitialized) return;

    memoryHoverInitialized = true;

    document.querySelectorAll(".memory-pic").forEach(pic=>{

        pic.style.transition = "0.35s ease";

        pic.addEventListener("mouseenter",()=>{

            if(typeof gsap !== "undefined"){

                gsap.to(pic,{
                    scale:1.1,
                    duration:0.3
                });

            }else{
                pic.style.transform="scale(1.1)";
            }

        });

        pic.addEventListener("mouseleave",()=>{

            if(typeof gsap !== "undefined"){

                gsap.to(pic,{
                    scale:1,
                    duration:0.3
                });

            }else{
                pic.style.transform="scale(1)";
            }

        });

    });
}

document.addEventListener("DOMContentLoaded",initMemoryHoverEngine);

//////////////////////////////////////////////////////////////
// 💗 GOD LEVEL PARTICLE AUTO RECOVERY PATCH
// PART 6 - PARTICLE WATCHDOG ENGINE
//////////////////////////////////////////////////////////////

let particleRecoveryRunning = false;

async function particleRecoveryEngine(){

    if(particleRecoveryRunning) return;

    particleRecoveryRunning = true;

    if(typeof tsParticles === "undefined") return;

    try{

        let container = document.getElementById("particle-container");

        if(!container) return;

        await tsParticles.load("particle-container",{

            particles:{
                number:{ value:30 },
                shape:{ type:"heart" },
                move:{
                    enable:true,
                    speed:1,
                    direction:"top",
                    random:true
                },
                opacity:{ value:0.6 },
                size:{ value:{ min:1, max:4 } }
            }

        });

    }catch(e){}

    particleRecoveryRunning = false;
}

document.addEventListener("visibilitychange",()=>{

    if(document.visibilityState === "visible"){
        particleRecoveryEngine();
    }

});

setInterval(particleRecoveryEngine,15000);

//////////////////////////////////////////////////////////////
// 💗 MOBILE TOUCH GOD SHIELD PATCH
// PART 7 - ROMANTIC TOUCH SAFETY ENGINE
//////////////////////////////////////////////////////////////

let touchLock = false;

document.addEventListener("touchstart",(e)=>{

    if(touchLock) return;

    touchLock = true;

    setTimeout(()=>{
        touchLock = false;
    },120);

}, { passive:true });

/* Romantic vibration feedback */

function romanticVibrate(){

    if(navigator.vibrate){
        navigator.vibrate([40]);
    }

}

//////////////////////////////////////////////////////////////
// 💗 NO BUTTON GOD ESCAPE AI PATCH
// PART 8 - ULTRA SMART MOVEMENT ENGINE
//////////////////////////////////////////////////////////////

function moveNoButton(){

    let btn = document.getElementById("noBtn");
    if(!btn) return;

    let rect = btn.getBoundingClientRect();

    let maxX = window.innerWidth - rect.width - 40;
    let maxY = window.innerHeight - rect.height - 40;

    let randomX = Math.random() * maxX;
    let randomY = Math.random() * maxY;

    if(typeof gsap !== "undefined"){

        gsap.to(btn,{
            x:randomX,
            y:randomY,
            duration:0.55,
            ease:"power2.out"
        });

    }else{

        btn.style.position="absolute";
        btn.style.left=randomX+"px";
        btn.style.top=randomY+"px";
    }

    playClick();

}

//////////////////////////////////////////////////////////////
// 💗 GOD LEVEL FINAL CORE PATCH
// PART 9 - ULTIMATE ROMANCE STABILITY ENGINE
//////////////////////////////////////////////////////////////

/* Background Music Ultra Lock */

function safeMusicPlay(){

    let music = document.getElementById("bgMusic");

    if(music){

        music.volume = 0.5;

        music.play().catch(()=>{});

    }

}

/* Page Recovery Quantum System */

function recoverPage(){

    let activePage = document.querySelector(".page.active");

    if(activePage){

        activePage.style.opacity = "1";
    }

}

/* Window Focus Safety Control */

window.addEventListener("focus",()=>{

    safeMusicPlay();
    particleRecoveryEngine();
    recoverPage();

});

/* Window Blur Pause System */

window.addEventListener("blur",()=>{

    let music = document.getElementById("bgMusic");

    if(music){
        music.pause();
    }

});

/* Auto Starter Core */

document.addEventListener("DOMContentLoaded",()=>{

    setTimeout(()=>{

        safeMusicPlay();
        particleRecoveryEngine();
        initMemoryHoverEngine();

    },800);

});