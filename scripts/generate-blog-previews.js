/**
 * Script para generar páginas estáticas HTML para blog posts
 * Esto mejora el SEO y la compartibilidad en redes sociales
 */

const fs = require('fs');
const path = require('path');

// Cargamos blogData manualmente (ya que está usando sintaxis ES modules)
const readBlogData = () => {
  console.log('Leyendo datos del blog...');
  
  // Usar datos fallback directamente para evitar problemas de parsing
  return [
    {
      id: 'make-vs-n8n',
      title: '¿Make o n8n? ¿Cuál elegir para automatizar tus flujos de trabajo?',
      subtitle: 'Comparativa detallada entre dos potentes herramientas de automatización',
      date: '14 Mar 2025',
      image: 'https://adasoft.com.ar/images/make-vs-n8n.jpg',
      description: 'Descubre las diferencias clave entre Make o n8n para elegir la mejor herramienta de automatización para tus necesidades. #Automatización #Productividad'
    }
  ];
};

const blogPosts = readBlogData();

// Asegurarse de que el directorio blog existe
const blogDir = path.join(__dirname, '../public/blog');
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true });
}

// Plantilla HTML para cada blog post
const generateHtml = (post) => {
  const baseUrl = 'https://adasoft.com.ar';
  const imageUrl = post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`;
  
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#fff"/>
  
  <!-- SEO Meta Tags -->
  <title>${post.title} | ADASOFT</title>
  <meta name="description" content="${post.description}" />
  <link rel="canonical" href="${baseUrl}/blog/${post.id}" />
  
  <!-- Open Graph / Facebook Meta Tags -->
  <meta property="og:url" content="${baseUrl}/blog/${post.id}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${post.title}" />
  <meta property="og:description" content="${post.description}" />
  <meta property="og:image" content="${imageUrl}" />
  <meta property="og:image:secure_url" content="${imageUrl}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${post.title}" />
  <meta property="og:site_name" content="ADASOFT" />
  <meta property="article:published_time" content="${post.date}" />
  <meta property="article:author" content="ADASOFT" />
  
  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@adasoft" />
  <meta name="twitter:creator" content="@adasoft" />
  <meta name="twitter:url" content="${baseUrl}/blog/${post.id}" />
  <meta name="twitter:title" content="${post.title}" />
  <meta name="twitter:description" content="${post.description}" />
  <meta name="twitter:image" content="${imageUrl}" />
  <meta name="twitter:image:alt" content="${post.title}" />

  <!-- Additional Meta Tags -->
  <meta name="robots" content="index, follow" />
  <meta name="author" content="ADASOFT" />
  <meta name="publisher" content="ADASOFT" />
  
  <!-- Favicon -->
  <link rel="icon" href="/images/logotrans2.png" />
  <link rel="apple-touch-icon" href="/images/logotrans2.png" />
  
  <!-- Redirect script with hash-based routing -->
  <script>
    // Detectar si es un crawler de redes sociales
    const isSocialCrawler = /facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|Discordbot|TelegramBot|Pinterest|Slackbot/i.test(navigator.userAgent);
    
    // Solo redireccionar si NO es un crawler
    if (!isSocialCrawler) {
      // Usar hash-based routing para evitar problemas de redirección
      window.location.replace('/#/blog/${post.id}');
    }
  </script>
  <style>
    body {
      font-family: 'Poppins', sans-serif;
      text-align: center;
      margin: 0;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 40px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    h1 {
      color: #333;
    }
    p {
      color: #555;
      line-height: 1.6;
    }
    .redirect {
      margin-top: 30px;
      color: #888;
      font-style: italic;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>${post.title}</h1>
    <p>${post.description}</p>
    <p class="redirect">Cargando el blog...</p>
    <noscript>
      <p>Esta página requiere JavaScript para funcionar correctamente. Por favor, habilítalo en tu navegador o <a href="${baseUrl}">visita nuestra página principal</a>.</p>
    </noscript>
  </div>
</body>
</html>`;
};

// Generar archivos HTML para cada blog post
blogPosts.forEach(post => {
  try {
    const htmlContent = generateHtml(post);
    const filePath = path.join(blogDir, `${post.id}.html`);
    
    fs.writeFileSync(filePath, htmlContent);
    console.log(`Generado archivo HTML para: ${post.id}`);
  } catch (error) {
    console.error(`Error al generar HTML para ${post.id}:`, error);
  }
});

console.log('Generación de archivos HTML para blog posts completada!');
