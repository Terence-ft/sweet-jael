/* Sweet Jael shop behaviour.
   This file does four jobs:
   1. Draws the product cards.
   2. Filters them by category.
   3. Keeps the shopping cart up to date.
   4. Checks the order form and shows a summary.

   To add a product, copy one object in PRODUCTS and change the details.
   category must match a data-filter value in index.html. */

const PRODUCTS = [
  { id: "confetti", name: "Confetti Celebration Cake", category: "cakes", categoryName: "Cakes", price: 18500, image: "images/cake-velvet.jpg", description: "Layers of vanilla sponge, cream, and a coat of sprinkles for a full table." },
  { id: "choc-cake", name: "Chocolate Fudge Cake", category: "cakes", categoryName: "Cakes", price: 17500, image: "images/cake-chocolate.jpg", description: "Dark sponge, chocolate drip, and swirls of frosting on a six-inch cake." },
  { id: "berry", name: "Berry Cream Cake", category: "cakes", categoryName: "Cakes", price: 19000, image: "images/cake-berry.jpg", description: "Vanilla cream, ripe raspberry, and a sponge that stays light." },

  { id: "cup-velvet", name: "Red Velvet Cupcake", category: "cupcakes", categoryName: "Cupcakes", price: 2000, image: "images/cupcake-vanilla.jpg", description: "Red crumb, cream-cheese frosting, and a little cake crumble on top." },
  { id: "cup-choc", name: "Chocolate Cupcake", category: "cupcakes", categoryName: "Cupcakes", price: 1800, image: "images/cupcake-chocolate.jpg", description: "Chocolate cake and a tall swirl of chocolate frosting." },
  { id: "cup-berry", name: "Strawberry Cupcake", category: "cupcakes", categoryName: "Cupcakes", price: 2000, image: "images/cupcake-strawberry.jpg", description: "Pink frosting, a fresh strawberry, and a ribbon of white chocolate." },

  { id: "donut-sprinkle", name: "Sprinkle Doughnut", category: "doughnuts", categoryName: "Doughnuts", price: 1500, image: "images/doughnut-glazed.jpg", description: "A fried ring with chocolate icing and a handful of sprinkles." },
  { id: "donut-choc", name: "Chocolate Drizzle Doughnut", category: "doughnuts", categoryName: "Doughnuts", price: 1600, image: "images/doughnut-chocolate.jpg", description: "Glazed doughnut finished with a dark chocolate drizzle." },

  { id: "meat-classic", name: "Classic Meat Pie", category: "meat-pies", categoryName: "Meat Pies", price: 1800, image: "images/meat-real.jpg", description: "Peppered beef in a golden crust, the kind a Port Harcourt lunch runs on." },
  { id: "meat-pepper", name: "Peppered Meat Pie", category: "meat-pies", categoryName: "Meat Pies", price: 2000, image: "images/meat-real.jpg", description: "The same shortcrust, with extra Scotch bonnet in the filling." },

  { id: "chicken", name: "Chicken Pie", category: "chicken-pies", categoryName: "Chicken Pies", price: 4500, image: "images/chicken-pie-2.jpg", description: "Shredded chicken, carrot, and peas under a flaky lid. Serves four." },
  { id: "chicken-family", name: "Family Chicken Pie", category: "chicken-pies", categoryName: "Chicken Pies", price: 8500, image: "images/chicken-pie-2.jpg", description: "A larger pie for Sunday lunch. Same filling, more to share." },

  { id: "sausage", name: "Sausage Roll", category: "sausage-rolls", categoryName: "Sausage Rolls", price: 1700, image: "images/sausage-roll-2.jpg", description: "A seasoned sausage wrapped in soft pastry and baked until golden." },
  { id: "sausage-cheese", name: "Cheese Sausage Roll", category: "sausage-rolls", categoryName: "Sausage Rolls", price: 2000, image: "images/sausage-roll-2.jpg", description: "The bakery sausage roll with a strip of melted cheese." },

  { id: "chin", name: "Classic Chin Chin", category: "chin-chin", categoryName: "Chin Chin", price: 2200, image: "images/chin-real.jpg", description: "Crunchy squares, fried this morning and sold by the pouch." },
  { id: "chin-pepper", name: "Peppered Chin Chin", category: "chin-chin", categoryName: "Chin Chin", price: 2500, image: "images/chin-real.jpg", description: "The same crunch, with a little pepper if you want heat in the tin." },

  { id: "cookie-chip", name: "Choc Chip Cookie", category: "cookies", categoryName: "Cookies", price: 800, image: "images/cookie-chip.jpg", description: "A thick cookie with pockets of dark chocolate." },
  { id: "cookie-butter", name: "Cookie Bowl", category: "cookies", categoryName: "Cookies", price: 4500, image: "images/cookie-butter.jpg", description: "A paper-lined bowl of chocolate chip cookies, enough to pass around." },

  { id: "juice-orange", name: "Orange Juice", category: "fruit-juices", categoryName: "Fruit Juices", price: 1800, image: "images/juice-orange.jpg", description: "Pressed orange, chilled, with no syrup." },
  { id: "juice-mango", name: "Mango Cooler", category: "fruit-juices", categoryName: "Fruit Juices", price: 2000, image: "images/juice-pineapple.jpg", description: "Ripe mango, lime, and ice. Bright and not too sweet." },

  { id: "shake-berry", name: "Strawberry Milkshake", category: "milkshakes", categoryName: "Milkshakes", price: 3200, image: "images/shake-strawberry.jpg", description: "Strawberry, cold milk, and a scoop that holds the straw up." },
  { id: "shake-cookie", name: "Cookies and Cream Milkshake", category: "milkshakes", categoryName: "Milkshakes", price: 3500, image: "images/shake-chocolate.jpg", description: "Vanilla ice cream, chocolate cookies, and a messy finish." },

  { id: "smooth-tropical", name: "Tropical Smoothie", category: "smoothies", categoryName: "Smoothies", price: 3500, image: "images/smoothie-berry.jpg", description: "Banana, apple, and pineapple blended thick and cold." },
  { id: "smooth-mango", name: "Mango Smoothie", category: "smoothies", categoryName: "Smoothies", price: 3400, image: "images/smoothie-mango.jpg", description: "Mango and yoghurt, blended until it coats the spoon." }
];

const STORAGE_KEY = "sweetjael.shop.cart";
let cart = [];
let currentFilter = "all";
let toastTimer = 0;

const grid = document.getElementById("product-grid");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const summaryLines = document.getElementById("summary-lines");
const summaryTotal = document.getElementById("summary-total");
const cartOverlay = document.getElementById("cart-overlay");
const cartPanel = document.querySelector(".cart-panel");
const toast = document.getElementById("toast");

function money(amount) {
  return "₦" + amount.toLocaleString("en-NG");
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function findProduct(id) {
  return PRODUCTS.find((product) => product.id === id);
}

function cartQuantity() {
  return cart.reduce((sum, line) => sum + line.qty, 0);
}

function cartAmount() {
  return cart.reduce((sum, line) => {
    const product = findProduct(line.id);
    return sum + (product ? product.price * line.qty : 0);
  }, 0);
}

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(saved)) return;
    cart = saved.filter((line) => findProduct(line.id) && line.qty > 0).map((line) => ({
      id: line.id,
      qty: Math.min(20, Math.round(Number(line.qty)))
    }));
  } catch (error) {
    cart = [];
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* Build the product cards for the selected category. */
function renderProducts() {
  const list = currentFilter === "all"
    ? PRODUCTS
    : PRODUCTS.filter((product) => product.category === currentFilter);

  if (!list.length) {
    grid.innerHTML = "<p>Nothing in this category yet.</p>";
    return;
  }

  grid.innerHTML = list.map((product) => `
    <article class="card">
      <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}">
      <div class="card-body">
        <p class="cat-label">${escapeHtml(product.categoryName)}</p>
        <h3>${escapeHtml(product.name)}</h3>
        <p>${escapeHtml(product.description)}</p>
        <p class="price">${money(product.price)}</p>
        <button class="btn btn-pink" type="button" data-add="${product.id}">Add to Cart</button>
      </div>
    </article>
  `).join("");
}

/* Draw the cart drawer and the order summary from the same list. */
function renderCart() {
  const count = cartQuantity();
  cartCount.textContent = String(count);
  document.getElementById("open-cart").setAttribute(
    "aria-label",
    count === 1 ? "Open shopping cart, 1 item" : "Open shopping cart, " + count + " items"
  );

  if (!cart.length) {
    cartItems.innerHTML = "<p>Your cart is empty. The cakes will wait.</p>";
    summaryLines.innerHTML = "<p>Your cart is empty. Explore the menu and add a few treats.</p>";
  } else {
    cartItems.innerHTML = cart.map((line) => {
      const product = findProduct(line.id);
      return `
        <div class="cart-row">
          <img src="${escapeHtml(product.image)}" alt="">
          <div>
            <strong>${escapeHtml(product.name)}</strong>
            <p>${money(product.price)}</p>
            <div class="qty">
              <button type="button" data-change="-1" data-id="${product.id}" aria-label="Decrease ${escapeHtml(product.name)}">−</button>
              <span>${line.qty}</span>
              <button type="button" data-change="1" data-id="${product.id}" aria-label="Increase ${escapeHtml(product.name)}">+</button>
              <button type="button" class="text-btn" data-remove="${product.id}">Remove</button>
            </div>
          </div>
        </div>`;
    }).join("");

    summaryLines.innerHTML = cart.map((line) => {
      const product = findProduct(line.id);
      return `<div class="line"><span>${line.qty} × ${escapeHtml(product.name)}</span><span>${money(product.price * line.qty)}</span></div>`;
    }).join("") + `<div class="line"><span>Items</span><span>${count}</span></div>`;
  }

  const total = money(cartAmount());
  cartTotal.textContent = total;
  summaryTotal.textContent = total;
  saveCart();
}

function addToCart(id) {
  const product = findProduct(id);
  if (!product) return;
  const line = cart.find((item) => item.id === id);
  if (line) {
    if (line.qty >= 20) {
      showToast("Twenty is the most of one item.");
      return;
    }
    line.qty += 1;
  } else {
    cart.push({ id: id, qty: 1 });
  }
  renderCart();
  showToast(product.name + " added to cart");
}

function changeQty(id, delta) {
  const line = cart.find((item) => item.id === id);
  if (!line) return;
  const next = line.qty + delta;
  if (next < 1 || next > 20) return;
  line.qty = next;
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  renderCart();
}

function openCart() {
  cartOverlay.hidden = false;
  document.body.style.overflow = "hidden";
  cartPanel.focus();
}

function closeCart() {
  cartOverlay.hidden = true;
  document.body.style.overflow = "";
  document.getElementById("open-cart").focus();
}

function setFieldError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (message) {
    input.setAttribute("aria-invalid", "true");
    error.hidden = false;
    error.textContent = message;
    return false;
  }
  input.removeAttribute("aria-invalid");
  error.hidden = true;
  error.textContent = "";
  return true;
}

function validateOrder() {
  const name = document.getElementById("full-name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const payment = document.getElementById("payment").value;
  const digits = phone.replace(/\D/g, "");
  let firstBad = null;

  const checks = [
    ["full-name", "error-name", name.length >= 2 ? "" : "Please enter your full name."],
    ["phone", "error-phone", digits.length >= 10 && digits.length <= 14 ? "" : "Please enter a phone number we can call."],
    ["address", "error-address", address.length >= 8 ? "" : "Please enter the delivery address."],
    ["payment", "error-payment", payment ? "" : "Please choose a payment method."]
  ];

  checks.forEach((check) => {
    const ok = setFieldError(check[0], check[1], check[2]);
    if (!ok && !firstBad) firstBad = document.getElementById(check[0]);
  });

  const formError = document.getElementById("form-error");
  if (!cart.length) {
    formError.hidden = false;
    formError.textContent = "Add at least one product before you submit the order.";
    if (!firstBad) firstBad = formError;
  } else if (firstBad) {
    formError.hidden = false;
    formError.textContent = "Please fix the highlighted fields.";
  } else {
    formError.hidden = true;
    formError.textContent = "";
  }

  if (firstBad && firstBad.focus) firstBad.focus();
  return !firstBad;
}

function orderNumber() {
  const stamp = Date.now().toString().slice(-6);
  return "SJ-" + stamp;
}

function submitOrder(event) {
  event.preventDefault();
  if (!validateOrder()) return;

  const name = document.getElementById("full-name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const payment = document.getElementById("payment").value;
  const lines = cart.map((line) => {
    const product = findProduct(line.id);
    return `<div class="line"><span>${line.qty} × ${escapeHtml(product.name)}</span><span>${money(product.price * line.qty)}</span></div>`;
  }).join("");
  const number = orderNumber();

  document.getElementById("order-success").hidden = false;
  document.getElementById("order-success").innerHTML = `
    <h3>Order received</h3>
    <p>Thank you, ${escapeHtml(name)}. Your order number is <strong>${number}</strong>.</p>
    <p>We will call ${escapeHtml(phone)} before bringing this to ${escapeHtml(address)}.</p>
    ${lines}
    <p class="summary-total"><span>Total</span><strong>${money(cartAmount())}</strong></p>
    <p>Payment: ${escapeHtml(payment)}</p>
    <p style="margin-top:1rem"><button type="button" class="btn btn-brown" id="new-order">Back to the menu</button></p>
  `;
  document.getElementById("order-layout").hidden = true;
  document.getElementById("new-order").addEventListener("click", resetOrder);
  document.getElementById("order-success").scrollIntoView({ behavior: "smooth", block: "start" });

  cart = [];
  document.getElementById("order-form").reset();
  renderCart();
  showToast("Order " + number + " received");
}

function resetOrder() {
  document.getElementById("order-success").hidden = true;
  document.getElementById("order-layout").hidden = false;
  document.getElementById("summary-pay").textContent = "Payment will show here once you choose a method.";
}

function setFilter(button) {
  currentFilter = button.dataset.filter;
  document.querySelectorAll("[data-filter]").forEach((item) => {
    const active = item === button;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-pressed", String(active));
  });
  renderProducts();
}

document.querySelector(".filters").addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (button) setFilter(button);
});

grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (button) addToCart(button.dataset.add);
});

cartItems.addEventListener("click", (event) => {
  const change = event.target.closest("[data-change]");
  const remove = event.target.closest("[data-remove]");
  if (change) changeQty(change.dataset.id, Number(change.dataset.change));
  if (remove) removeFromCart(remove.dataset.remove);
});

document.getElementById("open-cart").addEventListener("click", openCart);
document.getElementById("close-cart").addEventListener("click", closeCart);
document.getElementById("go-checkout").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", (event) => {
  if (event.target === cartOverlay) closeCart();
});

document.getElementById("order-form").addEventListener("submit", submitOrder);
document.getElementById("payment").addEventListener("change", (event) => {
  const note = document.getElementById("summary-pay");
  note.textContent = event.target.value
    ? "Payment: " + event.target.value
    : "Payment will show here once you choose a method.";
});

document.getElementById("nav-toggle").addEventListener("click", () => {
  const nav = document.getElementById("site-nav");
  const open = nav.classList.toggle("is-open");
  document.getElementById("nav-toggle").setAttribute("aria-expanded", String(open));
});

document.getElementById("site-nav").addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    document.getElementById("site-nav").classList.remove("is-open");
    document.getElementById("nav-toggle").setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !cartOverlay.hidden) closeCart();
});

loadCart();
renderProducts();
renderCart();
