/* Dashboard sidebar for vendor / rider / admin / customer panels. */
function dashLayout(role, active){
  const items = {
    customer: [
      ['/home', '🏠 Home', 'home'],
      ['/restaurants', '🍔 Restaurants', 'restaurants'],
      ['/orders', '📦 My Orders', 'orders'],
      ['/profile', '👤 Profile', 'profile']
    ],
    vendor: [
      ['/vendor-dashboard','📊 Dashboard','dashboard'],
      ['/vendor-menu','🍽 Menu','menu'],
      ['/vendor-orders','📦 Orders','orders'],
    ],
    rider: [
      ['/rider-dashboard','🛵 Dashboard','dashboard'],
      ['/rider-delivery','📍 Delivery status','delivery'],
    ],
    admin: [
      ['/admin-dashboard','📊 Dashboard','dashboard'],
      ['/admin-vendors','🏪 Vendors','vendors'],
      ['/admin-users','👥 Users & Reviews','users'],
      ['/admin-promotions','🎟 Promotions','promotions'],
    ],
  }[role] || [];
  const title = role.charAt(0).toUpperCase() + role.slice(1);
  return `
  <aside class="dash-side">
    <a href="/landing" class="brand"><span class="logo">Q</span><span>Quick<span class="accent">Eats</span></span></a>
    <div class="section-title">${title} Menu</div>
    <ul class="dash-nav">
      ${items.map(([href,label,key])=>`<li><a href="${href}" class="${key===active?'active':''}">${label}</a></li>`).join('')}
      <li style="margin-top:24px"><a href="#" onclick="Auth.logout();return false;" style="color:var(--danger)">🚪 Logout</a></li>
    </ul>
  </aside>`;
}
