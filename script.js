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

/* =========================
   IMAGEN DE PRODUCTO NO DISPONIBLE
   ========================= */

function mostrarImagenNoDisponible(imagen) {

    const tarjeta = imagen.closest(".producto");

    if (!tarjeta) {
        return;
    }

    const enlaceProducto = tarjeta.querySelector(".boton-producto");

    if (!enlaceProducto) {
        return;
    }

    if (tarjeta.querySelector(".imagen-no-disponible")) {
        return;
    }

    imagen.style.display = "none";

    const aviso = document.createElement("div");

    aviso.className = "imagen-no-disponible";

    aviso.innerHTML = `
        <div class="icono-amazon">🛒</div>
        <p>Imagen no disponible</p>
        <span>Entra en el producto para ver la imagen</span>
    `;

    aviso.addEventListener("click", function() {
        enlaceProducto.click();
    });

    imagen.parentElement.insertBefore(aviso, tarjeta.querySelector(".producto-info"));
}


/* Detectar imágenes que fallen después */

document.querySelectorAll(".producto img").forEach(function(imagen) {

    imagen.addEventListener("error", function() {
        mostrarImagenNoDisponible(imagen);
    });

    /* Detectar imágenes que ya hayan fallado antes */

    if (imagen.complete && imagen.naturalWidth === 0) {
        mostrarImagenNoDisponible(imagen);
    }

});