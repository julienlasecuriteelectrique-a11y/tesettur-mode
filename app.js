const products = [];

const skirtPreview = [
  ["Jupe longue noire effet cuir", 22, ["Taille unique"]],
  ["Jupe longue noire à plis", 22, ["Taille unique"]],
  ["Jupe longue noire fluide", 18, ["Taille unique"]],
  ["Jupe longue évasée marron", 22, ["38"]],
  ["Jupe longue satinée écrue", 18, ["S", "M", "L", "XL"]],
  ["Jupe longue satinée rouge", 18, ["S", "M", "L", "XL"]],
  ["Jupe longue droite gris bleuté", 20, ["42", "44", "46"]],
  ["Jupe longue noire à volants", 24, ["S", "M", "L", "XL"]],
  ["Jupe longue vert olive à volants", 24, ["S", "M", "L", "XL"]],
  ["Jupe longue droite bleu roi", 20, ["40", "42", "44", "46", "48"]],
  ["Jupe longue plissée camel", 22, ["38", "40"]],
  ["Jupe longue droite noire", 20, ["42"]],
  ["Jupe longue plissée noire", 22, ["38", "40"]],
  ["Jupe longue noire à passants", 22, ["40"]],
  ["Jupe longue bleu marine à passants", 22, ["42"]],
  ["Jupe longue droite marron", 22, ["42", "44"]],
  ["Jupe longue noire drapée effet cuir", 26, ["M"]],
  ["Jupe longue en tulle camel", 22, ["Taille unique"]],
  ["Jupe longue en tulle noire", 22, ["Taille unique"]],
  ["Jupe longue camel effet daim", 26, ["XL"]]
];

skirtPreview.forEach(([name, price, sizes], index) => {
  const reference = index + 1;
  const images = [1, 2, 3].map((view) => `photos-jupes/${reference}-${view}.jpg`);
  products.push({
    id: 100 + reference, name, category: "Jupe", price, sizes, images, stockPreview: true,
    image: images[0], imageFit: "contain", label: "APERÇU",
    color: "#342c2b", background: "#eee4d7"
  });
});

const blousePreview = [
  [2, "Haut noir à manches longues", 18, ["Taille unique"]],
  [3, "Haut beige à manches longues", 18, ["Taille unique"]],
  [4, "Chemisier blanc à col noué", 20, ["40", "42", "44"]],
  [5, "Chemisier noir à col noué", 20, ["38", "40", "42", "44"]],
  [6, "Haut noir côtelé à col montant", 10, ["Taille unique"]],
  [7, "Haut bordeaux à manches longues", 18, ["Taille unique"]],
  [8, "Body blanc à manches longues", 18, ["Taille unique"]],
  [9, "Body vert kaki à manches longues", 18, ["Taille unique"]],
  [10, "Chemisier noir noué à la taille", 20, ["S", "M", "L", "XL", "XXL", "3XL"]],
  [11, "Chemisier blanc noué à la taille", 20, ["S", "M", "L", "XL", "XXL", "3XL"]],
  [12, "Chemisier bleu clair à manches bouffantes", 20, ["38", "42", "44", "46"]],
  [13, "Chemise longue bleue à fines rayures", 25, ["L", "XL"]],
  [14, "Chemise longue rose à fines rayures", 25, ["S", "M", "L", "XL"]],
  [15, "Chemise jaune à fines rayures et poches", 25, ["S", "M"]],
  [16, "Chemise noire à manches retroussables", 20, ["Taille unique"]],
  [17, "Chemise longue blanche", 22, ["Taille unique"]],
  [18, "Chemise ample bleu roi", 20, ["Taille unique"]],
  [19, "Chemise ample beige", 22, ["Taille unique"]],
  [20, "Chemise longue bleue à rayures", 25, ["Taille unique"]],
  [21, "Chemise ample noire", 22, ["Taille unique"]],
  [22, "Chemisier jaune à manches bouffantes", 20, ["42", "44", "46"]],
  [23, "Chemisier bleu noué à la taille", 20, ["S", "M", "L", "XL", "XXL"]],
  [24, "Chemise longue kaki", 25, ["42", "44", "48", "52"]],
  [25, "Chemise longue bleu clair", 25, ["44", "46", "48", "50", "52"]],
  [26, "Haut beige noué à la taille", 20, ["42", "44", "46"]],
  [27, "Haut noir noué à la taille", 20, ["38", "40", "46"]],
  [31, "Haut jaune pâle cache-cœur", 25, ["S", "M", "L", "XL"]],
  [32, "Haut noir à broderies florales", 25, ["S", "M"]],
  [33, "Chemise à carreaux bleu marine", 25, ["Taille unique"]],
  [34, "Chemise à carreaux bordeaux", 25, ["Taille unique"]]
];

blousePreview.forEach(([reference, name, price, sizes]) => {
  const images = [1, 2, 3].map((view) => `photos-chemisiers/${reference}-${view}.jpg`);
  products.push({
    id: 200 + reference, name, category: "Chemisier", price, sizes, images, stockPreview: true,
    image: images[0], imageFit: "contain", label: "APERÇU",
    color: "#342c2b", background: "#eee4d7"
  });
});

const sweaterPreview = [
  ["Gilet rayé marron et écru à boutons", 18, ["Taille unique"]],
  ["Gilet marron à nœuds noirs", 25, ["Taille unique"]],
  ["Sweat ample marron", 18, ["Taille unique"]],
  ["Sweat ample noir", 18, ["Taille unique"]],
  ["Sweat ample camel", 18, ["Taille unique"]],
  ["Pull jaune à col V et manches courtes", 18, ["Taille unique"]],
  ["Pull rose à col V et manches courtes", 18, ["Taille unique"]],
  ["Pull noir à col V et manches courtes", 18, ["Taille unique"]],
  ["Pull ample camel en maille", 22, ["Taille unique"]],
  ["Pull gris anthracite à col roulé", 22, ["Taille unique"]],
  ["Haut marron à manches longues", 20, ["1", "2"]],
  ["Haut beige à manches longues", 20, ["2"]],
  ["Haut noir à manches longues", 20, ["1", "2"]]
];

sweaterPreview.forEach(([name, price, sizes], index) => {
  const reference = index + 1;
  const images = [1, 2, 3].map((view) => `photos-pulls/${reference}-${view}.jpg`);
  products.push({
    id: 300 + reference, name, category: "Pulls", price, sizes, images, stockPreview: true,
    image: images[0], imageFit: "contain", label: "APERÇU",
    color: "#342c2b", background: "#eee4d7"
  });
});

const trousersPreview = [
  ["Pantalon noir à taille élastique", 22, ["38", "40", "42", "44", "46", "48", "54"]],
  ["Pantalon beige à taille élastique", 22, ["38", "42", "44", "46", "50", "52", "54"]],
  ["Pantalon blanc à taille élastique", 22, ["38", "40", "42", "44", "46", "48", "50", "52", "54"]],
  ["Pantalon large jaune à cordon", 24, ["38", "42", "44", "46", "48"]],
  ["Pantalon large kaki à cordon", 24, ["38", "40", "42", "44"]],
  ["Pantalon large noir à cordon", 22, ["38", "40"]],
  ["Pantalon large beige à cordon blanc", 22, ["Taille unique"]],
  ["Pantalon large beige clair à cordon", 22, ["Taille unique"]],
  ["Pantalon large marron à cordon", 22, ["Taille unique"]],
  ["Pantalon large gris chiné à cordon", 22, ["Taille unique"]],
  ["Pantalon bleu marine à cordon blanc", 22, ["Taille unique"]],
  ["Pantalon droit taupe à cordon", 22, ["Taille unique"]],
  ["Pantalon droit kaki à cordon", 22, ["Taille unique"]],
  ["Jean large à imprimé léopard", 25, ["40", "42"]],
  ["Jean large bleu foncé", 25, ["36", "40", "42"]],
  ["Jean large bleu délavé", 25, ["36", "38"]]
];

trousersPreview.forEach(([name, price, sizes], index) => {
  const reference = index + 1;
  const images = [1, 2, 3].map((view) => `photos-pantalons/${reference}-${view}.jpg`);
  products.push({
    id: 400 + reference, name, category: "Pantalons", price, sizes, images, stockPreview: true,
    image: images[0], imageFit: "contain", label: "APERÇU",
    color: "#342c2b", background: "#eee4d7"
  });
});

const dressPreview = [
  [1, "Robe jaune à pois et volants", 40, ["42", "44"]],
  [2, "Robe satinée prune à col montant", 60, ["38", "40", "42", "44"]],
  [3, "Robe bordeaux à manches bouffantes", 45, ["50", "52", "54"]],
  [4, "Robe noire à manches bouffantes", 45, ["44", "50", "52", "54"]],
  [5, "Robe verte à col montant", 45, ["38", "42", "44"]],
  [6, "Robe jaune à col montant", 45, ["38", "40", "42", "44"]],
  [7, "Robe rose à col montant et volant", 40, ["38", "40", "42", "44"]],
  [8, "Robe jaune à col montant et volant", 40, ["38", "40", "42", "44"]],
  [11, "Robe marron à drapé asymétrique", 45, ["38", "40", "42", "44"]],
  [12, "Robe taupe à drapé asymétrique", 45, ["38", "40", "42", "44"]],
  [13, "Robe noire à boutons et volants", 45, ["38", "40", "42", "44"]],
  [14, "Robe noire à col orné", 40, ["42", "46", "48"]],
  [15, "Robe marron à manches plissées", 40, ["50"]],
  [16, "Robe chemise jaune", 35, ["S", "M", "L", "XL"]],
  [17, "Robe chemise rose", 35, ["S", "M", "L", "XL"]],
  [18, "Robe chemise bleu clair", 35, ["S", "M", "L", "XL"]],
  [19, "Robe noire en maille à col montant", 30, ["50"]],
  [20, "Robe pull noire à col montant", 25, ["Taille unique"]],
  [21, "Robe pull écrue à col montant", 25, ["Taille unique"]],
  [22, "Robe pull beige à col montant", 25, ["Taille unique"]],
  [23, "Robe pull rose fuchsia à col montant", 25, ["Taille unique"]],
  [24, "Robe pull bleue à col montant", 25, ["Taille unique"]],
  [25, "Robe longue noire sans manches", 25, ["Taille unique"]],
  [26, "Robe longue blanche sans manches", 25, ["Taille unique"]],
  [27, "Robe noire zippée à effet cape", 30, ["Taille unique"]],
  [28, "Robe marron zippée à effet cape", 30, ["Taille unique"]],
  [29, "Robe noire zippée à manches contrastées", 30, ["40", "42"]],
  [30, "Robe noire zippée à nouer", 30, ["48", "52"]],
  [31, "Robe bleue zippée à col montant", 30, ["46", "52", "56"]],
  [32, "Robe noire ample à col montant", 30, ["50"]],
  [33, "Robe pull noire ample", 28, ["Taille unique"]],
  [34, "Robe pull marron côtelée", 30, ["Taille unique"]],
  [35, "Robe pull verte côtelée", 30, ["Taille unique"]],
  [36, "Robe pull camel côtelée", 30, ["Taille unique"]],
  [37, "Robe pull bleu roi côtelée", 30, ["Taille unique"]],
  [38, "Robe pull noire côtelée", 30, ["Taille unique"]]
];

dressPreview.forEach(([reference, name, price, sizes]) => {
  const images = [1, 2, 3].map((view) => `photos-robes/${reference}-${view}.jpg`);
  products.push({
    id: 500 + reference, name, category: "Robe", price, sizes, images, stockPreview: true,
    image: images[0], imageFit: "contain", label: "APERÇU",
    color: "#342c2b", background: "#eee4d7"
  });
});

const jacketPreview = [
  ["Veste courte écrue effet fourrure", 30, ["M", "L"]],
  ["Veste longue en jean à capuche", 35, ["38", "40", "42", "44"]],
  ["Cape courte taupe ceinturée", 20, ["Taille unique"]],
  ["Cape courte noire ceinturée", 20, ["Taille unique"]],
  ["Veste blazer camel", 25, ["S", "L", "XL", "XXL"]],
  ["Gilet marron sans manches à boutons dorés", 18, ["S", "M"]],
  ["Veste kaki à capuche et cordon", 25, ["Taille unique"]],
  ["Manteau noir à nouer", 45, ["Taille unique"]],
  ["Manteau marron à nouer", 45, ["Taille unique"]],
  ["Veste zippée kaki à col contrasté", 26, ["Taille unique"]],
  ["Veste longue noire à nouer", 36, ["Taille unique"]],
  ["Veste longue en jean gris ceinturée", 40, ["Taille unique"]],
  ["Veste en jean bleu ceinturée", 28, ["S", "M", "L"]],
  ["Veste en jean bleu sans manches", 28, ["S", "M"]],
  ["Veste courte noire à col croisé", 26, ["Taille unique"]],
  ["Blouson beige zippé", 26, ["Taille unique"]],
  ["Blouson marron zippé", 26, ["Taille unique"]],
  ["Gilet kaki sans manches", 22, ["Taille unique"]],
  ["Gilet gris sans manches", 22, ["Taille unique"]],
  ["Gilet taupe sans manches", 22, ["Taille unique"]],
  ["Gilet beige sans manches effet fourrure", 22, ["M"]],
  ["Veste beige sans manches à nouer", 25, ["Taille unique"]],
  ["Gilet noir sans manches effet fourrure", 22, ["S", "M"]],
  ["Veste courte écrue à boutons", 22, ["Taille unique"]],
  ["Manteau long écru à col montant", 30, ["Taille unique"]],
  ["Manteau long gris à col montant", 30, ["Taille unique"]],
  ["Veste courte noire à boutons contrastés", 22, ["Taille unique"]]
];

jacketPreview.forEach(([name, price, sizes], index) => {
  const reference = index + 1;
  const images = [1, 2, 3].map((view) => `photos-vestes/${reference}-${view}.jpg`);
  products.push({
    id: 600 + reference, name, category: "Veste", price, sizes, images, stockPreview: true,
    image: images[0], imageFit: "contain", label: "APERÇU",
    color: "#342c2b", background: "#eee4d7"
  });
});

const eveningDressPreview = [
  ["Robe de soirée marron à motifs brillants", 70, ["42", "44", "48", "52"]],
  ["Robe de soirée noire à motifs brillants", 70, ["52"]],
  ["Robe de soirée noire plissée à volants", 80, ["38", "40", "42"]],
  ["Robe de soirée champagne à paillettes", 130, ["38", "42", "44"]],
  ["Robe de soirée noire à haut orné", 170, ["48", "50", "52"]],
  ["Robe de soirée écrue à ornements brillants", 170, ["38", "42", "44"]],
  ["Robe de soirée rose à ornements brillants", 170, ["40", "42", "44"]],
  ["Robe de soirée marron à col montant", 60, ["38", "40", "42", "44"]],
  ["Robe de soirée prune drapée à strass", 140, ["38", "40", "42", "44"]],
  ["Robe de soirée bleu marine en dentelle", 130, ["38", "40", "42", "44"]],
  ["Robe de soirée métallisée à drapé", 130, ["38", "40", "42", "44", "46"]]
];

eveningDressPreview.forEach(([name, price, sizes], index) => {
  const reference = index + 1;
  const views = reference === 9 ? [1] : [1, 2, 3];
  const images = views.map((view) => `photos-robes-soiree/${reference}-${view}.jpg`);
  products.push({
    id: 700 + reference, name, category: "Robe de soirée", price, sizes, images, stockPreview: true,
    image: images[0], imageFit: "contain", label: "APERÇU",
    color: "#342c2b", background: "#eee4d7"
  });
});

const outfitPreview = [
  ["Ensemble gris tunique à volant et pantalon", 30, ["46", "48"]],
  ["Ensemble noir tunique à volant et pantalon", 30, ["48", "50"]],
  ["Ensemble beige tunique à volant et pantalon", 30, ["44", "46", "48", "50"]],
  ["Ensemble gris en maille à tunique fendue", 34, ["Taille unique"]],
  ["Ensemble noir à capuche et pantalon", 34, ["Taille unique"]],
  ["Ensemble robe marron et haut blanc", 45, ["38", "40", "42", "44"]],
  ["Ensemble robe bleu marine et haut blanc", 45, ["38", "40", "42", "44"]]
];

outfitPreview.forEach(([name, price, sizes], index) => {
  const reference = index + 1;
  const images = [1, 2, 3].map((view) => `photos-ensembles/${reference}-${view}.jpg`);
  products.push({
    id: 800 + reference, name, category: "Ensembles", price, sizes, images, stockPreview: true,
    image: images[0], imageFit: "contain", label: "APERÇU",
    color: "#342c2b", background: "#eee4d7"
  });
});

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
let selectedColor = "";
let detailTrigger = null;
let selectedImageIndex = 0;
let imageSlideshowTimer;
let imageSwipeStart = null;
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
      <div class="product-visual${product.image ? " has-image" : ""}${product.imageFit === "contain" ? " image-contain" : ""}" style="--product-color:${product.color};--product-bg:${product.background};--skin:${product.skin}">
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
      ${product.stockPreview ? `<div class="product-availability"><p>Tailles : ${product.sizes.join(", ")}</p><p><span class="stock-dot" aria-hidden="true"></span>Stock à confirmer</p></div>` : ""}
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

  const container = document.querySelector("#related-products");
  container.parentElement.hidden = relatedProducts.length === 0;
  container.innerHTML = relatedProducts.map((relatedProduct) => `
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
    const [productId, colorId, size] = key.split("|");
    const product = products.find((item) => item.id === Number(productId));
    const selectedVariant = product.colors?.find((variant) => variant.id === colorId);
    const colorDescription = selectedVariant ? `<p class="cart-product-size">Couleur : ${selectedVariant.name}</p>` : "";
    const sizeDescription = size === "Taille unique" ? "" : `<p class="cart-product-size">Taille : ${size}</p>`;
    return `
      <article class="cart-row">
        <div class="cart-thumb" style="--product-bg:${product.background}" aria-hidden="true"><img src="${product.image}" alt=""></div>
        <div>
          <h3 class="cart-product-name">${product.name}</h3>
          <p class="cart-product-price">${euro(product.price)}</p>
          ${colorDescription}
          ${sizeDescription}
          <div class="quantity-control" aria-label="Quantité de ${product.name}${selectedVariant ? `, couleur ${selectedVariant.name}` : ""}${size === "Taille unique" ? "" : `, taille ${size}`}">
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

function addToCart(product, size, color = "") {
  const key = `${product.id}|${color}|${size}`;
  cart.set(key, (cart.get(key) ?? 0) + 1);
  renderCart();
  const selectedVariant = product.colors?.find((variant) => variant.id === color);
  showToast(`${product.name}${selectedVariant ? ` · ${selectedVariant.name}` : ""} ajouté au panier`);
}

function updateDetailAddButton() {
  const hasSizes = selectedProduct && (selectedProduct.sizes ? selectedProduct.sizes.length > 0 : !oneSizeCategories.has(selectedProduct.category));
  const hasColors = Boolean(selectedProduct?.colors?.length);
  document.querySelector("#detail-add").disabled = Boolean((hasSizes && !selectedSize) || (hasColors && !selectedColor));
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
    const [productId, colorId, size] = key.split("|");
    const product = products.find((item) => item.id === Number(productId));
    const selectedVariant = product.colors?.find((variant) => variant.id === colorId);
    const sizeDescription = size === "Taille unique" ? "Taille unique" : `Taille ${size}`;
    const variantDescription = selectedVariant ? `Couleur ${selectedVariant.name} · ` : "";
    return `<div class="checkout-summary-row"><div><strong>${product.name}</strong><span>${variantDescription}${sizeDescription} · quantité ${count}</span></div><strong>${euro(product.price * count)}</strong></div>`;
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

function showDetailImage(index) {
  if (!selectedProduct?.images?.length) return;
  const images = selectedProduct.images;
  selectedImageIndex = (index + images.length) % images.length;
  const image = document.querySelector("#detail-image");
  image.src = images[selectedImageIndex];
  image.alt = `${selectedProduct.name}, photo ${selectedImageIndex + 1}`;
  document.querySelector("#detail-image-arrows [data-image-direction='-1'] img").src = images[(selectedImageIndex + images.length - 1) % images.length];
  document.querySelector("#detail-image-arrows [data-image-direction='1'] img").src = images[(selectedImageIndex + 1) % images.length];
}

function scheduleImageSlideshow(delay) {
  clearTimeout(imageSlideshowTimer);
  if (!selectedProduct?.images || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  imageSlideshowTimer = setTimeout(() => {
    if (!productDetail.open) return;
    const visual = document.querySelector(".detail-visual");
    if (document.hidden || visual.querySelector(":focus-visible")) {
      scheduleImageSlideshow(1000);
      return;
    }
    showDetailImage(selectedImageIndex + 1);
    scheduleImageSlideshow(5000);
  }, delay);
}

function openProductDetail(productId, trigger) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  const detailAlreadyOpen = productDetail.open;
  clearTimeout(imageSlideshowTimer);
  selectedProduct = product;
  selectedSize = "";
  selectedColor = "";
  if (trigger) detailTrigger = trigger;
  document.querySelector("#detail-image").src = product.image;
  document.querySelector("#detail-image").alt = product.name;
  const hasGallery = product.images?.length > 1;
  document.querySelector("#detail-image-arrows").hidden = !hasGallery;
  document.querySelector(".detail-visual").classList.toggle("gallery-active", hasGallery);
  selectedImageIndex = 0;
  if (hasGallery) showDetailImage(0);
  if (hasGallery) scheduleImageSlideshow(5000);
  document.querySelector(".detail-visual").classList.toggle("image-contain", product.imageFit === "contain");
  document.querySelector("#detail-label").textContent = product.label;
  document.querySelector("#detail-category").textContent = product.displayCategory ?? product.category;
  document.querySelector("#detail-name").textContent = product.name;
  document.querySelector("#detail-price").textContent = euro(product.price);
  const colorPicker = document.querySelector("#detail-color-picker");
  const colorOptions = document.querySelector("#detail-color-options");
  const colorSelection = document.querySelector("#detail-color-selection");
  const sizePicker = document.querySelector("#detail-size-picker");
  const sizeList = document.querySelector("#size-option-list");
  const detailAddButton = document.querySelector("#detail-add");
  const hasSizes = product.sizes ? product.sizes.length > 0 : !oneSizeCategories.has(product.category);
  const hasColors = Boolean(product.colors?.length);
  colorPicker.hidden = !hasColors;
  colorOptions.innerHTML = hasColors ? product.colors.map((variant) => `
    <button class="color-swatch" type="button" data-color="${variant.id}" style="--swatch-color:${variant.hex}" aria-label="${variant.name}" title="${variant.name}" aria-pressed="false"><span class="sr-only">${variant.name}</span></button>
  `).join("") : "";
  colorSelection.textContent = hasColors ? "Choisissez une couleur" : "";
  sizePicker.hidden = !hasSizes;
  sizeList.innerHTML = hasSizes ? (product.sizes ?? clothingSizes).map((size) => `<button class="size-option" type="button" data-size="${size}" aria-pressed="false"${hasColors ? " disabled" : ""}>${size}</button>`).join("") : "";
  document.querySelector("#size-availability").textContent = hasColors
    ? "Choisissez une couleur puis une taille."
    : "Disponibilité à confirmer auprès de la boutique.";
  detailAddButton.disabled = hasSizes || hasColors;
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
  clearTimeout(imageSlideshowTimer);
  imageSwipeStart = null;
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
  addToCart(selectedProduct, selectedSize || "Taille unique", selectedColor);
  productDetail.close();
});

document.querySelector("#detail-image-arrows").addEventListener("click", (event) => {
  const button = event.target.closest("[data-image-direction]");
  if (!button) return;
  showDetailImage(selectedImageIndex + Number(button.dataset.imageDirection));
  scheduleImageSlideshow(20000);
});

const detailVisual = document.querySelector(".detail-visual");
detailVisual.addEventListener("pointerdown", (event) => {
  if (!selectedProduct?.images || event.target !== document.querySelector("#detail-image") || !event.isPrimary) return;
  imageSwipeStart = { x: event.clientX, y: event.clientY, pointerId: event.pointerId };
  detailVisual.setPointerCapture(event.pointerId);
});
detailVisual.addEventListener("pointerup", (event) => {
  if (!imageSwipeStart || event.pointerId !== imageSwipeStart.pointerId) return;
  const deltaX = event.clientX - imageSwipeStart.x;
  const deltaY = event.clientY - imageSwipeStart.y;
  imageSwipeStart = null;
  if (Math.abs(deltaX) < 45 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
  showDetailImage(selectedImageIndex + (deltaX < 0 ? 1 : -1));
  scheduleImageSlideshow(20000);
});
detailVisual.addEventListener("pointercancel", () => {
  imageSwipeStart = null;
});

document.querySelector("#detail-color-options").addEventListener("click", (event) => {
  const colorButton = event.target.closest("[data-color]");
  if (!colorButton || !selectedProduct) return;
  selectedColor = colorButton.dataset.color;
  const selectedVariant = selectedProduct.colors.find((variant) => variant.id === selectedColor);
  document.querySelectorAll(".color-swatch").forEach((button) => {
    const selected = button === colorButton;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  document.querySelector("#detail-image").src = selectedVariant.image;
  document.querySelector("#detail-image").alt = `${selectedProduct.name}, couleur ${selectedVariant.name}`;
  document.querySelector("#detail-color-selection").textContent = selectedVariant.name;
  document.querySelectorAll(".size-option").forEach((button) => {
    button.disabled = false;
  });
  document.querySelector("#size-availability").textContent = selectedSize
    ? `Couleur ${selectedVariant.name} et taille ${selectedSize} sélectionnées · disponibilité à confirmer auprès de la boutique.`
    : `Couleur ${selectedVariant.name} sélectionnée · choisissez une taille.`;
  updateDetailAddButton();
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
  const selectedVariant = selectedProduct.colors?.find((variant) => variant.id === selectedColor);
  document.querySelector("#size-availability").textContent = `${selectedVariant ? `Couleur ${selectedVariant.name} et ` : ""}taille ${selectedSize} sélectionnées · disponibilité à confirmer auprès de la boutique.`;
  updateDetailAddButton();
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
