document.addEventListener('DOMContentLoaded', () => {
    // --- Todo o código anterior de navegação (mantenha-o aqui) ---
    const pageContainer = document.getElementById('page-container');
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.pagina');
    const dotsContainer = document.querySelector('.navigation-dots');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let currentPageIndex = 0;
    let isScrolling = false;

    pages.forEach((page, index) => {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        dot.dataset.index = index;
        if (index === 0) {
            dot.classList.add('active');
        }
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function goToPage(index) {
        if (index < 0 || index >= pages.length) return;
        
        const targetPage = pages[index];
        isScrolling = true;
        pageContainer.scrollTo({
            left: targetPage.offsetLeft,
            behavior: 'smooth'
        });
        
        currentPageIndex = index;
        updateActiveStates();
        
        setTimeout(() => {
            isScrolling = false;
        }, 500);
    }

    function updateActiveStates() {
        navLinks.forEach((link, index) => {
            link.classList.toggle('active', index === currentPageIndex);
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentPageIndex);
        });

        prevBtn.disabled = currentPageIndex === 0;
        nextBtn.disabled = currentPageIndex === pages.length - 1;
    }

    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            goToPage(index);
        });
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToPage(parseInt(dot.dataset.index));
        });
    });

    prevBtn.addEventListener('click', () => goToPage(currentPageIndex - 1));
    nextBtn.addEventListener('click', () => goToPage(currentPageIndex + 1));
    
    let scrollTimeout;
    pageContainer.addEventListener('scroll', () => {
        if (isScrolling) return;

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const pageWidth = pageContainer.clientWidth;
            const newIndex = Math.round(pageContainer.scrollLeft / pageWidth);
            
            if (newIndex !== currentPageIndex) {
                currentPageIndex = newIndex;
                updateActiveStates();
            }
        }, 150);
    });

    updateActiveStates();

    // --- NOVO: Função para o relógio do sistema no rodapé ---
    const timeElement = document.getElementById('system-time');
    function updateSystemTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('pt-BR');
        if (timeElement) {
            timeElement.textContent = timeString;
        }
    }
    setInterval(updateSystemTime, 1000);
    updateSystemTime();
});