const products = [
  { id: 1, name: "Sac à main camel", category: "Accessoires", price: 59, label: "SAC", color: "#a9663f", background: "#f2e4d3", image: "sac-a-main-camel.jpeg" },
  { id: 2, name: "Bijoux dorés", category: "Bijoux", price: 29, label: "BIJOUX", color: "#b58a43", background: "#f2ead8", image: "bijoux-dores.jpeg" },
  { id: 3, name: "Ensemble maille écru", category: "Ensembles", price: 79, label: "NOUVEAUTÉ", color: "#b2a28b", background: "#f1e8dd", image: "ensemble-maille-ecru.jpeg" },
  { id: 4, name: "Hijab rose poudré", category: "Hijab", price: 19, label: "ESSENTIEL", color: "#c38b80", background: "#f3e3df", image: "hijab-rose-poudre.png" },
  { id: 5, name: "Pantalon fluide noir", category: "Pantalons", price: 39, label: "ESSENTIEL", color: "#38312f", background: "#e9e4dc", image: "pantalon-fluide-noir.jpeg" },
  { id: 6, name: "Pull maille écru", category: "Pulls", price: 49, label: "DOUCEUR", color: "#c7b4a0", background: "#f1e7df", image: "pull-maille-ecru.jpeg" },
  { id: 7, name: "Robe de soirée", category: "Robe de soirée", displayCategory: "Robe de soirée", price: 89, label: "OCCASION", color: "#d0b8a8", background: "#f3e5dc", image: "robe-soiree-perlee.jpeg" },
  { id: 8, name: "Robe longue à pois", category: "Robe", displayCategory: "Robe", price: 59, label: "COUP DE CŒUR", color: "#c7b49a", background: "#f0e7d9", image: "robe-longue-a-pois.jpeg" },
  { id: 9, name: "Chemisier bordeaux", category: "Chemisier", displayCategory: "Chemisier", price: 69, label: "NOUVEAUTÉ", color: "#743a46", background: "#f0e8e1", image: "ensemble-bordeaux-ivoire.jpeg" },
  { id: 10, name: "Jupe", category: "Jupe", price: 59, label: "NOUVEAUTÉ", color: "#342c2b", background: "#eee4d7", image: "jupe-longue-noire.png" },
  { id: 11, name: "Veste", category: "Veste", price: 79, label: "NOUVEAUTÉ", color: "#6685a3", background: "#e9e6df", image: "veste-longue-jean.png" }
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
const categoryTrack = document.querySelector("#category-track");
const previousCategoryButton = document.querySelector("#category-scroll-prev");
const nextCategoryButton = document.querySelector("#category-scroll-next");
let activeFilter = "Tout";
let toastTimer;

const euro = (amount) => new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR"
}).format(amount);

function renderProducts() {
  if (!productGrid) return;

  const query = searchInput.value.trim().toLocaleLowerCase("fr");
  const visibleProducts = products.filter((product) => {
    const matchesCategory = activeFilter === "Tout" || product.category === activeFilter;
    const matchesSearch = `${product.name} ${product.category}`.toLocaleLowerCase("fr").includes(query);
    return matchesCategory && matchesSearch;
  });

  productGrid.innerHTML = visibleProducts.map((product) => `
    <article class="product-card">
      <div class="product-visual${product.image ? " has-image" : ""}" style="--product-color:${product.color};--product-bg:${product.background};--skin:${product.skin}">
        ${product.image ? `<img class="product-photo" src="${product.image}" alt="${product.name}">` : ""}
        ${product.category === "Hijabs" && !product.image ? '<span class="scarf" aria-hidden="true"></span>' : ""}
      </div>
      <div class="product-info">
        <div><h3>${product.displayCategory ?? product.category}</h3></div>
        <p class="product-price">${euro(product.price)}</p>
      </div>
      <button class="add-button" type="button" data-add="${product.id}">Ajouter au panier <span aria-hidden="true">+</span></button>
    </article>
  `).join("");

  emptyResults.hidden = visibleProducts.length !== 0;
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
    renderProducts();
    document.querySelector("#collection").scrollIntoView({ behavior: "smooth" });
  });
});

function scrollCategories(direction) {
  const firstTile = categoryTrack.querySelector(".category-tile");
  const gap = Number.parseFloat(getComputedStyle(categoryTrack).columnGap) || 0;
  const cardsPerClick = window.matchMedia("(max-width: 760px)").matches ? 3 : 1;
  const distance = (firstTile.getBoundingClientRect().width + gap) * cardsPerClick;
  const maxScroll = categoryTrack.scrollWidth - categoryTrack.clientWidth;
  const targetScroll = Math.min(maxScroll, Math.max(0, categoryTrack.scrollLeft + direction * distance));
  categoryTrack.scrollTo({ left: targetScroll, behavior: "instant" });
}

previousCategoryButton.addEventListener("click", () => scrollCategories(-1));
nextCategoryButton.addEventListener("click", () => scrollCategories(1));

searchInput.addEventListener("input", renderProducts);
document.querySelector("#checkout-button").addEventListener("click", () => {
  document.querySelector("#checkout-note").textContent = "Le paiement en ligne n’est pas encore configuré. Contactez la boutique pour finaliser votre commande.";
});
document.querySelector("#newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#newsletter-message").textContent = "Merci ! L’inscription à la newsletter sera disponible lors de la mise en ligne.";
  event.currentTarget.reset();
});

document.querySelector("#year").textContent = new Date().getFullYear();
renderProducts();
renderCart();
