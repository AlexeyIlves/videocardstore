// =========================
// DOM
// =========================

const productsGrid =
  document.getElementById('productsGrid');

const cartCount =
  document.getElementById('cartCount');

const searchInput =
  document.getElementById('q');

// =========================
// HELPERS
// =========================

function formatPrice(price){

  return '$' + new Intl.NumberFormat('en-US')
    .format(price);
}

// =========================
// CART
// =========================

function loadCart(){

  return JSON.parse(
    localStorage.getItem('cart')
  ) || [];
}

function saveCart(cart){

  localStorage.setItem(
    'cart',
    JSON.stringify(cart)
  );
}

function updateCartCount(){

  const cart = loadCart();

  const total = cart.reduce((sum, item)=>{
    return sum + item.quantity;
  },0);

  cartCount.textContent = total;
}

function addToCart(id){

  const product =
    PRODUCTS.find(p => p.id === id);

  let cart = loadCart();

  const existing =
    cart.find(item => item.id === id);

  if(existing){

    existing.quantity += 1;

  } else {

    cart.push({
      ...product,
      quantity:1
    });
  }

  saveCart(cart);

  updateCartCount();

  showToast('Product added to cart');
}

// =========================
// TOAST
// =========================

function showToast(text){

  const toast =
    document.createElement('div');

  toast.className = 'toast';

  toast.textContent = text;

  document.body.appendChild(toast);

  setTimeout(()=>{
    toast.classList.add('show');
  },10);

  setTimeout(()=>{

    toast.classList.remove('show');

    setTimeout(()=>{
      toast.remove();
    },300);

  },2000);
}

// =========================
// PRODUCTS
// =========================

function renderProducts(products){

  productsGrid.innerHTML = '';

  if(products.length === 0){

    productsGrid.innerHTML = `
      <div class="card">
        <h2>No products found</h2>

        <p class="muted">
          Try changing your search query
        </p>
      </div>
    `;

    return;
  }

  products.forEach(product => {

    const card =
      document.createElement('article');

    card.className = 'card';

    card.innerHTML = `
      <div class="thumb">

        <img
          src="${product.image}"
          alt="${product.title}"
        >

      </div>

      <div class="title">
        ${product.title}
      </div>

      <div class="specs">
        ${product.specs}
      </div>

      <div class="price-row">

        <div class="price">
          ${formatPrice(product.price)}
        </div>

        <div class="
          tag--stock
          ${product.inStock
            ? 'in-stock'
            : 'out-stock'}
        ">
          ${
            product.inStock
            ? 'In Stock'
            : 'Out of Stock'
          }
        </div>

      </div>

      <div
        style="
          display:flex;
          gap:10px;
          margin-top:16px;
        "
      >

        ${
          product.inStock
          ?
          `
          <button
            class="btn btn-primary"
            onclick="addToCart(${product.id})"
          >
            Add to Cart
          </button>
          `
          :
          `
          <button
            class="btn btn-secondary"
            disabled
          >
            Out of Stock
          </button>
          `
        }

        <button
          class="btn btn-secondary"
          onclick="viewDetails(${product.id})"
        >
          Details
        </button>

      </div>
    `;

    productsGrid.appendChild(card);
  });
}

// =========================
// SEARCH
// =========================

function applySearch(){

  const query =
    searchInput.value
      .trim()
      .toLowerCase();

  if(!query){

    renderProducts(PRODUCTS);

    return;
  }

  const filtered =
    PRODUCTS.filter(product => {

      const searchable =
        `
          ${product.title}
          ${product.specs}
          ${product.brand}
        `
        .toLowerCase();

      return searchable.includes(query);
    });

  renderProducts(filtered);
}

// =========================
// NAVIGATION
// =========================

function viewDetails(id){

  window.location.href =
    `product.html?id=${id}`;
}

// =========================
// SUBSCRIBE
// =========================

function subscribe(){

  const input =
    document.getElementById('footEmail');

  const email =
    input.value.trim();

  if(!email){

    showToast('Please enter your email');

    return;
  }

  showToast(
    `Subscribed successfully: ${email}`
  );

  input.value = '';
}

// =========================
// EVENTS
// =========================

searchInput.addEventListener(
  'input',
  applySearch
);

document
  .getElementById('cartBtn')
  .addEventListener('click', ()=>{

    window.location.href = 'cart.html';
  });

window.addEventListener('storage', ()=>{
  updateCartCount();
});

// =========================
// INIT
// =========================

renderProducts(PRODUCTS);

updateCartCount();