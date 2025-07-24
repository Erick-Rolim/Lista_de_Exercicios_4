const products = [
  { id: 1, name: 'Eva 01', price: 19999.99, img: 'images/evang.jpeg' },
  { id: 2, name: 'Eva 02', price: 1999.99, img: 'images/evang1.jpeg' },
  { id: 3, name: 'Eva 03', price: 1599.99, img: 'images/evang2.jpeg' }
];

let cart = [];

function renderProducts() {
  const container = document.getElementById('products');
  container.innerHTML = ""; // evita duplicação
  products.forEach(product => {
    const div = document.createElement('div');
    div.classList.add('product');
    div.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>¥ ${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">ADICIONAR</button>
    `;
    container.appendChild(div);
  });
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function clearCart() {
  cart = [];
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartCount = document.getElementById('cart-count');

  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} - ¥ ${item.price.toFixed(2)}
      <button class="remove-btn" onclick="removeFromCart(${index})">Remover</button>
    `;
    cartItems.appendChild(li);
    total += item.price;
  });

  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = cart.length;
}

// Abrir e fechar carrinho
document.getElementById('toggle-cart').addEventListener('click', () => {
  document.getElementById('cart').classList.toggle('open');
});

// Botões extra
document.getElementById('clear-cart').addEventListener('click', () => {
  clearCart();
});

document.getElementById('close-cart').addEventListener('click', () => {
  document.getElementById('cart').classList.remove('open');
});

renderProducts();
