# Clínica Urgenterap – portada (HTML + CSS + JS)

Estructura: `index.html`, `politica-de-privacidad/index.html`, `css/legal.css`, `css/styles.css`, `js/main.js`, `img/`, `robots.txt`, `sitemap.xml`.
Subir todo a la raíz del sitio (los enlaces a imágenes usan rutas relativas; canonical, Open Graph y schema usan https://clinicaurgenterap.com/).

## Pendiente antes de publicar
- Calificación de Google (4.6): está escrita a mano en `index.html`; actualizarla ahí cuando cambie.
- Profesionales: reemplazar fotos, nombres y especialidades (hay un comentario TODO en `index.html`) y los alt de las fotos.
- Enlaces de reserva de ecografías, dermatología y cardiología si tienen agenda propia.
- Favicon: `img/favicon.ico` es el aportado; si se quieren íconos para móviles, sumar `apple-touch-icon.png` y `favicon-192.png`.
- Imágenes de las tarjetas "Agendarse para…" (`img/acceso-*.jpg/.webp`): son las aportadas (estudios, carnet de salud y psicofísico); se muestran en un recuadro de proporción 6:5.
- `sitemap.xml` lista la portada y la política de privacidad: sumar las demás páginas cuando existan.
- Verificar horarios, teléfono y dirección (están también en el JSON-LD del `<head>`).

## Después de publicar
- Probar en Google Rich Results Test y PageSpeed Insights.
- Dar de alta / verificar el sitio en Google Search Console y enviar el sitemap.
- Confirmar que el perfil de Google Business tenga los mismos datos (nombre, dirección, teléfono, horarios).
