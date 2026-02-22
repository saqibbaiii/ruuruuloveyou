// --- VARIABLES ---
let currentPage = 1;
let isMusicPlaying = false;
const bgMusic = document.getElementById('bg-music');
const pianoMusic = document.getElementById('piano-music');
const clickSfx = document.getElementById('sfx-click');
const successSfx = document.getElementById('sfx-success');

// --- 1. START EXPERIENCE ---
function startJourney() {
    const startScreen = document.getElementById('start-screen');
    startScreen.style.opacity = '0';
    setTimeout(() => {
        startScreen.style.display = 'none';
    }, 500);

    // Play Background Music (Low Volume)
    bgMusic.volume = 0.4;
    bgMusic.play().catch(e => console.log("Audio needs interaction"));
    isMusicPlaying = true;
}

// --- 2. NAVIGATION LOGIC ---
function handleNav(targetPage) {
    clickSfx.play(); // Sound Effect

    // Current Page Fade Out
    const current = document.getElementById(`page${currentPage}`);
    current.classList.remove('active');
    
    // Wait for animation, then hide and show next
    setTimeout(() => {
        current.classList.add('hidden');
        
        const next = document.getElementById(`page${targetPage}`);
        next.classList.remove('hidden');
        
        // Small delay to trigger CSS transition
        setTimeout(() => {
            next.classList.add('active');
        }, 50);
    }, 600);

    // --- PAGE 9 LOGIC (Music Change) ---
    if (targetPage === 9) {
        fadeOut(bgMusic); // Fade out fun music
        setTimeout(() => {
            pianoMusic.volume = 0.6;
            pianoMusic.play(); // Start emotional music
        }, 1000);
    }

    currentPage = targetPage;
}

// Helper for Music Fade Out
function fadeOut(audio) {
    let fadeInterval = setInterval(() => {
        if (audio.volume > 0.1) {
            audio.volume -= 0.1;
        } else {
            clearInterval(fadeInterval);
            audio.pause();
        }
    }, 200);
}

// --- 3. MUSIC TOGGLE BTN ---
function toggleMusic() {
    if (isMusicPlaying) {
        bgMusic.pause();
        pianoMusic.pause();
        isMusicPlaying = false;
    } else {
        if (currentPage === 9) {
            pianoMusic.play();
        } else {
            bgMusic.play();
        }
        isMusicPlaying = true;
    }
}

// --- 4. RUNAWAY "NO" BUTTON ---
const noBtn = document.getElementById('no-btn');
if (noBtn) {
    // Desktop Hover
    noBtn.addEventListener('mouseover', moveButton);
    // Mobile Touch (Starts slightly before click)
    noBtn.addEventListener('touchstart', moveButton); 
}

function moveButton(e) {
    if (currentPage !== 1) return;
    
    // Prevent default touch behavior
    if(e.type === 'touchstart') e.preventDefault();

    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 100);
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

// --- 5. HIDDEN ITEM GAME ---
function foundItem() {
    successSfx.play();
    const item = document.getElementById('hidden-item');
    
    // Animation Effect
    item.style.transform = "scale(2) rotate(360deg)";
    item.style.filter = "drop-shadow(0 0 20px gold)";
    
    document.querySelector('.game-instruction').innerHTML = "YOU FOUND IT! 🎉<br>Proceed to your gifts!";
    
    // Show Next Button
    document.getElementById('p3-next').classList.remove('hidden');
}

// --- 6. MODAL SYSTEM ---
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalText = document.getElementById('modal-text');

function showModal(src, text) {
    clickSfx.play();
    modalImg.src = src;
    modalText.innerText = text;
    modal.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
}
