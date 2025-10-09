document.addEventListener('DOMContentLoaded', () => {

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

    mascara(document.getElementById('cpf'), mascaraCpf);
    mascara(document.getElementById('telefone'), mascaraTelefone);
    mascara(document.getElementById('cep'), mascaraCep);

});