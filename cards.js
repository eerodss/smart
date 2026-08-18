function criarCardProduto(produto){
    
            /** não pode tirar, se não quebra os cards ??? */
const rotacao = (Math.random() * 8 - 4).toFixed(1);

    return `
        <div class="product-card"
            data-category="${produto.categoria}"
            style="--hover-rotate:${rotacao}deg;">

            <div class="product-badge ${produto.badgeClass}">
                ${produto.badge}
            </div>

            <div class="product-image">
                <img src="${produto.imagem}"
                    class="${produto.classe}"
                    alt="${produto.nome}"
                    loading="lazy">
            </div>

            <div class="product-info">
                <h3>${produto.nome}</h3>

                <div class="description-wrapper"
                    data-full="${produto.descricao}">
                    <p>${produto.descricao}</p>
                </div>

                <button class="buy-button"
                    onclick="window.location.href='individual.html?id=${produto.id}'">
                    Ver Produto
                </button>
            </div>
        </div>
    `;
};