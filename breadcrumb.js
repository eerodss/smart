function criarBreadcrumb(){
    const breadcrumb = document.querySelector("#breadcrumb");

    if(!breadcrumb) return;

    let html = `
        <a href="./index.html">Início</a>
    `;

    if(document.querySelector(".products-page")){
        html += `
            <span class="separator">></span>
            <span>Catálogo</span>
        `;
    }

    if(window.produtoAtual){
        const produto = window.produtoAtual;
        const categorias = {
            peliculas:"Películas",
            maquinas:"Máquinas",
            acessorios:"Acessórios",
            limpeza:"Limpeza"
        };

        html += `
            <span class="separator">></span>
            <a href="produtos.html">Catálogo</a>

            <span class="separator">></span>
            <a href="produtos.html?categoria=${produto.categoria}">${categorias[produto.categoria]}</a>

            <span class="separator">></span>
            <span>${produto.nome}</span>
        `;
    }

    breadcrumb.innerHTML = html;
}