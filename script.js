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

// FAQ Accordion Logic
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// Price Catalog: Tab Switcher
function switchTab(tabId) {
    document.querySelectorAll('.price-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.price-tab-content').forEach(c => c.classList.remove('active'));
    
    // Add tab- prefix if it's the iPhone/iPad category name
    const targetId = tabId.startsWith('tab-') ? tabId : 'tab-' + tabId;
    const content = document.getElementById(targetId);
    if (content) {
        content.classList.add('active');
        updateScrollArrows(targetId);
    }
    event.currentTarget.classList.add('active');
}

// Price Catalog: Arrow Scroll
function scrollCards(tabId, direction) {
    const tab = document.getElementById(tabId);
    if (!tab) return;
    const grid = tab.querySelector('.price-cards-grid');
    if (!grid) return;
    
    // Add droplet effect to the clicked arrow
    const arrows = tab.querySelectorAll('.scroll-arrow');
    const arrow = direction === -1 ? tab.querySelector('.scroll-arrow-left') : tab.querySelector('.scroll-arrow-right');
    if (arrow) {
        arrow.classList.add('clicked');
        setTimeout(() => arrow.classList.remove('clicked'), 600);
    }

    const card = grid.querySelector('.price-cat-card');
    const cardWidth = card ? (card.offsetWidth + 24) : 320;
    
    grid.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
    
    // Update arrows after a short delay for scroll animation
    setTimeout(() => updateScrollArrows(tabId), 400);
}

// Price Catalog: Check and toggle arrow visibility
function updateScrollArrows(tabId) {
    const tab = document.getElementById(tabId);
    if (!tab) return;
    const grid = tab.querySelector('.price-cards-grid');
    const leftArrow = tab.querySelector('.scroll-arrow-left');
    const rightArrow = tab.querySelector('.scroll-arrow-right');
    
    if (!grid || !leftArrow || !rightArrow) return;

    const scrollLeft = grid.scrollLeft;
    const scrollWidth = grid.scrollWidth;
    const clientWidth = grid.clientWidth;

    // Show/Hide Left Arrow
    if (scrollLeft <= 5) {
        leftArrow.classList.add('hidden');
    } else {
        leftArrow.classList.remove('hidden');
    }

    // Show/Hide Right Arrow (with 5px buffer)
    if (scrollLeft + clientWidth >= scrollWidth - 5) {
        rightArrow.classList.add('hidden');
    } else {
        rightArrow.classList.remove('hidden');
    }
}

// Initialize arrow visibility and add scroll listeners
document.addEventListener('DOMContentLoaded', () => {
    const tabs = ['tab-new-iphone', 'tab-used-iphone', 'tab-ipad'];
    tabs.forEach(tabId => {
        const tab = document.getElementById(tabId);
        if (tab) {
            const grid = tab.querySelector('.price-cards-grid');
            if (grid) {
                grid.addEventListener('scroll', () => updateScrollArrows(tabId));
                // Initial check
                updateScrollArrows(tabId);
            }
        }
    });
});

// Price Modal: Open
function openPriceModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

// Price Modal: Close on overlay click
function closePriceModal(event, modalId) {
    if (event.target === event.currentTarget) {
        closePriceModalBtn(modalId);
    }
}

// Price Modal: Close by button
function closePriceModalBtn(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// Close modals on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.price-modal-overlay.open').forEach(m => {
            m.classList.remove('open');
            document.body.style.overflow = '';
        });
    }
});

// Premium Search System
let allProducts = [];

function indexProducts() {
    allProducts = [];
    const allCards = document.querySelectorAll('.price-cat-card');
    allCards.forEach((card, index) => {
        // Add a unique ID to each card for scrolling
        const cardId = `item-${index}`;
        card.setAttribute('data-search-id', cardId);
        
        const name = card.querySelector('h3').innerText;
        const desc = card.querySelector('p').innerText;
        const price = card.querySelector('.price-cat-from span').innerText;
        const img = card.querySelector('img').src;
        const tabId = card.closest('.price-tab-content').id;

        allProducts.push({
            id: cardId,
            name: name,
            desc: desc,
            price: price,
            img: img,
            tabId: tabId
        });
    });
}

function handleSearch() {
    const input = document.getElementById('productSearch');
    const resultsDiv = document.getElementById('searchResults');
    const query = input.value.toLowerCase().trim();
    const clearBtn = document.getElementById('searchClear');

    if (query.length < 1) {
        resultsDiv.style.display = 'none';
        clearBtn.style.display = 'none';
        return;
    }

    clearBtn.style.display = 'block';
    const matches = allProducts.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.desc.toLowerCase().includes(query)
    );

    renderSearchResults(matches);
}

function renderSearchResults(matches) {
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = '';
    resultsDiv.style.display = 'block';

    if (matches.length === 0) {
        resultsDiv.innerHTML = `
            <div class="no-results">
                <i class="fa-solid fa-face-frown"></i>
                <p>ไม่พบรุ่นที่ท่านค้นหา... ลองใช้คำอื่นดูนะครับ</p>
            </div>`;
        return;
    }

    matches.forEach(p => {
        const item = document.createElement('div');
        item.className = 'search-result-item';
        item.innerHTML = `
            <img src="${p.img}" alt="${p.name}" class="res-img">
            <div class="res-info">
                <span class="res-name">${p.name} <span class="res-tag">${p.tabId === 'tab-new-iphone' ? 'มือหนึ่ง' : p.tabId === 'tab-ipad' ? 'iPad' : 'มือสอง'}</span></span>
                <span class="res-price">ผ่อนเริ่มเพียง ✨ ${p.price} บาท/เดือน</span>
            </div>
        `;
        item.onclick = () => selectProduct(p);
        resultsDiv.appendChild(item);
    });
}

function selectProduct(product) {
    const resultsDiv = document.getElementById('searchResults');
    const input = document.getElementById('productSearch');
    
    // 1. Switch to correct tab
    const tabShort = product.tabId.replace('tab-', '');
    switchTab(tabShort);

    // 2. Hide dropdown
    resultsDiv.style.display = 'none';
    input.value = product.name;

    // 3. Scroll to the card
    setTimeout(() => {
        const card = document.querySelector(`[data-search-id="${product.id}"]`);
        if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            // Visual feedback
            card.style.ring = '4px solid var(--primary)';
            card.style.outline = '4px solid rgba(0, 168, 232, 0.5)';
            card.style.outlineOffset = '4px';
            card.style.transform = 'scale(1.05) translateY(-10px)';
            
            setTimeout(() => {
                card.style.outline = 'none';
                card.style.transform = '';
            }, 2000);
        }
    }, 300);
}

function showResults() {
    const query = document.getElementById('productSearch').value;
    if (query.length > 0) {
        handleSearch();
    }
}

function clearSearch() {
    const input = document.getElementById('productSearch');
    input.value = '';
    document.getElementById('searchResults').style.display = 'none';
    document.getElementById('searchClear').style.display = 'none';
    input.focus();
}

// Close search when clicking outside
document.addEventListener('click', (e) => {
    const container = document.querySelector('.search-container');
    const results = document.getElementById('searchResults');
    if (container && !container.contains(e.target)) {
        results.style.display = 'none';
    }
});

// Run Indexing on Load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(indexProducts, 1000); // Give time for everything to render
});
