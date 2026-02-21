/* =====================================
ULTRA GOD MODE LOVE ENGINE V6
===================================== */

/* ===== SMART MUSIC AUTO SAFE START ===== */

function enableMusicOnFirstInteraction(){

document.addEventListener("click", ()=>{
const music = document.getElementById("bgMusic");
if(music){
music.volume = 0.7;
music.play().catch(()=>{});
}
},{once:true});

}

enableMusicOnFirstInteraction();


/* ===== SMOOTH PAGE MEMORY LOCK ===== */

let currentPage = 1;

function goToPage(page){

document.querySelectorAll(".page").forEach(p=>{
p.classList.remove("active");
});

const target = document.getElementById("page"+page);
if(!target) return;

currentPage = page;

/* Premium cinematic transition */

gsap.fromTo(target,
{
opacity:0,
scale:0.9,
filter:"blur(12px)"
},
{
opacity:1,
scale:1,
filter:"blur(0px)",
duration:0.6,
ease:"power3.out"
});

target.classList.add("active");

/* Typing trigger */

if(page === 7){
startTyping();
}

playClick();

}


/* ===== ADVANCED NO BUTTON GOD MOVE ===== */

function moveNoButton(){

const btn = document.getElementById("noBtn");
if(!btn) return;

const padding = 80;

const maxX = window.innerWidth - btn.offsetWidth - padding;
const maxY = window.innerHeight - btn.offsetHeight - padding;

gsap.to(btn,{
x:Math.random()*maxX,
y:Math.random()*maxY,
duration:0.5,
ease:"power2.out"
});

}


/* ===== EMOTIONAL ZOOM GOD ANIMATION ===== */

function openZoom(src,next){

const popup = document.getElementById("zoomPopup");
const img = document.getElementById("zoomImage");

if(!popup || !img) return;

popup.style.display = "flex";
img.src = src;

popup.dataset.next = next || "";

/* Cinematic zoom */

gsap.fromTo(".zoom-content",
{
scale:0.4,
opacity:0,
rotate:-8
},
{
scale:1,
opacity:1,
rotate:0,
duration:0.55,
ease:"back.out(1.8)"
});

playHeart();

}


/* ===== CLOSE ZOOM ===== */

function closeZoom(){

const popup = document.getElementById("zoomPopup");
if(!popup) return;

gsap.to(".zoom-content",{
scale:0.4,
opacity:0,
duration:0.3
});

setTimeout(()=>{

popup.style.display="none";

const next = popup.dataset.next;

if(next){
goToPage(parseInt(next));
}

popup.dataset.next="";

},300);

}


/* ===== SONG AI CHECKER ===== */

function checkSongGuess(){

const input = document.getElementById("songInput");
if(!input) return;

const value = input.value.toLowerCase().trim();

const loveWords = ["love","heart","jaaan","jaan","romance"];

if(loveWords.some(w=>value.includes(w))){

playHeart();
goToPage(9);

}else{

gsap.to(input,{
x:[-12,12,-12,12,0],
duration:0.35
});

alert("Try again my love 💕");

}

}


/* ===== GOD TYPING ENGINE ===== */

const typingText =
"My love... You are my forever 💕\n"+
"You are my dream, my heart, my everything.\n"+
"I love you more than words can say 💗";

let typingIndex = 0;
let typingTimer;

function startTyping(){

const el = document.getElementById("typingText");
if(!el) return;

clearTimeout(typingTimer);

typingIndex = 0;
el.innerHTML = "";

typeWriter();

}

function typeWriter(){

const el = document.getElementById("typingText");
if(!el) return;

if(typingIndex < typingText.length){

el.innerHTML += typingText.charAt(typingIndex);

typingIndex++;

typingTimer = setTimeout(typeWriter,32);

}

}