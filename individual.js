document.addEventListener("DOMContentLoaded", () => {

    // identificar o html pelo id
const urlParams =
    new URLSearchParams(window.location.search);
const id =
    urlParams.get("id");
const produto =
    produtos.find(p => String(p.id) === id);
window.produtoAtual = produto;

    // produto não encontrado: mostra aviso e para por aqui
if(!produto){
    console.error("Produto não encontrado");
    const container = document.querySelector("#produto-container");
    if(container){
        container.innerHTML = `
            <section class="produto-nao-encontrado">
                <h1>Produto não encontrado</h1>
                <p>O produto que você procura não existe ou foi removido.</p>
                <a href="produtos.html" class="btn primary">Ver Catálogo</a>
            </section>
        `;
    }
    document.title = "Produto não encontrado | Smart Shield";
    return;
}

    criarBreadcrumb();

const nomesCategorias = {
    peliculas: "Películas",
    maquinas: "Máquinas",
    acessorios: "Acessórios",
    limpeza: "Limpeza"
};


    // aquela parte de clicar na disponibilidade/soliciar orçamento
document.title =
    `${produto.nome} | Smart Shield`;
const mensagem = encodeURIComponent(
    `Olá! Vim pelo site da Smart Shield e gostaria de mais informações sobre ${produto.nome}.`
);
const whatsappLink =
    `https://wa.me/554499485216?text=${mensagem}`;


    // estrutura do html individual
const container =
        document.querySelector("#produto-container");
    container.innerHTML = `

<section class="hero">
    <div class="hero-image">
        <img src="${produto.imagem}" alt="${produto.nome}">
    </div>
    <div class="hero-content">
        <span class="badge ${produto.badgeClass}">${produto.badge}</span> 
        <h1>${produto.nome}</h1>
        <p class="subtitle">${produto.subtitulo}</p>
        <button onclick="window.open('${whatsappLink}','_blank')">Ver Disponibilidade</button>
    </div>

    
</section>

<section class="features">
    <h2>Diferenciais</h2>
    <div class="grid">
        ${produto.features.map(feature => `
            <div class="feature">
                <h3>${feature.titulo}</h3>
                <p>${feature.texto}</p>
            </div>
        `).join("")}
    </div>
</section>

<section class="comparison">
    <h2>Estatísticas Visuais</h2>
    <div class="stats-container">
        ${produto.stats.map(stat => `
            <div class="stat">
                <div class="stat-header">
                    <span>${stat.nome}</span>
                    <span class="stat-value" data-value="${stat.valor}">0%</span>
                </div>
                <div class="bar">
                    <div
                        class="fill"
                        data-width="${stat.valor}%">
                    </div>
                </div>
            </div>
        `).join("")}
    </div>
</section>

<section class="cta">
    <h2>${produto.cta.titulo}</h2>
    <button onclick="window.open('${whatsappLink}','_blank')">${produto.cta.botao}</button>
</section>

<section class="related-products">
    <h2>Você também pode gostar de</h2>
    <div class="related-grid"></div>
</section>


<a href='${whatsappLink}' class="whatsapp-float" target="_blank">
    <svg viewBox="0 0 32 32" width="22" height="22" fill="currentColor">
        <path d="M16 .4C7.4.4.4 7.3.4 15.9c0 2.8.7 5.5 2.1 7.9L0 32l8.4-2.2c2.3 1.3 4.9 2 7.6 2 8.6 0 15.6-6.9 15.6-15.5S24.6.4 16 .4zm8.9 22.2c-.4 1-2.2 2-3.1 2.1-.8.1-1.8.2-5.9-1.4-5.2-2.1-8.5-7.2-8.8-7.5-.3-.4-2.1-2.8-2.1-5.3s1.3-3.8 1.8-4.4c.5-.5 1-.7 1.3-.7h1c.3 0 .8-.1 1.2.8.4.9 1.4 3.3 1.5 3.6.1.3.2.7 0 1.1-.2.4-.3.7-.6 1-.3.3-.6.7-.8.9-.3.3-.5.7-.2 1.2.3.5 1.3 2.1 2.9 3.4 2 1.8 3.6 2.4 4.2 2.7.5.2.9.2 1.2-.2.4-.4 1.5-1.8 1.9-2.4.4-.6.8-.5 1.3-.3.5.2 3.3 1.5 3.9 1.8.5.3.9.4 1 .6.1.2.1 1.2-.3 2.2z"/>
    </svg>
    <p>Fale Conosco</p>
</a>
`;


            // animação das barras de estatísticas
const statsSection = container.querySelector(".comparison");
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if(!entry.isIntersecting) return;
        const barras = statsSection.querySelectorAll(".fill");
        const valores = statsSection.querySelectorAll(".stat-value");
        barras.forEach((bar, index) => {

            setTimeout(() => {

                // anima a barra
                bar.style.width = bar.dataset.width;

                // anima o número
                const valorFinal = parseInt(valores[index].dataset.value);
                let valorAtual = 0;

                const duracao = 1200; // mesma duração da barra
                const intervalo = 20;
                const incremento = valorFinal / (duracao / intervalo);

                const contador = setInterval(() => {
                    valorAtual += incremento;

                    if(valorAtual >= valorFinal){
                        valorAtual = valorFinal;
                        clearInterval(contador);
                    }

                    valores[index].textContent =
                        `${Math.round(valorAtual)}%`;

                }, intervalo);
            }, index * 150);
        });
        obs.unobserve(entry.target);
    });
},{
    threshold:0.4
});

observer.observe(statsSection);

    // identificar os produtos relacionados
const categoriasRelacionadas =
    produto.relacionadosCategorias || [produto.categoria];
const relacionados = produtos.filter(p =>
        categoriasRelacionadas.includes(p.categoria) &&
        p.id !== produto.id
    )
    .sort(() => Math.random() - 0.5)
    .slice(0,3);
const relatedGrid =
    document.querySelector(".related-grid");
relacionados.forEach(produto => {
    relatedGrid.innerHTML +=
        criarCardProduto(produto);
});
});