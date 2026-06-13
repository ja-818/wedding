/* ============================================================
   CONFIGURACIÓN — EDITA AQUÍ TODOS TUS DATOS
   ============================================================ */
const CONFIG = {
  // --- Pareja (compartido) ---
  nombre1: "Valentina",
  nombre2: "Julián",
  fechaCorta: "28 de Junio",

  // --- Lugar (compartido) ---
  donde: "Caña — Aguardientería y Bodega · Calle 54a #4-26, Bogotá",
  lugarTexto: "Un bar que nos representa.",
  direccion: "Calle 54a #4-26, Chapinero, Bogotá",
  mapaUrl: "https://maps.app.goo.gl/xLgopQqYxdpxYco28",

  // --- Dress code (compartido) ---
  dressCode: {
    eyebrow: "Código de vestimenta",
    title: "Cóctel",
    avoid: "Por favor, evita usar estos colores",
    swatches: ["#ffffff", "#f1ede1", "#f4eccf", "#f0e1cf", "#cdb38d"],
    options: [
      {
        label: "Opción traje",
        text: "Traje negro, camisa de vestir blanca, corbata opcional y zapatos formales.",
      },
      {
        label: "Opción vestido",
        text: "Vestido tipo cóctel (a la rodilla o midi), conjunto elegante de dos piezas o enterizo elegante con tacones.",
      },
    ],
  },

  // --- RSVP (compartido) ---
  rsvpFecha: "1 de junio",
  whatsapp: "573138282536",   // ← número con código de país, sin + ni espacios

  // ====== TEXTOS POR VISTA ======
  vistas: {
    // -------- Invitados a la BODA (5 p.m. a 2 a.m.) --------
    ceremonia: {
      heroEyebrow: "",
      heroKicker: "Nos casamos",
      introScript: "La invitación",
      intro:
        "<p>Queremos una boda <em>sin</em> formalidades: una noche para disfrutar " +
        "sin afán con las personas que más queremos.</p>" +
        "<p>Elegimos un lugar con carácter, pensado para compartir, conversar, " +
        "brindar, bailar y celebrar juntos.</p>" +
        "<p>Queremos que la noche se sienta cercana, espontánea y auténtica, pero " +
        "también especial. Por eso, el dress code es <strong>Cóctel</strong>: " +
        "elegante, cómodo y con personalidad.</p>",
      cuando: "28 de Junio",
      horario: "5:00 p.m. a 2:00 a.m.",
      barra:
        "De 5 a 10pm tenemos una experiencia etílica y gastronómica completamente " +
        "pensada para ti.<br><br>" +
        "Después de esto, la barra va por cuenta de cada quién.<br><br>" +
        "Enfarrémonos y no te olvides que tu regalo es gastarles algo a los novios!",
      plusOne:
        "Esta invitación es solo para ti — la boda es un momento íntimo y no contamos " +
        "con cupos para acompañantes. Pero tu +1 no se queda por fuera: puede unirse a " +
        "la fiesta <strong>a partir de las 10:00 p.m.</strong>",
      rsvpTexto:
        "Para organizarlo todo con cariño, te pedimos confirmar antes del " +
        "<strong>1 de junio</strong>. ¡Escríbenos!",
      waMensaje: "¡Hola! Confirmo mi asistencia a la boda de Julián y Valentina. 💍",
    },

    // -------- Invitados a la FIESTA (desde las 10 p.m.) --------
    fiesta: {
      heroEyebrow: "Nos casamos y queremos celebrar contigo",
      heroKicker: "La fiesta",
      introScript: "¡Te esperamos en la pista!",
      intro:
        "Nos casamos y la noche apenas empieza. Llégate a brindar, a bailar y a " +
        "celebrar con nosotros hasta tarde. Sin protocolos, puro buen rato.",
      // --- Flyer de fiesta ---
      flyerInvite: "Estás invitad@ a celebrar",
      flyerTag: "La fiesta de la boda",
      flyerCuando: "Domingo 28 de junio",
      flyerHorario: "10:00 p.m. – 2:00 a.m.",
      flyerDonde: "Calle 54a #4-26, Bogotá",
      flyerNote: "La barra va por cuenta de cada quién. Enfarrémonos y no te olvides que tu regalo es gastarles algo a los novios!",
      waMensaje: "¡Hola! Confirmo mi asistencia a la fiesta de Valentina y Julián. 🥂",
    },
  },
};

/* ============================================================
   No necesitas tocar nada debajo de esta línea.
   ============================================================ */

// --- 1. Elegir la vista (?invitacion=ceremonia | fiesta) ---
const params = new URLSearchParams(window.location.search);
const tipo = (params.get("invitacion") || "ceremonia").toLowerCase();
const esFiesta = tipo === "fiesta";
const vista = esFiesta ? CONFIG.vistas.fiesta : CONFIG.vistas.ceremonia;
document.body.dataset.invite = esFiesta ? "fiesta" : "ceremonia";
document.title = `${CONFIG.nombre1} & ${CONFIG.nombre2} · ${esFiesta ? "La fiesta" : "Nuestra boda"}`;

// Mezcla de valores: primero la vista, luego lo compartido
const DATA = Object.assign({}, CONFIG, vista);

// --- 2. Rellenar textos ---
document.querySelectorAll("[data-config]").forEach((el) => {
  const key = el.getAttribute("data-config");
  if (DATA[key] != null) el.innerHTML = DATA[key];
});
document.querySelectorAll("[data-config-href]").forEach((el) => {
  const key = el.getAttribute("data-config-href");
  if (DATA[key] != null) el.setAttribute("href", DATA[key]);
});

// --- 3. Mostrar solo la vista activa (boda completa o flyer de fiesta) ---
if (esFiesta) {
  document.querySelectorAll(".only-boda").forEach((el) => el.remove());
} else {
  document.querySelectorAll(".only-fiesta").forEach((el) => el.remove());
}

// --- 3a. Personalización del invitado (solo boda): ?para=Nombre ---
if (!esFiesta) {
  const raw = (params.get("para") || params.get("nombre") || params.get("name") || "").trim();
  if (raw) {
    const name = raw.charAt(0).toUpperCase() + raw.slice(1);
    document.querySelectorAll("[data-greet]").forEach((el) => {
      el.textContent = `${name}, te esperamos!`;
      el.hidden = false;
    });
    document.title = `${name} · Boda de ${CONFIG.nombre1} & ${CONFIG.nombre2}`;
  }
}

// --- 3b. Dress code (se construye en HTML, tema oscuro) ---
function dressCodeHTML(dc) {
  const swatches = dc.swatches.map((c) => `<span style="--c:${c}"></span>`).join("");
  const options = dc.options
    .map((o) => `<div class="dc__opt"><p class="dc__opt-label">${o.label}</p><p class="dc__opt-text">${o.text}</p></div>`)
    .join("");
  return (
    `<div class="dc">` +
    `<h3 class="dc__title">${dc.title}</h3>` +
    `<div class="dc__rule"></div>` +
    `<p class="dc__avoid">${dc.avoid}</p>` +
    `<div class="dc__swatches">${swatches}</div>` +
    options +
    `</div>`
  );
}
const DC_HTML = dressCodeHTML(CONFIG.dressCode);
document.querySelectorAll("[data-dress-mount]").forEach((el) => { el.innerHTML = DC_HTML; });

// Modal de dress code (vista de fiesta)
const dressModal = document.querySelector("[data-modal]");
if (dressModal) {
  const openModal = () => { dressModal.hidden = false; document.body.style.overflow = "hidden"; };
  const closeModal = () => { dressModal.hidden = true; document.body.style.overflow = ""; };
  document.querySelectorAll("[data-open-dress]").forEach((b) => b.addEventListener("click", openModal));
  dressModal.querySelectorAll("[data-modal-close]").forEach((b) => b.addEventListener("click", closeModal));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !dressModal.hidden) closeModal(); });
}

// --- 4. Enlace a la invitación de la FIESTA (para reenviar al +1) ---
const fiestaUrl = `${window.location.origin}${window.location.pathname}?invitacion=fiesta`;
document.querySelectorAll("[data-fiesta-link]").forEach((el) => el.setAttribute("href", fiestaUrl));

document.querySelectorAll("[data-copy-fiesta]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(fiestaUrl);
    } catch (_) {
      // Fallback simple si el navegador bloquea el portapapeles
      const t = document.createElement("textarea");
      t.value = fiestaUrl; document.body.appendChild(t); t.select();
      document.execCommand("copy"); t.remove();
    }
    const original = btn.textContent;
    btn.textContent = "¡Enlace copiado!";
    btn.classList.add("btn--copied");
    setTimeout(() => { btn.textContent = original; btn.classList.remove("btn--copied"); }, 2200);
  });
});

// --- 5. RSVP por WhatsApp (mensaje prellenado según la vista) ---
const waLink = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(vista.waMensaje)}`;
document.querySelectorAll("[data-rsvp-link]").forEach((el) => el.setAttribute("href", waLink));

// --- 6. Revelado suave al hacer scroll ---
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-visible"));
}
