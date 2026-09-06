const productos = [
    {
        nombre: "Charm de letra e inicial A-Z",
        categorias: ["letras", "plata"],
        descripcion: "Charm de letra A-Z fabricado en plata de ley 925, compatible con pulseras de sistema europeo.",
        precio: "Desde 12,20 €",
        imagen: "img/charm-letra-mariposa.jpg",
        enlace: "https://www.amazon.es/dp/B0B9SZ9R3D"
    },
    {
        nombre: "Charm para mamá – Family Mom Love Heart",
        categorias: ["mama", "regalos", "plata"],
        descripcion: "Un detalle especial para llevar siempre contigo un recuerdo de mamá.",
        precio: "Desde 16,99 €",
        imagen: "img/charm-mama.jpg",
        enlace: "https://www.amazon.es/Amuefer-Infinito-Pulseras-Circonita-Cumpleaños/dp/B0C4TTMMZP?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&utm_source=chatgpt.com&th=1",
    },
    {
        nombre: "Charm para pareja – Amor",
        categorias: ["pareja", "regalos", "plata"],
        descripcion: "Un detalle especial para llevar contigo un recuerdo con tu pareja.",
        precio: "Desde 15,56 €",
        imagen: "img/charm-pareja.jpg",
        enlace: "https://www.amazon.es/HappyStar-Colgante-Nacimiento-Original-Compatible/dp/B0F9WDSRJ4/",
    },
    {
        nombre: "Charm de animales – Varios diseños",
        categorias: ["animales", "plata", "regalos"],
        descripcion: "Un detalle especial para llevar contigo el recuerdo de tu animal favorito.",
        precio: "Desde 13,99 €",
        imagen: "img/charm-animales.jpg",
        enlace: "https://www.amazon.es/PANPOKI-Abalorio-Charms-plata-Mujer/dp/B0FX4HK8WT/ref=sr_1_10?__mk_es_ES=ÅMÅŽÕÑ&crid=1MPQJEJ02KL4G&dib=eyJ2IjoiMSJ9.ZFrqHN09qI9o1NMxNdu-KXBupaAk4ps389rUoLE7j9xNarpkMPUL-m0W5XTMghC6SrMIhnfD7pSDC9EN4EokKmFsWUyTT0MXCH1x-JPgFsSOaXIvJA8Eb6NEybYcZ13Pwno0TlE1EYq3GT-aFkdKkdRnVrlQKtVbKvrPLVqengDzZ6fABiLld1UzAoGmUVD05RYbhS_2lPUFlSBpgWh_Qz1kXjdlofXNIuY0OvdbZWDXgcW3XqKT20aa1MwfOKWLCLiOfv8QJhToKNhCgIvAYq-ZV9p1EiTe2hGNhvniHXs.M6ncMbBQmaX1yxwFfLF7YlOawUyiU6p8-ztQKkuF6Jk&dib_tag=se&keywords=charms%2Banimales&qid=1788709888&sprefix=charms%2Banimale%2Caps%2C166&sr=8-10&th=1"
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