/* =========================
   MENÚ DESPLEGABLE
   ========================= */

const botonMenu = document.querySelector(".menu-toggle");
const menu = document.querySelector("nav ul");

if (botonMenu && menu) {

    botonMenu.addEventListener("click", function() {
        menu.classList.toggle("menu-abierto");
    });

}