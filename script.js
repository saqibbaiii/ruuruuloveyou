document.addEventListener('DOMContentLoaded', () => {
    const bgMusic = document.getElementById('background-music');
    const softPianoMusic = document.getElementById('soft-piano-music');
    const songHintAudio = document.getElementById('song-hint-audio');
    const musicToggleButton = document.getElementById('music-toggle-btn');
    const musicIcon = musicToggleButton.querySelector('.music-icon');

    let isBackgroundMusicPlaying = false; 
    let isSoftPianoPlaying = false; 

    // --- Utility Functions ---
    
    // Function to play a sound effect
    function playSound(src) {
        const audio = new Audio(src);
        audio.play().catch(e => console.log("Sound play prevented:", e));
    }

    // Function to show a specific page and hide others with a fade transition
    function showPage(pageId) {
        const pages = document.querySelectorAll('.page');
        
        pages.forEach(page => {
            if (page.id === pageId) {
                // ⭐ Suggestion 1: ShowPage() transition animation - Added
                // Prepare for fade-in: ensure opacity is 0 before adding 'active'
                page.style.opacity = '0'; 
                page.style.transition = 'opacity 0.4s ease-in-out'; // Add transition property
                page.classList.add('active');
                
                // Trigger reflow to ensure transition works from 0 opacity
                void page.offsetWidth; 
                page.style.opacity = '1'; 

            } else {
                page.style.opacity = '0'; // Start fade-out
                page.style.transition = 'opacity 0.4s ease-in-out'; // Add transition property
                
                // After fade-out, remove 'active' class to apply `display: none;`
                setTimeout(() => {
                    page.classList.remove('active');
                    // Reset transition property after it's done to prevent conflicts
                    page.style.transition = 'none'; 
                }, 400); // Match CSS transition duration
            }
        });
        // Re-initialize scripts for the newly active page
        initializePageScripts(pageId);
    }

    // --- Global Music Controls ---

    // Toggle main background music
    musicToggleButton.addEventListener('click', () => {
        if (isBackgroundMusicPlaying) {
            bgMusic.pause();
            musicIcon.src = 'assets/buttons/music_play.png'; 
            isBackgroundMusicPlaying = false;
        } else {
            // Stop soft piano if playing
            if (isSoftPianoPlaying) {
                softPianoMusic.pause();
                isSoftPianoPlaying = false;
            }
            // Stop song hint if playing
            if (!songHintAudio.paused) {
                songHintAudio.pause();
            }

            bgMusic.play().then(() => {
                musicIcon.src = 'assets/buttons/music_pause.png'; 
                isBackgroundMusicPlaying = true;
            }).catch(e => {
                console.error("Background music play failed:", e);
                // Optionally show a message to the user that music requires interaction
            });
        }
    });

    // --- Page Specific Initialization Functions ---

    function initializePageScripts(pageId) {
        // Clear listeners for common elements that might be re-bound or cause side effects
        // This is a more robust approach for listener clearing before re-binding
        
        // General cleanup function to remove listeners from all known interactive elements on pages
        // This prevents memory leaks if elements are frequently re-rendered or pages are fully removed/added
        // For static HTML with distinct IDs, `element.onclick = null` is generally sufficient and simpler.
        
        switch (pageId) {
            case 'page1':
                setupPage1();
                break;
            case 'page2':
                setupPage2();
                break;
            case 'page3':
                setupPage3();
                break;
            case 'page4':
                setupPage4();
                break;
            case 'page5':
                setupPage5();
                break;
            case 'page6':
                setupPage6();
                break;
            case 'page7':
                setupPage7();
                break;
            case 'page8':
                setupPage8();
                break;
            case 'page9':
                setupPage9();
                break;
            default:
                break;
        }
    }

    // --- Page 1 Setup: Love Question ---
    function setupPage1() {
        const yesBtn = document.getElementById('yes-btn');
        const noBtn = document.getElementById('no-btn');

        if (yesBtn) yesBtn.onclick = () => { playSound('assets/music/click.mp3'); showPage('page4'); };
        if (noBtn) noBtn.onclick = () => { playSound('assets/music/click.mp3'); showPage('page2'); };
    }

    // --- Page 2 Setup: Crying Page ---
    function setupPage2() {
        const tryAgainBtn = document.getElementById('try-again-btn');
        if (tryAgainBtn) tryAgainBtn.onclick = () => { playSound('assets/music/click.mp3'); showPage('page1'); };
    }

    // --- Page 3 Setup: Find Hidden Item Game ---
    function setupPage3() {
        const hiddenItem = document.getElementById('hidden-item');
        if (hiddenItem) {
            hiddenItem.onclick = () => {
                playSound('assets/music/pop.mp3'); 
                alert('🎉 You found the hidden item! Moving to gifts! 🎉');
                showPage('page4'); 
            };
        }

        // ⭐ Suggestion 2: Performance - Cache elements locally
        const page3Elements = document.querySelector('#page3');
        if (page3Elements) {
            const decorationItems = page3Elements.querySelectorAll('.decoration-item, .flower-animation');
            decorationItems.forEach(item => {
                // Ensure existing listeners are cleared before (re)assigning
                item.onmouseover = null;
                item.onmouseout = null;

                item.onmouseover = () => {
                    item.style.transform = 'scale(1.05) rotate(5deg)';
                    item.style.transition = 'transform 0.3s ease-out';
                };
                item.onmouseout = () => {
                    item.style.transform = 'scale(1) rotate(0deg)';
                };
            });
        }
    }

    // --- Page 4 Setup: Choose Your Gift ---
    function setupPage4() {
        // ⭐ Suggestion 2: Performance - Cache elements locally
        const page4Elements = document.querySelector('#page4');
        if (page4Elements) {
            const giftItems = page4Elements.querySelectorAll('.gift-item');
            giftItems.forEach(giftItem => {
                const giftImage = giftItem.querySelector('.gift-image');
                const giftPopup = giftItem.querySelector('.gift-popup');
                const nextButton = giftPopup.querySelector('.next-page-btn');

                // Clear existing listeners
                giftImage.onclick = null;
                nextButton.onclick = null;
                
                giftImage.onclick = () => {
                    playSound('assets/music/heart.mp3'); 
                    // Hide all other gift popups and reset zoom
                    page4Elements.querySelectorAll('.gift-popup').forEach(popup => popup.classList.remove('active'));
                    page4Elements.querySelectorAll('.gift-image').forEach(img => img.classList.remove('zoomed'));
                    
                    giftPopup.classList.add('active');
                    giftImage.classList.add('zoomed'); 
                };

                nextButton.onclick = () => {
                    playSound('assets/music/click.mp3');
                    showPage('page5'); 
                };
            });
        }
    }

    // --- Page 5 Setup: Special Coupons ---
    function setupPage5() {
        // ⭐ Suggestion 2: Performance - Cache elements locally
        const page5Elements = document.querySelector('#page5');
        if (page5Elements) {
            const couponItems = page5Elements.querySelectorAll('.coupon-item');
            couponItems.forEach(couponItem => {
                const couponImage = couponItem.querySelector('.coupon-image');
                const couponPopup = couponItem.querySelector('.coupon-popup');

                couponImage.onclick = null; 
                couponItem.onmouseleave = null; 

                couponImage.onclick = () => {
                    playSound('assets/music/pop.mp3');
                    // Hide all other coupon popups and reset zoom
                    page5Elements.querySelectorAll('.coupon-popup').forEach(popup => popup.classList.remove('active'));
                    page5Elements.querySelectorAll('.coupon-image').forEach(img => img.classList.remove('zoomed'));

                    couponPopup.classList.add('active');
                    couponImage.classList.add('zoomed'); 
                };

                couponItem.onmouseleave = () => { 
                    couponPopup.classList.remove('active');
                    couponImage.classList.remove('zoomed');
                };
            });
        }

        const couponNextBtn = document.getElementById('coupon-next-btn');
        if (couponNextBtn) {
            couponNextBtn.onclick = null; 
            couponNextBtn.onclick = () => {
                playSound('assets/music/click.mp3');
                showPage('page6'); 
            };
        }
    }

    // --- Page 6 Setup: Memory Lane ---
    function setupPage6() {
        // ⭐ Suggestion 2: Performance - Cache elements locally
        const page6Elements = document.querySelector('#page6');
        if (page6Elements) {
            const memoryItems = page6Elements.querySelectorAll('.memory-item');
            memoryItems.forEach(memoryItem => {
                const photo = memoryItem.querySelector('.memory-photo');
                const quote = memoryItem.querySelector('.photo-quote');

                photo.onclick = null; 

                photo.onclick = () => {
                    playSound('assets/music/heart.mp3'); 
                    photo.classList.toggle('zoomed'); 
                    quote.classList.toggle('active'); 
                };
            });
        }

        const memoryNextBtn = document.getElementById('memory-next-btn');
        if (memoryNextBtn) {
            memoryNextBtn.onclick = null; 
            memoryNextBtn.onclick = () => {
                playSound('assets/music/click.mp3');
                showPage('page7'); 
            };
        }
    }

    // --- Page 7 Setup: Words From My Heart ---
    function setupPage7() {
        const wishesNextBtn = document.getElementById('wishes-next-btn');
        if (wishesNextBtn) {
            wishesNextBtn.onclick = null; 
            wishesNextBtn.onclick = () => {
                playSound('assets/music/click.mp3');
                showPage('page8'); 
            };
        }
    }

    // --- Page 8 Setup: Guess Our Song ---
    function setupPage8() {
        const playSongHintButton = document.getElementById('play-song-hint');
        if (playSongHintButton) {
            playSongHintButton.onclick = null; 
            playSongHintButton.onclick = () => {
                // Stop other background music if playing
                if (isBackgroundMusicPlaying) {
                    bgMusic.pause();
                    musicIcon.src = 'assets/buttons/music_play.png';
                    isBackgroundMusicPlaying = false;
                }
                // Stop soft piano if playing
                if (isSoftPianoPlaying) {
                    softPianoMusic.pause();
                    isSoftPianoPlaying = false;
                }

                songHintAudio.currentTime = 0; 
                songHintAudio.play().catch(e => console.error("Song hint play failed:", e));
                playSound('assets/music/pop.mp3'); 
            };
        }

        const songNextBtn = document.getElementById('song-next-btn');
        if (songNextBtn) {
            songNextBtn.onclick = null; 
            songNextBtn.onclick = () => {
                playSound('assets/music/click.mp3');
                if (!songHintAudio.paused) { 
                    songHintAudio.pause();
                }
                showPage('page9'); 
            };
        }
    }

    // --- Page 9 Setup: Anniversary Note ---
    function setupPage9() {
        const stopCurrentMusicBtn = document.getElementById('stop-current-music');
        const playSoftPianoBtn = document.getElementById('play-soft-piano');

        if (stopCurrentMusicBtn) stopCurrentMusicBtn.onclick = null;
        if (playSoftPianoBtn) playSoftPianoBtn.onclick = null;

        if (stopCurrentMusicBtn) {
            stopCurrentMusicBtn.onclick = () => {
                playSound('assets/music/click.mp3');
                if (isBackgroundMusicPlaying) {
                    bgMusic.pause();
                    musicIcon.src = 'assets/buttons/music_play.png';
                    isBackgroundMusicPlaying = false;
                }
                if (isSoftPianoPlaying) {
                    softPianoMusic.pause();
                    isSoftPianoPlaying = false;
                }
                if (!songHintAudio.paused) {
                    songHintAudio.pause();
                }
            };
        }

        if (playSoftPianoBtn) {
            playSoftPianoBtn.onclick = () => {
                playSound('assets/music/click.mp3');
                // Stop other music first
                if (isBackgroundMusicPlaying) {
                    bgMusic.pause();
                    musicIcon.src = 'assets/buttons/music_play.png';
                    isBackgroundMusicPlaying = false;
                }
                if (!songHintAudio.paused) {
                    songHintAudio.pause();
                }

                // Play soft piano
                if (!isSoftPianoPlaying) {
                    softPianoMusic.play().then(() => {
                        isSoftPianoPlaying = true;
                    }).catch(e => console.error("Soft piano play failed:", e));
                } else {
                    softPianoMusic.pause();
                    isSoftPianoPlaying = false;
                }
            };
        }
    }

    // --- Initial Load ---
    showPage('page1');
});