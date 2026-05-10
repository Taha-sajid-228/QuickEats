/* =========================================================
   QuickEats — Shared utilities
   API client, header/footer injection, cart, auth, toasts.
   ========================================================= */

const API = "/api";

/** Generic fetch helper. */
async function api(path) {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error(`API ${path} failed`);
  return res.json();
}

/* ---------- Toasts ---------- */
function toast(msg, type = "") {
  let el = document.querySelector(".toast");
  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.className = `toast ${type} show`;
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove("show"), 2500);
}

/* ---------- Cart (localStorage) ---------- */
const Cart = {
  key: "qe_cart",
  get() { try { return JSON.parse(localStorage.getItem(this.key)) || []; } catch { return []; } },
  save(items) { localStorage.setItem(this.key, JSON.stringify(items)); updateCartBadge(); },
  count() { return this.get().reduce((s, i) => s + i.qty, 0); },
  total() { return this.get().reduce((s, i) => s + i.qty * i.price, 0); },
  add(item) {
    if (!Auth.user) {
      window.location.href = "/login";
      return;
    }
    const items = this.get();
    const found = items.find((i) => i.id === item.id);
    if (found) found.qty += 1;
    else items.push({ ...item, qty: 1 });
    this.save(items);
    toast(`${item.name} added to cart`, "success");
  },
  setQty(id, qty) {
    let items = this.get();
    if (qty <= 0) items = items.filter((i) => i.id !== id);
    else items = items.map((i) => (i.id === id ? { ...i, qty } : i));
    this.save(items);
  },
  remove(id) { this.save(this.get().filter((i) => i.id !== id)); },
  clear() { this.save([]); },
};

function updateCartBadge() {
  document.querySelectorAll(".cart-badge").forEach((el) => {
    el.setAttribute("data-count", Cart.count());
  });
}

/* ---------- Auth (dummy) ---------- */
const Auth = {
  key: "qe_user",
  get user() { try { return JSON.parse(localStorage.getItem(this.key)); } catch { return null; } },
  login(user) { localStorage.setItem(this.key, JSON.stringify(user)); },
  logout() { localStorage.removeItem(this.key); location.href = "/landing"; },
};

/* ---------- Navbar / Footer injection ---------- */
function renderNavbar(active = "") {
  const user = Auth.user;
  return `
  <header class="navbar">
    <div class="container nav-inner">
      <a href="/landing" class="brand"><span class="logo">Q</span><span>Quick<span class="accent">Eats</span></span></a>
      <nav class="nav-links" id="navLinks">
        <a href="/home" class="${active==='home'?'active':''}">Home</a>
        <a href="/restaurants" class="${active==='restaurants'?'active':''}">Restaurants</a>
        <a href="/orders" class="${active==='orders'?'active':''}">My Orders</a>
        <a href="/profile" class="${active==='profile'?'active':''}">Profile</a>
      </nav>
      <div class="nav-actions">
        <a href="/cart" class="btn btn-ghost btn-sm cart-badge" data-count="0">🛒 Cart</a>
        ${user
          ? `<a href="#" class="btn btn-primary btn-sm" onclick="Auth.logout();return false;">Logout</a>`
          : `<a href="/login" class="btn btn-primary btn-sm">Login</a>`}
        <button class="nav-toggle" onclick="document.getElementById('navLinks').classList.toggle('open')">☰</button>
      </div>
    </div>
  </header>`;
}

function renderFooter() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="brand"><span class="logo">Q</span><span>Quick<span class="accent">Eats</span></span></div>
          <p style="font-size:0.9rem;max-width:280px;">Order from your favorite restaurants and get food delivered fast, hot, and fresh.</p>
        </div>
        <div><h4>Company</h4><ul><li><a href="#">About</a></li><li><a href="#">Careers</a></li><li><a href="#">Press</a></li></ul></div>
        <div><h4>For You</h4><ul><li><a href="/restaurants">Restaurants</a></li><li><a href="/orders">My Orders</a></li><li><a href="#">Promotions</a></li></ul></div>
        <div><h4>Partner</h4><ul><li><a href="/vendor-dashboard">Become a Vendor</a></li><li><a href="/rider-dashboard">Drive with us</a></li><li><a href="/admin-dashboard">Admin</a></li></ul></div>
      </div>
      <div class="footer-bottom">© ${new Date().getFullYear()} QuickEats. All rights reserved.</div>
    </div>
  </footer>`;
}

function mountChrome(active) {
  const navHost = document.getElementById("navbar-host");
  const footHost = document.getElementById("footer-host");
  if (navHost) navHost.innerHTML = renderNavbar(active);
  if (footHost) footHost.innerHTML = renderFooter();
  updateCartBadge();
}

/* ---------- UI helpers ---------- */
function star(n) { return "★".repeat(Math.round(n)) + "☆".repeat(5 - Math.round(n)); }
function money(n) { return `$${n.toFixed(2)}`; }

function restaurantCard(r) {
  return `
  <a href="/restaurant?id=${r.id}" class="card fade-in">
    <div class="card-img"><img src="${r.image}" alt="${r.name}" loading="lazy"></div>
    <div class="card-body">
      <div class="flex between" style="margin-bottom:6px">
        <div class="card-title">${r.name}</div>
        <span class="rating">★ ${r.rating}</span>
      </div>
      <div class="card-meta">
        <span>${r.cuisine}</span>·<span>${r.deliveryTime}</span>·<span>${money(r.deliveryFee)} delivery</span>
      </div>
      <div class="flex" style="margin-top:10px">
        ${r.tags.slice(0,3).map(t=>`<span class="tag">${t}</span>`).join("")}
      </div>
    </div>
  </a>`;
}

function foodCard(f) {
  return `
  <div class="card fade-in">
    <div class="card-img"><img src="${f.image}" alt="${f.name}" loading="lazy"></div>
    <div class="card-body">
      <div class="card-title">${f.name}</div>
      <div class="text-muted" style="font-size:0.85rem;margin:4px 0 12px">${f.description || ''}</div>
      <div class="flex between">
        <strong style="color:var(--primary)">${money(f.price)}</strong>
        <button class="btn btn-primary btn-sm" onclick='Cart.add(${JSON.stringify({id:f.id,name:f.name,price:f.price,image:f.image})})'>+ Add</button>
      </div>
    </div>
  </div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const publicPaths = ["/", "/landing", "/login", "/signup", "/otp", "/home", "/restaurants", "/restaurant"];
  if (!Auth.user && !publicPaths.includes(window.location.pathname)) {
    window.location.href = "/login";
    return;
  }
  updateCartBadge();
});
