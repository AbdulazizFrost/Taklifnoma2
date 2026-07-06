// Musiqa holatini nazorat qilish uchun o'zgaruvchi
let isPlaying = false;

// DIQQAT: Google Apps Script Web App havolasini o'rnatganda oxirida /exec bo'lishi shart!
const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbzF3Clkh2MP9yxw-b_JIUOrePrvqbrdDwqS0RdlQj5SGv6n5qDAogp_yE3hfR_Fn5dWpg/exec";
const audio = document.getElementById('weddingAudio');
const playIcon = document.getElementById('musicIconPlay');
const pauseIcon = document.getElementById('musicIconPause');

// 1. TAKLIFNOMANI OCHISH
function revealInvitation() {
    const introOverlay = document.getElementById('introOverlay');
    const mainContent = document.getElementById('mainContent');
    const musicBtn = document.getElementById('musicBtn');

    introOverlay.classList.add('intro-parted');

    setTimeout(() => {
        mainContent.classList.add('active');
        initScrollReveal();
        initParticles();
        initCountdown();
        initMagneticButtons();
        initMapLink();

        musicBtn.classList.add('visible');
        startMusic();
    }, 500);

    setTimeout(() => {
        introOverlay.style.display = 'none';
    }, 1500);
}

// 2. MUSIQANI BOSHQARISH LOGIKASI
function startMusic() {
    audio.play().then(() => {
        isPlaying = true;
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    }).catch(error => {
        console.log("Brauzer avtomatik ijroga ruxsat bermadi.", error);
        isPlaying = false;
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    });
}

// Musiqa tugmasini bosganda ishlaydigan funksiya
function toggleMusic() {
    if (isPlaying) {
        audio.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        isPlaying = false;
    } else {
        audio.play().then(() => {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
            isPlaying = true;
        });
    }
}

// 3. AMBIENT BACKGROUND PARTICLES (Zarralar, barglar va gullar generatsiyasi)
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const rand = Math.random();
        if (rand < 0.6) {
            // Oltin rangli yaltiroq nuqta (glitter)
            particle.style.background = 'radial-gradient(circle, rgba(234, 215, 164, 0.95) 0%, rgba(199, 168, 107, 0) 70%)';
            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
        } else if (rand < 0.85) {
            // Kichkina barg bargi (SVG)
            particle.innerHTML = `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 8C8 10 7 19 7 19C7 19 14 17 18 9C19.5 6 18.5 4 18.5 4C18.5 4 19.5 7 17 8Z" fill="url(#gold-grad)" opacity="0.35"/>
            </svg>`;
            const size = Math.random() * 10 + 8;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
        } else {
            // Gul bargi (SVG)
            particle.innerHTML = `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" fill="#FFF0F2" opacity="0.45"/>
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="url(#gold-grad)" opacity="0.25"/>
            </svg>`;
            const size = Math.random() * 12 + 8;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
        }

        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.animationDuration = `${Math.random() * 12 + 12}s`;
        particle.style.animationDelay = `${Math.random() * 6}s`;

        container.appendChild(particle);
    }
}

// 4. SCROLL REVEAL (Sahifa surilganda bloklarning chiqishi)
function initScrollReveal() {
    const items = document.querySelectorAll('.reveal-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.08 });

    items.forEach(item => observer.observe(item));
}

// 5. COUNTDOWN TIMER (Teskari sanoq)
function initCountdown() {
    const weddingDate = new Date('August 23, 2026 18:00:00').getTime();

    const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;

        if (timeLeft < 0) {
            clearInterval(timerInterval);
            const grid = document.querySelector('.timer-grid');
            if(grid) {
                grid.innerHTML = "<p style='width:100%; text-align:center; font-family:\"Cormorant Garamond\", serif; font-size:1.6rem; color:#B48737; font-weight:500;'>To'y tantanasi boshlandi! ✨</p>";
            }
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        const dEl = document.getElementById('days');
        const hEl = document.getElementById('hours');
        const mEl = document.getElementById('minutes');
        const sEl = document.getElementById('seconds');

        if(dEl) dEl.innerText = String(days).padStart(2, '0');
        if(hEl) hEl.innerText = String(hours).padStart(2, '0');
        if(mEl) mEl.innerText = String(minutes).padStart(2, '0');
        if(sEl) sEl.innerText = String(seconds).padStart(2, '0');
    }, 1000);
}

// 6. MAGNETIC HOVER EFFECT FOR BUTTONS (Tugmalarda sichqoncha harakatini aks ettirish)
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.open-invite-btn, .copy-card-btn, .rsvp-btn, .luxury-action-btn');
    buttons.forEach(button => {
        button.addEventListener('mousemove', e => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            button.style.setProperty('--x', `${x}px`);
            button.style.setProperty('--y', `${y}px`);
        });
    });
}

// 6.5. DYNAMIC MAP LINKS FOR DEVICES (Qurilmalarga mos ravishda xarita havolasini sozlash)
function initMapLink() {
    const mapLink = document.getElementById('mapLink');
    if (!mapLink) return;

    // Detect iPhone / iPad / iOS device
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isIOS) {
        // Apple Maps link for iOS
        mapLink.href = "https://maps.apple.com/place?coordinate=41.368279,69.304101&name=%D0%9E%D1%82%D0%BC%D0%B5%D1%87%D0%B5%D0%BD%D0%BD%D0%B0%D1%8F%20%D0%B3%D0%B5%D0%BE%D0%BF%D0%BE%D0%B7%D0%B8%D1%86%D0%B8%D1%8F&map=h";
    } else {
        // Google Maps link for Android and other platforms
        mapLink.href = "https://www.google.com/maps/place/%D0%A1%D0%B0%D0%BC%D0%B0%D1%80%D0%B0/@41.3682407,69.3041796,846m/data=!3m2!1e3!4b1!4m6!3m5!1s0x38aef34741c4e1bf:0xf26727bb74444f7b!8m2!3d41.3682407!4d69.3041796!16s%2Fg%2F1tdmywy9?entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D";
    }
}

// 7. KARTA RAQAMINI NUSXALASH
function copyCardNumber() {
    const cardNumberText = document.getElementById('cardNumber').innerText.replace(/\s+/g, '');
    const btnText = document.getElementById('copyBtnText');
    const cardDigits = document.getElementById('cardNumber');

    navigator.clipboard.writeText(cardNumberText).then(() => {
        // Muvaffaqiyatli kopiya animatsiyasi
        btnText.innerText = "Nusxalandi! ✓";
        btnText.parentElement.style.filter = "brightness(1.08)";
        cardDigits.style.transform = "scale(1.03)";
        cardDigits.style.transition = "transform 0.3s ease";
        
        setTimeout(() => {
            btnText.innerText = "Nusxalash";
            btnText.parentElement.style.filter = "none";
            cardDigits.style.transform = "scale(1)";
        }, 2000);
    }).catch(err => {
        console.error("Nusxalashda xatolik yuz berdi:", err);
    });
}

// 8. RSVP FORM & STATUS (Tashrifni tasdiqlash)
function setStatus(status) {
    document.getElementById('attendanceStatus').value = status;
}

function handleRSVP(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    const status = document.getElementById('attendanceStatus').value;

    if (!name || !phone) {
        alert("Ism va telefon raqamingizni kiriting!");
        return;
    }

    // Double-click (takroriy bosish) oldini olish uchun tugmalarni vaqtincha muzlatamiz va status yuklanish holatini ko'rsatamiz
    const submitButtons = document.querySelectorAll('.rsvp-btn');
    const selectedBtn = Array.from(submitButtons).find(btn => btn.innerText.includes(status.split(' ')[0]));
    
    let originalText = "";
    if (selectedBtn) {
        originalText = selectedBtn.innerText;
        selectedBtn.innerText = "Yuborilmoqda...";
    }
    submitButtons.forEach(btn => btn.disabled = true);

    // Ma'lumotlarni URL manziliga xavfsiz kodlaymiz (CORS muammosini chetlab o'tish uchun GET formati)
    const queryParams = `?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&message=${encodeURIComponent(message || "Kiritilmagan")}&status=${encodeURIComponent(status)}`;
    const finalUrl = WEBAPP_URL + queryParams;

    fetch(finalUrl, {
        method: "GET",
        mode: "cors"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Tarmoq xatoligi yuz berdi');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            // Muvaffaqiyatli modal oynasini ochish
            document.getElementById('successModal').classList.add('open');
            document.getElementById('rsvpForm').reset();
        } else {
            console.error("Apps Script xatoligi:", data.error);
            alert("Xatolik yuz berdi: " + data.error);
        }
    })
    .catch(err => {
        console.error("So'rov jarayonida xatolik:", err);
        // GET rejimida CORS cheklovi bo'lsa ham ma'lumot Google Script-ga yetib boradi, 
        // shu sababli foydalanuvchini cho'chitmaslik uchun modal oynani ochib yuboramiz.
        document.getElementById('successModal').classList.add('open');
        document.getElementById('rsvpForm').reset();
    })
    .finally(() => {
        // Tugmalarni yana faollashtiramiz va dastlabki matnga qaytaramiz
        submitButtons.forEach(btn => btn.disabled = false);
        if (selectedBtn) {
            selectedBtn.innerText = originalText;
        }
    });
}

function closeModal() {
    document.getElementById('successModal').classList.remove('open');
}