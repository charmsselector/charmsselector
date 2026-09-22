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

// =========================================================
// TARJETAS DE PRODUCTOS CLICABLES
// =========================================================

document.querySelectorAll('.producto').forEach(producto => {

    const enlaceAmazon = producto.querySelector('.boton-producto');

    if (!enlaceAmazon) return;

    producto.setAttribute('role', 'link');
    producto.setAttribute('tabindex', '0');

    producto.addEventListener('click', function (event) {

        // Si se ha pulsado directamente un enlace,
        // dejamos que funcione de forma normal.
        if (event.target.closest('a')) {
            return;
        }

        window.open(
            enlaceAmazon.href,
            '_blank',
            'noopener,noreferrer'
        );

    });

    producto.addEventListener('keydown', function (event) {

        if (event.key === 'Enter' || event.key === ' ') {

            event.preventDefault();

            window.open(
                enlaceAmazon.href,
                '_blank',
                'noopener,noreferrer'
            );

        }

    });

});

// =========================================================
// BOTÓN DE COMPARTIR EN TARJETAS DE PRODUCTOS
// =========================================================

document.querySelectorAll('.producto').forEach(producto => {

    const enlaceAmazon = producto.querySelector('.boton-producto');
    const titulo = producto.querySelector('h3');
    const imagen = producto.querySelector('img');

    if (!enlaceAmazon || !titulo || !imagen) return;

    // Evitar duplicados
    if (producto.querySelector('.boton-compartir')) return;

    // Crear identificador único a partir del nombre de la imagen
    const nombreImagen = imagen.getAttribute('src')
        .split('/')
        .pop()
        .replace(/\.[^/.]+$/, '');

    const idProducto = 'producto-' + nombreImagen;

    producto.id = idProducto;

    // Crear botón
    const botonCompartir = document.createElement('button');

    botonCompartir.type = 'button';
    botonCompartir.className = 'boton-compartir';
    botonCompartir.setAttribute('aria-label', 'Compartir este producto');
    botonCompartir.setAttribute('title', 'Compartir este producto');

    // Icono de compartir
    botonCompartir.innerHTML = `
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
        >
            <circle cx="18" cy="5" r="2.5"></circle>
            <circle cx="6" cy="12" r="2.5"></circle>
            <circle cx="18" cy="19" r="2.5"></circle>
            <line x1="8.2" y1="10.8" x2="15.8" y2="6.2"></line>
            <line x1="8.2" y1="13.2" x2="15.8" y2="17.8"></line>
        </svg>
    `;

// Crear fila para los botones
const filaBotones = document.createElement('div');
filaBotones.className = 'fila-botones';

// Mover el botón de Amazon a la fila
enlaceAmazon.parentNode.insertBefore(filaBotones, enlaceAmazon);

filaBotones.appendChild(enlaceAmazon);
filaBotones.appendChild(botonCompartir);

    // Compartir
    botonCompartir.addEventListener('click', async function (event) {

        event.preventDefault();
        event.stopPropagation();

        const urlCompartir =
            window.location.origin +
            window.location.pathname +
            '#' +
            idProducto;

        const datosCompartir = {
            title: titulo.textContent.trim(),
            text: 'Mira este charm en Charms Selector',
            url: urlCompartir
        };

        // Móvil / navegadores compatibles con compartir
        if (navigator.share) {

            try {
                await navigator.share(datosCompartir);
                return;
            } catch (error) {

                // Si el usuario cancela el menú de compartir,
                // no hacemos nada.
                if (error.name === 'AbortError') return;
            }
        }

        // Ordenador: copiar enlace
        try {

            await navigator.clipboard.writeText(urlCompartir);

            botonCompartir.classList.add('compartido');

            setTimeout(() => {
                botonCompartir.classList.remove('compartido');
            }, 1800);

        } catch (error) {

            // Alternativa si el navegador no permite clipboard
            window.prompt(
                'Copia este enlace para compartir el producto:',
                urlCompartir
            );

        }

    });

});