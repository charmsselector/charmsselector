const productos = [
    {
        nombre: "Charm de letra A-Z de plata 925",
        categorias: ["letras", "plata"],
        descripcion: "Charm de letra A-Z fabricado en plata de ley 925, compatible con pulseras de sistema europeo.",
        precio: "Desde 12,20 €",
        imagen: "img/charm-letra-mariposa.jpg",
        enlace: "https://www.amazon.es/dp/B0B9SZ9R3D"
    },
    {
        nombre: "Charm para mamá",
        categorias: ["regalos"],
        descripcion: "Un detalle especial para llevar siempre contigo un recuerdo de mamá.",
        precio: "Desde 12,99 €",
        imagen: "img/categoria-mama.png",
        enlace: "#"
    },
    {
        nombre: "Charm para pareja",
        categorias: ["regalos"],
        descripcion: "Un detalle especial para llevar contigo un recuerdo con tu pareja.",
        precio: "Desde 12,99 €",
        imagen: "img/categoria-pareja.png",
        enlace: "#"
    },
    {
        nombre: "Charm de animal",
        categorias: ["animales"],
        descripcion: "Un detalle especial para llevar contigo el recuerdo de tu animal favorito.",
        precio: "Desde 10,99 €",
        imagen: "img/categoria-animales.png",
        enlace: "#"
    },
    {
    nombre: "Charm de plata 925",
    categorias: ["plata"],
    descripcion: "Charm de plata 925 con diseños elegantes para personalizar tu pulsera.",
    precio: "Desde 14,99 €",
    imagen: "img/categoria-plata.png",
    enlace: "#"
},
{
    nombre: "Charm de corazón",
    categorias: ["corazones"],
    descripcion: "Charm con forma de corazón, perfecto para expresar cariño y crear una pulsera especial.",
    precio: "Desde 11,99 €",
    imagen: "img/categoria-pareja.png",
    enlace: "#"
}
];

const listaProductos = document.getElementById("lista-productos");

productos.forEach(function(producto) {
    listaProductos.innerHTML += `
    <article class="producto" data-categorias="${producto.categorias.join(" ")}">

        <img src="${producto.imagen}" alt="${producto.nombre}">

        <div class="producto-info">

            <h3>${producto.nombre}</h3>

            <div class="etiquetas">
                ${producto.categorias.map(function(categoria) {
                    return `<span>${categoria}</span>`;
                }).join("")}
            </div>

            <p>${producto.descripcion}</p>

            <p class="precio">${producto.precio}</p>

            ${producto.enlace !== "#" 
    ? `<a href="${producto.enlace}" class="boton-producto" target="_blank" rel="noopener noreferrer">Ver en Amazon</a>`
    : ""
}

        </div>

    </article>
`;
});

const botonesFiltro = document.querySelectorAll(".botones-filtro button");

botonesFiltro.forEach(function(boton) {
    boton.addEventListener("click", function() {

        botonesFiltro.forEach(function(botonFiltro) {
            botonFiltro.classList.remove("activo");
        });

        boton.classList.add("activo");

        const productosPagina = document.querySelectorAll("#lista-productos .producto");

        productosPagina.forEach(function(producto) {

            if (
                boton.dataset.filtro === "todos" ||
                producto.dataset.categorias.includes(boton.dataset.filtro)
            ) {
                producto.style.display = "";
            } else {
                producto.style.display = "none";
            }

        });

    });
});