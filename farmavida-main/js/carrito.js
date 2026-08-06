/**
 * Gestión del carrito de compras para Farmavida
 * Usa localStorage para persistencia
 */

let carrito = [];

// Cargar carrito al iniciar
document.addEventListener('DOMContentLoaded', () => {
    cargarCarritoDesdeStorage();
    actualizarContadorCarrito();

    if (location.pathname.includes('carrito.html')) {
        mostrarProductosCarrito();
    }
});

// Cargar desde localStorage
function cargarCarritoDesdeStorage() {
    const guardado = localStorage.getItem('carritoFarmavida');
    carrito = guardado ? JSON.parse(guardado) : [];
}

// Guardar en localStorage
function guardarCarritoEnStorage() {
    localStorage.setItem('carritoFarmavida', JSON.stringify(carrito));
}

// Actualizar contador en el ícono del carrito
function actualizarContadorCarrito() {
    const contador = document.querySelector('.cart-count');
    if (!contador) return;

    const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    contador.textContent = total;
    contador.style.display = total > 0 ? 'block' : 'none';
}

// Agregar producto
function agregarAlCarrito(id, nombre, precio, imagen) {
    const index = carrito.findIndex(p => p.id === id);

    if (index !== -1) {
        carrito[index].cantidad += 1;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1, imagen });
    }

    guardarCarritoEnStorage();
    actualizarContadorCarrito();
    mostrarAlerta(`${nombre} agregado al carrito`, 'success');
}

// Eliminar producto
function eliminarDelCarrito(id) {
    const index = carrito.findIndex(p => p.id === id);
    if (index !== -1) {
        const nombre = carrito[index].nombre;
        carrito.splice(index, 1);

        guardarCarritoEnStorage();
        actualizarContadorCarrito();
        if (location.pathname.includes('carrito.html')) mostrarProductosCarrito();
        mostrarAlerta(`${nombre} eliminado del carrito`, 'warning');
    }
}

// Cambiar cantidad
function cambiarCantidad(id, cantidad) {
    const index = carrito.findIndex(p => p.id === id);
    if (index === -1) return;

    if (cantidad <= 0) {
        eliminarDelCarrito(id);
    } else {
        carrito[index].cantidad = cantidad;
        guardarCarritoEnStorage();
        actualizarContadorCarrito();
        if (location.pathname.includes('carrito.html')) mostrarProductosCarrito();
    }
}

// Calcular total
function calcularTotalCarrito() {
    return carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
}

// Mostrar productos en carrito.html
function mostrarProductosCarrito() {
    const contenedor = document.getElementById('contenedor-carrito');
    const total = document.getElementById('total-carrito');
    if (!contenedor) return;

    contenedor.innerHTML = '';

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-shopping-cart fa-4x text-muted mb-3"></i>
                <h3>Tu carrito está vacío</h3>
                <p>¡Agrega productos para comenzar tu compra!</p>
                <a href="productos.html" class="btn btn-success mt-3">Ver productos</a>
            </div>`;
        if (total) total.closest('.card').style.display = 'none';
        return;
    }

    if (total) total.closest('.card').style.display = 'block';

    carrito.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item row align-items-center';
        div.innerHTML = `
            <div class="col-md-2 col-3">
                <img src="${item.imagen}" alt="${item.nombre}" class="img-fluid rounded">
            </div>
            <div class="col-md-4 col-9">
                <h5 class="mb-0">${item.nombre}</h5>
                <p class="text-muted mb-0">${formatearPrecio(item.precio)}</p>
            </div>
            <div class="col-md-3 col-6 mt-2 mt-md-0">
                <div class="input-group">
                    <button class="btn btn-outline-secondary btn-sm" onclick="cambiarCantidad(${item.id}, ${item.cantidad - 1})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <input type="number" class="form-control text-center" value="${item.cantidad}" min="1" onchange="cambiarCantidad(${item.id}, parseInt(this.value))">
                    <button class="btn btn-outline-secondary btn-sm" onclick="cambiarCantidad(${item.id}, ${item.cantidad + 1})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <div class="col-md-2 col-3 text-end mt-2 mt-md-0">
                <span class="fw-bold">${formatearPrecio(item.precio * item.cantidad)}</span>
            </div>
            <div class="col-md-1 col-3 text-end mt-2 mt-md-0">
                <button class="btn btn-sm text-danger" onclick="eliminarDelCarrito(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>`;
        contenedor.appendChild(div);
    });

    if (total) total.textContent = formatearPrecio(calcularTotalCarrito());
}

// Vaciar carrito
function vaciarCarrito() {
    if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
        carrito = [];
        guardarCarritoEnStorage();
        actualizarContadorCarrito();
        if (location.pathname.includes('carrito.html')) mostrarProductosCarrito();
        mostrarAlerta('Carrito vaciado correctamente', 'info');
    }
}

// Finalizar compra
function finalizarCompra() {
    if (carrito.length === 0) {
        mostrarAlerta('No hay productos en el carrito', 'warning');
        return;
    }

    mostrarAlerta('¡Compra realizada con éxito! Gracias por tu pedido.', 'success', 5000);
    carrito = [];
    guardarCarritoEnStorage();
    actualizarContadorCarrito();
    if (location.pathname.includes('carrito.html')) {
        mostrarProductosCarrito();
        setTimeout(() => location.href = 'index.html', 3000);
    }
}

// Formatear precio a moneda local
function formatearPrecio(valor) {
    return `$${valor.toFixed(2)}`;
}

// Mostrar alerta (necesitas definir el estilo o librería que uses para mostrar mensajes)
function mostrarAlerta(mensaje, tipo = 'info', tiempo = 3000) {
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} position-fixed top-0 end-0 m-3 shadow`;
    alerta.style.zIndex = '9999';
    alerta.innerHTML = mensaje;
    document.body.appendChild(alerta);

    setTimeout(() => alerta.remove(), tiempo);
}
