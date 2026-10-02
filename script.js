document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      id: 1,
      title: "Nike Air Jordan High Luxury",
      category: "shoes",
      categoryName: "ფეხსაცმელი",
      price: 480,
      desc: "პრემიუმ ხარისხის ტყავის სპორტული ფეხსაცმელი.",
      img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "კლასიკური შავი პიჯაკი",
      category: "clothes",
      categoryName: "ტანსაცმელი",
      price: 290,
      desc: "დახვეწილი ჭრის ელეგანტური პიჯაკი.",
      img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "სმარტ ყავის აპარატი",
      category: "general",
      categoryName: "საყოფაცხოვრებო",
      price: 350,
      desc: "თანამედროვე დიზაინის ყავის მადუღარა თქვენი სამზარეულოსთვის.",
      img: "https://images.unsplash.com/photo-1517668808822-9ed02ebe2494?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      title: "Adidas Minimalist Sneaker",
      category: "shoes",
      categoryName: "ფეხსაცმელი",
      price: 320,
      desc: "ყოველდღიური მოხერხებული და მსუბუქი ბოტასი.",
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 5,
      title: "ქაშმირის თბილი სვიტერი",
      category: "clothes",
      categoryName: "ტანსაცმელი",
      price: 180,
      desc: "რბილი და თბილი სვიტერი ცივი დღეებისთვის.",
      img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 6,
      title: "არომატული სანთლის ნაკრები",
      category: "general",
      categoryName: "საყოფაცხოვრებო",
      price: 75,
      desc: "ნატურალური ცვილის სანთლები სიმყუდროვისთვის.",
      img: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 7,
      title: "Urban Oversize Hoodie",
      category: "clothes",
      categoryName: "ტანსაცმელი",
      price: 210,
      desc: "თანამედროვე სტილის თავისუფალი ჰუდი ყოველდღიური ჩაცმულობისთვის.",
      img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 8,
      title: "Classic Leather Loafers",
      category: "shoes",
      categoryName: "ფეხსაცმელი",
      price: 410,
      desc: "ელეგანტური ტყავის ლოფერები კლასიკური და ოფიციალური სტილისთვის.",
      img: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=600&q=80"
    }
  ];

  let cart = [];
  let currentCategory = "all";
  let searchQuery = "";

  const productsGrid = document.getElementById("productsGrid");
  const searchInput = document.getElementById("searchInput");
  const catButtons = document.querySelectorAll(".cat-btn");
  const cartBtn = document.getElementById("openCartBtn");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartOverlay = document.getElementById("cartOverlay");
  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotalEl = document.getElementById("cartTotal");
  const cartCountEl = document.getElementById("cartCount");
  const authOverlay = document.getElementById("authOverlay");
  const authDialog = document.getElementById("authDialog");
  const authTitle = document.getElementById("authTitle");
  const authSubtitle = document.getElementById("authSubtitle");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const openAuthBtn = document.getElementById("openAuthBtn");
  const closeAuthBtn = document.getElementById("closeAuthBtn");
  const userProfile = document.getElementById("userProfile");
  const userName = document.getElementById("userName");
  const userAvatar = document.getElementById("userAvatar");
  const logoutBtn = document.getElementById("logoutBtn");

  const USERS_STORAGE_KEY = "luxeUsers";
  const SESSION_STORAGE_KEY = "luxeUser";
  let currentUser = readStoredUser(SESSION_STORAGE_KEY);

  function readStoredUser(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  }

  function getStoredUsers() {
    const users = readStoredUser(USERS_STORAGE_KEY);
    return Array.isArray(users) ? users : [];
  }

  function renderAuthUI() {
    const isLoggedIn = Boolean(
      currentUser && typeof currentUser.name === "string" && typeof currentUser.email === "string"
    );
    if (openAuthBtn) openAuthBtn.hidden = isLoggedIn;
    if (userProfile) userProfile.hidden = !isLoggedIn;
    if (isLoggedIn && userName && userAvatar) {
      userName.textContent = currentUser.name;
      userAvatar.textContent = currentUser.name.trim().charAt(0).toLocaleUpperCase("ka-GE");
    }
  }

  function setAuthMode(mode) {
    const isRegister = mode === "register";
    if (loginForm) loginForm.hidden = isRegister;
    if (registerForm) registerForm.hidden = !isRegister;
    if (authTitle) authTitle.textContent = isRegister ? "შექმენით ანგარიში" : "მოგესალმებით";
    if (authSubtitle) authSubtitle.textContent = isRegister
      ? "შემოუერთდით LUXE-ის მომხმარებლებს"
      : "შედით თქვენს LUXE ანგარიშში";
    if (authDialog) {
      authDialog.classList.remove("switching");
      void authDialog.offsetWidth;
      authDialog.classList.add("switching");
      setTimeout(() => authDialog.classList.remove("switching"), 300);
    }
    const activeForm = isRegister ? registerForm : loginForm;
    activeForm?.querySelector("input")?.focus();
  }

  function openAuth(mode = "login") {
    if (!authOverlay) return;
    setAuthMode(mode);
    authOverlay.classList.add("active");
    authOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeAuth() {
    if (!authOverlay) return;
    authOverlay.classList.remove("active");
    authOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function completeAuthentication(user, message) {
    currentUser = { name: user.name, email: user.email };
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(currentUser));
    renderAuthUI();
    closeAuth();
    showToast(message);
  }

  if (openAuthBtn) openAuthBtn.addEventListener("click", () => openAuth("login"));
  if (closeAuthBtn) closeAuthBtn.addEventListener("click", closeAuth);
  if (authOverlay) {
    authOverlay.addEventListener("click", event => {
      if (event.target === authOverlay) closeAuth();
    });
  }
  document.querySelectorAll("[data-auth-switch]").forEach(button => {
    button.addEventListener("click", () => setAuthMode(button.dataset.authSwitch));
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && authOverlay?.classList.contains("active")) closeAuth();
  });

  if (loginForm) {
    loginForm.addEventListener("submit", event => {
      event.preventDefault();
      const formData = new FormData(loginForm);
      const email = String(formData.get("email") || "").trim().toLowerCase();
      const password = String(formData.get("password") || "");
      if (!email || !password) {
        showToast("შეავსეთ ყველა ველი");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast("შეიყვანეთ სწორი ელფოსტა");
        return;
      }
      const user = getStoredUsers().find(account => account.email === email && account.password === password);
      if (!user) {
        showToast("ელფოსტა ან პაროლი არასწორია");
        return;
      }
      completeAuthentication(user, `მოგესალმებით, ${user.name}!`);
      loginForm.reset();
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", event => {
      event.preventDefault();
      const formData = new FormData(registerForm);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim().toLowerCase();
      const password = String(formData.get("password") || "");
      const confirmPassword = String(formData.get("confirmPassword") || "");
      if (!name || !email || !password || !confirmPassword) {
        showToast("შეავსეთ ყველა ველი");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast("შეიყვანეთ სწორი ელფოსტა");
        return;
      }
      if (password.length < 6) {
        showToast("პაროლი მინიმუმ 6 სიმბოლოს უნდა შეიცავდეს");
        return;
      }
      if (password !== confirmPassword) {
        showToast("პაროლები ერთმანეთს არ ემთხვევა");
        return;
      }
      const users = getStoredUsers();
      if (users.some(account => account.email === email)) {
        showToast("ამ ელფოსტით ანგარიში უკვე არსებობს");
        return;
      }
      const user = { name, email, password };
      users.push(user);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
      completeAuthentication(user, "ანგარიში წარმატებით შეიქმნა");
      registerForm.reset();
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem(SESSION_STORAGE_KEY);
      currentUser = null;
      renderAuthUI();
      showToast("თქვენ გამოხვედით ანგარიშიდან");
    });
  }
  renderAuthUI();

  // პროდუქტების გამოჩენა
  function renderProducts() {
    if (!productsGrid) return;
    productsGrid.innerHTML = "";

    const filtered = products.filter(product => {
      const matchesCategory = currentCategory === "all" || product.category === currentCategory;
      const matchesSearch = product.title.toLowerCase().includes(searchQuery) ||
                            product.categoryName.toLowerCase().includes(searchQuery) ||
                            product.desc.toLowerCase().includes(searchQuery);
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div class="no-results">
          <i class="fa-solid fa-magnifying-glass-minus"></i>
          <h3>პროდუქტი ვერ მოიძებნა</h3>
          <p>სცადეთ სხვა საძიებო სიტყვა ან შეცვალეთ კატეგორია.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <div class="img-wrapper">
          <span class="category-badge">${p.categoryName}</span>
          <img src="${p.img}" alt="${p.title}" class="product-img">
        </div>
        <div class="product-info">
          <h3 class="product-title">${p.title}</h3>
          <p class="product-desc">${p.desc}</p>
          <div class="price-row">
            <span class="price">${p.price} ₾</span>
            <button class="add-btn" data-id="${p.id}">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      `;
      productsGrid.appendChild(card);
    });

    // + ღილაკებზე მოსმენის დამატება
    document.querySelectorAll(".add-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.currentTarget.getAttribute("data-id"));
        addToCart(id);
      });
    });
  }

  // ძებნა
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderProducts();
    });
  }

  // კატეგორიის ღილაკები
  catButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      catButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.dataset.category;
      renderProducts();
    });
  });

  // კალათაში დამატება
  function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    updateCartUI();
    showToast(`${product.title} დაემატა კალათაში`);
  }

  // კალათის განახლება
  function updateCartUI() {
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    if (cartCountEl) cartCountEl.textContent = totalQty;

    if (!cartItemsContainer) return;
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `<p style="text-align:center; color: var(--text-muted); padding-top: 2rem;">კალათა ცარიელია</p>`;
    } else {
      cart.forEach(item => {
        const itemEl = document.createElement("div");
        itemEl.className = "cart-item";
        itemEl.innerHTML = `
          <img src="${item.img}" class="cart-item-img">
          <div class="cart-item-details">
            <div class="cart-item-title">${item.title}</div>
            <div class="cart-item-price">${item.price} ₾</div>
            <div class="quantity-controls">
              <button class="qty-btn minus" data-id="${item.id}">-</button>
              <span>${item.qty}</span>
              <button class="qty-btn plus" data-id="${item.id}">+</button>
            </div>
          </div>
          <button class="remove-btn" data-id="${item.id}">
            <i class="fa-solid fa-trash"></i>
          </button>
        `;
        cartItemsContainer.appendChild(itemEl);
      });

      // კალათის შიდა ღილაკები
      cartItemsContainer.querySelectorAll(".qty-btn.minus").forEach(b => {
        b.addEventListener("click", (e) => changeQty(parseInt(e.target.dataset.id), -1));
      });
      cartItemsContainer.querySelectorAll(".qty-btn.plus").forEach(b => {
        b.addEventListener("click", (e) => changeQty(parseInt(e.target.dataset.id), 1));
      });
      cartItemsContainer.querySelectorAll(".remove-btn").forEach(b => {
        b.addEventListener("click", (e) => {
          const btn = e.currentTarget;
          removeFromCart(parseInt(btn.dataset.id));
        });
      });
    }

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    if (cartTotalEl) cartTotalEl.textContent = `${totalPrice.toFixed(2)} ₾`;
  }

  function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
      item.qty += delta;
      if (item.qty <= 0) {
        removeFromCart(id);
      } else {
        updateCartUI();
      }
    }
  }

  function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
  }

  // კალათის გაღება / დახურვა
  function toggleCart(open) {
    if (cartDrawer && cartOverlay) {
      if (open) {
        cartDrawer.classList.add("active");
        cartOverlay.classList.add("active");
      } else {
        cartDrawer.classList.remove("active");
        cartOverlay.classList.remove("active");
      }
    }
  }

  if (cartBtn) cartBtn.addEventListener("click", () => toggleCart(true));
  if (closeCartBtn) closeCartBtn.addEventListener("click", () => toggleCart(false));
  if (cartOverlay) cartOverlay.addEventListener("click", () => toggleCart(false));

  function showToast(message) {
    const toast = document.getElementById("toast");
    const toastMsg = document.getElementById("toastMsg");
    if (toast && toastMsg) {
      toastMsg.textContent = message;
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 2500);
    }
  }

  // საწყისი გამოძახება
  renderProducts();
});