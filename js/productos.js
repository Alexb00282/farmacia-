/**
 * Archivo JavaScript para la gestión de productos
 * Implementa funcionalidades para mostrar, filtrar y buscar productos
 */

// Array con la información de los productos
const productos = [
    {
        id: 1,
        nombre: "Paracetamol 500mg",
        descripcion: "Analgésico y antipirético para aliviar el dolor y reducir la fiebre.",
        precio: 5.99,
        categoria: "medicamentos",
        imagen: "img/Paracetamol 500mg.jpeg"
    },
    {
        id: 2,
        nombre: "Ibuprofeno 400mg",
        descripcion: "Antiinflamatorio no esteroideo (AINE) para dolor e inflamación.",
        precio: 6.50,
        categoria: "medicamentos",
        imagen: "img/Ibuprofeno 400mg.jpg"
    },
    {
        id: 3,
        nombre: "Vitamina C 1000mg",
        descripcion: "Suplemento de vitamina C para reforzar el sistema inmunológico.",
        precio: 12.75,
        categoria: "suplementos",
        imagen: "img/Vitamina C 1000mg.jpg"
    },
    {
        id: 4,
        nombre: "Omega 3",
        descripcion: "Ácidos grasos esenciales para la salud cardiovascular.",
        precio: 15.99,
        categoria: "suplementos",
        imagen: "img/Omega 3.jpg"
    },
    {
        id: 5,
        nombre: "Crema Hidratante Facial",
        descripcion: "Hidratación profunda para todo tipo de piel.",
        precio: 9.95,
        categoria: "cuidado-personal",
        imagen: "img/Crema Hidratante Facial.jpg"
    },
    {
        id: 6,
        nombre: "Protector Solar SPF 50",
        descripcion: "Protección avanzada contra rayos UVA/UVB.",
        precio: 18.50,
        categoria: "dermocosmetica",
        imagen: "img/Protector Solar SPF 50.jpg"
    },
    {
        id: 7,
        nombre: "Champú Anticaspa",
        descripcion: "Elimina la caspa y calma el cuero cabelludo.",
        precio: 7.25,
        categoria: "cuidado-personal",
        imagen: "img/Champú Anticaspa.jpg"
    },
    {
        id: 8,
        nombre: "Pañales Talla 3 (Pack 50)",
        descripcion: "Pañales ultra absorbentes para bebés de 6-10 kg.",
        precio: 22.99,
        categoria: "bebes",
        imagen: "img/Pañales Talla 3 (Pack 50).jpg"
    },
    {
        id: 9,
        nombre: "Leche Infantil Etapa 2",
        descripcion: "Fórmula nutritiva para bebés de 6-12 meses.",
        precio: 24.50,
        categoria: "bebes",
        imagen: "img/Leche Infantil Etapa 2.jpg"
    },
    {
        id: 10,
        nombre: "Crema Antiarrugas",
        descripcion: "Tratamiento intensivo contra signos de envejecimiento.",
        precio: 29.99,
        categoria: "dermocosmetica",
        imagen: "img/Crema Antiarrugas.jpg"
    },
    {
        id: 11,
        nombre: "Termómetro Digital",
        descripcion: "Medición precisa de temperatura corporal.",
        precio: 8.75,
        categoria: "cuidado-personal",
        imagen: "img/Termómetro Digital.jpg"
    },
    {
        id: 12,
        nombre: "Multivitamínico Diario",
        descripcion: "Complejo vitamínico para adultos.",
        precio: 14.50,
        categoria: "suplementos",
        imagen: "img/Multivitamínico Diario.jpeg"
    }
];

// Cargar productos al iniciar la página
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('productos.html')) {
        mostrarProductos(productos);
        configurarEventos();
    }
});

function configurarEventos() {
    const botonBuscar = document.getElementById('boton-buscar');
    if (botonBuscar) {
        botonBuscar.addEventListener('click', realizarBusqueda);
    }

    const campoBusqueda = document.getElementById('busqueda');
    if (campoBusqueda) {
        campoBusqueda.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                realizarBusqueda();
            }
        });
    }

    const filtroCategoria = document.getElementById('filtro-categoria');
    if (filtroCategoria) {
        filtroCategoria.addEventListener('change', function() {
            filtrarPorCategoria(this.value);
        });
    }
}

function realizarBusqueda() {
    const textoBusqueda = document.getElementById('busqueda').value.toLowerCase().trim();
    const categoriaSeleccionada = document.getElementById('filtro-categoria').value;

    if (textoBusqueda === '') {
        filtrarPorCategoria(categoriaSeleccionada);
        return;
    }

    let productosFiltrados = productos.filter(producto => {
        const coincideTexto = producto.nombre.toLowerCase().includes(textoBusqueda) ||
                              producto.descripcion.toLowerCase().includes(textoBusqueda);

        if (categoriaSeleccionada === 'todos') {
            return coincideTexto;
        } else {
            return coincideTexto && producto.categoria === categoriaSeleccionada;
        }
    });

    mostrarProductos(productosFiltrados);

    if (productosFiltrados.length === 0) {
        document.getElementById('contenedor-productos').innerHTML = 
            '<div class="col-12 text-center"><p>No se encontraron productos que coincidan con tu búsqueda.</p></div>';
    }
}

function filtrarPorCategoria(categoria) {
    if (categoria === 'todos') {
        mostrarProductos(productos);
    } else {
        const productosFiltrados = productos.filter(producto => producto.categoria === categoria);
        mostrarProductos(productosFiltrados);
    }
}

function mostrarProductos(productosAMostrar) {
    const contenedor = document.getElementById('contenedor-productos');
    if (!contenedor) return;

    contenedor.innerHTML = '';

    productosAMostrar.forEach(producto => {
        const productoHTML = crearHTMLProducto(producto);
        contenedor.innerHTML += productoHTML;
    });

    configurarBotonesAgregarCarrito();
}

function crearHTMLProducto(producto) {
    // Usar la imagen del producto si está definida, de lo contrario usar la imagen por defecto
    const imagenProducto = producto.imagen || "img/producto-default.jpg";

    return `
    <div class="col-md-4 col-lg-3 mb-4">
        <div class="card h-100">
            <img src="${imagenProducto}" class="card-img-top" alt="${producto.nombre}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">${producto.descripcion}</p>
                <div class="mt-auto">
                    <p class="precio">${formatearPrecio(producto.precio)}</p>
                    <button class="btn btn-success w-100 agregar-carrito" data-id="${producto.id}" data-nombre="${producto.nombre}" data-precio="${producto.precio}">
                        <i class="fas fa-cart-plus me-2"></i>Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
}

function configurarBotonesAgregarCarrito() {
    const botonesAgregar = document.querySelectorAll('.agregar-carrito');

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            const nombre = this.dataset.nombre;
            const precio = parseFloat(this.dataset.precio);
            const imagen = "img/producto-default.jpg"; // Se usa imagen por defecto

            agregarAlCarrito(id, nombre, precio, imagen);
        });
    });
}

function formatearPrecio(precio) {
    return `$${precio.toFixed(2)}`;
}
