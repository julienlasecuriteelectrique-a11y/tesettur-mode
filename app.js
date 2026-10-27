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
const oneSizeCategories = new Set(["Accessoires", "Bijoux", "Hijab"]);
const clothingSizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];
const productGrid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#search-input");
const emptyResults = document.querySelector("#empty-results");
const cartDrawer = document.querySelector("#cart-drawer");
const cartBackdrop = document.querySelector("#cart-backdrop");
const cartItems = document.querySelector("#cart-items");
const cartEmpty = document.querySelector("#cart-empty");
const toast = document.querySelector("#toast");
const productDetail = document.querySelector("#product-detail");
const sizeGuideDialog = document.querySelector("#size-guide-dialog");
const categoryTrack = document.querySelector("#category-track");
const previousCategoryButton = document.querySelector("#category-scroll-prev");
const nextCategoryButton = document.querySelector("#category-scroll-next");
let activeFilter = "Tout";
let toastTimer;
let selectedProduct = null;
let selectedSize = "";
let detailTrigger = null;
let guideTab = "measurements";

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
        ${product.image ? `<button class="product-image-trigger" type="button" data-product="${product.id}" aria-label="Voir la fiche de ${product.name}"><img class="product-photo" src="${product.image}" alt="" loading="lazy"></button>` : ""}
        <span class="product-label">${product.label}</span>
      </div>
      <div class="product-info">
        <div><h3><button class="product-title-trigger" type="button" data-product="${product.id}">${product.name}</button></h3><p class="product-category">${product.displayCategory ?? product.category}</p></div>
        <p class="product-price">${euro(product.price)}</p>
      </div>
      <button class="add-button" type="button" data-product="${product.id}"><span>Choisir les options</span><span aria-hidden="true">↗</span></button>
    </article>
  `).join("");

  emptyResults.hidden = visibleProducts.length !== 0;
}

function renderCart() {
  const entries = [...cart.entries()];
  const quantity = entries.reduce((total, [, count]) => total + count, 0);
  const subtotal = entries.reduce((total, [key, count]) => {
    const productId = Number(key.split("|")[0]);
    const product = products.find((item) => item.id === productId);
    return total + product.price * count;
  }, 0);

  document.querySelector("#cart-count").textContent = quantity;
  document.querySelector("#drawer-count").textContent = `(${quantity})`;
  document.querySelector("#cart-subtotal").textContent = euro(subtotal);
  document.querySelector("#checkout-button").disabled = quantity === 0;
  cartEmpty.hidden = quantity !== 0;
  cartItems.hidden = quantity === 0;
  cartItems.innerHTML = entries.map(([key, count]) => {
    const [productId, size] = key.split("|");
    const product = products.find((item) => item.id === Number(productId));
    const sizeDescription = size === "Taille unique" ? "" : `<p class="cart-product-size">Taille : ${size}</p>`;
    return `
      <article class="cart-row">
        <div class="cart-thumb" style="--product-bg:${product.background}" aria-hidden="true"><img src="${product.image}" alt=""></div>
        <div>
          <h3 class="cart-product-name">${product.name}</h3>
          <p class="cart-product-price">${euro(product.price)}</p>
          ${sizeDescription}
          <div class="quantity-control" aria-label="Quantité de ${product.name}${size === "Taille unique" ? "" : `, taille ${size}`}">
            <button type="button" data-quantity="${key}" data-change="-1" aria-label="Retirer un ${product.name}">−</button>
            <span>${count}</span>
            <button type="button" data-quantity="${key}" data-change="1" aria-label="Ajouter un ${product.name}">+</button>
          </div>
        </div>
        <button class="remove-item" type="button" data-remove="${key}" aria-label="Supprimer ${product.name}">×</button>
      </article>
    `;
  }).join("");
}

function addToCart(product, size) {
  const key = `${product.id}|${size}`;
  cart.set(key, (cart.get(key) ?? 0) + 1);
  renderCart();
  showToast(`${product.name} ajouté au panier`);
}

function openProductDetail(productId, trigger) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  selectedProduct = product;
  selectedSize = "";
  detailTrigger = trigger;
  document.querySelector("#detail-image").src = product.image;
  document.querySelector("#detail-image").alt = product.name;
  document.querySelector("#detail-label").textContent = product.label;
  document.querySelector("#detail-category").textContent = product.displayCategory ?? product.category;
  document.querySelector("#detail-name").textContent = product.name;
  document.querySelector("#detail-price").textContent = euro(product.price);
  const sizePicker = document.querySelector("#detail-size-picker");
  const sizeList = document.querySelector("#size-option-list");
  const detailAddButton = document.querySelector("#detail-add");
  const hasSizes = !oneSizeCategories.has(product.category);
  sizePicker.hidden = !hasSizes;
  sizeList.innerHTML = hasSizes ? clothingSizes.map((size) => `<button class="size-option" type="button" data-size="${size}" aria-pressed="false">${size}</button>`).join("") : "";
  detailAddButton.disabled = hasSizes;
  document.querySelectorAll("[data-detail-tab]").forEach((tab) => {
    const selected = tab.dataset.detailTab === "description";
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  document.querySelector("#detail-tab-panel").textContent = `${product.displayCategory ?? product.category} sélectionné(e) par Tesettür Mode.`;
  productDetail.showModal();
}

function renderSizeGuide(tab = guideTab) {
  guideTab = tab;
  document.querySelectorAll("[data-size-guide-tab]").forEach((button) => {
    const selected = button.dataset.sizeGuideTab === guideTab;
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  const panel = document.querySelector("#size-guide-panel");

  if (guideTab === "measurements") {
    panel.innerHTML = `
      <h3>Mensurations de la boutique</h3>
      <p class="guide-pending">Le tableau des mesures propres aux vêtements Tesettür Mode sera ajouté dès qu’il sera disponible. En attendant, vous pouvez prendre vos mesures et demander conseil à la boutique.</p>
    `;
    return;
  }

  if (guideTab === "how-to-measure") {
    panel.innerHTML = `
      <h3>Comment prendre ses mesures ?</h3>
      <ul class="measurement-instructions">
        <li><strong>Tour de poitrine</strong><span>Mesurez autour de la partie la plus forte, ruban bien horizontal.</span></li>
        <li><strong>Tour de taille</strong><span>Mesurez à l’endroit le plus fin, sans serrer le ruban.</span></li>
        <li><strong>Tour de bassin</strong><span>Mesurez à l’endroit le plus large des hanches.</span></li>
      </ul>
    `;
    return;
  }

  panel.innerHTML = `
    <h3>Équivalences indicatives</h3>
    <p class="guide-pending">Les correspondances entre tailles seront précisées lorsque le barème de la boutique sera confirmé.</p>
  `;
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
    cart.delete(removeButton.dataset.remove);
    renderCart();
    return;
  }

  const quantityButton = event.target.closest("[data-quantity]");
  if (!quantityButton) return;
  const key = quantityButton.dataset.quantity;
  const nextQuantity = (cart.get(key) ?? 0) + Number(quantityButton.dataset.change);
  if (nextQuantity <= 0) cart.delete(key);
  else cart.set(key, nextQuantity);
  renderCart();
});

document.querySelector("#open-cart").addEventListener("click", () => setCartOpen(true));
document.querySelector("#close-cart").addEventListener("click", () => setCartOpen(false));
cartBackdrop.addEventListener("click", () => setCartOpen(false));
document.querySelector("#continue-shopping").addEventListener("click", () => setCartOpen(false));
document.querySelector("#close-product-detail").addEventListener("click", () => productDetail.close());
document.querySelector("#open-size-guide").addEventListener("click", () => {
  renderSizeGuide("measurements");
  sizeGuideDialog.showModal();
});
document.querySelector("#close-size-guide").addEventListener("click", () => sizeGuideDialog.close());
sizeGuideDialog.addEventListener("click", (event) => {
  if (event.target === sizeGuideDialog) sizeGuideDialog.close();
});
document.querySelector(".size-guide-tabs").addEventListener("click", (event) => {
  const tab = event.target.closest("[data-size-guide-tab]");
  if (tab) renderSizeGuide(tab.dataset.sizeGuideTab);
});
productDetail.addEventListener("click", (event) => {
  if (event.target === productDetail) productDetail.close();
});
productDetail.addEventListener("close", () => {
  detailTrigger?.focus();
  detailTrigger = null;
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && cartDrawer.classList.contains("open")) setCartOpen(false);
});

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    activeFilter = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach((filterButton) => {
      const selected = filterButton.dataset.filter === activeFilter;
      filterButton.classList.toggle("is-active", selected);
      filterButton.setAttribute("aria-pressed", String(selected));
    });
    renderProducts();
    document.querySelector("#collection").scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelector("#product-grid").addEventListener("click", (event) => {
  const detailButton = event.target.closest("[data-product]");
  if (detailButton) {
    openProductDetail(Number(detailButton.dataset.product), detailButton);
    return;
  }

  const addButton = event.target.closest("[data-add]");
  if (!addButton) return;
  const id = Number(addButton.dataset.add);
  cart.set(id, (cart.get(id) ?? 0) + 1);
  renderCart();
  showToast(`${products.find((product) => product.id === id).name} ajouté au panier`);
});

document.querySelector("#detail-add").addEventListener("click", () => {
  if (!selectedProduct) return;
  addToCart(selectedProduct, selectedSize || "Taille unique");
  productDetail.close();
});

document.querySelector("#size-option-list").addEventListener("click", (event) => {
  const sizeButton = event.target.closest("[data-size]");
  if (!sizeButton) return;
  selectedSize = sizeButton.dataset.size;
  document.querySelectorAll(".size-option").forEach((button) => {
    const selected = button === sizeButton;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  document.querySelector("#detail-add").disabled = false;
  document.querySelector("#size-availability").textContent = `Taille ${selectedSize} sélectionnée · disponibilité à confirmer auprès de la boutique.`;
});

document.querySelector(".detail-tabs").addEventListener("click", (event) => {
  const tab = event.target.closest("[data-detail-tab]");
  if (!tab) return;
  document.querySelectorAll("[data-detail-tab]").forEach((item) => {
    const selected = item === tab;
    item.setAttribute("aria-selected", String(selected));
    item.tabIndex = selected ? 0 : -1;
  });
  const panelContent = {
    description: `${selectedProduct.displayCategory ?? selectedProduct.category} sélectionné(e) par Tesettür Mode.`,
    details: "Les détails de composition et d’entretien sont à confirmer auprès de la boutique.",
    availability: "La disponibilité des tailles peut varier. Contactez la boutique pour vérifier ce modèle."
  };
  document.querySelector("#detail-tab-panel").textContent = panelContent[tab.dataset.detailTab];
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
