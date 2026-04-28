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

    // Reveal Animation on Scroll function
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

// FB Reels: Scroll Logic (baNANA iT Style)
function scrollReels(direction) {
    const grid = document.querySelector('.reels-scroll-wrapper');
    if (!grid) return;
    
    const card = grid.querySelector('.reel-item');
    const cardWidth = card ? (card.offsetWidth + 20) : 300;
    
    grid.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
    
    setTimeout(updateReelsArrows, 400);
}

function updateReelsArrows() {
    const container = document.getElementById('reels-wrapper-container');
    const grid = document.querySelector('.reels-scroll-wrapper');
    if (!container || !grid) return;
    
    const leftArrow = container.querySelector('.scroll-arrow-left');
    const rightArrow = container.querySelector('.scroll-arrow-right');
    
    if (!leftArrow || !rightArrow) return;

    const scrollLeft = grid.scrollLeft;
    const scrollWidth = grid.scrollWidth;
    const clientWidth = grid.clientWidth;

    if (scrollLeft <= 5) leftArrow.classList.add('hidden');
    else leftArrow.classList.remove('hidden');

    if (scrollLeft + clientWidth >= scrollWidth - 5) rightArrow.classList.add('hidden');
    else rightArrow.classList.remove('hidden');
}

// Initialize arrow visibility and add scroll listeners
document.addEventListener('DOMContentLoaded', () => {
    const reelsGrid = document.querySelector('.reels-scroll-wrapper');
    if (reelsGrid) {
        reelsGrid.addEventListener('scroll', updateReelsArrows);
        updateReelsArrows();
    }

    // Reel overlay click to play/interact
    document.querySelectorAll('.reel-overlay').forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.add('hidden');
        });
    });

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

// Draggable Floating Buttons for Mobile & Desktop
document.addEventListener('DOMContentLoaded', () => {
    const floatingGroup = document.getElementById('floatingGroup');
    if (!floatingGroup) return;

    let isDragging = false;
    let startX, startY;
    let initialX, initialY;
    let hasMoved = false;

    const startDrag = (x, y) => {
        isDragging = true;
        hasMoved = false;
        floatingGroup.classList.add('dragging');
        startX = x;
        startY = y;
        const rect = floatingGroup.getBoundingClientRect();
        initialX = rect.left;
        initialY = rect.top;
        floatingGroup.style.transition = 'none';
    };

    const moveDrag = (x, y, e) => {
        if (!isDragging) return;
        
        const diffX = x - startX;
        const diffY = y - startY;

        if (Math.abs(diffX) > 5 || Math.abs(diffY) > 5) {
            hasMoved = true;
        }
        
        if (hasMoved && e.cancelable) e.preventDefault();

        floatingGroup.style.left = (initialX + diffX) + 'px';
        floatingGroup.style.top = (initialY + diffY) + 'px';
        floatingGroup.style.right = 'auto';
        floatingGroup.style.bottom = 'auto';
    };

    const endDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        floatingGroup.classList.remove('dragging');

        const rect = floatingGroup.getBoundingClientRect();
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const midPoint = screenWidth / 2;
        
        floatingGroup.style.transition = 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)';
        
        if (rect.left + rect.width / 2 < midPoint) {
            floatingGroup.style.left = '15px';
        } else {
            floatingGroup.style.left = (screenWidth - rect.width - 15) + 'px';
        }

        if (rect.top < 20) {
            floatingGroup.style.top = '20px';
        } else if (rect.bottom > screenHeight - 20) {
            floatingGroup.style.top = (screenHeight - rect.height - 20) + 'px';
        }
        
        if (hasMoved) {
            floatingGroup.style.pointerEvents = 'none';
            setTimeout(() => {
                floatingGroup.style.pointerEvents = 'auto';
            }, 100);
        }
    };

    // Touch Events
    floatingGroup.addEventListener('touchstart', (e) => startDrag(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
    document.addEventListener('touchmove', (e) => moveDrag(e.touches[0].clientX, e.touches[0].clientY, e), { passive: false });
    document.addEventListener('touchend', endDrag);
});

// Run Indexing on Load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(indexProducts, 1000); // Give time for everything to render
});

// Recurring LINE Tooltip Logic
function toggleLineTooltip() {
    const floatingGroup = document.getElementById('floatingGroup');
    if (!floatingGroup) {
        console.log("Floating group not found, retrying...");
        return;
    }

    // Detect side of the screen
    const rect = floatingGroup.getBoundingClientRect();
    const midPoint = window.innerWidth / 2;
    
    // Remove previous position classes
    floatingGroup.classList.remove('tooltip-left', 'tooltip-right', 'show-tooltip');
    
    // Forced reflow to restart animation/transition if needed
    void floatingGroup.offsetWidth;
    
    // Apply new position class based on current side
    if (rect.left + rect.width / 2 < midPoint) {
        floatingGroup.classList.add('tooltip-right');
    } else {
        floatingGroup.classList.add('tooltip-left');
    }
    
    floatingGroup.classList.add('show-tooltip');
    console.log("Tooltip Shown");

    setTimeout(() => {
        floatingGroup.classList.remove('show-tooltip');
        console.log("Tooltip Hidden");
    }, 5000); // Hide after 5 seconds
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    // Initial trigger after 3 seconds
    setTimeout(toggleLineTooltip, 3000);
    
    // Repeat every 30 seconds
    setInterval(toggleLineTooltip, 30000);
});

// --- Full Data Engine (allProductsData) ---
const allProductsData = [
    // iPhone 17 Series (New)
    { name: 'iPhone 17 Pro Max 512GB', installments: { '10': '6,160', '9': '7,220', '6': '9,120', '4': '12,310', '3': '15,500' } },
    { name: 'iPhone 17 Pro Max 256GB', installments: { '10': '5,400', '9': '6,330', '6': '8,000', '4': '10,800', '3': '13,600' } },
    { name: 'iPhone 17 Pro 512GB', installments: { '10': '5,620', '9': '6,590', '6': '8,320', '4': '11,230', '3': '14,140' } },
    { name: 'iPhone 17 Pro 256GB', installments: { '10': '5,150', '9': '6,040', '6': '7,630', '4': '10,300', '3': '12,970' } },
    { name: 'iPhone 17 256GB', installments: { '10': '3,510', '9': '4,120', '6': '5,200', '4': '7,020', '3': '8,840' } },
    { name: 'iPhone 17E 256GB', installments: { '10': '2,690', '9': '3,160', '6': '3,990', '4': '5,380', '3': '6,780' } },
    
    // iPhone 16 Series (New)
    { name: 'iPhone 16 Plus 128GB', installments: { '10': '3,510', '9': '4,120', '6': '5,200', '4': '7,020', '3': '8,840' } },
    { name: 'iPhone 16 128GB', installments: { '10': '3,160', '9': '3,710', '6': '4,680', '4': '6,320', '3': '7,960' } },
    { name: 'iPhone 16e 128GB', installments: { '10': '2,340', '9': '2,740', '6': '3,470', '4': '4,680', '3': '5,890' } },
    
    // iPhone 15 Series (New)
    { name: 'iPhone 15 Plus 128GB', installments: { '10': '3,390', '9': '3,980', '6': '5,030', '4': '6,790', '3': '8,550' } },
    { name: 'iPhone 15 128GB', installments: { '10': '2,690', '9': '3,160', '6': '3,990', '4': '5,380', '3': '6,780' } },
    
    // iPhone 14 Series (New)
    { name: 'iPhone 14 128GB', installments: { '10': '2,110', '9': '2,470', '6': '3,120', '4': '4,210', '3': '5,300' } },
    
    // iPhone 13 Series (New)
    { name: 'iPhone 13 128GB', installments: { '10': '1,990', '9': '2,330', '6': '2,950', '4': '3,980', '3': '5,010' } },

    // Used iPhone 17 Series
    { name: 'iPhone 17 Pro Max 512GB (มือสอง)', installments: { '10': '5,730', '9': '6,720', '6': '8,490', '4': '11,470', '3': '14,440' } },
    { name: 'iPhone 17 Pro Max 256GB (มือสอง)', installments: { '10': '5,270', '9': '6,180', '6': '7,800', '4': '10,530', '3': '13,260' } },
    { name: 'iPhone 17 Pro 256GB (มือสอง)', installments: { '10': '4,560', '9': '5,350', '6': '6,760', '4': '9,130', '3': '11,490' } },
    { name: 'iPhone 17 256GB (มือสอง)', installments: { '10': '3,040', '9': '3,570', '6': '4,510', '4': '6,080', '3': '7,660' } },
    
    // Used iPhone 16 Series
    { name: 'iPhone 16 Pro Max 512GB (มือสอง)', installments: { '10': '4,100', '9': '4,800', '6': '6,070', '4': '8,190', '3': '10,310' } },
    { name: 'iPhone 16 Pro Max 256GB (มือสอง)', installments: { '10': '3,980', '9': '4,670', '6': '5,890', '4': '7,960', '3': '10,020' } },
    { name: 'iPhone 16 Pro 256GB (มือสอง)', installments: { '10': '3,280', '9': '3,840', '6': '4,850', '4': '6,550', '3': '8,250' } },
    { name: 'iPhone 16 Pro 128GB (มือสอง)', installments: { '10': '3,160', '9': '3,710', '6': '4,680', '4': '6,320', '3': '7,960' } },
    { name: 'iPhone 16 Plus 128GB (มือสอง)', installments: { '10': '2,690', '9': '3,160', '6': '3,990', '4': '5,380', '3': '6,780' } },
    { name: 'iPhone 16 128GB (มือสอง)', installments: { '10': '2,460', '9': '2,880', '6': '3,640', '4': '4,910', '3': '6,190' } },
    
    // Used iPhone 15 Series
    { name: 'iPhone 15 Pro Max 256GB (มือสอง)', installments: { '10': '2,930', '9': '3,430', '6': '4,330', '4': '5,850', '3': '7,370' } },
    { name: 'iPhone 15 Pro 256GB (มือสอง)', installments: { '10': '2,570', '9': '3,020', '6': '3,810', '4': '5,150', '3': '6,480' } },
    { name: 'iPhone 15 Pro 128GB (มือสอง)', installments: { '10': '2,460', '9': '2,880', '6': '3,640', '4': '4,910', '3': '6,190' } },
    { name: 'iPhone 15 Plus 128GB (มือสอง)', installments: { '10': '2,340', '9': '2,740', '6': '3,470', '4': '4,680', '3': '5,890' } },
    { name: 'iPhone 15 128GB (มือสอง)', installments: { '10': '2,110', '9': '2,470', '6': '3,120', '4': '4,210', '3': '5,300' } },
    
    // Used iPhone 14 Series
    { name: 'iPhone 14 Pro Max 256GB (มือสอง)', installments: { '10': '2,340', '9': '2,740', '6': '3,470', '4': '4,680', '3': '5,890' } },
    { name: 'iPhone 14 Pro Max 128GB (มือสอง)', installments: { '10': '2,220', '9': '2,610', '6': '3,290', '4': '4,450', '3': '5,600' } },
    { name: 'iPhone 14 Pro 256GB (มือสอง)', installments: { '10': '2,110', '9': '2,470', '6': '3,120', '4': '4,210', '3': '5,300' } },
    { name: 'iPhone 14 Pro 128GB (มือสอง)', installments: { '10': '1,990', '9': '2,330', '6': '2,950', '4': '3,980', '3': '5,010' } },
    { name: 'iPhone 14 128GB (มือสอง)', installments: { '10': '1,520', '9': '1,860', '6': '2,720', '4': '3,650', '3': '4,590' } },
    
    // Used iPhone 13 Series
    { name: 'iPhone 13 Pro Max 256GB (มือสอง)', installments: { '10': '2,110', '9': '2,470', '6': '3,120', '4': '4,210', '3': '5,300' } },
    { name: 'iPhone 13 Pro Max 128GB (มือสอง)', installments: { '10': '1,990', '9': '2,330', '6': '2,950', '4': '3,980', '3': '5,010' } },
    { name: 'iPhone 13 Pro 128GB (มือสอง)', installments: { '10': '1,640', '9': '1,920', '6': '2,430', '4': '3,280', '3': '4,130' } },
    { name: 'iPhone 13 256GB (มือสอง)', installments: { '10': '—', '9': '1,860', '6': '2,720', '4': '3,650', '3': '4,590' } },
    { name: 'iPhone 13 128GB (มือสอง)', installments: { '10': '1,400', '9': '1,650', '6': '2,080', '4': '2,810', '3': '3,540' } },
    
    // Used iPhone 12 Series
    { name: 'iPhone 12 Pro Max 256GB (มือสอง)', installments: { '10': '1,520', '9': '1,860', '6': '2,720', '4': '3,650', '3': '4,590' } },
    { name: 'iPhone 12 Pro Max 128GB (มือสอง)', installments: { '10': '1,400', '9': '1,650', '6': '2,080', '4': '2,810', '3': '3,540' } },
    { name: 'iPhone 12 Pro 128GB (มือสอง)', installments: { '10': '1,170', '9': '1,370', '6': '1,730', '4': '2,340', '3': '2,950' } },
    { name: 'iPhone 12 128GB (มือสอง)', installments: { '10': '1,240', '9': '—', '6': '1,560', '4': '2,110', '3': '2,650' } },
    { name: 'iPhone 12 64GB (มือสอง)', installments: { '10': '1,100', '9': '—', '6': '1,390', '4': '1,870', '3': '2,360' } },
    
    // Used iPhone 11 Series
    { name: 'iPhone 11 Pro Max 64GB (มือสอง)', installments: { '10': '—', '9': '1,100', '6': '1,390', '4': '1,870', '3': '2,360' } },
    { name: 'iPhone 11 Pro 64GB (มือสอง)', installments: { '10': '—', '9': '960', '6': '1,210', '4': '1,640', '3': '2,060' } },
    { name: 'iPhone 11 128GB (มือสอง)', installments: { '10': '—', '9': '960', '6': '1,210', '4': '1,640', '3': '2,060' } },
    { name: 'iPhone 11 64GB (มือสอง)', installments: { '10': '—', '9': '820', '6': '1,040', '4': '1,400', '3': '1,770' } },
    
    // iPad Series
    { name: 'iPad Air 7 256GB Cell 11"', installments: { '12': '2,870', '10': '3,390', '9': '3,980', '6': '5,030', '4': '6,790', '3': '8,550' } },
    { name: 'iPad Air 7 128GB Cell 11"', installments: { '12': '2,480', '10': '2,930', '9': '3,430', '6': '4,330', '4': '5,850', '3': '7,370' } },
    { name: 'iPad Air 7 256GB WiFi 11"', installments: { '12': '2,380', '10': '2,810', '9': '3,290', '6': '4,160', '4': '5,620', '3': '7,070' } },
    { name: 'iPad Air 7 128GB WiFi 11"', installments: { '12': '1,980', '10': '2,340', '9': '2,740', '6': '3,470', '4': '4,680', '3': '5,890' } },
    { name: 'iPad Air 6 128GB WiFi 13"', installments: { '12': '1,980', '10': '2,340', '9': '2,740', '6': '3,470', '4': '4,680', '3': '5,890' } },
    { name: 'iPad Mini 7 256GB WiFi', installments: { '12': '2,180', '10': '2,570', '9': '3,020', '6': '3,810', '4': '5,150', '3': '6,480' } },
    { name: 'iPad Mini 7 128GB WiFi', installments: { '12': '1,780', '10': '2,110', '9': '2,470', '6': '3,120', '4': '4,210', '3': '5,300' } },
    { name: 'iPad Gen 11 256GB Cell', installments: { '12': '2,280', '10': '2,690', '9': '3,160', '6': '3,990', '4': '5,380', '3': '6,780' } },
    { name: 'iPad Gen 11 128GB Cell', installments: { '12': '1,880', '10': '2,220', '9': '2,610', '6': '3,290', '4': '4,450', '3': '5,600' } },
    { name: 'iPad Gen 11 256GB WiFi', installments: { '12': '1,690', '10': '1,990', '9': '2,330', '6': '2,950', '4': '3,980', '3': '5,010' } },
    { name: 'iPad Gen 11 128GB WiFi', installments: { '12': '1,290', '10': '1,520', '9': '1,780', '6': '2,250', '4': '3,040', '3': '3,830' } }
];

// --- Specification Database ---
const modelSpecs = {
    // iPhone 17 Series
    'iPhone 17 Pro Max': { img: 'cat-iphone17.png', display: '6.9" Super Retina XDR ProMotion 120Hz', chip: 'Apple A19 Pro', camera: '48MP Triple (Main, UW, 8x Tele)', battery: '5,088 mAh' },
    'iPhone 17 Pro':     { img: 'cat-iphone17.png', display: '6.3" Super Retina XDR ProMotion 120Hz', chip: 'Apple A19 Pro', camera: '48MP Triple (Main, UW, 8x Tele)', battery: '4,252 mAh' },
    'iPhone 17':         { img: 'cat-iphone17.png', display: '6.1" Super Retina XDR OLED 60Hz', chip: 'Apple A19 Bionic', camera: '48MP Dual Camera system', battery: '3,692 mAh' },
    'iPhone 17E':        { img: 'cat-iphone17.png', display: '6.1" Super Retina XDR OLED 60Hz', chip: 'Apple A18 Bionic', camera: '48MP Single Fusion Camera', battery: '3,149 mAh' },

    // iPhone 16 Series
    'iPhone 16 Pro Max': { img: 'cat-iphone16.png', display: '6.9" Super Retina XDR ProMotion 120Hz', chip: 'Apple A18 Pro', camera: '48MP Fusion + 48MP UW + 12MP 5x', battery: '4,685 mAh' },
    'iPhone 16 Pro':     { img: 'cat-iphone16.png', display: '6.3" Super Retina XDR ProMotion 120Hz', chip: 'Apple A18 Pro', camera: '48MP Fusion + 48MP UW + 12MP 5x', battery: '3,582 mAh' },
    'iPhone 16 Plus':    { img: 'cat-iphone16.png', display: '6.7" Super Retina XDR OLED 60Hz', chip: 'Apple A18 Bionic', camera: '48MP Fusion + 12MP Ultrawide', battery: '4,674 mAh' },
    'iPhone 16e':        { img: 'cat-iphone16.png', display: '6.1" Super Retina XDR OLED 60Hz', chip: 'Apple A18 Bionic', camera: '48MP Fusion Camera system', battery: '3,561 mAh' },
    'iPhone 16':         { img: 'cat-iphone16.png', display: '6.1" Super Retina XDR OLED 60Hz', chip: 'Apple A18 Bionic', camera: '48MP Fusion + 12MP Ultrawide', battery: '3,561 mAh' },

    // iPhone 15 Series
    'iPhone 15 Pro Max': { img: 'cat-iphone15.png', display: '6.7" Super Retina XDR ProMotion 120Hz', chip: 'Apple A17 Pro (3nm)', camera: '48MP Main + 12MP UW + 12MP 5x', battery: '4,422 mAh' },
    'iPhone 15 Pro':     { img: 'cat-iphone15.png', display: '6.1" Super Retina XDR ProMotion 120Hz', chip: 'Apple A17 Pro (3nm)', camera: '48MP Main + 12MP UW + 12MP 3x', battery: '3,274 mAh' },
    'iPhone 15 Plus':    { img: 'cat-iphone15.png', display: '6.7" Super Retina XDR OLED 60Hz', chip: 'Apple A16 Bionic', camera: '48MP Main + 12MP Ultrawide', battery: '4,383 mAh' },
    'iPhone 15':         { img: 'cat-iphone15.png', display: '6.1" Super Retina XDR OLED 60Hz', chip: 'Apple A16 Bionic', camera: '48MP Main + 12MP Ultrawide', battery: '3,349 mAh' },

    // iPhone 14 Series
    'iPhone 14 Pro Max': { img: 'cat-iphone14.png', display: '6.7" Super Retina XDR ProMotion 120Hz', chip: 'Apple A16 Bionic (4nm)', camera: '48MP Main + 12MP UW + 12MP 3x', battery: '4,323 mAh' },
    'iPhone 14 Pro':     { img: 'cat-iphone14.png', display: '6.1" Super Retina XDR ProMotion 120Hz', chip: 'Apple A16 Bionic (4nm)', camera: '48MP Main + 12MP UW + 12MP 3x', battery: '3,200 mAh' },
    'iPhone 14 Plus':    { img: 'cat-iphone14.png', display: '6.7" Super Retina XDR OLED 60Hz', chip: 'Apple A15 Bionic (5nm)', camera: '12MP Main + 12MP Ultrawide', battery: '4,325 mAh' },
    'iPhone 14':         { img: 'cat-iphone14.png', display: '6.1" Super Retina XDR OLED 60Hz', chip: 'Apple A15 Bionic (5nm)', camera: '12MP Main + 12MP Ultrawide', battery: '3,279 mAh' },

    // iPhone 13 Series
    'iPhone 13 Pro Max': { img: 'cat-iphone13.png', display: '6.7" Super Retina XDR ProMotion 120Hz', chip: 'Apple A15 Bionic (5-core GPU)', camera: '12MP Main + 12MP UW + 12MP 3x', battery: '4,352 mAh' },
    'iPhone 13 Pro':     { img: 'cat-iphone13.png', display: '6.1" Super Retina XDR ProMotion 120Hz', chip: 'Apple A15 Bionic (5-core GPU)', camera: '12MP Main + 12MP UW + 12MP 3x', battery: '3,095 mAh' },
    'iPhone 13':         { img: 'cat-iphone13.png', display: '6.1" Super Retina XDR OLED 60Hz', chip: 'Apple A15 Bionic (4-core GPU)', camera: '12MP Main + 12MP Ultrawide', battery: '3,227 mAh' },

    // iPhone 12 Series
    'iPhone 12 Pro Max': { img: 'cat-iphone12.png', display: '6.7" Super Retina XDR OLED 60Hz', chip: 'Apple A14 Bionic (5nm)', camera: '12MP Main + 12MP UW + 12MP 2.5x', battery: '3,687 mAh' },
    'iPhone 12 Pro':     { img: 'cat-iphone12.png', display: '6.1" Super Retina XDR OLED 60Hz', chip: 'Apple A14 Bionic (5nm)', camera: '12MP Main + 12MP UW + 12MP 2x', battery: '2,815 mAh' },
    'iPhone 12':         { img: 'cat-iphone12.png', display: '6.1" Super Retina XDR OLED 60Hz', chip: 'Apple A14 Bionic (5nm)', camera: '12MP Main + 12MP Ultrawide', battery: '2,815 mAh' },

    // iPhone 11 Series
    'iPhone 11 Pro Max': { img: 'cat-iphone11.png', display: '6.5" Super Retina XDR OLED 60Hz', chip: 'Apple A13 Bionic', camera: '12MP Main + 12MP UW + 12MP 2x', battery: '3,969 mAh' },
    'iPhone 11 Pro':     { img: 'cat-iphone11.png', display: '5.8" Super Retina XDR OLED 60Hz', chip: 'Apple A13 Bionic', camera: '12MP Main + 12MP UW + 12MP 2x', battery: '3,046 mAh' },
    'iPhone 11':         { img: 'cat-iphone11.png', display: '6.1" Liquid Retina HD LCD 60Hz', chip: 'Apple A13 Bionic', camera: '12MP Main + 12MP Ultrawide', battery: '3,110 mAh' },

    // iPad Series
    'iPad Air 7':  { img: 'cat-ipad-air.png', display: '11"/13" Liquid Retina IPS LCD 60Hz', chip: 'Apple M3 Chip', camera: '12MP Rear, 12MP Landscape Front', battery: '7,606 / 10,243 mAh' },
    'iPad Air 6':  { img: 'cat-ipad-air.png', display: '11"/13" Liquid Retina IPS LCD 60Hz', chip: 'Apple M2 Chip', camera: '12MP Rear, 12MP Landscape Front', battery: '7,606 / 10,243 mAh' },
    'iPad Mini':   { img: 'cat-ipad-mini.png', display: '8.3" Liquid Retina IPS LCD 60Hz', chip: 'Apple A17 Pro Chip', camera: '12MP Rear, 12MP Ultra Wide Front', battery: '5,078 mAh' },
    'iPad Gen':    { img: 'cat-ipad-gen.png', display: '10.9" Liquid Retina IPS LCD 60Hz', chip: 'Apple A16 Bionic', camera: '12MP Rear, 12MP Landscape Front', battery: '7,606 mAh' },
};

// --- Comparison Logic Engine ---
function populateCompareSelects() {
    const s1 = document.getElementById('compare-select-1');
    const s2 = document.getElementById('compare-select-2');
    if (!s1 || !s2) return;
    
    s1.innerHTML = '';
    s2.innerHTML = '';
    
    const groups = {
        'iPhone 17 Series': [],
        'iPhone 16 Series': [],
        'iPhone 15 Series': [],
        'iPhone 14 Series': [],
        'iPhone 13 Series': [],
        'iPhone 12 Series': [],
        'iPhone 11 Series': [],
        'iPad Series': [],
        'อื่นๆ': []
    };

    allProductsData.forEach((prod, index) => {
        let added = false;
        for (const groupName in groups) {
            const seriesMatch = groupName.split(' ')[0] + ' ' + groupName.split(' ')[1];
            if (prod.name.includes(seriesMatch) || (groupName === 'iPad Series' && prod.name.includes('iPad'))) {
                groups[groupName].push({ ...prod, index });
                added = true;
                break;
            }
        }
        if (!added) groups['อื่นๆ'].push({ ...prod, index });
    });

    const createGroupOptions = (select) => {
        for (const groupName in groups) {
            if (groups[groupName].length > 0) {
                const group = document.createElement('optgroup');
                group.label = groupName;
                groups[groupName].forEach(prod => {
                    const opt = document.createElement('option');
                    opt.value = prod.index;
                    opt.textContent = prod.name;
                    group.appendChild(opt);
                });
                select.appendChild(group);
            }
        }
    };

    createGroupOptions(s1);
    createGroupOptions(s2);

    let idx1 = 0, idx2 = 1;
    allProductsData.forEach((p, i) => {
        if (p.name.includes('iPhone 14') && !p.name.includes('(มือสอง)')) idx1 = i;
        if (p.name.includes('iPhone 15') && !p.name.includes('(มือสอง)')) idx2 = i;
    });

    s1.value = idx1;
    s2.value = idx2;
    if (document.getElementById('compare-months-select')) {
        document.getElementById('compare-months-select').value = '10';
    }

    initCustomSelect('compare-select-1');
    initCustomSelect('compare-select-2');
    initCustomSelect('compare-months-select', true);

    updateComparison();
}

function initCustomSelect(id, isMini = false) {
    const native = document.getElementById(id);
    if (!native) return;
    
    let container = native.parentElement.querySelector(`.custom-select-container[data-target="${id}"]`);
    if (!container) {
        container = document.createElement('div');
        container.className = 'custom-select-container' + (isMini ? ' mini' : '');
        container.dataset.target = id;
        native.parentNode.insertBefore(container, native.nextSibling);
    } else {
        container.innerHTML = '';
    }

    const trigger = document.createElement('div');
    trigger.className = 'custom-select-trigger';
    trigger.innerHTML = `<span>${native.options[native.selectedIndex]?.text || 'เลือก'}</span><i class="fa-solid fa-chevron-down"></i>`;
    container.appendChild(trigger);

    const list = document.createElement('div');
    list.className = 'custom-options-list';
    container.appendChild(list);

    const scrollArea = document.createElement('div');
    scrollArea.className = 'custom-scroll-area';
    list.appendChild(scrollArea);

    const groups = native.querySelectorAll('optgroup');
    if (groups.length > 0) {
        groups.forEach(group => {
            const groupLabel = document.createElement('div');
            groupLabel.className = 'custom-opt-group';
            groupLabel.textContent = group.label;
            scrollArea.appendChild(groupLabel);
            group.querySelectorAll('option').forEach(opt => createCustomOption(opt, scrollArea, native, trigger, container));
        });
    } else {
        native.querySelectorAll('option').forEach(opt => createCustomOption(opt, scrollArea, native, trigger, container));
    }

    trigger.onclick = (e) => {
        e.stopPropagation();
        document.querySelectorAll('.custom-select-container').forEach(c => {
            if (c !== container) c.classList.remove('active');
        });
        container.classList.toggle('active');
    };

    document.addEventListener('click', () => {
        container.classList.remove('active');
    });
}

function createCustomOption(opt, list, native, trigger, container) {
    const customOpt = document.createElement('div');
    customOpt.className = `custom-option ${opt.selected ? 'selected' : ''}`;
    customOpt.textContent = opt.text;
    customOpt.dataset.value = opt.value;
    
    customOpt.onclick = () => {
        native.value = opt.value;
        trigger.querySelector('span').textContent = opt.text;
        container.classList.remove('active');
        list.querySelectorAll('.custom-option').forEach(o => o.classList.remove('selected'));
        customOpt.classList.add('selected');
        updateComparison();
    };
    list.appendChild(customOpt);
}

function getSpecs(name) {
    const lowerName = name.toLowerCase();
    const sortedKeys = Object.keys(modelSpecs).sort((a, b) => b.length - a.length);
    for (const key of sortedKeys) {
        if (lowerName.includes(key.toLowerCase())) return modelSpecs[key];
    }
    return { img: 'cat-iphone13.png', display: 'Liquid Retina Display', chip: 'Apple Bionic / M-series', camera: 'Advanced Camera System', battery: 'All-day Battery Life' };
}

function updateComparison() {
    const s1_el = document.getElementById('compare-select-1');
    const s2_el = document.getElementById('compare-select-2');
    const months_el = document.getElementById('compare-months-select');
    if (!s1_el || !s2_el || !months_el) return;
    
    const idx1 = parseInt(s1_el.value);
    const idx2 = parseInt(s2_el.value);
    const months = months_el.value;
    if (isNaN(idx1) || isNaN(idx2) || !allProductsData[idx1] || !allProductsData[idx2]) return;
    
    const p1 = allProductsData[idx1];
    const p2 = allProductsData[idx2];
    const s1 = getSpecs(p1.name);
    const s2 = getSpecs(p2.name);

    document.getElementById('comp-img-1').src = s1.img;
    document.getElementById('comp-img-2').src = s2.img;

    const m1Str = p1.installments[months] || "—";
    const m2Str = p2.installments[months] || "—";
    document.getElementById('comp-monthly-1').innerText = m1Str;
    document.getElementById('comp-monthly-2').innerText = m2Str;
    
    document.getElementById('spec-display-1').innerText = s1.display;
    document.getElementById('spec-display-2').innerText = s2.display;
    document.getElementById('spec-chip-1').innerText = s1.chip;
    document.getElementById('spec-chip-2').innerText = s2.chip;
    document.getElementById('spec-camera-1').innerText = s1.camera;
    document.getElementById('spec-camera-2').innerText = s2.camera;
    document.getElementById('spec-battery-1').innerText = s1.battery;
    document.getElementById('spec-battery-2').innerText = s2.battery;

    const val1 = parseInt(m1Str.replace(/,/g, '').replace(/[^0-9]/g, ''));
    const val2 = parseInt(m2Str.replace(/,/g, '').replace(/[^0-9]/g, ''));
    const verdict = document.getElementById('upgrade-verdict');
    if (verdict) {
        if (!isNaN(val1) && !isNaN(val2)) {
            const diff = val2 - val1;
            const diffDay = Math.ceil(Math.abs(diff) / 30);
            verdict.classList.remove('verdict-upgrade', 'verdict-save', 'verdict-equal');
            if (diff > 0) {
                verdict.innerHTML = `
                    <div class="pill-mid">เพิ่มเพียงวันละ <i class="fa-solid fa-arrow-right-long" style="margin-left:3px; opacity:0.7;"></i></div>
                    <div class="pill-price"><span>${diffDay}</span>.-</div>
                `;
                verdict.classList.add('verdict-upgrade');
            } else if (diff < 0) {
                verdict.innerHTML = `
                    <div class="pill-mid">ประหยัดได้วันละ <i class="fa-solid fa-arrow-right-long" style="margin-left:3px; opacity:0.7;"></i></div>
                    <div class="pill-price"><span>${diffDay}</span>.-</div>
                `;
                verdict.classList.add('verdict-save');
            } else {
                verdict.innerHTML = `<div class="pill-mid">แผนผ่อน</div><div class="pill-price" style="font-size:1.1rem">ราคาเท่ากัน</div>`;
                verdict.classList.add('verdict-equal');
            }
        } else {
            verdict.innerHTML = `<div class="pill-mid">เปรียบเทียบ</div><div class="pill-price">เลือกผ่อนกี่เดือน?</div>`;
            verdict.classList.add('verdict-equal');
        }
    }
}

setTimeout(populateCompareSelects, 500);
