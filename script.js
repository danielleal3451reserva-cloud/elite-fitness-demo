document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector("header");
    const sections = document.querySelectorAll("section[id]");
    const nav = document.querySelector("nav");
    const navLinks = document.querySelectorAll("nav a");
    const mobileMenuButton = document.querySelector(".mobile-menu-button");

    let backToTop;


    // ==========================================
    // HEADER AO ROLAR
    // ==========================================

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }


        // Mostra/esconde botão voltar ao topo
        if (window.scrollY > 500) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    });


    // ==========================================
    // MENU MOBILE
    // ==========================================

    if (mobileMenuButton) {

        mobileMenuButton.addEventListener("click", () => {

            const isOpen = nav.classList.toggle("mobile-open");

            mobileMenuButton.classList.toggle("active", isOpen);

            mobileMenuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            mobileMenuButton.setAttribute(
                "aria-label",
                isOpen ? "Fechar menu" : "Abrir menu"
            );

        });


        // Fecha o menu ao clicar em uma opção
        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                nav.classList.remove("mobile-open");
                mobileMenuButton.classList.remove("active");

                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                mobileMenuButton.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );

            });

        });

    }


    // ==========================================
    // MENU ATIVO CONFORME A SEÇÃO
    // ==========================================

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                navLinks.forEach((link) => {
                    link.classList.remove("active");
                });

                const activeLink = document.querySelector(
                    `nav a[href="#${entry.target.id}"]`
                );

                if (activeLink) {
                    activeLink.classList.add("active");
                }

            }

        });

    }, {
        threshold: 0.35
    });


    sections.forEach((section) => {
        observer.observe(section);
    });


    // ==========================================
    // SCROLL SUAVE
    // ==========================================

    navLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const target = document.querySelector(
                link.getAttribute("href")
            );

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        });

    });


    // ==========================================
    // ANIMAÇÃO SUTIL DAS SEÇÕES
    // ==========================================

    const revealElements = document.querySelectorAll(
        ".section, .cta"
    );

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("reveal-visible");

                revealObserver.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12
    });


    revealElements.forEach((element) => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });


    // ==========================================
    // BOTÃO VOLTAR AO TOPO
    // ==========================================

    backToTop = document.createElement("button");

    backToTop.className = "back-to-top";
    backToTop.setAttribute("aria-label", "Voltar ao topo");
    backToTop.innerHTML = "↑";

    document.body.appendChild(backToTop);


    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});