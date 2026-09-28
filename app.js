// NEAR MINI MART — frontend logic. No backend, no storage: the cart lives in memory only.
const $ = (s) => document.querySelector(s);
const money = (n) => `${CONFIG.currency} ${n.toFixed(2)}`;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const byId = (id) => PRODUCTS.find((p) => p.id === id);

let activeCat = "all";
let query = "";
const cart = new Map(); // productId -> quantity

/* ---------- Config-driven static text ---------- */
function applyConfig() {
  document.querySelectorAll("[data-cfg]").forEach((el) => {
    const v = { hours: CONFIG.openingHours, time: CONFIG.deliveryTime, pay: CONFIG.paymentLabel, area: CONFIG.deliveryAreaName,
      phone: CONFIG.contact.phoneDisplay, address: CONFIG.contact.address }[el.dataset.cfg];
    if (v) el.textContent = v;
  });
  $("#clusters").innerHTML = CONFIG.deliveryClusters
    .map((c) => `<li class="flex h-16 w-16 items-center justify-center rounded-2xl bg-white font-display text-3xl font-extrabold text-deep sm:h-20 sm:w-20 sm:text-4xl" aria-label="JLT Cluster ${c}">${c}</li>`).join("");
  $("#clusterText").textContent = CONFIG.deliveryClusters.map((c) => "Cluster " + c).join(", ");
  document.querySelectorAll(".wa-link").forEach((a) => (a.href = waUrl("Hello " + CONFIG.businessName + ", I would like to place an order.")));
  if (CONFIG.contact.mapsLink) { const m = $("#mapsBtn"); m.href = CONFIG.contact.mapsLink; m.classList.remove("hidden"); }
}
const waConfigured = () => /^\d{10,15}$/.test(CONFIG.whatsappNumber);
const waUrl = (text) => `https://wa.me/${waConfigured() ? CONFIG.whatsappNumber : ""}?text=${encodeURIComponent(text)}`;

/* ---------- Categories & catalogue ---------- */
function renderCategoryCards() {
  $("#catCards").innerHTML = CATEGORIES.map((c) => `
    <button data-cat="${c.id}" class="cat-card ${c.tone} flex flex-col items-start gap-2 rounded-2xl p-4 text-left active:scale-[.98] sm:p-5">
      <span class="text-4xl" aria-hidden="true">${c.emoji}</span>
      <span class="font-display text-base font-bold leading-tight text-deep sm:text-lg">${c.name}</span>
      <span class="text-sm text-slate-600">${PRODUCTS.filter((p) => p.category === c.id).length} items</span>
    </button>`).join("");
}
function renderChips() {
  const chips = [{ id: "all", name: "All" }, ...CATEGORIES];
  $("#chips").innerHTML = chips.map((c) => `
    <button data-chip="${c.id}" class="shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold ${c.id === activeCat ? "border-leaf bg-leaf text-white" : "border-slate-200 bg-white text-slate-700"}">${c.name}</button>`).join("");
}
function cardHTML(p) {
  const q = cart.get(p.id) || 0;
  const visual = p.image ? `<img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" class="h-full w-full object-cover" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'text-5xl',textContent:'${p.emoji || "🛒"}'}))">` : `<span class="text-5xl" aria-hidden="true">${p.emoji || "🛒"}</span>`;
  const action = !p.available
    ? `<span class="block rounded-xl bg-slate-100 py-2.5 text-center text-sm font-semibold text-slate-500">Unavailable</span>`
    : q === 0
      ? `<button data-add="${p.id}" class="w-full rounded-xl bg-leaf py-2.5 text-sm font-bold text-white active:bg-deep">Add</button>`
      : `<div class="flex items-center justify-between rounded-xl bg-mint p-1"><button data-dec="${p.id}" class="h-9 w-11 rounded-lg bg-white text-lg font-bold text-deep" aria-label="Decrease ${esc(p.name)}">−</button><span class="font-bold text-deep">${q}</span><button data-inc="${p.id}" class="h-9 w-11 rounded-lg bg-leaf text-lg font-bold text-white" aria-label="Increase ${esc(p.name)}">+</button></div>`;
  return `<article class="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
    <div class="flex aspect-[4/3] items-center justify-center overflow-hidden bg-mint">${visual}</div>
    <div class="flex flex-1 flex-col gap-1 p-3"><h3 class="font-semibold leading-snug text-slate-900">${esc(p.name)}</h3>
    ${p.description ? `<p class="text-xs text-slate-500">${esc(p.description)}</p>` : ""}
    <p class="mb-2 font-display text-lg font-extrabold text-deep">${money(p.price)}</p><div class="mt-auto">${action}</div></div></article>`;
}
function renderGrid() {
  const t = query.trim().toLowerCase();
  const list = PRODUCTS.filter((p) => (activeCat === "all" || p.category === activeCat) && (!t || p.name.toLowerCase().includes(t)));
  $("#grid").innerHTML = list.map(cardHTML).join("");
  $("#empty").classList.toggle("hidden", list.length > 0);
}

/* ---------- Cart ---------- */
const totals = () => { let qty = 0, sum = 0; cart.forEach((q, id) => { qty += q; sum += q * byId(id).price; }); return { qty, sum }; };
function setQty(id, q) { q <= 0 ? cart.delete(id) : cart.set(id, q); update(); }
function update() {
  const { qty, sum } = totals();
  $("#cartBar").classList.toggle("translate-y-full", qty === 0);
  $("#cartBarText").textContent = `Cart · ${qty} item${qty === 1 ? "" : "s"} · ${money(sum)}`;
  $("#fab").classList.toggle("bottom-24", qty > 0); $("#fab").classList.toggle("bottom-5", qty === 0);
  renderGrid(); renderCart();
}
function renderCart() {
  const { qty, sum } = totals();
  $("#cartEmpty").classList.toggle("hidden", qty > 0);
  $("#checkoutBox").classList.toggle("hidden", qty === 0);
  $("#cartItems").innerHTML = [...cart].map(([id, q]) => { const p = byId(id); return `
    <li class="flex items-center gap-3 py-3"><span class="text-3xl" aria-hidden="true">${p.emoji || "🛒"}</span>
      <div class="min-w-0 flex-1"><p class="truncate font-semibold">${esc(p.name)}</p><p class="text-sm text-slate-500">${money(p.price)} · ${money(p.price * q)}</p></div>
      <div class="flex items-center gap-1"><button data-dec="${id}" class="h-10 w-10 rounded-lg bg-slate-100 text-lg font-bold" aria-label="Decrease ${esc(p.name)}">−</button><span class="w-6 text-center font-bold">${q}</span><button data-inc="${id}" class="h-10 w-10 rounded-lg bg-leaf text-lg font-bold text-white" aria-label="Increase ${esc(p.name)}">+</button></div>
      <button data-rm="${id}" class="h-10 w-10 text-slate-400" aria-label="Remove ${esc(p.name)}">✕</button></li>`; }).join("");
  $("#subtotal").textContent = money(sum); $("#totalQty").textContent = qty;
}
function openCart(open) {
  $("#drawer").classList.toggle("translate-x-full", !open);
  $("#overlay").classList.toggle("hidden", !open);
  document.body.classList.toggle("overflow-hidden", open);
  if (open) renderCart();
}

/* ---------- WhatsApp message ---------- */
function buildMessage(f) {
  const { sum } = totals();
  const lines = [...cart].map(([id, q]) => { const p = byId(id); return `${p.name} x ${q} — ${money(p.price * q)}`; });
  return [
    `Hello ${CONFIG.businessName},`, "", "I would like to place an order:", "", ...lines, "",
    `Subtotal: ${money(sum)}`, "",
    `Customer Name: ${f.name}`,
    `Delivery Location: ${f.location}, ${f.building}, ${f.unit}`,
    `Phone: ${f.phone}`,
    ...(f.notes ? [`Notes: ${f.notes}`] : []), "",
    `Delivery: ${CONFIG.deliveryFeeLabel}`, `Payment: ${CONFIG.paymentLabel}`, "",
    "Please confirm my order."
  ].join("\n");
}
function submitOrder(e) {
  e.preventDefault();
  if (cart.size === 0) return;
  const d = new FormData(e.target), f = Object.fromEntries([...d].map(([k, v]) => [k, String(v).trim()]));
  if (!/^[+\d][\d\s-]{6,}$/.test(f.phone)) { $("#phoneErr").classList.remove("hidden"); $("#phone").focus(); return; }
  $("#phoneErr").classList.add("hidden");
  $("#waNotice").classList.toggle("hidden", waConfigured());
  window.open(waUrl(buildMessage(f)), "_blank", "noopener");
}

/* ---------- Events ---------- */
function goProducts(cat) { activeCat = cat; renderChips(); renderGrid(); $("#products").scrollIntoView({ behavior: "smooth" }); }
document.addEventListener("click", (e) => {
  const t = e.target.closest("button"); if (!t) return;
  const d = t.dataset;
  if (d.add) setQty(+d.add, 1);
  else if (d.inc) setQty(+d.inc, (cart.get(+d.inc) || 0) + 1);
  else if (d.dec) setQty(+d.dec, (cart.get(+d.dec) || 0) - 1);
  else if (d.rm) setQty(+d.rm, 0);
  else if (d.cat) goProducts(d.cat);
  else if (d.chip) { activeCat = d.chip; renderChips(); renderGrid(); }
});
$("#cartBar").addEventListener("click", () => openCart(true));
$("#closeCart").addEventListener("click", () => openCart(false));
$("#overlay").addEventListener("click", () => openCart(false));
document.addEventListener("keydown", (e) => e.key === "Escape" && openCart(false));
$("#search").addEventListener("input", (e) => { query = e.target.value; renderGrid(); });
$("#orderForm").addEventListener("submit", submitOrder);

applyConfig(); renderCategoryCards(); renderChips(); update();
