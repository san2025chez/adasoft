// Script para generar páginas HTML estáticas con metadatos para cada post de blog
const fs = require('fs');
const path = require('path');

// Importar los datos de blog
// Nota: Necesitamos adaptar esto para acceder a tus datos de blog
// Esta es una forma simplificada, ajústala según tu estructura de proyecto
let blogPosts;
try {
  // Intenta cargar el archivo de datos del blog
  blogPosts = require('../src/data/blogData').blogPosts;
} catch (error) {
  console.error('Error al cargar los datos del blog. Por favor verifica la ruta del archivo.');
  console.error(error);
  process.exit(1);
}

// Directorio donde se guardarán las páginas generadas
const outputDir = path.join(__dirname, '../public/blog');

// Asegúrate de que el directorio exista
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// URL base del sitio
const baseUrl = 'https://adasoft.com.ar';

// Plantilla HTML para las páginas de metadatos
const generateMetaPageHtml = (post) => {
  // Asegúrate de que la URL de la imagen sea absoluta
  let imageUrl = post.image;
  if (!imageUrl.startsWith('http')) {
    imageUrl = `${baseUrl}${imageUrl}`;
  }

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="refresh" content="0; url=${baseUrl}/#/blog/${post.id}" />
  
  <!-- AppID para Facebook (obligatorio) -->
  <meta property="fb:app_id" content="2375482829489229" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:url" content="${baseUrl}/blog/${post.id}.html" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${post.title}" />
  <meta property="og:description" content="${post.description}" />
  <meta property="og:image" content="${imageUrl}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="ADASOFT" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${post.title}" />
  <meta name="twitter:description" content="${post.description}" />
  <meta name="twitter:image" content="${imageUrl}" />
  
  <title>${post.title} | ADASOFT</title>
  
  <style>
    body {
      font-family: 'Poppins', Arial, sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background-color: #f8f9fa;
      color: #333;
      text-align: center;
    }
    .container {
      max-width: 800px;
      padding: 20px;
    }
    h1 {
      color: #1976d2;
    }
    p {
      line-height: 1.6;
    }
    .redirect-link {
      margin-top: 20px;
      color: #1976d2;
      text-decoration: none;
      font-weight: bold;
    }
    .redirect-link:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>${post.title}</h1>
    <p>${post.description}</p>
    <a class="redirect-link" href="${baseUrl}/#/blog/${post.id}">
      Continuar al artículo...
    </a>
  </div>
  
  <script>
    // Redirigir al usuario a la página real después de un breve tiempo
    setTimeout(function() {
      window.location.href = "${baseUrl}/#/blog/${post.id}";
    }, 1500);
  </script>
</body>
</html>`;
};

// Generar una página HTML para cada post
blogPosts.forEach(post => {
  const htmlContent = generateMetaPageHtml(post);
  const filePath = path.join(outputDir, `${post.id}.html`);
  
  fs.writeFileSync(filePath, htmlContent);
  console.log(`Generada página de metadatos para el post ID ${post.id}: ${filePath}`);
});

// Crear una página de índice que lista todos los posts
const generateIndexHtml = () => {
  const postsLinks = blogPosts.map(post => 
    `<li><a href="${baseUrl}/blog/${post.id}.html">${post.title}</a></li>`
  ).join('\n      ');

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="refresh" content="0; url=${baseUrl}/#/blog" />
  
  <!-- AppID para Facebook (obligatorio) -->
  <meta property="fb:app_id" content="2375482829489229" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:url" content="${baseUrl}/blog/index.html" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Blog de ADASOFT - Artículos sobre Desarrollo y Tecnología" />
  <meta property="og:description" content="Artículos, consejos y novedades sobre desarrollo de software, diseño web y tecnologías." />
  <meta property="og:image" content="${baseUrl}/images/logotrans2.png" />
  <meta property="og:site_name" content="ADASOFT" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Blog de ADASOFT - Artículos sobre Desarrollo y Tecnología" />
  <meta name="twitter:description" content="Artículos, consejos y novedades sobre desarrollo de software, diseño web y tecnologías." />
  <meta name="twitter:image" content="${baseUrl}/images/logotrans2.png" />
  
  <title>Blog de ADASOFT</title>
  
  <style>
    body {
      font-family: 'Poppins', Arial, sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background-color: #f8f9fa;
      color: #333;
    }
    .container {
      max-width: 800px;
      padding: 20px;
    }
    h1 {
      color: #1976d2;
      text-align: center;
    }
    ul {
      line-height: 1.8;
    }
    a {
      color: #1976d2;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    .redirect-link {
      display: block;
      margin-top: 20px;
      text-align: center;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Blog de ADASOFT</h1>
    <ul>
      ${postsLinks}
    </ul>
    <a class="redirect-link" href="${baseUrl}/#/blog">
      Ver todos los artículos...
    </a>
  </div>
  
  <script>
    // Redirigir al usuario a la página real después de un breve tiempo
    setTimeout(function() {
      window.location.href = "${baseUrl}/#/blog";
    }, 1500);
  </script>
</body>
</html>`;
};

// Generar página de índice
const indexPath = path.join(outputDir, 'index.html');
fs.writeFileSync(indexPath, generateIndexHtml());
console.log(`Generada página de índice de blog: ${indexPath}`);

console.log('¡Generación de páginas de metadatos completada!');
