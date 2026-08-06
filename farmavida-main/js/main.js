/**
 * Archivo principal de JavaScript para Farmavida
 * Contiene funcionalidades generales del sitio
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tooltips de Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Actualizar contador del carrito al cargar la página
    actualizarContadorCarrito();

    // Añadir clase active al enlace de navegación actual
    marcarEnlaceActivo();
});

/**
 * Marca como activo el enlace de navegación correspondiente a la página actual
 */
function marcarEnlaceActivo() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
}

/**
 * Muestra un mensaje de alerta personalizado
 * @param {string} mensaje - El mensaje a mostrar
 * @param {string} tipo - El tipo de alerta (success, danger, warning, info)
 * @param {number} duracion - Duración en milisegundos
 */
function mostrarAlerta(mensaje, tipo = 'success', duracion = 3000) {
    // Crear elemento de alerta
    const alertaDiv = document.createElement('div');
    alertaDiv.className = `alert alert-${tipo} alert-dismissible fade show position-fixed`;
    alertaDiv.style.top = '70px';
    alertaDiv.style.right = '20px';
    alertaDiv.style.zIndex = '9999';
    alertaDiv.style.maxWidth = '300px';
    
    // Contenido de la alerta
    alertaDiv.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Añadir al DOM
    document.body.appendChild(alertaDiv);
    
    // Eliminar después de la duración especificada
    setTimeout(() => {
        alertaDiv.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(alertaDiv);
        }, 300);
    }, duracion);
}

/**
 * Formatea un número como precio en formato de moneda
 * @param {number} precio - El precio a formatear
 * @returns {string} - El precio formateado
 */
function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2
    }).format(precio);
}