const products = [
  { id: 1, name: "Abaya Noura", category: "Abayas", price: 69, label: "NOUVEAUTÉ", color: "#777a60", background: "#e8e3d8", skin: "#c49a7d" },
  { id: 2, name: "Robe Lina", category: "Robes", price: 59, label: "COUP DE CŒUR", color: "#9b7664", background: "#eee4dc", skin: "#b98d71" },
  { id: 3, name: "Hijab Safa", category: "Hijabs", price: 19, label: "ESSENTIEL", color: "#b1a88f", background: "#e8e5dc", skin: "#c29477" },
  { id: 4, name: "Ensemble Aya", category: "Ensembles", price: 79, label: "NOUVEAUTÉ", color: "#666f70", background: "#e2e7e5", skin: "#bd9274" },
  { id: 5, name: "Abaya Yasmin", category: "Abayas", price: 74, label: "ÉDITION LIMITÉE", color: "#aa8a68", background: "#eee8dc", skin: "#c5997d" },
  { id: 6, name: "Robe Amira", category: "Robes", price: 64, label: "DOUCEUR", color: "#85836c", background: "#e7e5dc", skin: "#b98a6d" },
  { id: 7, name: "Hijab Noor", category: "Hijabs", price: 17, label: "ESSENTIEL", color: "#9a7880", background: "#eee3e6", skin: "#c4987d" },
  { id: 8, name: "Ensemble Selma", category: "Ensembles", price: 89, label: "NOUVEAUTÉ", color: "#6e6256", background: "#e8e2dc", skin: "#bd9275" }
];

const cart = new Map();
const productGrid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#search-input");
const emptyResults = document.querySelector("#empty-results");
const cartDrawer = document.querySelector("#cart-drawer");
const cartBackdrop = document.querySelector("#cart-backdrop");
const cartItems = document.querySelector("#cart-items");
const cartEmpty = document.querySelector("#cart-empty");
const toast = document.querySelector("#toast");
let activeFilter = "Tout";
let toastTimer;

const euro = (amount) => new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR"
}).format(amount);

function renderProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase("fr");
  const visibleProducts = products.filter((product) => {
    const matchesCategory = activeFilter === "Tout" || product.category === activeFilter;
    const matchesSearch = `${product.name} ${product.category}`.toLocaleLowerCase("fr").includes(query);
    return matchesCategory && matchesSearch;
  });

  productGrid.innerHTML = visibleProducts.map((product) => `
    <article class="product-card">
      <div class="product-visual" style="--product-color:${product.color};--product-bg:${product.background};--skin:${product.skin}">
        ${product.category === "Hijabs" ? '<span class="scarf" aria-hidden="true"></span>' : ""}
        <span class="product-label">${product.label}</span>
      </div>
      <div class="product-info">
        <div><h3>${product.name}</h3><p class="product-category">${product.category}</p></div>
        <p class="product-price">${euro(product.price)}</p>
      </div>
      <button class="add-button" type="button" data-add="${product.id}">Ajouter au panier <span aria-hidden="true">+</span></button>
    </article>
  `).join("");

  emptyResults.hidden = visibleProducts.length !== 0;
  document.querySelector("#result-count").textContent = `${visibleProducts.length} article${visibleProducts.length > 1 ? "s" : ""}`;
}

function renderCart() {
  const entries = [...cart.entries()];
  const quantity = entries.reduce((total, [, count]) => total + count, 0);
  const subtotal = entries.reduce((total, [id, count]) => {
    const product = products.find((item) => item.id === id);
    return total + product.price * count;
  }, 0);

  document.querySelector("#cart-count").textContent = quantity;
  document.querySelector("#drawer-count").textContent = `(${quantity})`;
  document.querySelector("#cart-subtotal").textContent = euro(subtotal);
  document.querySelector("#checkout-button").disabled = quantity === 0;
  cartEmpty.hidden = quantity !== 0;
  cartItems.hidden = quantity === 0;
  cartItems.innerHTML = entries.map(([id, count]) => {
    const product = products.find((item) => item.id === id);
    return `
      <article class="cart-row">
        <div class="cart-thumb" style="--product-color:${product.color};--product-bg:${product.background}" aria-hidden="true"></div>
        <div>
          <h3 class="cart-product-name">${product.name}</h3>
          <p class="cart-product-price">${euro(product.price)}</p>
          <div class="quantity-control" aria-label="Quantité de ${product.name}">
            <button type="button" data-quantity="${id}" data-change="-1" aria-label="Retirer un ${product.name}">−</button>
            <span>${count}</span>
            <button type="button" data-quantity="${id}" data-change="1" aria-label="Ajouter un ${product.name}">+</button>
          </div>
        </div>
        <button class="remove-item" type="button" data-remove="${id}" aria-label="Supprimer ${product.name}">×</button>
      </article>
    `;
  }).join("");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 2200);
}

function setCartOpen(open) {
  cartDrawer.classList.toggle("open", open);
  cartDrawer.setAttribute("aria-hidden", String(!open));
  cartBackdrop.hidden = !open;
  document.body.classList.toggle("cart-open", open);
  if (open) document.querySelector("#close-cart").focus();
}

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (!button) return;
  const id = Number(button.dataset.add);
  cart.set(id, (cart.get(id) ?? 0) + 1);
  renderCart();
  showToast(`${products.find((product) => product.id === id).name} ajouté au panier`);
});

cartItems.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove]");
  if (removeButton) {
    cart.delete(Number(removeButton.dataset.remove));
    renderCart();
    return;
  }

  const quantityButton = event.target.closest("[data-quantity]");
  if (!quantityButton) return;
  const id = Number(quantityButton.dataset.quantity);
  const nextQuantity = (cart.get(id) ?? 0) + Number(quantityButton.dataset.change);
  if (nextQuantity <= 0) cart.delete(id);
  else cart.set(id, nextQuantity);
  renderCart();
});

document.querySelector("#open-cart").addEventListener("click", () => setCartOpen(true));
document.querySelector("#close-cart").addEventListener("click", () => setCartOpen(false));
cartBackdrop.addEventListener("click", () => setCartOpen(false));
document.querySelector("#continue-shopping").addEventListener("click", () => setCartOpen(false));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && cartDrawer.classList.contains("open")) setCartOpen(false);
});

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    activeFilter = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach((filter) => {
      filter.classList.toggle("active", filter.dataset.filter === activeFilter);
    });
    renderProducts();
    document.querySelector("#collection").scrollIntoView({ behavior: "smooth" });
  });
});

searchInput.addEventListener("input", renderProducts);
document.querySelector("#checkout-button").addEventListener("click", () => {
  document.querySelector("#checkout-note").textContent = "Le paiement n'est pas encore configuré. Choisissez une solution de paiement avant d'ouvrir la boutique.";
});
document.querySelector("#newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#newsletter-message").textContent = "Merci ! L'inscription sera activée lors de la mise en ligne.";
  event.currentTarget.reset();
});

document.querySelector("#year").textContent = new Date().getFullYear();
renderProducts();
renderCart();
