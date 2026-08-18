    // voltar pro topo
    const backToTop = document.querySelector("#backToTop");
    if(backToTop){
    backToTop.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
            top:0,
            behavior:"smooth"
        });
    });
window.addEventListener("scroll", () => {
    if(window.scrollY > 500){
        backToTop.classList.add("show");
    }else{
        backToTop.classList.remove("show");
    }
});
    }

    // menu mobile
const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("header nav");

if(menuToggle && nav){
    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("open");
        nav.classList.toggle("open");
        const aberto = nav.classList.contains("open");
        menuToggle.setAttribute("aria-expanded", aberto);
    });

    // fecha o menu ao clicar num link comum (não nos que abrem submenu)
    document.querySelectorAll(".menu > li > a").forEach(link => {
        link.addEventListener("click", (e) => {
            if(window.innerWidth > 860) return;
            if(link.getAttribute("href") === "#") return;
            nav.classList.remove("open");
            menuToggle.classList.remove("open");
        });
    });

    // no mobile, o link "Contato" (href="#") não leva a lugar nenhum,
    // então o toque nele abre/fecha o submenu em vez de navegar
    document.querySelectorAll(".dropdown > a").forEach(link => {
        link.addEventListener("click", (e) => {
            if(window.innerWidth > 860) return;
            if(link.getAttribute("href") !== "#") return;
            e.preventDefault();
            link.closest(".dropdown").classList.toggle("open");
        });
    });
}

    // animação do reveal
const reveals =
    document.querySelectorAll(".reveal");
const observer =
    new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const element = entry.target;
            const delay = element.dataset.delay || 0;
            if(entry.isIntersecting){
                element.style.transitionDelay = `${delay}ms`;
                element.classList.add("show");
            }else{
                element.style.transitionDelay = "0ms";
                element.classList.remove("show");
            }
        });
    }, {
        threshold:0.15
    });
    reveals.forEach(reveal => {
        observer.observe(reveal);
    }
)

    // animação do revealX
const revealsX =
    document.querySelectorAll(".revealX");
const observerX =
    new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const element = entry.target;
            const delay = element.dataset.delay || 0;
            if(entry.isIntersecting){
                element.style.transitionDelay = `${delay}ms`;
                element.classList.add("show");
            }else{
                element.style.transitionDelay = "0ms";
                element.classList.remove("show");
            }
        });
    }, {
        threshold:0.15
    });
    revealsX.forEach(reveal => {
        observerX.observe(reveal);
    }
)

    // footer
const anoFooter = document.querySelector("#footer-year");
if(anoFooter) anoFooter.textContent = new Date().getFullYear();