// =========================
// DOM
// =========================

const container =
  document.getElementById('productContainer');

const cartCount =
  document.getElementById('cartCount');

// =========================
// URL PARAMS
// =========================

const params =
  new URLSearchParams(window.location.search);

const productId =
  Number(params.get('id'));

// =========================
// FIND PRODUCT
// =========================

const product =
  PRODUCTS.find(p => p.id === productId);

// =========================
// CURRENT IMAGE
// =========================

let currentImage =
  product?.images?.[0]
  || 'images/placeholder.png';

// =========================
// HELPERS
// =========================

function formatPrice(price){

  return '$' + new Intl.NumberFormat('en-US')
    .format(price);
}

function updateCartCount(){

  const cart =
    JSON.parse(localStorage.getItem('cart')) || [];

  const total = cart.reduce((sum, item)=>{
    return sum + item.quantity;
  },0);

  cartCount.textContent = total;
}

// =========================
// GALLERY
// =========================

function changeImage(image){

  currentImage = image;

  renderProduct();
}

// =========================
// CART
// =========================

function goToCart(){
  window.location.href = 'cart.html';
}

function addToCart(){

  let cart =
    JSON.parse(localStorage.getItem('cart')) || [];

  const existing =
    cart.find(item => item.id === product.id);

  if(existing){

    existing.quantity += 1;

  } else {

    cart.push({
      ...product,
      quantity:1
    });
  }

  localStorage.setItem(
    'cart',
    JSON.stringify(cart)
  );

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
// RENDER
// =========================

function renderProduct(){

  // Product not found
  if(!product){

    container.innerHTML = `
      <div class="card">

        <h1>
          Product Not Found
        </h1>

        <p class="muted">
          The link may be outdated
        </p>

      </div>
    `;

    return;
  }

  container.innerHTML = `
    <div class="product">

      <div class="product-gallery">

        <div class="product-image">

          <img
            src="${currentImage}"
            alt="${product.title}"
          >

        </div>

        <div class="gallery-thumbs">

          ${product.images.map(image => `
            <button
              class="
                gallery-thumb
                ${currentImage === image ? 'active' : ''}
              "
              onclick="changeImage('${image}')"
            >

              <img
                src="${image}"
                alt="${product.title}"
              >

            </button>
          `).join('')}

        </div>

      </div>

      <div class="product-info">

        <div class="product-title">
          ${product.title}
        </div>

        <div class="specs">
          ${product.specs}
        </div>

        <div class="product-description">
          ${product.description}
        </div>

        <div class="spec-table">

          <div>Brand</div>
          <div>${product.brand}</div>

          <div>Memory</div>
          <div>${product.memory}</div>

          <div>Boost Clock</div>
          <div>${product.boostClock}</div>

          <div>Power Consumption</div>
          <div>${product.power}</div>

        </div>

        <div class="product-price">
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

        <div style="margin-top:20px">

          ${
            product.inStock
            ?
            `
            <button
              class="btn btn-primary"
              onclick="addToCart()"
            >
              Add to Cart
            </button>
            `
            :
            `
            <button class="btn btn-secondary">
              Notify Me
            </button>
            `
          }

        </div>

      </div>

    </div>
  `;
}

// =========================
// INIT
// =========================

renderProduct();

updateCartCount();