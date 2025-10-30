# 🌟 Projeto Plataforma ONG - Coração Solidário

Este é o projeto final da disciplina de Desenvolvimento Front-End, focado na criação de uma plataforma web completa e profissional para uma Organização Não Governamental (ONG) fictícia.

O projeto foi construído como uma **Single Page Application (SPA)**, aplicando conceitos de HTML5 semântico, CSS3 avançado (Flexbox, Grid, Variáveis CSS) e JavaScript moderno para manipulação do DOM e interatividade.

## 🚀 Visão Geral da Plataforma

A plataforma "Coração Solidário" oferece uma presença digital funcional para a ONG, permitindo a divulgação de projetos, captação de voluntários e comunicação transparente.

* **Página Inicial:** Apresenta a missão da ONG e projetos em destaque.
* **Projetos:** Detalha as iniciativas, permitindo que visitantes saibam como doar ou participar.
* **Seja Voluntário:** Um formulário de cadastro completo para novos voluntários.

## 🛠️ Tecnologias e Conceitos Aplicados

Este repositório demonstra o cumprimento de todos os requisitos das 4 atividades da disciplina.

### Atividade 1: Estrutura HTML5
* **HTML Semântico:** Uso de tags como `<header>`, `<main>`, `<nav>`, `<section>`, `<fieldset>` e `<legend>` para estruturar o conteúdo.
* **Formulários Avançados:** O formulário de cadastro utiliza tipos de input HTML5 (date, email, tel) e atributos de validação nativa (`required`, `minlength`, `pattern`).
* **Acessibilidade Básica:** Uso de atributos `alt` em imagens e `aria-label` em controles interativos.

### Atividade 2: CSS3 Avançado e Responsividade
* **Design System:** Um sistema de design modular foi criado em `css/_variables.css`, definindo paleta de cores, tipografia e espaçamentos.
* **CSS Modular:** Os estilos estão organizados em módulos (BEM-like) e separados em arquivos: `_components.css`, `_forms.css`, `_layout.css`, etc.
* **Leiautes Responsivos:** O design é *mobile-first* e utiliza **CSS Grid** para o layout principal (`site-grid`) e **Flexbox** para componentes internos.
* **Componentes:** Foram criados componentes reutilizáveis como Cards, Botões (com estados `:hover`, `:focus`), Modals e Toasts.
* **Navegação:** O menu principal é totalmente responsivo e se transforma em um "menu hambúrguer" em dispositivos móveis.

### Atividade 3: JavaScript e Interatividade
* **Single Page Application (SPA):** O projeto não recarrega a página. O `main.js` controla um roteador básico (baseado em `window.location.hash`) que carrega dinamicamente o conteúdo das tags `<template>`.
* **Manipulação do DOM:** O conteúdo das seções é injetado no `<main>` conforme a navegação.
* **Validação de Formulário:** O `main.js` implementa um sistema de verificação de consistência de dados, exibindo mensagens de erro e um "toast" de feedback (sucesso ou falha) sem recarregar a página.
* **Máscaras de Input:** O arquivo `masks.js` aplica máscaras de input (CPF, Telefone, CEP) de forma não-obstrutiva.

### Atividade 4: Versionamento e Acessibilidade
* **Git/GitHub:** O projeto está versionado neste repositório público.
* **Acessibilidade (WCAG):**
    * **Contraste:** As cores escolhidas no `_variables.css` buscam atender aos mínimos de contraste.
    * **Navegação por Teclado:** Todos os elementos interativos (links, botões, inputs, modal) são acessíveis via teclado.
    * **ARIA:** Atributos `aria-expanded`, `aria-hidden` e `role` são usados para dar semântica a componentes dinâmicos (modal, menu hambúrguer).

## 🖼️ Estrutura de Pastas

Meu Projeto HTML/
├── css/
│   ├── _components.css
│   ├── _forms.css
│   ├── _layout.css
│   ├── _utilities.css
│   ├── _variables.css
│   └── style.css
├── js/
│   ├── main.js
│   └── masks.js
├── imagens/
│   ├── logo.png
│   ├── projeto1.jpg
│   └── voluntario.jpg 
├── index.html
└── README.md