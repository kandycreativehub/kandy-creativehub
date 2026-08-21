// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: false, // Updated to false so animations happen every time
        mirror: true, // Allow animations while scrolling past them (up and down)
        offset: 100,
    });

    // Validated "Supiri" Fake Console Message
    console.log("%c Creative Hub ", "color: #fff; background: linear-gradient(to right, #4f46e5, #db2777); font-size: 20px; padding: 5px; border-radius: 5px;");
    console.log("Built by Antigravity");
});

// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenuBtn = document.getElementById('close-menu-btn');

if (menuBtn && mobileMenu && closeMenuBtn) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
        // Small delay to allow display:block to apply before opacity transition
        setTimeout(() => {
            mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
            mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
        }, 10);
    });

    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
        mobileMenu.classList.add('opacity-0', 'pointer-events-none');
        // Wait for transition to finish before hiding
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
    });

}

// Background Slider
const bgSlider = document.getElementById('hero-bg-slider');
if (bgSlider) {
    const images = bgSlider.querySelectorAll('img');
    let currentIndex = 0;
    const intervalTime = 4000; // 4 seconds

    setInterval(() => {
        // Hide current image (Fade out + Zoom In)
        images[currentIndex].classList.remove('opacity-100', 'scale-100');
        images[currentIndex].classList.add('opacity-0', 'scale-110');

        // Calculate next index
        currentIndex = (currentIndex + 1) % images.length;

        // Show next image (Fade in + Zoom Out)
        images[currentIndex].classList.remove('opacity-0', 'scale-110');
        images[currentIndex].classList.add('opacity-100', 'scale-100');
    }, intervalTime);
}

// Contact Form WhatsApp Integration
const sendMessageBtn = document.getElementById('sendMessageBtn');
if (sendMessageBtn) {
    sendMessageBtn.addEventListener('click', () => {
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const service = document.getElementById('serviceSelect').value;
        const message = document.getElementById('message').value.trim();

        if (!firstName || !lastName) {
            alert('Please enter your first and last name.');
            return;
        }

        const whatsappMessage = `*New Inquiry from Website*
Name: ${firstName} ${lastName}
Service: ${service}
Message: ${message}`;

        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappURL = `https://wa.me/94761681940?text=${encodedMessage}`;

        window.open(whatsappURL, '_blank');
    });
}

// ==========================================
// Portfolio Filter System
// ==========================================
const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');

            // Update active button state
            filterButtons.forEach(b => {
                b.classList.remove('bg-brand-primary', 'text-white', 'shadow-lg', 'shadow-brand-primary/25');
                b.classList.add('glass', 'text-slate-300', 'hover:bg-white/10', 'hover:text-white');
            });
            btn.classList.remove('glass', 'text-slate-300', 'hover:bg-white/10');
            btn.classList.add('bg-brand-primary', 'text-white', 'shadow-lg', 'shadow-brand-primary/25');

            // Filter items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue || (category && category.includes(filterValue))) {
                    item.classList.remove('is-hidden');
                    item.style.display = 'block';
                } else {
                    item.classList.add('is-hidden');
                    item.style.display = 'none';
                }
            });

            // Refresh AOS animations
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        });
    });
}

// ==========================================
// Video Lightbox Modal
// ==========================================
const videoModal = document.getElementById('videoModal');
const closeVideoModalBtn = document.getElementById('closeVideoModal');
const modalVideoIframe = document.getElementById('modalVideoIframe');
const modalHtml5Video = document.getElementById('modalHtml5Video');
const modalVideoTitle = document.getElementById('modalVideoTitle');
const modalVideoCategory = document.getElementById('modalVideoCategory');

function openVideoModal(videoSrc, videoType, title, category) {
    if (!videoModal) return;

    if (modalVideoTitle) modalVideoTitle.textContent = title || 'Project Showcase';
    if (modalVideoCategory) modalVideoCategory.textContent = category || 'Motion Graphics';

    // Show appropriate player
    if (videoType === 'youtube') {
        if (modalHtml5Video) {
            modalHtml5Video.pause();
            modalHtml5Video.classList.add('hidden');
        }
        if (modalVideoIframe) {
            // Auto play YouTube video
            const separator = videoSrc.includes('?') ? '&' : '?';
            modalVideoIframe.src = `${videoSrc}${separator}autoplay=1&rel=0`;
            modalVideoIframe.classList.remove('hidden');
        }
    } else {
        // Local MP4 or WebM video
        if (modalVideoIframe) {
            modalVideoIframe.src = '';
            modalVideoIframe.classList.add('hidden');
        }
        if (modalHtml5Video) {
            modalHtml5Video.src = videoSrc;
            modalHtml5Video.classList.remove('hidden');
            modalHtml5Video.play().catch(() => {});
        }
    }

    // Display modal
    videoModal.classList.remove('hidden');
    setTimeout(() => {
        videoModal.classList.remove('opacity-0', 'pointer-events-none');
        videoModal.classList.add('opacity-100', 'pointer-events-auto');
    }, 10);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeVideoModal() {
    if (!videoModal) return;

    videoModal.classList.remove('opacity-100', 'pointer-events-auto');
    videoModal.classList.add('opacity-0', 'pointer-events-none');

    // Pause and reset video players
    setTimeout(() => {
        videoModal.classList.add('hidden');
        if (modalVideoIframe) modalVideoIframe.src = '';
        if (modalHtml5Video) {
            modalHtml5Video.pause();
            modalHtml5Video.src = '';
        }
        document.body.style.overflow = '';
    }, 300);
}

// Bind click events on video cards
document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-video-src]');
    if (trigger) {
        e.preventDefault();
        const videoSrc = trigger.getAttribute('data-video-src');
        const videoType = trigger.getAttribute('data-video-type') || 'youtube';
        const title = trigger.getAttribute('data-video-title') || '';
        const category = trigger.getAttribute('data-video-category') || '';
        openVideoModal(videoSrc, videoType, title, category);
    }
});

if (closeVideoModalBtn) {
    closeVideoModalBtn.addEventListener('click', closeVideoModal);
}

if (videoModal) {
    // Close on backdrop click (click outside the video player container)
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal || e.target.id === 'videoModalBackdrop') {
            closeVideoModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !videoModal.classList.contains('hidden')) {
            closeVideoModal();
        }
    });
}

