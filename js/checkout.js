// =========================
// DOM
// =========================

const checkoutItems =
  document.getElementById(
    'checkoutItems'
  );

const itemsTotal =
  document.getElementById(
    'itemsTotal'
  );

const submitOrderBtn =
  document.getElementById(
    'submitOrderBtn'
  );

const finalTotal =
  document.getElementById(
    'finalTotal'
  );

const checkoutForm =
  document.getElementById(
    'checkoutForm'
  );

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

// =========================
// RENDER ORDER
// =========================

function renderOrder(){

  const cart = loadCart();

  checkoutItems.innerHTML = '';

  let total = 0;

  // Empty cart
  if(cart.length === 0){

    submitOrderBtn.disabled = true;

    checkoutItems.innerHTML = `
      <div class="muted">
        Your cart is empty
      </div>
    `;

    itemsTotal.textContent =
      formatPrice(0);

    finalTotal.textContent =
      formatPrice(0);

    return;
  }

  // Render items
  cart.forEach(item => {

    const itemTotal =
      item.price * item.quantity;

    total += itemTotal;

    const div =
      document.createElement('div');

    div.style.display = 'flex';

    div.style.justifyContent =
      'space-between';

    div.style.gap = '12px';

    div.innerHTML = `
      <div>

        <div style="
          font-weight:700;
        ">
          ${item.title}
        </div>

        <div class="muted">
          Quantity: ${item.quantity}
        </div>

      </div>

      <div style="
        font-weight:700;
        white-space:nowrap;
      ">
        ${formatPrice(itemTotal)}
      </div>
    `;

    checkoutItems.appendChild(div);
  });

  itemsTotal.textContent =
    formatPrice(total);

  finalTotal.textContent =
    formatPrice(total);
}

// =========================
// CHECKOUT
// =========================

if(checkoutForm){

  checkoutForm.addEventListener(
    'submit',
    e => {

      e.preventDefault();

      const cart = loadCart();

      if(cart.length === 0){

        alert('Your cart is empty');

        return;
      }

      localStorage.removeItem('cart');

      document.body.innerHTML = `
  <div class="container">

    <div class="card"
      style="
        max-width:600px;
        margin:80px auto;
        text-align:center;
      "
    >

      <h1>
        Order Confirmed 🎉
      </h1>

      <p class="muted">
        Thank you for shopping at GPU Store
      </p>

      <a
        href="index.html"
        class="btn btn-primary"
        style="margin-top:20px"
      >
        Return to Home Page
      </a>

    </div>

  </div>
`;

      window.location.href = 'index.html';
    }
  );
}

// =========================
// INIT
// =========================

renderOrder();