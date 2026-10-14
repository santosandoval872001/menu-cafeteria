
    const IMG = {coco: "img/coco.jpg", lottus: "img/lottus.jpg", pink: "img/pink.jpg", vanilla: "img/vanilla.jpg", cup: "img/cup.jpg", croissant: "img/croissant.jpg", cake: "img/cake.jpg"};

    // ---- EDITA AQUÍ productos y precios ----
    const CATS = [["all", "Todo"], ["bebidas", "Bebidas"], ["signature", "Signature"], ["frappes", "Frappés"], ["comer", "Para comer"]];
    const BEBIDAS = [["Espresó", 25, null], ["Americano", 35, 40], ["Latte", 50, 50], ["Caramel latte", 55, 55], ["Cappuccino", 50, null], ["Moka", 55, 55], ["Chai latte", 60, 60], ["Matcha latte", 55, 60], ["Chocolate", 60, null]];
    const SIG = [
      {n: "Coco Matcha", d: "Agua de coco y foam cremoso de matcha.", i: "coco"},
      {n: "Latte de Lottus", d: "Latte con salsa Lottus, foam cremoso de café y crumble de galleta Lottus.", i: "lottus"},
      {n: "Pink Velvet", d: "Moka blanco con espuma cremosa de Red Velvet y crumble de Red Velvet.", i: "pink"},
      {n: "Vanilla Dream", d: "Latte con foam cremoso de vainilla y un toque de canela o cacao.", i: "vanilla"}];
    const FRAPPES = [
      {n: "Frappeado", p: 65, d: "Clásico · Vainilla · Moka · Caramelo"},
      {n: "Oreo", p: 70, d: "Frappé especial"}, {n: "Lottus", p: 70, d: "Frappé especial"}, {n: "Nutella", p: 70, d: "Frappé especial"}];
    const COMER = [
      {n: "Galleta NY Nutella", p: 35}, {n: "Galleta NY Redvelvet", p: 35},
      {n: "Croissant jamón y queso", p: 65, i: "croissant"}, {n: "Rebanada", p: 55, i: "cake"},
      {n: "Pan del día", d: "Pregunta por la variedad disponible"}];
    // ----------------------------------------

    const $ = s => document.querySelector(s);
    const norm = s => (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let cat = "all", temp = "hot", q = "";

    function row(it) {
      return `<li class="row">${it.i ? `<img class="photo big" src="${IMG[it.i]}" alt="${it.n}" loading="lazy">` : ""}
    <div class="info"><b>${it.n}</b>${it.d ? `<small>${it.d}</small>` : ""}</div>
    <span class="price">${it.p ? "$" + it.p : ""}</span></li>`;
    }
    function sec(title, body) {return `<section><h2>${title}</h2>${body}</section>`;}
    const match = it => !q || norm(it.n + " " + (it.d || "")).includes(q);

    function render() {
      const show = k => cat === "all" || cat === k;
      let h = "";
      if (show("bebidas")) {
        const items = BEBIDAS.map(([n, hot, cold]) => ({n, p: temp === "hot" ? hot : cold, key: n + (temp === "hot" ? " (caliente)" : " (frío)")})).filter(i => i.p && match(i));
        if (items.length) h += sec(temp === "hot" ? "Bebidas calientes" : "Bebidas frías <small>(a las rocas)</small>", `<ul class="list">${items.map(row).join("")}</ul>${temp === "hot" && !q ? `<img class="photo cup" src="${IMG.cup}" alt="Taza de latte art Vebo Coffee">` : ""}`);
      }
      if (show("signature")) {
        const items = SIG.filter(match);
        if (items.length) h += sec("Signature drinks", `<div class="cards">${items.map(d => `<article class="card"><img class="photo" src="${IMG[d.i]}" alt="${d.n}" loading="lazy"><div class="top"><span>${d.n}</span><span>$70</span></div><p>${d.d}</p></article>`).join("")}</div>`);
      }
      if (show("frappes")) {const i = FRAPPES.filter(match); if (i.length) h += sec("Frappés y especiales", `<ul class="list">${i.map(row).join("")}</ul>`);}
      if (show("comer")) {const i = COMER.filter(match); if (i.length) h += sec("Para comer", `<ul class="list">${i.map(row).join("")}</ul>`);}
      $("#menu").innerHTML = h || `<p class="empty">No encontramos "${q}". Prueba con otra palabra.</p>`;
      $("#chips").innerHTML = CATS.map(([k, t]) => `<button class="chip" data-cat="${k}" aria-pressed="${k === cat}">${t}</button>`).join("");
      $("#temp").classList.toggle("cold", temp === "cold");
      document.querySelectorAll("#temp button").forEach(b => b.setAttribute("aria-pressed", b.dataset.t === temp));
    }

    document.addEventListener("click", e => {
      const c = e.target.closest("[data-cat]"); if (c) {cat = c.dataset.cat; render(); return;}
      const t = e.target.closest("#temp button"); if (t) {temp = t.dataset.t; render(); return;}
    });
    $("#q").addEventListener("input", e => {q = norm(e.target.value.trim()); render();});
    render();
