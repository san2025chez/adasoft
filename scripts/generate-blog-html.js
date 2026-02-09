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
  // Asegurarse de que la URL de la imagen sea absoluta y HTTPS
  let imageUrl = post.image;
  if (!post.image.startsWith('http')) {
    // Asegurar que la ruta comience con /
    const imagePath = post.image.startsWith('/') ? post.image : `/${post.image}`;
    imageUrl = `https://adasoft.com.ar${imagePath}`;
  }
  // Forzar HTTPS
  if (imageUrl.startsWith('http://')) {
    imageUrl = imageUrl.replace('http://', 'https://');
  }
  
  // Obtener dimensiones reales de la imagen (usar valores por defecto si no se pueden obtener)
  // Dimensiones específicas por imagen para que coincidan con las reales
  const imageDimensions = {
    '/images/oficios.png': { width: 1024, height: 630 },
    '/images/make-vs-n8n.jpg': { width: 1200, height: 628 },
    '/images/web-ia.jpg': { width: 1200, height: 630 },
    '/images/blog-2.jpg': { width: 1200, height: 630 },
    '/images/blog-3.jpg': { width: 1200, height: 630 },
    '/images/gmail.webp': { width: 1200, height: 630 }
  };
  
  const imagePath = post.image.startsWith('/') ? post.image : `/${post.image}`;
  const dimensions = imageDimensions[imagePath] || { width: 1200, height: 630 };
  
  // Preparar descripción mejorada para compartir (sin hashtags y con "Continuar leyendo")
  const shareDescription = `${post.description.split('#')[0].trim()} - Continuar leyendo →`;
  
  // URL para compartir (HTML estático que WhatsApp puede leer)
  const shareUrl = `https://adasoft.com.ar/blog/${post.id}.html`;
  // URL canónica con hash router para SEO
  const canonicalUrl = `https://adasoft.com.ar/#/blog/${post.id}`;

  // Crear contenido HTML con las meta etiquetas de Open Graph correctas
  const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${post.title} | ADASOFT - Desarrollo de Software y Diseño Web</title>
  <meta name="description" content="${shareDescription}" />
  
  <!-- Canonical URL - usar URL con hash para SEO -->
  <link rel="canonical" href="${canonicalUrl}" />
  
  <!-- Open Graph / Facebook Meta Tags - Usado por Facebook, Instagram, LinkedIn y WhatsApp -->
  <meta property="og:url" content="${shareUrl}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${post.title}" />
  <meta property="og:description" content="${shareDescription}" />
  <meta property="og:image" content="${imageUrl}" />
  <meta property="og:image:secure_url" content="${imageUrl}" />
  <meta property="og:image:type" content="${imagePath.endsWith('.png') ? 'image/png' : 'image/jpeg'}" />
  <meta property="og:image:width" content="${dimensions.width}" />
  <meta property="og:image:height" content="${dimensions.height}" />
  <meta property="og:image:alt" content="${post.title}" />
  <meta property="og:site_name" content="ADASOFT" />
  <meta property="og:locale" content="es_AR" />
  <meta property="fb:app_id" content="2375482829489229" />
  <meta property="article:author" content="ADASOFT" />
  
  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@adasoft" />
  <meta name="twitter:creator" content="@adasoft" />
  <meta name="twitter:title" content="${post.title}" />
  <meta name="twitter:description" content="${shareDescription}" />
  <meta name="twitter:image" content="${imageUrl}" />
  <meta name="twitter:image:alt" content="${post.title}" />

  <style>
    body {
      font-family: 'Poppins', Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      line-height: 1.6;
    }
    .container {
      text-align: center;
      margin-top: 40px;
    }
    .blog-image {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 20px 0;
    }
    .title {
      color: #333;
      font-size: 28px;
    }
    .description {
      color: #666;
      font-size: 18px;
      margin-bottom: 30px;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background-color: #1976d2;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-weight: 500;
      transition: background-color 0.3s;
    }
    .button:hover {
      background-color: #1565c0;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1 class="title">${post.title}</h1>
    <p class="description">${post.description}</p>
    <img src="${imageUrl}" alt="${post.title}" class="blog-image">
    <p>Este es un artículo del blog de ADASOFT. Para una mejor experiencia, accede a nuestra web:</p>
    <a href="https://adasoft.com.ar/#/blog/${post.id}" class="button" id="blog-link">Ver artículo completo</a>
  </div>
  <script>
    // Detectar si es un bot de redes sociales (no redirigir automáticamente)
    const isBot = /bot|crawler|spider|crawling|facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|Discordbot|TelegramBot|Pinterest|Slackbot/i.test(navigator.userAgent);
    
    // URL del blog post
    const blogUrl = "https://adasoft.com.ar/#/blog/${post.id}";
    
    // Función para redirigir al blog post de forma robusta
    function redirectToBlog() {
      // Intentar múltiples métodos para asegurar que funcione
      try {
        // Método 1: window.location.href (más compatible)
        window.location.href = blogUrl;
      } catch(e) {
        try {
          // Método 2: window.location.replace (fallback)
          window.location.replace(blogUrl);
        } catch(e2) {
          // Método 3: window.open como último recurso
          window.open(blogUrl, '_self');
        }
      }
    }
    
    // Si no es un bot, redirigir automáticamente después de un tiempo
    if (!isBot) {
      // Redirigir automáticamente después de 2 segundos para que los bots puedan leer los meta tags
      setTimeout(redirectToBlog, 2000);
    }
    
    // Asegurar que el enlace del botón funcione correctamente
    (function() {
      function setupLink() {
        const blogLink = document.getElementById('blog-link');
        if (blogLink) {
          // Remover cualquier listener previo
          const newLink = blogLink.cloneNode(true);
          blogLink.parentNode.replaceChild(newLink, blogLink);
          
          // Agregar el listener al nuevo elemento
          newLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            redirectToBlog();
            return false;
          });
          
          // También configurar el href directamente
          newLink.href = blogUrl;
        }
      }
      
      // Ejecutar cuando el DOM esté listo
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupLink);
      } else {
        setupLink();
      }
    })();
  </script>
</body>
</html>`;

  // Escribir el archivo HTML
  fs.writeFileSync(path.join(outputDir, `${post.id}.html`), htmlContent);
  console.log(`Generado archivo HTML para blog ID: ${post.id}`);
});

console.log('¡Generación de archivos HTML completada!');
