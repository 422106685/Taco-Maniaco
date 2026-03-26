// 1. Base de datos simulada de productos
const products = [
    // Nota: Las rutas apuntan a la carpeta 'imagenes' que creaste
    { id: 1, name: "Taco de pastor (pieza)", price: 20.00, imagen: "tacos pastor.webp",descripcion: "Delicioso Taco al pastor acompañado de su respectiva piña asada."},
    { id: 2, name: "Kilo pastor", price: 350.00, imagen: "kilo pastor.jpg",descripcion: "Deliciosa carne al pastor acompañado de su respectiva piña asada."},
    { id: 3, name: "Taco de arrachera (pieza)", price: 30.00, imagen: "arrachera.jpg",descripcion: "Jugoso taco de arrachera."},
    { id: 4, name: "Kilo arrachera", price: 400.00, imagen: "arrachera kilo.png", descripcion: "Deliciosa carne de arrachera marinada y acompañada de especias, cocida a la braza."},
    { id: 5, name: "Tacos de bistec (pieza)", price: 20.00, imagen: "bistec tacos.webp", descripcion: "Delicioso taco de bistec acompañado de aguacate."},
    { id: 6, name: "Kilo bistec", price: 300.00, imagen: "kilo bistec.webp", descripcion: "Deliciosa carne de bistec a la parrilla, contiene cacompañamientos sorpresa."}

];

// 2. Estado del carrito
let cart = [];

// 3. Función para renderizar el catálogo de productos

function renderCatalog() {
    const catalogContainer = document.getElementById('catalog');
    if (!catalogContainer) return;
    catalogContainer.innerHTML = ''; 

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image-container">
                <img src="${product.imagen}" alt="${product.name}" class="product-image">
                <span class="product-tooltip">${product.descripcion}</span>
            </div>
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="btn-add" onclick="addToCart(${product.id})">Agregar al Carrito</button>
        `;
        catalogContainer.appendChild(card);
    });
}

// 4. Función para agregar productos al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
}

// 5. Función para eliminar productos del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// 6. Función para actualizar la interfaz del carrito y el total
function updateCartUI() {
    const cartContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    
    cartContainer.innerHTML = ''; 
    let subtotal = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
        totalElement.innerHTML = `<span>Total:</span> <span>$0.00</span>`;
    } else {
        cart.forEach(item => {
            const itemSubtotal = item.price * item.quantity;
            subtotal += itemSubtotal;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div>
                    <strong>${item.name}</strong> x${item.quantity}<br>
                    <small>$${item.price.toFixed(2)} c/u</small>
                </div>
                <div>
                    <span style="margin-right: 15px; font-weight: bold;">$${itemSubtotal.toFixed(2)}</span>
                    <button class="btn-remove" onclick="removeFromCart(${item.id})">X</button>
                </div>
            `;
            cartContainer.appendChild(cartItem);
        });

        // CÁLCULOS DE IMPUESTOS
        const iva = subtotal * 0.16; // 16% de IVA
        const totalFinal = subtotal + iva;

        // Actualizamos el contenedor del total con el desglose
        totalElement.innerHTML = `
            <div style="font-size: 0.8em; color: #666; width: 100%;">
                <div style="display: flex; justify-content: space-between;">
                    <span>Subtotal:</span> <span>$${subtotal.toFixed(2)}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span>IVA (16%):</span> <span>$${iva.toFixed(2)}</span>
                </div>
            </div>
            <div style="display: flex; justify-content: space-between; width: 100%; border-top: 1px solid #333; margin-top: 5px; padding-top: 5px;">
                <span>TOTAL:</span> <span>$${totalFinal.toFixed(2)}</span>
            </div>
        `;
    }
}

// Inicializar la aplicación al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    renderCatalog();
    updateCartUI();
});




