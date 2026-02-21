document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    let currentPageIndex = 0;

    const backgroundMusic = document.getElementById('backgroundMusic');
    const softPianoMusic = document.getElementById('softPianoMusic');
    const clickSound = document.getElementById('clickSound');
    const heartSound = document.getElementById('heartSound');
    const popSound = document.getElementById('popSound');

    const musicToggleButton = document.getElementById('musicToggle');
    const musicIcon = document.getElementById('musicIcon');
    let isPlaying = false; // To track main background music state
    let softPianoPlaying = false; // To track soft piano music state

    // --- Utility Functions ---
    function playSound(audioElement) {
        if (audioElement) {
            audioElement.currentTime = 0; // Rewind to start
            audioElement.play().catch(e => console.log("Audio play prevented:", e));
        }
    }

    function showPage(index) {
        if (index < 0 || index >= pages.length) return;

        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
            // Reset specific page states when hidden
            if (page.id === 'page3') {
                const hiddenItem = document.getElementById('hiddenItem');
                hiddenItem.classList.remove('found');
                document.getElementById('gameMessage').textContent = 'Find the hidden item! It\'s hiding!'; // Reset game message
                document.getElementById('nextPageGame').classList.add('hidden');
                itemFound = false; // Reset game state
            }
            if (page.id === 'page4') {
                document.querySelectorAll('.gift-item').forEach(item => item.classList.remove('zoomed'));
                document.getElementById('giftMessage').textContent = '';
                document.getElementById('giftMessage').classList.remove('show');
                document.getElementById('nextPageGift').classList.add('hidden');
                giftSelected = false;
            }
            if (page.id === 'page5') {
                document.querySelectorAll('.coupon-item').forEach(item => item.classList.remove('zoomed'));
                document.getElementById('couponMessage').textContent = '';
                currentZoomedCoupon = null;
            }
            if (page.id === 'page6') {
                document.querySelectorAll('.memory-item').forEach(item => {
                    item.classList.remove('zoomed');
                    item.querySelector('.photo-quote').classList.add('hidden');
                });
                currentZoomedMemory = null;
            }
        });

        // Show the target page
        pages[index].classList.add('active');
        currentPageIndex = index;

        // Special handling for Page 9 music
        if (pages[index].id === 'page9') {
            if (isPlaying) {
                backgroundMusic.pause();
                backgroundMusic.currentTime = 0;
                isPlaying = false;
                musicIcon.src = 'assets/buttons/music_play.png'; // Update global music icon
            }
            // Ensure soft piano isn't playing by default, unless user clicks
            if (softPianoPlaying) {
                softPianoMusic.pause();
                softPianoMusic.currentTime = 0;
                softPianoPlaying = false;
            }
        } else {
            // If not on page 9, stop soft piano if playing
            if (softPianoPlaying) {
                softPianoMusic.pause();
                softPianoMusic.currentTime = 0;
                softPianoPlaying = false;
            }
            // Resume main music if it was playing and not on page 9
            if (isPlaying && backgroundMusic.paused) {
                backgroundMusic.play().catch(e => console.log("Background music play prevented:", e));
            }
        }
        
        // Special logic for Page 3 on activation
        if (pages[index].id === 'page3' && pages[index].classList.contains('active')) {
            randomizeHiddenItemPosition();
        }
    }

    function goToNextPage() {
        playSound(clickSound);
        showPage(currentPageIndex + 1);
    }

    // --- Global Music Control ---
    musicToggleButton.addEventListener('click', () => {
        if (isPlaying) {
            backgroundMusic.pause();
            musicIcon.src = 'assets/buttons/music_play.png';
            isPlaying = false;
        } else {
            backgroundMusic.play().catch(e => console.log("Background music play prevented:", e));
            musicIcon.src = 'assets/buttons/music_pause.png';
            isPlaying = true;
        }
    });

    // Automatically play music on user interaction (first click anywhere)
    // This is a common workaround for browser autoplay policies
    document.body.addEventListener('click', () => {
        if (!isPlaying && currentPageIndex === 0) { // Only attempt to play if not playing and on the first page
            backgroundMusic.play().catch(e => console.log("Autoplay prevented, user interaction required:", e));
            musicIcon.src = 'assets/buttons/music_pause.png';
            isPlaying = true;
        }
    }, { once: true }); // Ensure this event listener runs only once

    // --- Page 1: Love Question ---
    document.getElementById('yesButton').addEventListener('click', () => {
        playSound(heartSound);
        // "Yes" now leads to Page 3 (Find Hidden Item), as per the previous correction
        showPage(2);
    });

    document.getElementById('noButton').addEventListener('click', () => {
        playSound(clickSound);
        showPage(1); // "No" leads to Page 2 (Crying Page)
    });

    // --- Page 2: Crying Page ---
    document.getElementById('tryAgainButton').addEventListener('click', () => {
        playSound(clickSound);
        showPage(0); // Go back to Page 1
    });

    // --- Page 3: Find Hidden Item Game ---
    const hiddenItem = document.getElementById('hiddenItem');
    const gameMessage = document.getElementById('gameMessage');
    const nextPageGameButton = document.getElementById('nextPageGame');
    let itemFound = false;

    // Randomize hidden item position (within game-area)
    function randomizeHiddenItemPosition() {
        const gameArea = document.querySelector('.game-area');
        if (!gameArea) return;

        // Ensure images are loaded before calculating dimensions
        const imagesLoaded = Array.from(gameArea.querySelectorAll('img')).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => { img.onload = resolve; });
        });

        Promise.all(imagesLoaded).then(() => {
            const gameAreaRect = gameArea.getBoundingClientRect();
            const itemRect = hiddenItem.getBoundingClientRect();

            // Calculate max X and Y coordinates within the game area
            // Account for item's own dimensions
            const maxX = gameAreaRect.width - itemRect.width;
            const maxY = gameAreaRect.height - itemRect.height;

            // Generate random positions
            // Ensure item is not placed completely off-screen or too close to edges
            const randomX = Math.random() * (maxX - 20) + 10; // 10px padding from edges
            const randomY = Math.random() * (maxY - 20) + 10;

            hiddenItem.style.left = `${randomX}px`;
            hiddenItem.style.top = `${randomY}px`;
            console.log(`Hidden item placed at: top ${randomY}px, left ${randomX}px`);

            // Optional: You can make the item blink or briefly show its location when the page loads for a very short hint
            // hiddenItem.style.opacity = '0.5';
            // setTimeout(() => { hiddenItem.style.opacity = '1'; }, 500);
        });
    }

    hiddenItem.addEventListener('click', () => {
        if (!itemFound) {
            playSound(popSound); // Use a pop sound for finding
            hiddenItem.classList.add('found');
            gameMessage.textContent = 'You found it! Great job! 🎉';
            nextPageGameButton.classList.remove('hidden');
            itemFound = true;
        }
    });

    nextPageGameButton.addEventListener('click', goToNextPage);

    // --- Page 4: Choose Your Gift ---
    const giftItems = document.querySelectorAll('.gift-item');
    const giftMessageDisplay = document.getElementById('giftMessage');
    const nextPageGiftButton = document.getElementById('nextPageGift');
    let giftSelected = false;

    giftItems.forEach(item => {
        item.addEventListener('click', () => {
            if (!giftSelected) {
                playSound(popSound); // Pop sound for gift selection
                giftItems.forEach(g => g.classList.remove('zoomed')); // Deselect any previous
                item.classList.add('zoomed');
                giftMessageDisplay.textContent = item.dataset.giftMessage;
                giftMessageDisplay.classList.add('show');
                nextPageGiftButton.classList.remove('hidden');
                giftSelected = true;
            }
        });
    });
    nextPageGiftButton.addEventListener('click', () => {
        giftSelected = false; // Reset for next time
        goToNextPage();
    });

    // --- Page 5: Special Coupons ---
    const couponItems = document.querySelectorAll('.coupon-item');
    const couponMessageDisplay = document.getElementById('couponMessage');
    let currentZoomedCoupon = null;

    couponItems.forEach(item => {
        item.addEventListener('click', () => {
            playSound(heartSound); // Heart sound for coupon selection
            if (currentZoomedCoupon) {
                currentZoomedCoupon.classList.remove('zoomed');
            }
            item.classList.add('zoomed');
            couponMessageDisplay.textContent = item.dataset.couponMessage;
            currentZoomedCoupon = item;
        });
    });
    document.getElementById('nextPageCoupon').addEventListener('click', goToNextPage);

    // --- Page 6: Memory Lane ---
    const memoryItems = document.querySelectorAll('.memory-item');
    let currentZoomedMemory = null;

    memoryItems.forEach(item => {
        item.addEventListener('click', () => {
            playSound(clickSound); // Click sound for photo
            const quoteElement = item.querySelector('.photo-quote');

            if (currentZoomedMemory === item) {
                // If clicking the same item, unzoom and hide quote
                item.classList.remove('zoomed');
                quoteElement.classList.add('hidden');
                currentZoomedMemory = null;
            } else {
                // Unzoom previous if any
                if (currentZoomedMemory) {
                    currentZoomedMemory.classList.remove('zoomed');
                    currentZoomedMemory.querySelector('.photo-quote').classList.add('hidden');
                }
                // Zoom new item and show quote
                item.classList.add('zoomed');
                quoteElement.textContent = item.dataset.quote;
                quoteElement.classList.remove('hidden');
                currentZoomedMemory = item;
            }
        });
    });
    document.getElementById('nextPageMemory').addEventListener('click', goToNextPage);

    // --- Page 7: Words From My Heart ---
    document.getElementById('nextPageWishes').addEventListener('click', goToNextPage);

    // --- Page 8: Guess Our Song ---
    document.getElementById('playHintButton').addEventListener('click', () => {
        playSound(clickSound);
        alert("Imagine a snippet of our special song playing now! 😊");
    });
    document.getElementById('nextPageSong').addEventListener('click', goToNextPage);

    // --- Page 9: Anniversary Note ---
    document.getElementById('playSoftPianoButton').addEventListener('click', () => {
        playSound(clickSound);
        if (isPlaying) {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
            isPlaying = false;
            musicIcon.src = 'assets/buttons/music_play.png'; // Update global music icon
        }

        if (softPianoPlaying) {
            softPianoMusic.pause();
            softPianoMusic.currentTime = 0;
            softPianoPlaying = false;
        } else {
            softPianoMusic.play().catch(e => console.log("Soft piano music play prevented:", e));
            softPianoPlaying = true;
        }
    });

    document.getElementById('stopBackgroundMusic').addEventListener('click', () => {
        playSound(clickSound);
        if (isPlaying) {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
            isPlaying = false;
            musicIcon.src = 'assets/buttons/music_play.png'; // Update global music icon
        }
        if (softPianoPlaying) {
            softPianoMusic.pause();
            softPianoMusic.currentTime = 0;
            softPianoPlaying = false;
        }
    });

    // Initial page load
    showPage(0);
});
