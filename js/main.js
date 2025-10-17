/* main.js */
document.addEventListener('DOMContentLoaded', () => {
  // Menu hambúrguer toggle
  const btn = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  btn && btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', (!expanded).toString());
    nav.classList.toggle('mobile-open');
  });

  // Dropdown (esqueleto) - acessível
  document.querySelectorAll('.nav-item-has-sub').forEach(item => {
    const trigger = item.querySelector('.sub-toggle');
    if(!trigger) return;
    trigger.addEventListener('click', () => {
      const open = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', (!open).toString());
      item.classList.toggle('open');
    });
  });

  // Modal
  window.openModal = function(contentHtml){
    const backdrop = document.querySelector('.modal-backdrop');
    const dialog = backdrop.querySelector('.modal .modal-body');
    dialog.innerHTML = contentHtml;
    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden','false');
    backdrop.querySelector('.modal').focus();
  };
  window.closeModal = function(){
    const backdrop = document.querySelector('.modal-backdrop');
    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden','true');
  };
  document.querySelectorAll('.modal-backdrop .close').forEach(btn => btn.addEventListener('click', closeModal));
  document.querySelector('.modal-backdrop')?.addEventListener('click', (e) => {
    if(e.target.classList.contains('modal-backdrop')) closeModal();
  });

  // Toast
  window.showToast = function(message, timeout=3500){
    const container = document.querySelector('.toast-container');
    if(!container) return;
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = message;
    container.appendChild(t);
    setTimeout(()=> {
      t.style.opacity = 0;
      setTimeout(()=> t.remove(), 300);
    }, timeout);
  };

  // Form validation + integração com sua mensagem de agradecimento
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // vamos controlar envio via JS (visual)
      if(!form.checkValidity()){
        form.classList.add('was-validated');
        showToast('Existem campos inválidos. Veja os erros no formulário.');
        return;
      }
      // Se válido: simula envio e mostra agradecimento
      form.classList.remove('was-validated');
      // Esconder formulário, mostrar mensagem de obrigado
      const formContainer = form.closest('section') || form;
      const msg = formContainer.querySelector('#mensagem');
      if(msg){
        form.style.display = 'none';
        msg.classList.remove('hidden');
        msg.setAttribute('aria-hidden','false');
      }
      showToast('Cadastro recebido! Obrigado por se voluntariar.');
    }, false);
  });

});
