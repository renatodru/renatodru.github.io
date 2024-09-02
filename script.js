document.addEventListener("DOMContentLoaded", function () {
    // Inicialização do carrossel do portfólio
    $("#portfolio-carousel").owlCarousel({
        autoPlay: 3000, // Configura o autoplay do carrossel (3 segundos)
        items: 3, // Número de itens visíveis por vez
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 2],
        itemsTablet: [768, 2],
        itemsMobile: [479, 1],
        pagination: true,
        navigation: true,
        navigationText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
        stopOnHover: true, // Pausa o autoplay ao passar o mouse sobre o carrossel
        lazyLoad: true // Carrega as imagens conforme necessário para melhor desempenho
    });

    // Função para ajustar o tamanho das fontes de forma relativa ao tamanho da janela
    function adjustFontSize() {
        const baseSize = 16; // Tamanho base das fontes em pixels
        const scale = Math.min(window.innerWidth / 1440, 1); // Escala com base na largura da janela, limitando a 1 (tamanho normal)
        document.documentElement.style.fontSize = `${baseSize * scale}px`;
    }

    // Chamando a função para ajustar o tamanho das fontes ao carregar a página
    adjustFontSize();

    // Reajustando o tamanho das fontes ao redimensionar a janela
    window.addEventListener('resize', adjustFontSize);

    // Animação ao rolar a página (Scroll Animation)
    window.addEventListener("scroll", function () {
        document.querySelectorAll('.job, .education ul li, .courses ul li, .skills ul li').forEach(function (element) {
            var position = element.getBoundingClientRect().top;
            var windowTop = window.scrollY;

            if (position < window.innerHeight - 50) {
                element.classList.add("animate__animated", "animate__fadeInUp");
            }
        });
    });

    // Função para mudar o tema (dark/light mode)
    function toggleTheme() {
        const root = document.documentElement;
        if (root.hasAttribute("data-theme")) {
            root.removeAttribute("data-theme");
        } else {
            root.setAttribute("data-theme", "dark");
        }
    }

    // Alternância de tema escuro/claro
    const themeToggleButton = document.getElementById('theme-toggle-button');
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    }

    // Detecta o esquema de cores preferido do sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute("data-theme", "dark");
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const newColorScheme = e.matches ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newColorScheme);
    });

    // Modal de imagens do carrossel
    const images = document.querySelectorAll('#portfolio-carousel .item img');
    const modal = document.createElement('div');
    modal.classList.add('modal');
    document.body.appendChild(modal);

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modal.appendChild(modalContent);

    const modalClose = document.createElement('span');
    modalClose.classList.add('modal-close');
    modalContent.appendChild(modalClose);

    images.forEach(image => {
        image.addEventListener('click', function () {
            modalContent.appendChild(image.cloneNode());
            modal.style.display = "block";
            setTimeout(() => {
                modal.classList.add('fade-in');
            }, 10);
        });
    });

    modalClose.addEventListener('click', function () {
        modal.classList.remove('fade-in');
        setTimeout(() => {
            modal.style.display = "none";
            modalContent.removeChild(modalContent.querySelector('img'));
        }, 300);
    });

    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modalClose.click();
        }
    });

    // Tabs interativas
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            tabs.forEach(item => item.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            tab.classList.add('active');
            document.querySelector(tab.getAttribute('data-target')).classList.add('active');
        });
    });

    // Inicializar a primeira tab
    if (tabs.length > 0) {
        tabs[0].click();
    }

    // Notificação (toast) ao clicar em links sociais
    const socialLinks = document.querySelectorAll('.social-icons a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function () {
            showToast('Link copiado para a área de transferência');
        });
    });

    function showToast(message) {
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.innerText = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // Função de progresso em barras
    document.querySelectorAll('.progress-bar').forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.querySelector('.progress-bar-fill').style.width = `${progress}%`;
    });

    // Toggle switches para configurações do site
    const toggles = document.querySelectorAll('.toggle-switch input');
    toggles.forEach(toggle => {
        toggle.addEventListener('change', function () {
            showToast(this.checked ? 'Ativado' : 'Desativado');
        });
    });
});
