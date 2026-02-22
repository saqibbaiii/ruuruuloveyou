// script.js - All consolidated JavaScript for the 9-page SPA

// --- Global Variables and Audio Setup ---
const pages = document.querySelectorAll('.page');
let currentPage = 1; // Start on Page 1
let isMusicPlaying = false;

const backgroundMusic = document.getElementById('background-music');
const buttonClickSound = document.getElementById('button-click-sound');
const heartPopupSound = document.getElementById('heart-popup-sound');
const giftPopupSound = document.getElementById('gift-popup-sound');
const softPianoMusic = document.getElementById('soft-piano-music');
const musicToggleBtn = document.getElementById('music-toggle');
const musicIcon = document.getElementById('music-icon');

const pageContentMap = {
    1: document.querySelector('#page-1 .page-content'),
    2: document.querySelector('#page-2 .page-content'),
    3: document.querySelector('#page-3 .page-content'),
    4: document.querySelector('#page-4 .page-content'),
    5: document.querySelector('#page-5 .page-content'),
    6: document.querySelector('#page-6 .page-content'),
    7: document.querySelector('#page-7 .page-content'),
    8: document.querySelector('#page-8 .page-content'),
    9: document.querySelector('#page-9 .page-content'),
};

// --- Utility Functions ---
function playSound(audioElement) {
    if (audioElement && !audioElement.paused) {
        audioElement.pause();
        audioElement.currentTime = 0;
    }
    if (audioElement) {
        audioElement.play().catch(e => console.error("Audio play failed:", e));
    }
}

function stopSound(audioElement) {
    if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
    }
}

function showPage(pageNumber, transitionType = 'fade') {
    if (pageNumber < 1 || pageNumber > pages.length) {
        console.error("Invalid page number:", pageNumber);
        return;
    }

    const currentPageElement = document.getElementById(`page-${currentPage}`);
    const nextPageElement = document.getElementById(`page-${pageNumber}`);
    const currentContent = pageContentMap[currentPage];
    const nextContent = pageContentMap[pageNumber];

    if (!nextPageElement) {
        console.error(`Page ${pageNumber} element not found.`);
        return;
    }

    // Deactivate current page
    if (currentPageElement && currentPageElement.classList.contains('active')) {
        gsap.to(currentContent, {
            opacity: 0,
            scale: 0.9,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => {
                currentPageElement.classList.remove('active');
                currentPageElement.classList.add('hidden'); // Hide completely
                currentContent.style.opacity = ''; // Reset for next activation
                currentContent.style.transform = ''; // Reset for next activation
                // Specific cleanup for pages that need it
                if (currentPage === 3) stopHiddenItemAnimation();
                if (currentPage === 7) stopTypingAnimation();
            }
        });
    }

    // Activate next page
    nextPageElement.classList.remove('hidden');
    gsap.fromTo(nextContent,
        { opacity: 0, scale: 0.9 }, // Start slightly scaled down and invisible
        {
            opacity: 1,
            scale: 1,
            duration: 0.8, // Slightly longer for the entrance
            ease: "power2.out",
            delay: 0.2, // Small delay for content to appear after old page fades
            onStart: () => {
                nextPageElement.classList.add('active');
                currentPage = pageNumber;
                AOS.refreshHard(); // Re-initialize AOS for new page elements

                // Specific setup for pages that need it
                if (currentPage === 3) setupHiddenItemGame();
                if (currentPage === 7) setupTypingAnimation();
                if (currentPage === 9) {
                    stopSound(backgroundMusic);
                    if (isMusicPlaying) playSound(softPianoMusic);
                } else if (currentPage !== 9 && backgroundMusic.paused && isMusicPlaying) {
                    stopSound(softPianoMusic);
                    playSound(backgroundMusic);
                }
            }
        }
    );
}


// --- Global Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    // Initial music state (autoplay handled by browser, then controlled by user)
    backgroundMusic.volume = 0.6;
    buttonClickSound.volume = 0.8;
    heartPopupSound.volume = 0.8;
    giftPopupSound.volume = 0.8;
    softPianoMusic.volume = 0.6;

    // Try to autoplay, but be ready for user interaction
    const playAttempt = backgroundMusic.play();
    if (playAttempt !== undefined) {
        playAttempt.then(() => {
            isMusicPlaying = true;
            musicIcon.classList.remove('fa-volume-mute');
            musicIcon.classList.add('fa-volume-up');
        }).catch(() => {
            // Autoplay failed, likely due to browser policy
            isMusicPlaying = false;
            musicIcon.classList.remove('fa-volume-up');
            musicIcon.classList.add('fa-volume-mute');
            console.log("Autoplay prevented. User interaction needed to play music.");
        });
    }

    musicToggleBtn.addEventListener('click', () => {
        playSound(buttonClickSound);
        if (isMusicPlaying) {
            backgroundMusic.pause();
            softPianoMusic.pause();
            musicIcon.classList.remove('fa-volume-up');
            musicIcon.classList.add('fa-volume-mute');
            isMusicPlaying = false;
        } else {
            if (currentPage === 9) {
                softPianoMusic.play();
            } else {
                backgroundMusic.play();
            }
            musicIcon.classList.remove('fa-volume-mute');
            musicIcon.classList.add('fa-volume-up');
            isMusicPlaying = true;
        }
    });

    // Ensure initial page is set up
    showPage(1);
});

// --- Page 1: LOVE QUESTION ---
document.addEventListener('DOMContentLoaded', () => {
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');

    if (btnYes) {
        btnYes.addEventListener('click', () => {
            playSound(buttonClickSound);
            gsap.to(btnYes, { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1, onComplete: () => {
                showPage(3); // Navigate to Page 3 (Hidden Item Game)
            }});
        });
    }

    if (btnNo) {
        btnNo.addEventListener('click', () => {
            playSound(buttonClickSound);
            gsap.to(btnNo, { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1, onComplete: () => {
                showPage(2); // Navigate to Page 2 (Cry Page)
            }});
        });
    }
});

// --- Page 2: CRY PAGE ---
document.addEventListener('DOMContentLoaded', () => {
    const btnTryAgain = document.getElementById('btn-try-again');
    const tearDrop = document.querySelector('#page-2 .animate-tear-fall');

    // Only animate tear drop when page 2 is active
    const page2Observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class' && mutation.target.id === 'page-2') {
                if (mutation.target.classList.contains('active')) {
                    if (tearDrop) {
                        gsap.to(tearDrop, { opacity: 1, repeat: -1, duration: 3, ease: "none" });
                    }
                } else {
                    if (tearDrop) {
                        gsap.killTweensOf(tearDrop);
                        gsap.set(tearDrop, { opacity: 0 }); // Hide when inactive
                    }
                }
            }
        });
    });
    page2Observer.observe(document.getElementById('page-2'), { attributes: true });


    if (btnTryAgain) {
        btnTryAgain.addEventListener('click', () => {
            playSound(buttonClickSound);
            gsap.to(btnTryAgain, {
                y: -10,
                repeat: 1,
                yoyo: true,
                duration: 0.3,
                ease: "power1.inOut",
                onComplete: () => showPage(1) // Go back to Page 1
            });
        });
    }
});


// --- Page 3: FIND HIDDEN ITEM GAME ---
let hiddenItemTween;
let sparkleTween;

function setupHiddenItemGame() {
    const hiddenItemContainer = document.getElementById('hidden-item-container');
    const gameArea = document.getElementById('game-area');

    if (!hiddenItemContainer || !gameArea) return;

    // Reset visibility and position
    gsap.set(hiddenItemContainer, { opacity: 0, scale: 0.5, pointerEvents: 'none' });

    // Function to set random position
    function setRandomPosition() {
        const gameAreaRect = gameArea.getBoundingClientRect();
        const itemRect = hiddenItemContainer.getBoundingClientRect();

        // Calculate maximum top and left to keep item fully within game area
        const maxTop = (gameAreaRect.height - itemRect.height) / gameAreaRect.height * 100;
        const maxLeft = (gameAreaRect.width - itemRect.width) / gameAreaRect.width * 100;

        const randomX = gsap.utils.random(5, Math.max(5, maxLeft - 5)); // Keep some margin
        const randomY = gsap.utils.random(5, Math.max(5, maxTop - 5));

        hiddenItemContainer.style.setProperty('--x-pos', randomX);
        hiddenItemContainer.style.setProperty('--y-pos', randomY);
    }

    // Initial random position
    setRandomPosition();

    // Show the item with a slight delay and animation
    gsap.to(hiddenItemContainer, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
        delay: 1, // Appear after page transition
        onComplete: () => {
            hiddenItemContainer.style.pointerEvents = 'auto'; // Make clickable
            // Start subtle floating animation
            hiddenItemTween = gsap.to(hiddenItemContainer, {
                y: "+=10",
                x: "+=5",
                rotation: 1,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                duration: 2
            });
            sparkleTween = gsap.to("#hidden-item-container img[src*='sparkle_small']", {
                opacity: 0.8,
                scale: 1.2,
                repeat: -1,
                yoyo: true,
                duration: 1.5,
                ease: "power1.inOut"
            });
        }
    });

    // Handle click on hidden item
    hiddenItemContainer.onclick = () => {
        playSound(heartPopupSound);
        gsap.killTweensOf(hiddenItemContainer);
        gsap.killTweensOf("#hidden-item-container img[src*='sparkle_small']");
        
        gsap.to(hiddenItemContainer, {
            scale: 1.5,
            opacity: 0,
            duration: 0.7,
            ease: "back.in(2)",
            onComplete: () => {
                hiddenItemContainer.style.pointerEvents = 'none';
                showPage(4); // Navigate to Page 4
            }
        });
    };
}

function stopHiddenItemAnimation() {
    if (hiddenItemTween) hiddenItemTween.kill();
    if (sparkleTween) sparkleTween.kill();
    const hiddenItemContainer = document.getElementById('hidden-item-container');
    if (hiddenItemContainer) {
        hiddenItemContainer.style.opacity = 0;
        hiddenItemContainer.style.pointerEvents = 'none';
    }
}


// --- Page 4: CHOOSE YOUR GIFT ---
document.addEventListener('DOMContentLoaded', () => {
    const giftCards = document.querySelectorAll('.gift-card');
    const btnPage4Next = document.getElementById('btn-page4-next');
    const giftPopupModal = document.getElementById('gift-popup-modal');
    const modalGiftImage = document.getElementById('modal-gift-image');
    const btnModalClose = document.getElementById('btn-modal-close');

    if (giftCards.length > 0) {
        giftCards.forEach(card => {
            card.addEventListener('click', () => {
                playSound(giftPopupSound);
                const giftId = card.dataset.giftId;
                const giftImageSrc = `assets/decorations/gift${giftId}.png`;

                modalGiftImage.src = giftImageSrc;
                giftPopupModal.classList.add('modal-active'); // For custom modal animation
                giftPopupModal.style.pointerEvents = 'auto'; // Make modal interactive

                // Animate gift card click
                gsap.to(card, {
                    scale: 1.1,
                    duration: 0.2,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut"
                });

                // Show next button after gift selection
                gsap.to(btnPage4Next, { opacity: 1, pointerEvents: 'auto', duration: 0.5 });
            });
        });
    }

    if (btnModalClose) {
        btnModalClose.addEventListener('click', () => {
            playSound(buttonClickSound);
            giftPopupModal.classList.remove('modal-active');
            giftPopupModal.style.pointerEvents = 'none';
        });
    }

    if (btnPage4Next) {
        btnPage4Next.addEventListener('click', () => {
            playSound(buttonClickSound);
            showPage(5); // Navigate to Page 5
        });
    }
});


// --- Page 5: COUPONS ---
document.addEventListener('DOMContentLoaded', () => {
    const couponCards = document.querySelectorAll('.coupon-card');
    const btnPage5Next = document.getElementById('btn-page5-next');
    const couponModal = document.getElementById('coupon-modal');
    const modalCouponImage = document.getElementById('modal-coupon-image');
    const btnCouponModalClose = document.getElementById('btn-coupon-modal-close');

    if (couponCards.length > 0) {
        couponCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                playSound(giftPopupSound); // Using gift popup sound for coupons too
                const couponImageSrc = `assets/decorations/coupon${index + 1}.png`;

                modalCouponImage.src = couponImageSrc;
                couponModal.classList.add('modal-active');
                couponModal.style.pointerEvents = 'auto';

                gsap.to(card, {
                    scale: 1.1,
                    duration: 0.2,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut"
                });
            });
        });
    }

    if (btnCouponModalClose) {
        btnCouponModalClose.addEventListener('click', () => {
            playSound(buttonClickSound);
            couponModal.classList.remove('modal-active');
            couponModal.style.pointerEvents = 'none';
        });
    }

    if (btnPage5Next) {
        btnPage5Next.addEventListener('click', () => {
            playSound(buttonClickSound);
            showPage(6); // Navigate to Page 6
        });
    }
});


// --- Page 6: MEMORY LANE ---
document.addEventListener('DOMContentLoaded', () => {
    const memoryCards = document.querySelectorAll('.memory-card');
    const btnPage6Next = document.getElementById('btn-page6-next');

    if (memoryCards.length > 0) {
        memoryCards.forEach(card => {
            card.addEventListener('click', () => {
                playSound(buttonClickSound); // Soft click for memory cards
                gsap.to(card, {
                    scale: 1.05,
                    duration: 0.2,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut"
                });
                // The quote is shown/hidden via CSS hover, no extra JS needed here
            });
        });
    }

    if (btnPage6Next) {
        btnPage6Next.addEventListener('click', () => {
            playSound(buttonClickSound);
            showPage(7); // Navigate to Page 7
        });
    }
});


// --- Page 7: WORDS FROM MY HEART ---
const textToType = "My dearest,\nEvery day with you is a gift.\nYour smile lights up my world.\nThank you for this incredible year.\nYou are my everything, my sweet love. 💖";
let typingIndex = 0;
let typingInterval;
let sparkleTweenPage7;

function setupTypingAnimation() {
    const typedTextElement = document.getElementById('typed-text');
    const typingCursor = document.getElementById('typing-cursor');
    const textSparkle = document.getElementById('text-sparkle');

    if (!typedTextElement || !typingCursor || !textSparkle) return;

    typedTextElement.textContent = ''; // Clear previous text
    typingIndex = 0;
    gsap.set(typingCursor, { opacity: 1, display: 'inline-block' });
    gsap.set(textSparkle, { opacity: 0 });

    typingInterval = setInterval(() => {
        if (typingIndex < textToType.length) {
            typedTextElement.textContent += textToType.charAt(typingIndex);
            typingIndex++;

            // Position sparkle effect at the end of the current text
            if (typingIndex % 5 === 0) { // Sparkle every few characters
                const lastCharRect = typedTextElement.getBoundingClientRect();
                if (lastCharRect.width > 0 && lastCharRect.height > 0) {
                    const parentRect = typedTextElement.parentElement.getBoundingClientRect();
                    gsap.set(textSparkle, {
                        x: lastCharRect.right - parentRect.left - 20, // Adjust sparkle position
                        y: lastCharRect.bottom - parentRect.top - 20,
                        opacity: 1,
                        scale: 0.8
                    });
                    gsap.to(textSparkle, {
                        opacity: 0,
                        scale: 1.2,
                        duration: 0.5,
                        ease: "power1.out"
                    });
                }
            }
        } else {
            clearInterval(typingInterval);
            gsap.to(typingCursor, { opacity: 0, duration: 0.5, ease: "power1.out" }); // Hide cursor
        }
    }, 80); // Typing speed
}

function stopTypingAnimation() {
    clearInterval(typingInterval);
    gsap.killTweensOf(document.getElementById('typing-cursor'));
    gsap.killTweensOf(document.getElementById('text-sparkle'));
    gsap.set(document.getElementById('typing-cursor'), { opacity: 0, display: 'none' });
    gsap.set(document.getElementById('text-sparkle'), { opacity: 0 });
}

document.addEventListener('DOMContentLoaded', () => {
    const btnPage7Next = document.getElementById('btn-page7-next');
    if (btnPage7Next) {
        btnPage7Next.addEventListener('click', () => {
            playSound(buttonClickSound);
            showPage(8); // Navigate to Page 8
        });
    }
});


// --- Page 8: GUESS OUR SONG ---
document.addEventListener('DOMContentLoaded', () => {
    const btnPage8Next = document.getElementById('btn-page8-next');

    if (btnPage8Next) {
        btnPage8Next.addEventListener('click', () => {
            playSound(buttonClickSound);
            showPage(9); // Navigate to Page 9
        });
    }
});


// --- Page 9: ANNIVERSARY BOOK PAGE ---
// No specific interactive JS for this page, it's mostly visual and text.
// Music handling is done in showPage function.
document.addEventListener('DOMContentLoaded', () => {
    // Optional: Add any final page specific GSAP animations for aesthetic if needed
    // For example, a subtle pulse for the main text block
    const bookPageContent = document.querySelector('#page-9 .book-page-effect');
    if (bookPageContent) {
        gsap.to(bookPageContent, {
            y: -5,
            repeat: -1,
            yoyo: true,
            duration: 3,
            ease: "sine.inOut"
        });
    }
});
