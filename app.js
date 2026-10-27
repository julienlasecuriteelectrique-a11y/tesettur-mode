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
const recommendationCategories = {
  "Accessoires": ["Bijoux", "Hijab", "Robe de soirée"],
  "Bijoux": ["Accessoires", "Hijab", "Robe de soirée"],
  "Chemisier": ["Ensembles", "Jupe", "Pantalons"],
  "Ensembles": ["Chemisier", "Pulls", "Pantalons"],
  "Hijab": ["Accessoires", "Bijoux", "Ensembles"],
  "Jupe": ["Chemisier", "Pulls", "Veste"],
  "Pantalons": ["Chemisier", "Ensembles", "Veste"],
  "Pulls": ["Ensembles", "Pantalons", "Jupe"],
  "Robe": ["Robe de soirée", "Accessoires", "Bijoux"],
  "Robe de soirée": ["Robe", "Bijoux", "Accessoires"],
  "Veste": ["Pantalons", "Pulls", "Jupe"]
};
const favoriteStorageKey = "tesettur-mode-favorites";

function readFavorites() {
  try {
    const storedFavorites = JSON.parse(localStorage.getItem(favoriteStorageKey) ?? "[]");
    return new Set(Array.isArray(storedFavorites) ? storedFavorites.filter((id) => products.some((product) => product.id === id)) : []);
  } catch {
    return new Set();
  }
}

const favorites = readFavorites();
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
const checkoutDialog = document.querySelector("#checkout-dialog");
const checkoutForm = document.querySelector("#checkout-form");
const trackingDrawer = document.querySelector("#tracking-drawer");
const chatPanel = document.querySelector("#chat-panel");
const chatMessages = document.querySelector("#chat-messages");
const chatInput = document.querySelector("#chat-input");
let activeFilter = "Tout";
let toastTimer;
let selectedProduct = null;
let selectedSize = "";
let detailTrigger = null;
let guideTab = "measurements";
let checkoutStage = 1;

const euro = (amount) => new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR"
}).format(amount);

function renderProducts() {
  if (!productGrid) return;

  const query = searchInput.value.trim().toLocaleLowerCase("fr");
  const visibleProducts = products.filter((product) => {
    const matchesCategory = activeFilter === "Tout"
      || (activeFilter === "Favoris" ? favorites.has(product.id) : product.category === activeFilter);
    const matchesSearch = `${product.name} ${product.category}`.toLocaleLowerCase("fr").includes(query);
    return matchesCategory && matchesSearch;
  });

  productGrid.innerHTML = visibleProducts.map((product) => `
    <article class="product-card">
      <div class="product-visual${product.image ? " has-image" : ""}" style="--product-color:${product.color};--product-bg:${product.background};--skin:${product.skin}">
        ${product.image ? `<button class="product-image-trigger" type="button" data-product="${product.id}" aria-label="Voir la fiche de ${product.name}"><img class="product-photo" src="${product.image}" alt="" loading="lazy"></button>` : ""}
        <span class="product-label">${product.label}</span>
        <button class="favorite-toggle" type="button" data-favorite="${product.id}" aria-label="${favorites.has(product.id) ? "Retirer" : "Ajouter"} ${product.name} des favoris" aria-pressed="${favorites.has(product.id)}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/></svg>
        </button>
      </div>
      <div class="product-info">
        <div><h3><button class="product-title-trigger" type="button" data-product="${product.id}">${product.name}</button></h3><p class="product-category">${product.displayCategory ?? product.category}</p></div>
        <p class="product-price">${euro(product.price)}</p>
      </div>
      <button class="add-button" type="button" data-product="${product.id}"><span>Choisir les options</span><span aria-hidden="true">↗</span></button>
    </article>
  `).join("");

  emptyResults.hidden = visibleProducts.length !== 0;
  emptyResults.textContent = activeFilter === "Favoris" && favorites.size === 0
    ? "Vous n’avez pas encore d’article favori."
    : "Aucun article ne correspond à votre recherche.";
}

function toggleFavorite(productId) {
  if (favorites.has(productId)) favorites.delete(productId);
  else favorites.add(productId);

  try {
    localStorage.setItem(favoriteStorageKey, JSON.stringify([...favorites]));
  } catch {
    showToast("Les favoris ne peuvent pas être mémorisés sur cet appareil.");
  }

  renderProducts();
  if (selectedProduct?.id === productId) updateDetailFavorite();
}

function updateDetailFavorite() {
  const favoriteButton = document.querySelector("#detail-favorite");
  const isFavorite = favorites.has(selectedProduct.id);
  favoriteButton.setAttribute("aria-pressed", String(isFavorite));
  favoriteButton.setAttribute("aria-label", `${isFavorite ? "Retirer" : "Ajouter"} ${selectedProduct.name} des favoris`);
}

function renderRecommendations(product) {
  const relatedProducts = (recommendationCategories[product.category] ?? [])
    .map((category) => products.find((item) => item.category === category))
    .filter(Boolean)
    .slice(0, 3);

  document.querySelector("#related-products").innerHTML = relatedProducts.map((relatedProduct) => `
    <button class="related-product" type="button" data-related-product="${relatedProduct.id}" aria-label="Voir ${relatedProduct.name}">
      <img src="${relatedProduct.image}" alt="" loading="lazy">
      <span class="related-product-name">${relatedProduct.name}</span>
      <span class="related-product-price">${euro(relatedProduct.price)}</span>
    </button>
  `).join("");
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

function renderCheckoutSummary() {
  const formData = new FormData(checkoutForm);
  const fullName = `${formData.get("firstName")} ${formData.get("lastName")}`;
  const deliveryMethod = formData.get("deliveryMethod");
  const isHomeDelivery = deliveryMethod === "home";
  const address = isHomeDelivery
    ? [
      formData.get("address"),
      formData.get("addressComplement"),
      `${formData.get("postalCode")} ${formData.get("city")}`,
      formData.get("accessCode") && `Code portail / interphone : ${formData.get("accessCode")}`,
      formData.get("floor") && `Étage : ${formData.get("floor")}`,
      formData.get("deliveryNotes") && `Instructions : ${formData.get("deliveryNotes")}`
    ].filter((line) => typeof line === "string" && line.trim()).join(" · ")
    : `Point relais souhaité : ${formData.get("relayAddress")}`;
  const entries = [...cart.entries()];
  const total = entries.reduce((sum, [key, count]) => {
    const product = products.find((item) => item.id === Number(key.split("|")[0]));
    return sum + product.price * count;
  }, 0);

  document.querySelector("#checkout-summary-contact").textContent = `${fullName} · ${formData.get("email")} · ${formData.get("phone")}`;
  document.querySelector("#checkout-summary-delivery").textContent = `Mode de livraison : ${isHomeDelivery ? "À domicile" : "Point relais"}`;
  document.querySelector("#checkout-summary-address").textContent = address;
  document.querySelector("#checkout-summary").innerHTML = entries.map(([key, count]) => {
    const [productId, size] = key.split("|");
    const product = products.find((item) => item.id === Number(productId));
    const sizeDescription = size === "Taille unique" ? "Taille unique" : `Taille ${size}`;
    return `<div class="checkout-summary-row"><div><strong>${product.name}</strong><span>${sizeDescription} · quantité ${count}</span></div><strong>${euro(product.price * count)}</strong></div>`;
  }).join("");
  document.querySelector("#checkout-subtotal").textContent = euro(total);
}

function setCheckoutStage(stage) {
  checkoutStage = stage;
  document.querySelectorAll("[data-checkout-stage]").forEach((section) => {
    section.hidden = Number(section.dataset.checkoutStage) !== checkoutStage;
  });
  document.querySelectorAll("[data-checkout-indicator]").forEach((indicator) => {
    const indicatorStage = Number(indicator.dataset.checkoutIndicator);
    if (indicatorStage === checkoutStage) indicator.setAttribute("aria-current", "step");
    else indicator.removeAttribute("aria-current");
    indicator.classList.toggle("is-complete", indicatorStage < checkoutStage);
  });
  if (checkoutStage === 3) renderCheckoutSummary();
  checkoutDialog.querySelector(`[data-checkout-stage="${checkoutStage}"] h3`).focus();
}

function updateDeliveryMethod(method) {
  const isHomeDelivery = method === "home";
  const homeFields = document.querySelector("#home-delivery-fields");
  const relayFields = document.querySelector("#relay-delivery-fields");

  homeFields.hidden = !isHomeDelivery;
  homeFields.querySelectorAll("input, textarea").forEach((field) => {
    field.disabled = !isHomeDelivery;
  });
  relayFields.hidden = isHomeDelivery;
  relayFields.querySelector("input").disabled = isHomeDelivery;
  document.querySelectorAll(".delivery-method-card").forEach((card) => {
    card.classList.toggle("is-selected", card.querySelector("input").checked);
  });
  document.querySelector("#delivery-method-hint").textContent = isHomeDelivery
    ? "Les frais et délais de livraison seront confirmés avant le paiement."
    : "Le point relais et sa disponibilité seront confirmés avant le paiement.";
}

function openProductDetail(productId, trigger) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  const detailAlreadyOpen = productDetail.open;
  selectedProduct = product;
  selectedSize = "";
  if (trigger) detailTrigger = trigger;
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
  updateDetailFavorite();
  renderRecommendations(product);
  document.querySelector(".detail-copy").scrollTop = 0;
  if (!detailAlreadyOpen) productDetail.showModal();
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

function normalizeChatText(text) {
  return text.toLocaleLowerCase("fr").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function getChatReply(topic) {
  const normalizedTopic = normalizeChatText(topic);

  if (/suivi|colis|transporteur|numero/.test(normalizedTopic)) {
    return "Dans la rubrique « Suivi colis », choisissez votre transporteur et saisissez le numéro reçu par e-mail ou SMS. Le site du transporteur s’ouvrira pour afficher le suivi.";
  }
  if (/livraison|relais|domicile|portail|etage/.test(normalizedTopic)) {
    return "À l’étape Livraison, choisissez domicile ou point relais. Les frais, délais et disponibilité du relais restent à confirmer avant le paiement.";
  }
  if (/taille|mensuration|mesure/.test(normalizedTopic)) {
    return "Vous pouvez choisir une taille sur la fiche produit. Le tableau de mensurations de la boutique est en préparation ; contactez-nous pour un conseil précis.";
  }
  if (/paiement|payer|carte|stripe/.test(normalizedTopic)) {
    return "Le parcours de commande est disponible, mais le paiement en ligne n’est pas encore activé. Stripe sera connecté ultérieurement ; aucun montant n’est débité pour le moment.";
  }
  if (/favori|coeur|aime/.test(normalizedTopic)) {
    return "Touchez le cœur sur un article pour l’ajouter aux favoris, puis choisissez « Favoris » dans les filtres de la collection.";
  }
  if (/commande|panier|acheter/.test(normalizedTopic)) {
    return "Ajoutez l’article au panier, choisissez sa taille si nécessaire, puis passez à la commande. Le parcours s’arrête avant le paiement tant que Stripe n’est pas configuré.";
  }
  if (/contact|adresse|telephone|boutique|parler/.test(normalizedTopic)) {
    return "La boutique est au 4 Rue d’Avéjan, 30100 Alès. Téléphone : 07 68 03 20 93 ou 07 45 65 65 72. E-mail : contact.tesetturmode@gmail.com.";
  }
  return "Je n’ai pas cette information confirmée. Contactez la boutique au 07 68 03 20 93 ou à contact.tesetturmode@gmail.com.";
}

function appendChatMessage(message, sender) {
  const messageElement = document.createElement("p");
  messageElement.className = `chat-message chat-message-${sender}`;
  messageElement.textContent = message;
  chatMessages.append(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function answerChat(topic, questionLabel = topic) {
  appendChatMessage(questionLabel, "user");
  appendChatMessage(getChatReply(topic), "bot");
}

function setChatOpen(open) {
  chatPanel.hidden = !open;
  document.querySelector("#chat-trigger").setAttribute("aria-expanded", String(open));
  if (open) chatInput.focus();
  else document.querySelector("#chat-trigger").focus();
}

function setCartOpen(open) {
  if (open) {
    trackingDrawer.classList.remove("open");
    trackingDrawer.setAttribute("aria-hidden", "true");
  }
  cartDrawer.classList.toggle("open", open);
  cartDrawer.setAttribute("aria-hidden", String(!open));
  cartBackdrop.hidden = !open;
  document.body.classList.toggle("cart-open", open);
  if (open) document.querySelector("#close-cart").focus();
}

function setTrackingOpen(open) {
  if (open) {
    cartDrawer.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
  }
  trackingDrawer.classList.toggle("open", open);
  trackingDrawer.setAttribute("aria-hidden", String(!open));
  cartBackdrop.hidden = !open;
  document.body.classList.toggle("cart-open", open);
  if (open) document.querySelector("#tracking-number").focus();
  else document.querySelector("#open-tracking").focus();
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
document.querySelector("#open-tracking").addEventListener("click", () => setTrackingOpen(true));
document.querySelector("#close-tracking").addEventListener("click", () => setTrackingOpen(false));
cartBackdrop.addEventListener("click", () => {
  if (trackingDrawer.classList.contains("open")) setTrackingOpen(false);
  else setCartOpen(false);
});
document.querySelector("#continue-shopping").addEventListener("click", () => setCartOpen(false));
document.querySelector("#close-product-detail").addEventListener("click", () => productDetail.close());
document.querySelector("#detail-favorite").addEventListener("click", () => {
  if (selectedProduct) toggleFavorite(selectedProduct.id);
});
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
  if (event.key !== "Escape") return;
  if (cartDrawer.classList.contains("open")) setCartOpen(false);
  if (trackingDrawer.classList.contains("open")) setTrackingOpen(false);
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
  const favoriteButton = event.target.closest("[data-favorite]");
  if (favoriteButton) {
    toggleFavorite(Number(favoriteButton.dataset.favorite));
    return;
  }

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

document.querySelector("#related-products").addEventListener("click", (event) => {
  const relatedButton = event.target.closest("[data-related-product]");
  if (relatedButton) openProductDetail(Number(relatedButton.dataset.relatedProduct));
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

searchInput.addEventListener("input", renderProducts);
document.querySelector("#tracking-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const carrier = document.querySelector("#tracking-carrier").value;
  const trackingNumber = document.querySelector("#tracking-number").value.trim();
  const trackingPages = {
    laposte: "https://www.laposte.fr/outils/suivre-vos-envois",
    chronopost: "https://www.chronopost.fr/fr/suivi-colis",
    mondialrelay: "https://www.mondialrelay.fr/suivi-de-colis/"
  };
  const trackingLabels = {
    laposte: "La Poste / Colissimo",
    chronopost: "Chronopost",
    mondialrelay: "Mondial Relay"
  };

  const trackingMessage = document.querySelector("#tracking-message");
  const copyTask = navigator.clipboard?.writeText(trackingNumber)
    .then(() => true)
    .catch(() => false) ?? Promise.resolve(false);
  const trackingWindow = window.open(trackingPages[carrier], "_blank");

  if (trackingWindow) {
    trackingWindow.opener = null;
    const copied = await copyTask;
    trackingMessage.textContent = copied
      ? `Numéro copié. Collez-le sur la page ${trackingLabels[carrier]} qui vient de s’ouvrir.`
      : `La page ${trackingLabels[carrier]} s’est ouverte. Saisissez-y votre numéro de suivi.`;
    return;
  }

  trackingMessage.textContent = "Le navigateur a bloqué le nouvel onglet ; la page de suivi va s’ouvrir ici.";
  window.location.assign(trackingPages[carrier]);
});

document.querySelector("#checkout-button").addEventListener("click", () => {
  if (cart.size === 0) return;
  setCheckoutStage(1);
  checkoutDialog.showModal();
});
document.querySelector("#close-checkout").addEventListener("click", () => checkoutDialog.close());
checkoutDialog.addEventListener("close", () => {
  checkoutForm.reset();
  updateDeliveryMethod("home");
  setCheckoutStage(1);
});
checkoutDialog.addEventListener("click", (event) => {
  if (event.target === checkoutDialog) checkoutDialog.close();
});
checkoutForm.addEventListener("submit", (event) => event.preventDefault());
checkoutForm.addEventListener("change", (event) => {
  if (event.target.name === "deliveryMethod") updateDeliveryMethod(event.target.value);
});
checkoutForm.addEventListener("click", (event) => {
  const nextButton = event.target.closest("[data-checkout-next]");
  if (nextButton) {
    const visibleFields = checkoutForm.querySelectorAll(`[data-checkout-stage="${checkoutStage}"] input`);
    const invalidField = [...visibleFields].find((field) => !field.reportValidity());
    if (invalidField) return;
    setCheckoutStage(Number(nextButton.dataset.checkoutNext));
    return;
  }

  const backButton = event.target.closest("[data-checkout-back]");
  if (backButton) setCheckoutStage(Number(backButton.dataset.checkoutBack));
});
document.querySelector("#chat-trigger").addEventListener("click", () => setChatOpen(chatPanel.hidden));
document.querySelector("#chat-close").addEventListener("click", () => setChatOpen(false));
document.querySelector(".chat-suggestions").addEventListener("click", (event) => {
  const suggestion = event.target.closest("[data-chat-topic]");
  if (suggestion) answerChat(suggestion.dataset.chatTopic, suggestion.textContent.trim());
});
document.querySelector("#chat-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const question = chatInput.value.trim();
  if (!question) return;
  answerChat(question);
  chatInput.value = "";
  chatInput.focus();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !chatPanel.hidden) setChatOpen(false);
});
document.querySelector("#newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#newsletter-message").textContent = "Merci ! L’inscription à la newsletter sera disponible lors de la mise en ligne.";
  event.currentTarget.reset();
});

document.querySelector("#year").textContent = new Date().getFullYear();
renderProducts();
renderCart();
