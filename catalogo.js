document.addEventListener("DOMContentLoaded", () => {
    // parte que cria os cards
    const grid = document.querySelector(".products-grid");
    if (!grid) return;
    produtos.forEach(produto => {
        grid.innerHTML += criarCardProduto(produto);
    });

    const breadcrumb = document.querySelector("#breadcrumb");
if (breadcrumb) {
    breadcrumb.innerHTML = `
        <a href="index.html">Início</a>
        <span>›</span>
        <span>Catálogo</span>
    `;
}

        // pesquisa de produtos/categorias
const categoryButtons =
    document.querySelectorAll(".category");

function filtrarProdutos(filter){

const cards =
    document.querySelectorAll(".product-card");

    categoryButtons.forEach(btn => {
        btn.classList.remove("active");
    if(btn.dataset.filter === filter){
        btn.classList.add("active"); }
    });
cards.forEach(card => {
    if( filter === "all" ||
        card.dataset.category === filter ){
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
} 

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
const filter =
    button.dataset.filter;
    filtrarProdutos(filter);
    });
});

const searchInput =
    document.querySelector("#search-products");
    if(searchInput){
        
    searchInput.addEventListener("input", () => {
const termo =
    searchInput.value.toLowerCase();
const cards =
    document.querySelectorAll(".product-card");
    cards.forEach(card => {
const nome =
    card.querySelector("h3")
    .textContent
    .toLowerCase();

    if(nome.includes(termo)){
        card.style.display = "";
    }else{
        card.style.display = "none";
        }
    });

});
};

const params = new URLSearchParams(window.location.search);
const categoria = params.get("categoria");

if (categoria) {
    filtrarProdutos(categoria);

    document.querySelector("#produtos").scrollIntoView({
        behavior: "smooth"
    });
}

});