/* main.js - Código JavaScript Modular e SPA Básico */

// Estrutura de Rotas do SPA
const routes = {
    'inicio': { 
        templateId: 'template-inicio', 
        title: 'ONG Coração Solidário - Início', 
        navTitle: 'Início' 
    },
    'projetos': { 
        templateId: 'template-projetos', 
        title: 'Projetos - ONG Coração Solidário', 
        navTitle: 'Projetos' 
    },
    'cadastro': { 
        templateId: 'template-cadastro', 
        title: 'Cadastro de Voluntário - ONG Coração Solidário', 
        navTitle: 'Seja Voluntário' 
    },
};

/**
 * Carrega o conteúdo de um template (SPA Básico)
 * @param {string} routeName 
 */
function loadTemplate(routeName) {
    const route = routes[routeName] || routes['inicio']; // Padrão: início
    const appContent = document.getElementById('app-content');
    const template = document.getElementById(route.templateId);
    
    // 1. Limpa o conteúdo atual
    appContent.innerHTML = ''; 

    if (template) {
        // 2. Cria o conteúdo a partir do template (Sistema de Templates JavaScript)
        const content = template.content.cloneNode(true);
        appContent.appendChild(content);

        // 3. Atualiza o título da página
        document.getElementById('page-title').textContent = route.title;

        // 4. Atualiza a navegação (link ativo)
        updateActiveLink(route.navTitle);

        // 5. Se for a página de cadastro, re-inicializa as máscaras e a validação do formulário
        if (routeName === 'cadastro') {
            // Re-aplicar máscaras se o DOM tiver sido alterado (o masks.js já é DOMContentLoaded)
            // Aqui, simplesmente chamamos a função que inicializa a validação (que está abaixo)
            initializeFormValidation();
            
        }
    }
}

/**
 * Atualiza o link ativo no menu.
 * @param {string} title - Título do link (ex: 'Início', 'Projetos').
 */
function updateActiveLink(title) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('ativo');
        if (link.textContent.trim() === title) {
            link.classList.add('ativo');
        }
    });
}

/**
 * Roteador principal do SPA.
 */
function router() {
    // Pega a rota da URL (ex: #inicio, #projetos)
    const hash = window.location.hash.slice(1) || 'inicio'; 
    loadTemplate(hash);
}

// -------------------------------------------------------------------------
// Funções de Componentes (Hamburguer, Modal, Toast) - Manutenção do Código
// -------------------------------------------------------------------------

// Menu hambúrguer toggle
function initializeHamburgerMenu() {
    const btn = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    btn && btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', (!expanded).toString());
        nav.classList.toggle('mobile-open');
    });
}

// Dropdown (esqueleto) - acessível
function initializeDropdowns() {
    document.querySelectorAll('.nav-item-has-sub').forEach(item => {
        const trigger = item.querySelector('.sub-toggle');
        if (!trigger) return;
        trigger.addEventListener('click', () => {
            const open = trigger.getAttribute('aria-expanded') === 'true';
            trigger.setAttribute('aria-expanded', (!open).toString());
            item.classList.toggle('open');
        });
    });
}

// Modal
window.openModal = function(contentHtml) {
    const backdrop = document.querySelector('.modal-backdrop');
    const dialog = backdrop.querySelector('.modal .modal-body');
    dialog.innerHTML = contentHtml;
    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden', 'false');
    // Foco no modal (ou no seu primeiro elemento interativo, mas o foco na janela é aceitável)
    backdrop.querySelector('.modal').focus(); 
};
window.closeModal = function() {
    const backdrop = document.querySelector('.modal-backdrop');
    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden', 'true');
};
function initializeModal() {
    document.querySelectorAll('.modal-backdrop .close').forEach(btn => btn.addEventListener('click', closeModal));
    document.querySelector('.modal-backdrop')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-backdrop')) closeModal();
    });
}

// Toast
window.showToast = function(message, timeout = 3500) {
    const container = document.querySelector('.toast-container');
    if (!container) return;
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = message;
    container.appendChild(t);
    setTimeout(() => {
        t.style.opacity = 0;
        setTimeout(() => t.remove(), 300);
    }, timeout);
};

// -------------------------------------------------------------------------
// Validação de Formulário - Necessita re-inicialização após carregamento do template
// -------------------------------------------------------------------------

function initializeFormValidation() {
    // Remove listeners antigos para evitar duplicação (importante no contexto SPA)
    document.querySelectorAll('form#form-voluntario').forEach(form => {
        const oldForm = form.cloneNode(true);
        form.parentNode.replaceChild(oldForm, form);
    });

    // Adiciona listener de submissão no novo formulário
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); 
            // Sistema de verificação de consistência de dados em formulários
            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                showToast('Existem campos inválidos. Veja os erros no formulário.');
                return;
            }
            // Se válido: simula envio e mostra agradecimento
            form.classList.remove('was-validated');

            // Esconder formulário, mostrar mensagem de obrigado
            const formContainer = form.closest('section') || form;
            const msg = formContainer.querySelector('#mensagem');

            if (msg) {
                form.style.display = 'none';
                msg.classList.remove('hidden');
                msg.setAttribute('aria-hidden', 'false');
            }
            showToast('Cadastro recebido! Obrigado por se voluntariar.');
        }, false);
    });
}


// -------------------------------------------------------------------------
// Inicialização Principal
// -------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializa o Roteador SPA
    router(); 
    window.addEventListener('hashchange', router); // Ouve mudanças na URL para trocar o conteúdo

    // 2. Inicializa componentes que persistem
    initializeHamburgerMenu();
    initializeDropdowns();
    initializeModal();

    // 3. Inicializa a validação de formulário (necessária para a primeira carga, se for 'cadastro')
    // Nota: O masks.js também será executado ao carregar o DOM, mas a validação precisa ser re-aplicada
    // se o template for trocado, o que é feito dentro de loadTemplate('cadastro').
    if(window.location.hash === '#cadastro') {
        initializeFormValidation();
    }
});