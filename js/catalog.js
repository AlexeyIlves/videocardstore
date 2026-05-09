// =========================
// DOM
// =========================

const productsContainer =
  document.getElementById('catalogProducts');

const filtersForm =
  document.getElementById('filtersForm');

const brandSelect =
  document.getElementById('brand');

const memorySelect =
  document.getElementById('memory');

const sortSelect =
  document.getElementById('sort');

const cartCount =
  document.getElementById('cartCount');

// =========================
// HELPERS
// =========================

function formatPrice(price){

  return new Intl.NumberFormat('ru-RU')
    .format(price) + ' ₽';
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

  if(!cartCount) return;

  const cart = loadCart();

  const total = cart.reduce((sum,item)=>{
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

  showToast('Товар добавлен');
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
// RENDER
// =========================

function renderProducts(products){

  productsContainer.innerHTML = '';

  // Empty state
  if(products.length === 0){

    productsContainer.innerHTML = `
      <div class="card">

        <h2>
          Товары не найдены
        </h2>

        <p class="muted">
          Попробуйте изменить фильтры
        </p>

      </div>
    `;

    return;
  }

  // Products
  products.forEach(product => {

    const article =
      document.createElement('article');

    article.className = 'card';

    article.innerHTML = `
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
            ? 'В наличии'
            : 'Нет в наличии'
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
            В корзину
          </button>
          `
          :
          `
          <button
            class="btn btn-secondary"
            disabled
          >
            Нет в наличии
          </button>
          `
        }

        <button
          class="btn btn-secondary"
          onclick="viewProduct(${product.id})"
        >
          Подробнее
        </button>

      </div>
    `;

    productsContainer.appendChild(article);
  });
}

// =========================
// FILTERS
// =========================

function applyFilters(){

  let filtered = [...PRODUCTS];

  // Brand
  const brand =
    brandSelect.value;

  if(brand !== 'all'){

    filtered = filtered.filter(product => {

      return product.brand
        .toLowerCase() === brand;
    });
  }

  // Memory
  const memory =
    memorySelect.value;

  if(memory !== 'all'){

    filtered = filtered.filter(product => {

      return product.memory
        .toLowerCase()
        .includes(memory.replace('gb',''));
    });
  }

  // Sort
  const sort =
    sortSelect.value;

  if(sort === 'price-asc'){

    filtered.sort((a,b)=>{
      return a.price - b.price;
    });
  }

  if(sort === 'price-desc'){

    filtered.sort((a,b)=>{
      return b.price - a.price;
    });
  }

  renderProducts(filtered);
}

// =========================
// NAVIGATION
// =========================

function viewProduct(id){

  window.location.href =
    `product.html?id=${id}`;
}

// =========================
// EVENTS
// =========================

filtersForm.addEventListener(
  'submit',
  e => {

    e.preventDefault();

    applyFilters();
  }
);

if(document.getElementById('cartBtn')){

  document
    .getElementById('cartBtn')
    .addEventListener('click',()=>{

      window.location.href =
        'cart.html';
    });
}

// =========================
// INIT
// =========================

renderProducts(PRODUCTS);

updateCartCount();