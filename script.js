/* ============================================================
   CONFIGURACIÓN — EDITA AQUÍ TODOS TUS DATOS
   ------------------------------------------------------------
   Cambia los valores entre comillas. Eso es todo.
   ============================================================ */
const CONFIG = {
  // --- Pareja ---
  nombre1: "Julián",
  nombre2: "Valentina",
  hashtag: "#NuestraBodaEnCaña",

  // --- Portada ---
  fechaCorta: "28 · Junio · 2026",
  lugarCorto: "Caña · Bogotá",

  // --- Intro ---
  intro:
    "Después de mucho camino juntos, queremos celebrar nuestro amor rodeados de " +
    "la gente que más queremos. Será una tarde sin protocolos, con buena música, " +
    "buenos tragos y mejor compañía. Nos encantaría que seas parte de ella.",

  // --- Ceremonia ---
  ceremoniaFecha: "Domingo 28 de junio, 2026 · 5:00 p.m.",
  ceremoniaLugar: "Caña — La Casa Negra, Bogotá",
  ceremoniaOficia: "Una sacerdotisa amiga, en una ceremonia íntima y a nuestra manera",
  ceremoniaNota:
    "Llega con tiempo: la ceremonia empieza puntual y queremos que no te pierdas ni un instante.",

  // --- Fiesta ---
  fiestaFecha: "Domingo 28 de junio, 2026 · desde las 10:00 p.m.",
  fiestaLugar: "Caña — La Casa Negra, Bogotá",
  fiestaQue: "Cócteles, música y baile hasta tarde",

  // --- Nota de acompañantes (solo invitación de ceremonia) ---
  plusOne:
    "La ceremonia es un momento muy íntimo, así que la reservamos solo para ti — " +
    "sin acompañantes. Pero no te preocupes: te regalamos una " +
    "<strong>invitación extra para la fiesta</strong>, para que tu +1 llegue a " +
    "celebrar con nosotros apenas empiece la rumba.",

  // --- Dress code ---
  dress:
    "Elegante pero relajado. Sácale brillo a tu mejor versión: vestidos de cóctel, " +
    "trajes, looks con personalidad. Sin afanes y con mucho estilo.",

  // --- Lugar ---
  lugarTexto:
    "Un bar con alma en el corazón de Bogotá. Aquí nos daremos el sí y aquí mismo " +
    "seguiremos la fiesta.",
  mapaUrl: "https://www.instagram.com/lacasanegra.bog/",   // ← perfil del lugar

  // --- RSVP ---
  rsvpTexto:
    "Para organizarlo todo con cariño, te pedimos confirmar antes del " +
    "<strong data-config=\"rsvpFecha\">1 de noviembre</strong>. ¡Escríbenos!",
  rsvpFecha: "1 de noviembre",
  whatsapp: "573138282536",   // ← número con código de país, sin + ni espacios

  // --- Textos del badge según el tipo de invitación ---
  badgeCeremonia: "Tu invitación incluye la ceremonia y la fiesta.",
  badgeFiesta: "Tu invitación es para la celebración.",
};

/* ============================================================
   No necesitas tocar nada debajo de esta línea.
   ============================================================ */

// --- 1. Rellenar textos desde CONFIG ---
document.querySelectorAll("[data-config]").forEach((el) => {
  const key = el.getAttribute("data-config");
  if (CONFIG[key] != null) el.innerHTML = CONFIG[key];
});
document.querySelectorAll("[data-config-href]").forEach((el) => {
  const key = el.getAttribute("data-config-href");
  if (CONFIG[key] != null) el.setAttribute("href", CONFIG[key]);
});

// --- 2. Tipo de invitación según la URL (?invitacion=ceremonia | fiesta) ---
const params = new URLSearchParams(window.location.search);
const tipo = (params.get("invitacion") || "ceremonia").toLowerCase();
const esFiesta = tipo === "fiesta";

document.body.dataset.invite = esFiesta ? "fiesta" : "ceremonia";

// Ocultar secciones exclusivas de ceremonia para los invitados de fiesta
if (esFiesta) {
  document.querySelectorAll(".only-ceremonia").forEach((el) => el.remove());
}

// Badge informativo
const badge = document.querySelector("[data-invite-badge]");
if (badge) badge.textContent = esFiesta ? CONFIG.badgeFiesta : CONFIG.badgeCeremonia;

// --- 3. Enlaces de RSVP por WhatsApp (mensaje prellenado) ---
const nombres = `${CONFIG.nombre1} y ${CONFIG.nombre2}`;
const mensaje = esFiesta
  ? `¡Hola! Confirmo mi asistencia a la fiesta de ${nombres}. 🥂`
  : `¡Hola! Confirmo mi asistencia a la boda de ${nombres}. 💍`;
const waLink = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`;
document.querySelectorAll("[data-rsvp-link]").forEach((el) => el.setAttribute("href", waLink));

// --- 4. Revelado suave al hacer scroll ---
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-visible"));
}
