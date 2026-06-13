/* ============================================================
   CONFIGURACIÓN — EDITA AQUÍ TODOS TUS DATOS
   ============================================================ */
const CONFIG = {
  // --- Pareja (compartido) ---
  nombre1: "Julián",
  nombre2: "Valentina",
  hashtag: "#NuestraBodaEnCaña",
  fechaCorta: "28 · Junio · 2026",
  lugarCorto: "Caña · Bogotá",

  // --- Lugar (compartido) ---
  donde: "Caña — La Casa Negra · Calle 54a #4-26, Bogotá",
  lugarTexto: "Un bar con alma en el corazón de Bogotá. Calle 54a #4-26.",
  mapaUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Calle 54a #4-26, Bogotá, Colombia 110231"),

  // --- Dress code (compartido) ---
  dress:
    "Elegante pero relajado. Sácale brillo a tu mejor versión: vestidos de cóctel, " +
    "trajes, looks con personalidad. Sin afanes y con mucho estilo.",

  // --- RSVP (compartido) ---
  rsvpFecha: "1 de junio",
  whatsapp: "573138282536",   // ← número con código de país, sin + ni espacios

  // ====== TEXTOS POR VISTA ======
  vistas: {
    // -------- Invitados a la BODA (5 p.m. a 2 a.m.) --------
    ceremonia: {
      heroEyebrow: "",
      heroKicker: "Nos casamos",
      introScript: "Te esperamos",
      intro:
        "Después de mucho camino juntos, queremos celebrar nuestro amor rodeados de " +
        "la gente que más queremos. Sin protocolos, con buena música y mejores tragos.",
      eventTag: "La boda",
      eventTitle: "El gran día",
      cuando: "Domingo 28 de junio, 2026 · de 5:00 p.m. a 2:00 a.m.",
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
      eventTag: "La fiesta",
      eventTitle: "¡A celebrar!",
      cuando: "Domingo 28 de junio, 2026 · desde las 10:00 p.m. hasta las 2:00 a.m.",
      rsvpTexto:
        "Para tenerlo todo listo, te pedimos confirmar antes del " +
        "<strong>1 de junio</strong>. ¡Avísanos que vienes!",
      waMensaje: "¡Hola! Confirmo mi asistencia a la fiesta de Julián y Valentina. 🥂",
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

// En la fiesta (one-pager, sin sección de lugar) añadimos el mapa junto a la dirección
if (esFiesta) {
  DATA.donde =
    `${CONFIG.donde} — <a class="maplink" href="${CONFIG.mapaUrl}" target="_blank" rel="noopener">Ver mapa</a>`;
}

// --- 2. Rellenar textos ---
document.querySelectorAll("[data-config]").forEach((el) => {
  const key = el.getAttribute("data-config");
  if (DATA[key] != null) el.innerHTML = DATA[key];
});
document.querySelectorAll("[data-config-href]").forEach((el) => {
  const key = el.getAttribute("data-config-href");
  if (DATA[key] != null) el.setAttribute("href", DATA[key]);
});

// --- 3. Ocultar secciones exclusivas de la boda en la vista de fiesta ---
if (esFiesta) {
  document.querySelectorAll(".only-ceremonia, .hide-fiesta").forEach((el) => el.remove());
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
