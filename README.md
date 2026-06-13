# Invitación de boda · Caña, Bogotá

Página web vintage para la boda, en español. Sin dependencias ni build: son tres
archivos estáticos que funcionan abriendo `index.html` o subiéndolos a cualquier hosting.

## ✏️ Cómo personalizarla

Abre **`script.js`** y edita el bloque `CONFIG` al inicio (nombres, fecha, dirección,
mapa, número de WhatsApp, etc.). No hace falta tocar nada más.

Reemplaza especialmente:
- `nombre2` → el nombre de tu pareja
- `ceremoniaLugar` / `fiestaLugar` → la dirección real de Caña
- `mapaUrl` → enlace de Google Maps
- `whatsapp` → tu número con código de país, sin `+` ni espacios (ej. `573001112233`)
- fechas y horas

## 💌 Las dos invitaciones (un solo sitio, dos enlaces)

La misma página se adapta según un parámetro en la URL. Envía el enlace que
corresponda a cada grupo:

| Invitado | Enlace a compartir | Qué ve |
|----------|--------------------|--------|
| **Ceremonia** | `…/index.html?invitacion=ceremonia` | Ceremonia + fiesta, dress code y la nota del +1 |
| **Solo fiesta** | `…/index.html?invitacion=fiesta` | Solo la celebración y el dress code |

> Si abren la página sin parámetro, por defecto muestra la invitación de **ceremonia**.

La nota de acompañantes (no hay +1 en la ceremonia, pero sí una invitación extra
para la fiesta) aparece **solo** en la invitación de ceremonia.

## 🚀 Publicarla

Cualquiera de estas opciones funciona (gratis):
- **Netlify Drop**: arrastra la carpeta a https://app.netlify.com/drop
- **GitHub Pages**: sube los archivos y activa Pages
- **Vercel**: `vercel` en la carpeta

## 📁 Archivos
- `index.html` — estructura y contenido
- `styles.css` — diseño vintage
- `script.js` — configuración + lógica de las dos invitaciones
