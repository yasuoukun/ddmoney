document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            // Change icon
            const icon = menuToggle.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Reveal Animation on Scroll
    function reveal() {
        var reveals = document.querySelectorAll('.reveal, .reveal-right');
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    }
    
    window.addEventListener('scroll', reveal);
    
    // Trigger once on load
    setTimeout(reveal, 100);
});

// Installment Calculator Logic
function openCalc() {
    document.getElementById('calcModal').classList.add('active');
}

function closeCalc() {
    document.getElementById('calcModal').classList.remove('active');
}

function calculate() {
    const price = parseFloat(document.getElementById('calcPrice').value);
    const down = parseFloat(document.getElementById('calcDown').value);
    const interestInput = parseFloat(document.getElementById('calcInterest').value);
    const months = parseInt(document.getElementById('calcMonths').value);
    
    if (isNaN(price) || price <= 0) {
        alert("กรุณาระบุราคาสินค้าที่ถูกต้อง");
        return;
    }
    if (isNaN(months) || months <= 0) {
        alert("กรุณาระบุจำนวนเดือนที่ผ่อน");
        return;
    }
    
    let downPayment = isNaN(down) ? 0 : down;
    let interestRate = isNaN(interestInput) ? 0 : (interestInput / 100); 
    
    const principal = price - downPayment;
    if (principal < 0) {
        alert("เงินดาวน์ไม่สามารถมากกว่าราคาสินค้าได้");
        return;
    }
    
    let totalInterest = principal * interestRate * months;
    let monthlyPay = (principal + totalInterest) / months;
    
    // Update labels
    document.getElementById('r_principal').innerText = Math.ceil(principal).toLocaleString() + " บาท";
    document.getElementById('r_total_interest').innerText = Math.ceil(totalInterest).toLocaleString() + " บาท";
    document.getElementById('calcOutput').innerText = Math.ceil(monthlyPay).toLocaleString();
    
    document.getElementById('calcResult').style.display = 'block';
}

// Close modal when clicking outside content area
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('calcModal');
    if(modal) {
        modal.addEventListener('click', (e) => {
            if (e.target.id === 'calcModal') {
                closeCalc();
            }
        });
    }
});

// News Slider Auto-Scroll + Interactive for Mobile
document.addEventListener('DOMContentLoaded', () => {
    const marquee = document.querySelector('.marquee-container');
    if (marquee && window.innerWidth <= 768) {
        let isInteracting = false;
        let scrollSpeed = 1;
        let scrollInterval;

        const startAutoScroll = () => {
            stopAutoScroll();
            scrollInterval = setInterval(() => {
                if (!isInteracting) {
                    marquee.scrollLeft += scrollSpeed;
                    
                    if (marquee.scrollLeft >= (marquee.scrollWidth / 2) - 1) {
                        marquee.scrollLeft = 0;
                    }
                }
            }, 30);
        };

        const stopAutoScroll = () => {
            clearInterval(scrollInterval);
        };

        marquee.addEventListener('touchstart', () => {
            isInteracting = true;
        }, { passive: true });

        marquee.addEventListener('touchend', () => {
            setTimeout(() => {
                isInteracting = false;
            }, 1000); 
        }, { passive: true });

        startAutoScroll();
    }
});
