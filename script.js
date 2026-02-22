import { gsap } from 'gsap';
import AOS from 'aos';

// Initialize AOS (for scroll-based animations, primarily on Page 6)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true, // Whether animation should happen only once - while scrolling down
});

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const pages = document.querySelectorAll('.app-page');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggleButton = document.getElementById('musicToggleButton');
    const musicIcon = musicToggleButton.querySelector('i');

    let currentPageId = 'page1'; // Start on Page 1
    let isMusicPlaying = false;
    let currentMusicSrc = '';

    // --- Audio Control Functions ---
    const playMusic = (src, volume = 0.5) => {
        if (backgroundMusic.src !== window.location.origin + '/' + src) { // Only change if different
            backgroundMusic.src = src;
        }
        backgroundMusic.volume = volume;
        backgroundMusic.play().then(() => {
            isMusicPlaying = true;
            musicIcon.classList.remove('fa-volume-mute');
            musicIcon.classList.add('fa-music');
        }).catch(error => {
            console.error("Autoplay prevented or other audio error:", error);
            // Fallback: Show play button, user can click to start
            isMusicPlaying = false;
            musicIcon.classList.remove('fa-music');
            musicIcon.classList.add('fa-volume-mute');
        });
        currentMusicSrc = src;
    };

    const stopMusic = () => {
        backgroundMusic.pause();
        isMusicPlaying = false;
        musicIcon.classList.remove('fa-music');
        musicIcon.classList.add('fa-volume-mute');
    };

    const toggleMusic = () => {
        if (isMusicPlaying) {
            stopMusic();
        } else {
            playMusic(currentMusicSrc); // Resume current page's music
        }
    };

    musicToggleButton.addEventListener('click', toggleMusic);

    // --- Page Transition Function ---
    const goToPage = (targetPageId) => {
        if (currentPageId === targetPageId) return; // Prevent navigating to same page

        const currentPage = document.getElementById(currentPageId);
        const targetPage = document.getElementById(targetPageId);

        if (!targetPage) {
            console.error(`Page with ID ${targetPageId} not found.`);
            return;
        }

        // --- Cinematic GSAP Transition Out ---
        gsap.to(currentPage, {
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
                currentPage.classList.remove('active');
                currentPage.style.visibility = 'hidden';
                currentPage.style.transform = 'scale(1)'; // Reset for next time

                // --- Cinematic GSAP Transition In ---
                gsap.fromTo(targetPage,
                    { opacity: 0, scale: 1.1, visibility: 'visible' },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        ease: "power2.inOut",
                        onStart: () => {
                            targetPage.classList.add('active');
                        },
                        onComplete: () => {
                            currentPageId = targetPageId;
                            handlePageSpecifics(currentPageId);
                            AOS.refresh(); // Re-initialize AOS on new page content
                        }
                    }
                );
            }
        });
    };

    // --- Page-Specific Logic and Music ---
    const handlePageSpecifics = (pageId) => {
        console.log(`Loading logic for ${pageId}`);
        stopMusic(); // Stop any currently playing music

        // Reset any previous animations or states
        gsap.killTweensOf('*'); // Kill all tweens
        document.querySelectorAll('.app-page').forEach(page => {
            gsap.set(page, { clearProps: 'all' }); // Clear all GSAP-applied styles
        });


        // Handle music and specific animations/interactions for each page
        switch (pageId) {
            case 'page1':
                playMusic('assets/music/song.mp3');
                // Page 1 specific animations
                gsap.fromTo("#page1 .bunny_idle", {y: -20, opacity: 0}, {y: 0, opacity: 1, duration: 1, ease: "power1.out", delay: 0.5});
                gsap.fromTo("#page1 h1", {scale: 0.8, opacity: 0}, {scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)", delay: 0.8});
                gsap.fromTo("#page1 .kawaii-btn", {y: 20, opacity: 0}, {y: 0, opacity: 1, duration: 0.7, ease: "power1.out", delay: 1, stagger: 0.2});

                // Attach button click handlers for Page 1
                document.querySelector('#page1 .btn-yes').onclick = () => {
                    gsap.to('#page1 .btn-yes', {scale: 1.1, duration: 0.2, yoyo: true, repeat: 1, onComplete: () => goToPage('page3')});
                    // Play click sound
                    new Audio('assets/music/click.mp3').play();
                };
                document.querySelector('#page1 .btn-no').onclick = () => {
                     gsap.to('#page1 .btn-no', {scale: 1.1, duration: 0.2, yoyo: true, repeat: 1, onComplete: () => goToPage('page2')});
                     new Audio('assets/music/click.mp3').play();
                };
                break;

            case 'page2':
                playMusic('assets/music/soft_piano.mp3'); // A sadder tone for crying page
                // Page 2 specific animations
                gsap.fromTo("#page2 .cry_bunny", {y: -50, opacity: 0}, {y: 0, opacity: 1, duration: 1.2, ease: "bounce.out", delay: 0.3});
                gsap.fromTo("#page2 h2", {x: -50, opacity: 0}, {x: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.6});
                gsap.fromTo("#page2 .try-again-btn", {scale: 0.5, opacity: 0}, {scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)", delay: 1});

                // Attach button click handler for Page 2
                document.querySelector('#page2 .try-again-btn').onclick = () => {
                    gsap.to('#page2 .try-again-btn', {
                        scale: 1.1, rotation: 5, duration: 0.2, yoyo: true, repeat: 1,
                        onComplete: () => goToPage('page1')
                    });
                     new Audio('assets/music/click.mp3').play();
                };
                break;

            case 'page3':
                playMusic('assets/music/song.mp3'); // Or a discovery-themed music
                // Hidden item logic
                const hiddenItem = document.getElementById('hiddenItem');
                hiddenItem.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
                hiddenItem.style.top = `${Math.random() * (window.innerHeight - 100)}px`;
                hiddenItem.classList.remove('hidden'); // Make it visible

                gsap.fromTo(hiddenItem, {opacity: 0, scale: 0.5}, {opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)"});

                hiddenItem.onclick = () => {
                    new Audio('assets/music/heart.mp3').play();
                    gsap.to(hiddenItem, {
                        scale: 1.5,
                        opacity: 0,
                        duration: 0.5,
                        ease: "power2.in",
                        onComplete: () => {
                            hiddenItem.classList.add('hidden');
                            goToPage('page4');
                        }
                    });
                };
                // For dev purposes, a next button if item is too hard to find
                document.querySelector('#page3 .next-page-btn').onclick = () => goToPage('page4');
                break;

            case 'page9':
                stopMusic(); // Ensure main music stops
                // Page 9 specific animations and music
                const pianoMusic = document.getElementById('pianoMusic');
                const playPianoButton = document.getElementById('playPianoButton');

                playPianoButton.onclick = () => {
                    if (pianoMusic.paused) {
                        pianoMusic.play();
                        playPianoButton.textContent = 'Stop Piano 🎶';
                    } else {
                        pianoMusic.pause();
                        playPianoButton.textContent = 'Play Piano 🎹';
                    }
                };

                // Book appearance animation
                gsap.fromTo('.note-book-style',
                    {y: 50, opacity: 0, scale: 0.8},
                    {y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.2)", delay: 0.5}
                );
                 // Text fade in after book
                gsap.fromTo('#page9 h2, #page9 p', {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 1, ease: "power1.out", stagger: 0.3, delay: 1.5});
                gsap.fromTo('#page9 .kawaii-btn', {opacity: 0, scale: 0.8}, {opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)", delay: 2.5});


                break;

            default:
                // Fallback for pages without specific music, or just a default
                playMusic('assets/music/soft_piano.mp3', 0.3); // Softer default
                // For placeholders, a simple next button
                const nextPageButton = targetPage.querySelector('.next-page-btn');
                if (nextPageButton) {
                    nextPageButton.onclick = () => {
                        const nextIdNum = parseInt(pageId.replace('page', '')) + 1;
                        if (nextIdNum <= 9) {
                            goToPage(`page${nextIdNum}`);
                        } else {
                             // Loop back to page 1 or a final thank you page
                             goToPage('page1');
                        }
                         new Audio('assets/music/click.mp3').play();
                    };
                }
                break;
        }
    };

    // Initialize the first page
    goToPage(currentPageId);

    // Ensure initial music state is reflected
    if (!isMusicPlaying) {
        musicIcon.classList.remove('fa-music');
        musicIcon.classList.add('fa-volume-mute');
    }
});
