// =========================
// DOM
// =========================

const cartList = document.getElementById('cartList');
const cartTotal = document.getElementById('cartTotal');

// =========================
// HELPERS
// =========================

function formatPrice(price){
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
}

// =========================
// STORAGE
// =========================

function loadCart(){
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart){
  localStorage.setItem('cart', JSON.stringify(cart));
}

// =========================
// RENDER
// =========================

function renderCart(){

  const cart = loadCart();

  cartList.innerHTML = '';

  let total = 0;

  // Empty cart
  if(cart.length === 0){

    cartList.innerHTML = `
      <div class="card">
        <h2>Корзина пуста</h2>
        <p class="muted">
          Добавьте товары из каталога
        </p>
      </div>
    `;

    cartTotal.textContent = 'Итого: 0 ₽';

    return;
  }

  // Render items
  cart.forEach((item, index) => {

    const itemTotal = item.price * item.quantity;

    total += itemTotal;

    const article = document.createElement('article');

    article.className = 'cart-item';

    article.innerHTML = `
      <div class="cart-item-left">

        <img
          class="cart-item-image"
          src="${item.image || 'images/placeholder.png'}"
          alt="${item.title}"
        >

        <div>

          <div class="title">
            ${item.title}
          </div>

          <div class="specs">
            ${item.specs}
          </div>

        </div>

      </div>

      <div class="qty-controls">

        <button
          class="qty-btn"
          onclick="decreaseQuantity(${index})"
        >
          −
        </button>

        <div>
          ${item.quantity}
        </div>

        <button
          class="qty-btn"
          onclick="increaseQuantity(${index})"
        >
          +
        </button>

      </div>

      <div class="price">
        ${formatPrice(itemTotal)}
      </div>

      <button
        class="btn btn-secondary"
        onclick="removeItem(${index})"
      >
        Удалить
      </button>
    `;

    cartList.appendChild(article);
  });

  cartTotal.textContent =
    'Итого: ' + formatPrice(total);
}

// =========================
// CART ACTIONS
// =========================

function increaseQuantity(index){

  const cart = loadCart();

  cart[index].quantity += 1;

  saveCart(cart);

  renderCart();
}

function decreaseQuantity(index){

  const cart = loadCart();

  if(cart[index].quantity > 1){

    cart[index].quantity -= 1;

  } else {

    cart.splice(index, 1);
  }

  saveCart(cart);

  renderCart();
}

function removeItem(index){

  const cart = loadCart();

  cart.splice(index, 1);

  saveCart(cart);

  renderCart();
}

// =========================
// CHECKOUT
// =========================

function checkout(){

  const cart = loadCart();

  if(cart.length === 0){

    alert('Корзина пуста');

    return;
  }

  alert('Заказ успешно оформлен!');

  localStorage.removeItem('cart');

  renderCart();
}

// =========================
// INIT
// =========================

renderCart();