/**
 * Script para generar archivos HTML estáticos para cada entrada de blog
 * Esto permitirá que Facebook y otras redes sociales vean correctamente las meta etiquetas de Open Graph
 */

const fs = require('fs');
const path = require('path');
const { blogPosts } = require('./blog-data.js');

// Directorio donde se almacenarán los archivos HTML generados
const outputDir = path.resolve(__dirname, '../public/blog');

// Asegurarse de que el directorio existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generar un archivo HTML para cada entrada de blog
blogPosts.forEach(post => {
  // Asegurarse de que la URL de la imagen sea absoluta
  let imageUrl = post.image;
  if (!post.image.startsWith('http')) {
    imageUrl = `https://adasoft.com.ar${post.image}`;
  }

  // Crear contenido HTML con las meta etiquetas de Open Graph correctas
  const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${post.title} | ADASOFT - Desarrollo de Software y Diseño Web</title>
  <meta name="description" content="${post.description}" />
  
  <!-- Canonical URL (apunta a la versión con hash) -->
  <link rel="canonical" href="https://adasoft.com.ar/#/blog/${post.id}" />
  
  <!-- Redirección automática a la versión con hash -->
  <meta http-equiv="refresh" content="0;URL='https://adasoft.com.ar/#/blog/${post.id}'" />
  
  <!-- Open Graph / Facebook Meta Tags -->
  <meta property="og:url" content="https://adasoft.com.ar/#/blog/${post.id}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${post.title}" />
  <meta property="og:description" content="${post.description}" />
  <meta property="og:image" content="${imageUrl}" />
  <meta property="og:image:secure_url" content="${imageUrl}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${post.title}" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:site_name" content="ADASOFT" />
  <meta property="fb:app_id" content="2375482829489229" />
  
  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@adasoft" />
  <meta name="twitter:title" content="${post.title}" />
  <meta name="twitter:description" content="${post.description}" />
  <meta name="twitter:image" content="${imageUrl}" />
  <meta name="twitter:image:alt" content="${post.title}" />
</head>
<body>
  <h1>${post.title}</h1>
  <p>${post.description}</p>
  <p>Redireccionando a la página principal del blog...</p>
  <script>
    window.location.href = "https://adasoft.com.ar/#/blog/${post.id}";
  </script>
</body>
</html>`;

  // Escribir el archivo HTML
  fs.writeFileSync(path.join(outputDir, `${post.id}.html`), htmlContent);
  console.log(`Generado archivo HTML para blog ID: ${post.id}`);
});

console.log('¡Generación de archivos HTML completada!');
