/*
========================================================
OUR MAGICAL ANNIVERSARY PROJECT
ULTRA GOD LEVEL STABLE PATCH v3
========================================================
*/

let hiddenGameCompleted = false;
let typingLock = false;
let particleLock = false;

/* ===============================
PAGE NAVIGATION CORE
=============================== */

function goToPage(page){

    document.querySelectorAll(".page").forEach(p=>{
        p.classList.remove("active");
        p.style.opacity="0";
    });

    let target=document.getElementById("page"+page);

    if(target){

        target.classList.add("active");

        setTimeout(()=>{
            target.style.opacity="1";
        },60);

    }

    playClick();
}

/* ===============================
MOBILE AUDIO UNLOCK PATCH
=============================== */

document.addEventListener("click",()=>{

    let music=document.getElementById("bgMusic");

    if(music){

        music.volume=0.5;

        music.play().catch(()=>{});

    }

},{once:true});

/* ===============================
SOUND ENGINE
=============================== */

function playClick(){

    let s=document.getElementById("clickSound");
    if(s){
        s.currentTime=0;
        s.play().catch(()=>{});
    }
}

function playHeart(){

    let s=document.getElementById("heartSound");
    if(s){
        s.currentTime=0;
        s.play().catch(()=>{});
    }
}

function playPop(){

    let s=document.getElementById("popSound");
    if(s){
        s.currentTime=0;
        s.play().catch(()=>{});
    }
}

/* ===============================
ESCAPE BUTTON AI PATCH
=============================== */

function moveNoButton(){

    let btn=document.getElementById("noBtn");
    if(!btn) return;

    let rect=btn.getBoundingClientRect();

    let maxX=window.innerWidth-rect.width-40;
    let maxY=window.innerHeight-rect.height-40;

    let randomX=Math.random()*maxX;
    let randomY=Math.random()*maxY;

    if(typeof gsap!=="undefined"){

        gsap.to(btn,{
            x:randomX,
            y:randomY,
            duration:0.5,
            ease:"power2.out"
        });

    }else{

        btn.style.position="absolute";
        btn.style.left=randomX+"px";
        btn.style.top=randomY+"px";
    }

    playClick();
}

/* ===============================
HIDDEN GAME MASTER PATCH
=============================== */

function foundHeart(){

    if(hiddenGameCompleted) return;

    hiddenGameCompleted=true;

    playHeart();

    let layer=document.querySelector(".explosion-layer");

    if(layer){

        layer.style.display="block";

        setTimeout(()=>{

            layer.style.display="none";
            goToPage(4);

        },1200);

    }else{

        setTimeout(()=>{
            goToPage(4);
        },700);
    }
}

/* ===============================
GIFT EXPLOSION ENGINE
=============================== */

function openGift(){

    playHeart();

    let layer=document.querySelector(".explosion-layer");

    if(layer){

        layer.style.display="block";

        if(typeof gsap!=="undefined"){

            gsap.fromTo(layer,
            {scale:0.6,opacity:0},
            {scale:1,opacity:1,duration:0.4});

            setTimeout(()=>{

                gsap.to(layer,{opacity:0,duration:0.5});

            },900);

        }

        setTimeout(()=>{
            layer.style.display="none";
            goToPage(5);
        },1400);

    }else{

        setTimeout(()=>goToPage(5),700);
    }
}

/* ===============================
MEMORY HOVER PATCH
=============================== */

document.addEventListener("DOMContentLoaded",()=>{

    document.querySelectorAll(".memory-pic").forEach(pic=>{

        pic.style.transition="0.35s ease";

        pic.addEventListener("mouseenter",()=>{

            if(typeof gsap!=="undefined"){
                gsap.to(pic,{scale:1.1,duration:0.3});
            }

        });

        pic.addEventListener("mouseleave",()=>{

            if(typeof gsap!=="undefined"){
                gsap.to(pic,{scale:1,duration:0.3});
            }

        });

    });

});

/* ===============================
TYPEWRITER PATCH
=============================== */

function startTyping(){

    if(typingLock) return;

    typingLock=true;

    let text=document.getElementById("typingText");
    if(!text) return;

    let content=text.innerText;
    text.innerText="";

    let i=0;

    function type(){

        if(i<content.length){

            text.innerText+=content.charAt(i);
            i++;

            setTimeout(type,40);

        }

    }

    type();
}

document.addEventListener("DOMContentLoaded",startTyping);

/* ===============================
PARTICLE ENGINE PATCH
=============================== */

async function startParticles(){

    if(particleLock) return;

    particleLock=true;

    if(typeof tsParticles==="undefined") return;

    try{

        await tsParticles.load("particle-container",{

            particles:{
                number:{value:35},
                shape:{type:"heart"},
                opacity:{value:0.7},
                size:{value:{min:1,max:4}},
                move:{
                    enable:true,
                    speed:1.2,
                    direction:"top",
                    random:true
                }
            }

        });

    }catch(e){}

}

document.addEventListener("DOMContentLoaded",()=>{

    setTimeout(()=>{
        startParticles();
        safeMusicPlay();
    },800);

});

/* ===============================
MUSIC SAFETY PATCH
=============================== */

function safeMusicPlay(){

    let music=document.getElementById("bgMusic");

    if(music){

        music.volume=0.5;

        music.play().catch(()=>{});

    }

}

window.addEventListener("focus",safeMusicPlay);

window.addEventListener("blur",()=>{

    let music=document.getElementById("bgMusic");
    if(music) music.pause();

});