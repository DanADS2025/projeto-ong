document.addEventListener('DOMContentLoaded', () => {
    
    // ... funções mascaraCpf, mascaraTelefone, mascaraCep ...
    const mascara = (input, maskFunction) => {
        input.addEventListener('input', (e) => {
            e.target.value = maskFunction(e.target.value);
        });
    };

    const mascaraCpf = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .substring(0, 14);
    };

    const mascaraTelefone = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .substring(0, 15);
    };

    const mascaraCep = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .substring(0, 9);
    };
    
    // Função para aplicar todas as máscaras
    const applyMasks = () => {
        const cpfEl = document.getElementById('cpf');
        const telEl = document.getElementById('telefone');
        const cepEl = document.getElementById('cep');

        if (cpfEl) mascara(cpfEl, mascaraCpf);
        if (telEl) mascara(telEl, mascaraTelefone);
        if (cepEl) mascara(cepEl, mascaraCep);
    }

    // Inicializa na primeira carga
    applyMasks();

    // Exportar a função para que main.js possa chamá-la após a troca de template
    window.applyFormMasks = applyMasks; 
});