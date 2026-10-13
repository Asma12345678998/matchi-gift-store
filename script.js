/* =========================================================
   MATCHI — Luxury Cinematic Gift Store
   ========================================================= */
(() => {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const fmt = (n) => n.toLocaleString("ar-SA");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Product art (inline SVG) ---------- */
  let uid = 0;
  const art = {
    box: (c, u = ++uid) => `
      <svg viewBox="0 0 200 200"><defs><linearGradient id="g${u}" x1="0" x2="1"><stop offset="0" stop-color="#9c7a3c"/><stop offset=".5" stop-color="#f3dfa8"/><stop offset="1" stop-color="#9c7a3c"/></linearGradient></defs>
      <rect x="35" y="80" width="130" height="100" rx="4" fill="${c}"/>
      <rect x="28" y="62" width="144" height="28" rx="4" fill="${c}" stroke="rgba(255,255,255,.08)"/>
      <rect x="92" y="62" width="16" height="118" fill="url(#g${u})"/>
      <path d="M100 62c-20-30-48-22-40-6 6 10 26 8 40 6zm0 0c20-30 48-22 40-6-6 10-26 8-40 6z" fill="none" stroke="url(#g${u})" stroke-width="7" stroke-linejoin="round"/>
      <rect x="35" y="90" width="130" height="6" fill="rgba(0,0,0,.25)"/></svg>`,
    perfume: (c, u = ++uid) => `
      <svg viewBox="0 0 200 200"><defs><linearGradient id="p${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff4d1" stop-opacity=".6"/><stop offset=".4" stop-color="${c}"/><stop offset="1" stop-color="#1a120a"/></linearGradient></defs>
      <rect x="84" y="22" width="32" height="26" rx="3" fill="#d4af6a"/><rect x="80" y="44" width="40" height="10" fill="#9c7a3c"/>
      <path d="M58 70q0-16 16-16h52q16 0 16 16v92q0 18-18 18H76q-18 0-18-18z" fill="url(#p${u})" stroke="#f3dfa8" stroke-opacity=".5"/>
      <rect x="72" y="104" width="56" height="34" rx="2" fill="none" stroke="#f3dfa8" stroke-width="1.5"/>
      <text x="100" y="126" text-anchor="middle" font-family="Cinzel" font-size="13" fill="#f3dfa8">MATCHI</text>
      <path d="M66 70v80" stroke="#fff" stroke-opacity=".25" stroke-width="5" stroke-linecap="round"/></svg>`,
    rose: (c, u = ++uid) => `
      <svg viewBox="0 0 200 200"><path d="M70 120h60l-8 60H78z" fill="#1b1510" stroke="#d4af6a"/>
      <path d="M100 120V86" stroke="#2f5a32" stroke-width="4"/><path d="M100 104q-18-4-22-18 16 0 22 18z" fill="#2f5a32"/>
      <g fill="${c}"><circle cx="100" cy="60" r="30"/></g>
      <g fill="none" stroke="rgba(0,0,0,.35)" stroke-width="2"><path d="M86 52q14-16 28 0"/><path d="M80 64q20 18 40 0"/><path d="M94 58q6-8 12 0q-6 8-12 0"/></g>
      <circle cx="90" cy="48" r="8" fill="#fff" fill-opacity=".15"/><path d="M70 120h60" stroke="#f3dfa8" stroke-width="3"/></svg>`,
    watch: (c, u = ++uid) => `
      <svg viewBox="0 0 200 200"><rect x="78" y="10" width="44" height="60" rx="8" fill="${c}"/><rect x="78" y="130" width="44" height="60" rx="8" fill="${c}"/>
      <circle cx="100" cy="100" r="48" fill="#d4af6a"/><circle cx="100" cy="100" r="40" fill="#0e0b08" stroke="#f3dfa8" stroke-width="2"/>
      <g stroke="#f3dfa8" stroke-width="2"><path d="M100 64v7M100 129v7M64 100h7M129 100h7"/></g>
      <path d="M100 100V76M100 100l16 10" stroke="#f3dfa8" stroke-width="3" stroke-linecap="round"/><circle cx="100" cy="100" r="3" fill="#f3dfa8"/>
      <rect x="146" y="94" width="8" height="12" rx="2" fill="#9c7a3c"/></svg>`,
    candle: (c, u = ++uid) => `
      <svg viewBox="0 0 200 200"><defs><radialGradient id="f${u}"><stop offset="0" stop-color="#fff4d1"/><stop offset=".6" stop-color="#f3b54a"/><stop offset="1" stop-color="#f3b54a" stop-opacity="0"/></radialGradient></defs>
      <circle cx="100" cy="56" r="36" fill="url(#f${u})" opacity=".55"/>
      <path d="M100 40q12 16 0 30q-12-14 0-30z" fill="#ffe7a8"/><path d="M100 70v10" stroke="#222" stroke-width="2"/>
      <rect x="60" y="80" width="80" height="96" rx="10" fill="${c}" stroke="#d4af6a" stroke-width="2"/>
      <ellipse cx="100" cy="82" rx="40" ry="6" fill="rgba(255,255,255,.12)"/>
      <rect x="60" y="120" width="80" height="22" fill="#d4af6a"/><text x="100" y="136" text-anchor="middle" font-family="Cinzel" font-size="11" fill="#1b1510">OUD · AMBER</text></svg>`,
    ring: (c, u = ++uid) => `
      <svg viewBox="0 0 200 200"><path d="M40 120h120v56H40z" fill="${c}"/><path d="M40 120l14-30h92l14 30z" fill="#2a2119"/>
      <rect x="40" y="120" width="120" height="6" fill="#d4af6a"/><ellipse cx="100" cy="122" rx="40" ry="8" fill="#0a0806"/>
      <circle cx="100" cy="104" r="20" fill="none" stroke="#f3dfa8" stroke-width="6"/>
      <path d="M100 66l12 12-12 14-12-14z" fill="#e8f4ff" stroke="#fff"/><path d="M88 78h24" stroke="#9fc6e6"/></svg>`,
  };

  const products = [
    { id: "velvet", name: "صندوق المخمل", desc: "تشكيلة شوكولاتة وورد مجفف", price: 420, cat: "her", tag: "الأكثر طلباً", art: "box", color: "#5a1220", tint: "rgba(160,40,60,.35)" },
    { id: "oud", name: "عطر ليلة العود", desc: "عطر شرقي فاخر ١٠٠ مل", price: 650, cat: "him", tag: "حصري", art: "perfume", color: "#6b3d14", tint: "rgba(212,140,60,.3)" },
    { id: "eternal", name: "الوردة الأبدية", desc: "وردة طبيعية تدوم ٣ سنوات", price: 380, cat: "her", tag: "رومانسي", art: "rose", color: "#b3202f", tint: "rgba(200,40,60,.35)" },
    { id: "chrono", name: "ساعة الزمن الذهبي", desc: "ساعة كلاسيكية مع نقش الاسم", price: 1250, cat: "him", tag: "إصدار محدود", art: "watch", color: "#1b1510", tint: "rgba(212,175,106,.3)" },
    { id: "amber", name: "شمعة العنبر", desc: "شمعة يدوية برائحة العود والعنبر", price: 190, cat: "occasion", tag: "جديد", art: "candle", color: "#1f1712", tint: "rgba(243,181,74,.3)" },
    { id: "diamond", name: "علبة الوعد", desc: "خاتم فضة مطلي بالذهب", price: 980, cat: "her", tag: "للخطوبة", art: "ring", color: "#3a0a14", tint: "rgba(159,198,230,.25)" },
    { id: "noir", name: "صندوق نوار", desc: "قهوة مختصة وأدوات تقديم فاخرة", price: 540, cat: "him", tag: "للرجل", art: "box", color: "#14110e", tint: "rgba(212,175,106,.25)" },
    { id: "celebrate", name: "صندوق الاحتفال", desc: "مثالي للتخرج والمناسبات", price: 460, cat: "occasion", tag: "مناسبات", art: "box", color: "#123a2c", tint: "rgba(60,160,120,.28)" },
  ];
  const signature = { id: "signature", name: "صندوق التوقيع", price: 890, art: "box", color: "#0e0b08", tint: "rgba(212,175,106,.35)" };
  const catalog = Object.fromEntries([...products, signature].map((p) => [p.id, p]));

  /* ---------- Render products ---------- */
  const grid = $("#productGrid");
  grid.innerHTML = products.map((p) => `
    <article class="card" data-cat="${p.cat}">
      <div class="card__inner">
        <div class="card__media" style="--tint:${p.tint}">
          <span class="card__tag">${p.tag}</span>
          ${art[p.art](p.color)}
        </div>
        <div class="card__body">
          <h3 class="card__title">${p.name}</h3>
          <p class="card__desc">${p.desc}</p>
          <div class="card__row">
            <span class="card__price">${fmt(p.price)}<small>ر.س</small></span>
            <button class="card__add" data-add="${p.id}" aria-label="أضف ${p.name} إلى السلة">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="1.6" fill="none"><path d="M12 5v14M5 12h14"/></svg>
            </button>
          </div>
        </div>
      </div>
    </article>`).join("");

  /* ---------- Intro ---------- */
  const intro = $("#intro");
  const count = $("#introCount");
  const startSite = () => {
    intro.classList.add("is-done");
    document.body.classList.remove("is-loading");
    setTimeout(() => document.body.classList.add("is-ready"), 500);
  };
  const runIntro = () => {
    if (reduceMotion) { count.classList.add("is-hidden"); startSite(); return; }
    let n = 3;
    const tick = setInterval(() => {
      n -= 1;
      if (n > 0) { count.textContent = n; return; }
      clearInterval(tick);
      count.classList.add("is-hidden");
      $(".intro__logo").classList.add("is-on");
      setTimeout(startSite, 2000);
    }, 700);
  };
  intro.addEventListener("click", () => { count.classList.add("is-hidden"); startSite(); });
  if (document.readyState === "complete") runIntro();
  else window.addEventListener("load", runIntro);

  /* ---------- Split hero words into letters ---------- */
  $$("[data-split]").forEach((el, wi) => {
    // Arabic letters must stay connected, so animate whole words with staggered delay
    const text = el.textContent;
    el.innerHTML = `<span class="ch" style="transition-delay:${0.25 * wi}s">${text}</span>`;
  });

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in");
      io.unobserve(e.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
  $$(".reveal, .card, .finale").forEach((el) => io.observe(el));
  $$(".card").forEach((c, i) => (c.style.transitionDelay = `${(i % 4) * 0.1}s`));

  /* ---------- Nav ---------- */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  $("#burger").addEventListener("click", () => nav.classList.toggle("is-open"));
  $$("#navLinks a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("is-open")));

  /* ---------- Cursor + magnetic ---------- */
  const cursor = $("#cursor");
  let cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy;
  window.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; });
  (function loop() {
    cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
    cursor.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(loop);
  })();
  document.addEventListener("mouseover", (e) => {
    cursor.classList.toggle("is-hover", !!e.target.closest("a, button, .card, .signature__stage"));
  });

  $$(".magnetic").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    btn.addEventListener("mouseleave", () => (btn.style.transform = ""));
  });

  /* ---------- Hero spotlight + particles ---------- */
  const hero = $("#hero");
  hero.addEventListener("mousemove", (e) => {
    const r = hero.getBoundingClientRect();
    hero.style.setProperty("--mx", `${e.clientX - r.left}px`);
    hero.style.setProperty("--my", `${e.clientY - r.top}px`);
  });

  const canvas = $("#particles");
  const ctx = canvas.getContext("2d");
  let W, H, parts = [];
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = canvas.width = hero.offsetWidth * dpr;
    H = canvas.height = hero.offsetHeight * dpr;
    const n = Math.min(110, Math.floor((hero.offsetWidth * hero.offsetHeight) / 14000));
    parts = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: (Math.random() * 1.8 + 0.3) * dpr,
      vy: -(Math.random() * 0.35 + 0.08) * dpr,
      vx: (Math.random() - 0.5) * 0.15 * dpr,
      a: Math.random() * 0.6 + 0.2, t: Math.random() * Math.PI * 2,
    }));
  };
  resize();
  window.addEventListener("resize", resize);
  let heroVisible = true;
  new IntersectionObserver(([e]) => (heroVisible = e.isIntersecting)).observe(hero);
  (function draw() {
    if (heroVisible && !reduceMotion) {
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy; p.t += 0.02;
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        const alpha = p.a * (0.6 + 0.4 * Math.sin(p.t));
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, `rgba(243,223,168,${alpha})`);
        g.addColorStop(1, "rgba(212,175,106,0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2); ctx.fill();
      }
    }
    requestAnimationFrame(draw);
  })();

  /* ---------- Card tilt ---------- */
  if (matchMedia("(hover: hover)").matches) {
    $$(".card").forEach((card) => {
      const inner = $(".card__inner", card);
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        inner.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
      });
      card.addEventListener("mouseleave", () => (inner.style.transform = ""));
    });
  }

  /* ---------- Filters ---------- */
  $("#filters").addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    $$(".filter").forEach((b) => b.classList.toggle("is-active", b === btn));
    const f = btn.dataset.filter;
    $$(".card").forEach((c) => {
      const show = f === "all" || c.dataset.cat === f;
      c.classList.toggle("is-hidden", !show);
      if (show) { c.classList.remove("is-in"); requestAnimationFrame(() => requestAnimationFrame(() => c.classList.add("is-in"))); }
    });
  });

  /* ---------- Toast ---------- */
  const toast = $("#toast");
  let toastTimer;
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-on"), 2600);
  };

  /* ---------- Cart ---------- */
  const STORE_KEY = "matchi-cart";
  let cart = {};
  try { cart = JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { cart = {}; }
  const save = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify(cart)); } catch { /* ignore */ } };

  const drawer = $("#drawer");
  const badge = $("#cartCount");
  const renderCart = () => {
    const items = Object.entries(cart).filter(([id]) => catalog[id]);
    const qty = items.reduce((s, [, q]) => s + q, 0);
    const total = items.reduce((s, [id, q]) => s + catalog[id].price * q, 0);
    badge.textContent = fmt(qty);
    $("#cartTotal").textContent = `${fmt(total)} ر.س`;
    $("#cartList").innerHTML = items.length
      ? items.map(([id, q]) => {
          const p = catalog[id];
          return `<li class="drawer__item">
            <div class="drawer__thumb" style="--tint:${p.tint}">${art[p.art](p.color)}</div>
            <div><div class="drawer__name">${p.name}</div>
              <div class="drawer__qty"><button data-dec="${id}" aria-label="إنقاص">−</button>${fmt(q)}<button data-inc="${id}" aria-label="زيادة">+</button></div></div>
            <div class="drawer__price">${fmt(p.price * q)}</div>
          </li>`;
        }).join("")
      : `<li class="drawer__empty">السلة فارغة… المشهد بانتظار بطله.</li>`;
  };
  const add = (id) => {
    cart[id] = (cart[id] || 0) + 1;
    save(); renderCart();
    badge.classList.add("bump");
    setTimeout(() => badge.classList.remove("bump"), 400);
    showToast(`✦ أُضيف "${catalog[id].name}" إلى سلّتك`);
  };
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-add]");
    if (a) { add(a.dataset.add); return; }
    const inc = e.target.closest("[data-inc]");
    if (inc) { cart[inc.dataset.inc]++; save(); renderCart(); return; }
    const dec = e.target.closest("[data-dec]");
    if (dec) {
      const id = dec.dataset.dec;
      if (--cart[id] <= 0) delete cart[id];
      save(); renderCart();
    }
  });
  const openDrawer = (open) => { drawer.classList.toggle("is-open", open); drawer.setAttribute("aria-hidden", String(!open)); };
  $("#cartBtn").addEventListener("click", () => openDrawer(true));
  $("#drawerClose").addEventListener("click", () => openDrawer(false));
  drawer.addEventListener("click", (e) => { if (e.target === drawer) openDrawer(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") openDrawer(false); });
  $("#checkoutBtn").addEventListener("click", () => {
    if (!Object.keys(cart).length) { showToast("أضف هدية أولاً لتبدأ القصة"); return; }
    cart = {}; save(); renderCart(); openDrawer(false);
    showToast("✦ تم استلام طلبك — سنتواصل معك قريباً");
  });
  renderCart();

  /* ---------- Signature box ---------- */
  const box = $("#giftBox");
  const stage = $("#boxStage");
  stage.addEventListener("click", () => {
    box.classList.toggle("is-open");
    $(".signature__hint").textContent = box.classList.contains("is-open") ? "اضغط لإغلاق الصندوق" : "اضغط لفتح الصندوق";
  });
  stage.addEventListener("mousemove", (e) => {
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    box.style.setProperty("--ry", `${-35 + x * 50}deg`);
  });
  stage.addEventListener("mouseleave", () => box.style.removeProperty("--ry"));

  /* ---------- Counters ---------- */
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      const t0 = performance.now();
      const dur = 2200;
      const step = (t) => {
        const k = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - k, 4);
        el.textContent = fmt(Math.round(target * eased)) + (k === 1 && target > 1000 ? "+" : "");
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.6 });
  $$("[data-count]").forEach((el) => counterIO.observe(el));

  /* ---------- Reviews slider ---------- */
  const reviews = $$(".review");
  const dots = $("#reviewDots");
  let ri = 0, rTimer;
  dots.innerHTML = reviews.map((_, i) => `<button aria-label="رأي ${i + 1}"${i === 0 ? ' class="is-active"' : ""}></button>`).join("");
  const goReview = (i) => {
    ri = (i + reviews.length) % reviews.length;
    reviews.forEach((r, k) => r.classList.toggle("is-active", k === ri));
    $$("button", dots).forEach((d, k) => d.classList.toggle("is-active", k === ri));
  };
  const autoplay = () => { clearInterval(rTimer); rTimer = setInterval(() => goReview(ri + 1), 5500); };
  dots.addEventListener("click", (e) => {
    const i = $$("button", dots).indexOf(e.target);
    if (i > -1) { goReview(i); autoplay(); }
  });
  autoplay();

  /* ---------- Contact form ---------- */
  $("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = new FormData(e.target).get("name");
    e.target.reset();
    showToast(`✦ شكراً ${name}، سيتواصل معك فريق ماتشي قريباً`);
  });

  $("#year").textContent = new Date().getFullYear();
})();
