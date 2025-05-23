document.addEventListener('DOMContentLoaded', function () {
    // =============== CARREGAMENTO DE COMPONENTES ===============
    // Carrega a sidebar
    fetch('../components/sidebar.html')
        .then(response => {
            if (!response.ok) throw new Error('Sidebar não encontrada');
            return response.text();
        })
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
            setupSidebar();
        })
        .catch(error => console.error('Erro ao carregar sidebar:', error));

    // Carrega o footer dentro do home-section
    const homeSection = document.querySelector('.home-section');
    if (homeSection) {
        fetch('../components/footer.html')
            .then(response => {
                if (!response.ok) throw new Error('Footer não encontrado');
                return response.text();
            })
            .then(data => {
                homeSection.insertAdjacentHTML('beforeend', data);
            })
            .catch(error => console.error('Erro ao carregar footer:', error));
    }

    // Carrega o menu mobile
    fetch('../components/mobile-menu.html')
        .then(response => {
            if (!response.ok) throw new Error('Menu mobile não encontrado');
            return response.text();
        })
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
            setupMobileMenu();
        })
        .catch(error => console.error('Erro ao carregar menu mobile:', error));

    // =============== CONFIGURAÇÃO DA SIDEBAR ===============
    function setupSidebar() {
        const sidebar = document.querySelector(".sidebar");
        const closeBtn = document.querySelector("#btn");

        if (sidebar && closeBtn) {
            closeBtn.addEventListener("click", () => {
                sidebar.classList.toggle("open");
                menuBtnChange();
            });

            function menuBtnChange() {
                if (sidebar.classList.contains("open")) {
                    closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
                } else {
                    closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
                }
            }
        }
    }

    // =============== CONFIGURAÇÃO DO MENU MOBILE ===============
    function setupMobileMenu() {
        // =============== EXPANDED LIST ===============
        const navExpand = document.getElementById('nav-expand');
        const navExpandList = document.getElementById('nav-expand-list');
        const navExpandIcon = document.getElementById('nav-expand-icon');

        if (navExpand && navExpandList && navExpandIcon) {
            navExpand.addEventListener('click', () => {
                // Expand list
                navExpandList.classList.toggle('show-list');

                // Troca o ícone entre livro fechado e livro aberto
                if (navExpandList.classList.contains('show-list')) {
                    navExpandIcon.classList.replace('ri-book-line', 'ri-book-open-line');
                } else {
                    navExpandIcon.classList.replace('ri-book-open-line', 'ri-book-line');
                }
            });
        }

        // =============== SCROLL SECTIONS ACTIVE LINK ===============
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav__list a');

        const scrollActive = () => {
            const scrollDown = window.scrollY;

            sections.forEach(current => {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 58;
                const sectionId = current.getAttribute('id');
                const sectionLink = document.querySelector(`.nav__list a[href*="${sectionId}"]`);

                if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
                    // Remove active class from all links first
                    navLinks.forEach(link => link.classList.remove('active-link'));
                    // Add to current section link
                    if (sectionLink) sectionLink.classList.add('active-link');
                }
            });
        };

        window.addEventListener('scroll', scrollActive);
        // Run once on load to set initial state
        scrollActive();
    }

    // =============== OUTRAS FUNCIONALIDADES GLOBAIS ===============
    // Adicione aqui quaisquer outros scripts globais necessários
});