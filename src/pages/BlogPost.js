import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Container, Typography, Box, Paper, CardMedia, Stack, Link } from '@mui/material';
import { blogPosts } from '../data/blogData';
import { Helmet } from 'react-helmet-async';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon
} from 'react-share';

// Función personalizada para compartir en Facebook con refresco de caché
const customFacebookShare = (url, quote, callback) => {
  // Si la API de FB está disponible, intentamos refrescar el caché antes de compartir
  if (window.FB) {
    console.log('Intentando refrescar caché de Facebook para:', url);
    try {
      // Primero actualizamos los metadatos en Facebook usando el SDK
      window.FB.api(
        '/me/feed',
        'post',
        {
          message: quote,
          link: url,
          scrape: true
        },
        function(response) {
          if (!response || response.error) {
            console.error('Error al intentar refrescar caché en FB:', response?.error);
            // Usar método de respaldo en caso de error
            if (callback) callback();
          } else {
            console.log('Caché actualizado en Facebook, respuesta:', response);
            if (callback) callback();
          }
        }
      );
    } catch (error) {
      console.error('Error al usar FB SDK:', error);
      if (callback) callback();
    }
  } else {
    console.log('FB SDK no disponible, usando método estándar de compartir');
    if (callback) callback();
  }
};

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const post = blogPosts.find(post => post.id === id);
  
  // Asegurarnos de que las URLs sean absolutas y accesibles
  const baseUrl = 'https://adasoft.com.ar';
  // Usar el formato con hash para que funcione con GitHub Pages y HashRouter
  const shareUrl = `${baseUrl}/#/blog/${id}`;
  
  // URL específica para compartir en Facebook (apunta al HTML estático pre-renderizado)
  const facebookShareUrl = `${baseUrl}/blog/${id}.html`;
  
  // Preparar las variables de imagen SOLO si el post existe
  let imageUrl = '';
  let optimizedImageUrl = '';
  let absoluteImageUrl = '';
  let isoDate = new Date().toISOString();
  const timestamp = new Date().getTime();
  
  // Preparar datos solo si el post existe
  if (post) {
    console.log('Procesando post con ID:', id);
    console.log('Imagen del post:', post.image);
    
    // Aseguramos que la URL de la imagen sea absoluta
    imageUrl = post.image;
    
    // Si la URL no comienza con http, construimos la URL absoluta
    if (!post.image.startsWith('http')) {
      imageUrl = `${baseUrl}${post.image}`;
      console.log('URL relativa detectada, convertida a absoluta:', imageUrl);
    } else {
      console.log('URL ya es absoluta:', imageUrl);
    }
    
    // Para la URL absoluta usada en meta tags, eliminamos cualquier parámetro existente
    // que podría estar causando problemas con las redes sociales
    let cleanImageUrl = imageUrl;
    if (cleanImageUrl.includes('?')) {
      cleanImageUrl = cleanImageUrl.split('?')[0];
      console.log('Limpiando URL de parámetros:', cleanImageUrl);
    }
    
    // Asegurarnos de que la URL absoluta sea correcta para redes sociales
    // Añadir timestamp para evitar caché en Facebook
    const cacheBuster = `?v=${new Date().getTime()}`;
    absoluteImageUrl = cleanImageUrl + cacheBuster;
    console.log('URL absoluta final para meta tags:', absoluteImageUrl);
    
    // Añadimos parámetros para evitar el caché solo para la versión optimizada
    // que se usa dentro de la página
    const sessionTimestamp = localStorage.getItem('sessionTimestamp') || new Date().getTime();
    if (!localStorage.getItem('sessionTimestamp')) {
      localStorage.setItem('sessionTimestamp', sessionTimestamp);
    }
    
    // Creamos la URL optimizada para mostrar en la página
    optimizedImageUrl = `${cleanImageUrl}?v=${sessionTimestamp}&width=1200&height=630&fit=crop`;
    console.log('URL optimizada para visualización:', optimizedImageUrl);
    
    // Crear fecha en formato ISO para Schema.org
    isoDate = post.date ? new Date(post.date).toISOString() : new Date().toISOString();
  }
  
  // IMPORTANTE: Todos los hooks deben ser usados antes de cualquier return condicional
  useEffect(() => {
    // Debug para ayudar en el diagnóstico
    console.log('Cargando blog post:', id);
    console.log('Location:', location.pathname);
    console.log('Post image:', post?.image);
    console.log('Share URL:', shareUrl);
    console.log('Refresh Facebook cache with:', `https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(shareUrl)}`);
    
    // Si no se encuentra el post, redirigir al blog
    if (!post) {
      console.error(`Post no encontrado: ${id}`);
      navigate('/blog');
      return;
    }

    // Precargar la imagen solo si tenemos un post válido
    if (optimizedImageUrl) {
      const preloadImage = new Image();
      preloadImage.src = optimizedImageUrl;
      preloadImage.onload = () => {
        console.log('Imagen precargada correctamente:', optimizedImageUrl);
      };
      preloadImage.onerror = () => {
        console.error('Error al precargar la imagen:', optimizedImageUrl);
      };
    }

    // Actualizar Facebook si está disponible (esto ayuda con FBXML)
    if (typeof window.FB !== 'undefined') {
      window.FB.XFBML.parse();
    }
    
    // Configurar el título del documento
    if (post) {
      document.title = `${post.title} | ADASOFT - Desarrollo de Software y Diseño Web`;
    }
    
    // Forzar refresco de meta tags para redes sociales
    const metaTags = document.getElementsByTagName('meta');
    for (let i = 0; i < metaTags.length; i++) {
      if (metaTags[i].getAttribute('property') === 'og:image' || 
          metaTags[i].getAttribute('name') === 'twitter:image') {
        // No hacemos nada aquí porque ahora usamos optimizedImageUrl en las etiquetas meta
        // que ya incluye el timestamp
      }
    }
  }, [post, shareUrl, id, location, navigate, optimizedImageUrl]);

  // Efecto adicional para forzar la actualización de metatags específicamente para Facebook
  useEffect(() => {
    if (!post) return;
    
    // Este efecto se ejecuta solo una vez cuando se carga el componente
    const forceFacebookUpdate = async () => {
      try {
        // Crear o actualizar dinámicamente el meta tag og:image para Facebook
        let ogImageTag = document.querySelector('meta[property="og:image"]');
        if (!ogImageTag) {
          ogImageTag = document.createElement('meta');
          ogImageTag.setAttribute('property', 'og:image');
          document.head.appendChild(ogImageTag);
        }
        ogImageTag.setAttribute('content', absoluteImageUrl);
        
        console.log('Forzando actualización de meta tag para Facebook:', absoluteImageUrl);
        
        // Esperar para asegurarse de que la imagen se ha cargado correctamente
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            console.log('Imagen verificada y accesible');
            resolve(true);
          };
          img.onerror = () => {
            console.error('Imagen no accesible, Facebook podría usar imagen fallback');
            resolve(false);
          };
          img.src = absoluteImageUrl;
        });
      } catch (error) {
        console.error('Error al forzar actualización para Facebook:', error);
      }
    };
    
    forceFacebookUpdate();
  }, [post, absoluteImageUrl]);

  // Función para forzar la actualización de la caché de Facebook (solo para desarrollo)
  const forceRefreshFacebookCache = () => {
    const debugUrl = `https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(facebookShareUrl)}`;
    window.open(debugUrl, '_blank');
  };

  // Si no hay post, no renderizamos nada (el efecto se encargará de redirigir)
  if (!post) {
    return null;
  }
  
  // Preparar Schema.org JSON-LD para el artículo
  const schemaOrgArticle = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': shareUrl
    },
    'headline': post.title,
    'description': post.description,
    'image': absoluteImageUrl,
    'author': {
      '@type': 'Organization',
      'name': 'ADASOFT',
      'url': 'https://adasoft.com.ar'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'ADASOFT',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://adasoft.com.ar/images/logotrans2.png'
      }
    },
    'datePublished': isoDate,
    'dateModified': isoDate
  };

  return (
    <>
      <Helmet prioritizeSeoTags>
        <title>{`${post.title} | ADASOFT - Desarrollo de Software y Diseño Web`}</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={shareUrl} />
        
        {/* Control de caché para forzar a los crawlers a obtener siempre la última versión */}
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        
        {/* Open Graph / Facebook Meta Tags */}
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={absoluteImageUrl} />
        <meta property="og:image:secure_url" content={absoluteImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={post.title} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:site_name" content="ADASOFT" />
        <meta property="og:updated_time" content={new Date().toISOString()} />
        <meta property="fb:app_id" content="2375482829489229" />
        <meta property="article:published_time" content={isoDate} />
        <meta property="article:modified_time" content={new Date().toISOString()} />
        <meta property="article:author" content="ADASOFT" />
        <meta property="article:section" content="Tecnología" />
        <meta property="article:tag" content={post.tags ? post.tags.join(', ') : "software, desarrollo web, diseño web, servicios informáticos"} />
        
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@adasoft" />
        <meta name="twitter:creator" content="@adasoft" />
        <meta name="twitter:url" content={shareUrl} />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={absoluteImageUrl} />
        <meta name="twitter:image:alt" content={post.title} />

        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="author" content="ADASOFT" />
        <meta name="publisher" content="ADASOFT" />
        <meta name="keywords" content={post.tags ? post.tags.join(', ') : "desarrollo software, páginas web, aplicaciones, diseño web, software a medida, soluciones tecnológicas"} />
        
        {/* LinkedIn specific tags */}
        <meta property="linkedin:title" content={post.title} />
        <meta property="linkedin:description" content={post.description} />
        <meta property="linkedin:image" content={absoluteImageUrl} />
        
        {/* WhatsApp specific preview */}
        <meta property="og:site_name" content="ADASOFT" />
        <meta property="og:locale" content="es_ES" />
        
        {/* Force social media platforms to use fresh content */}
        <meta name="theme-color" content="#2c3e50" />
        <meta http-equiv="x-dns-prefetch-control" content="on" />
        
        {/* Schema.org JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgArticle)}
        </script>
      </Helmet>

      <Box sx={{ 
        bgcolor: '#f8f9fa', 
        minHeight: '100vh',
        pt: { xs: 0, sm: '72px' }, 
        pb: 8
      }}>
        <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2, md: 3 } }}>
          {/* Box styling with conditional rendering for mobile devices */}
          <Box sx={{ 
            overflow: 'hidden', 
            mb: 4, 
            bgcolor: 'white',
            // Remove borders and shadows on mobile
            borderRadius: { xs: 0, sm: '8px' },
            boxShadow: { xs: 'none', sm: '0 4px 20px rgba(0,0,0,0.06)' }
          }}>
            <CardMedia
              component="img"
              sx={{ 
                width: '100%', 
                height: { xs: '220px', sm: '300px', md: '400px', lg: '500px' }, 
                objectFit: 'cover',
                objectPosition: 'center'
              }}
              image={optimizedImageUrl}
              alt={post.title}
            />
            <Box sx={{ 
              p: { xs: 3, sm: 4, md: 5 },
              maxWidth: '100%',
              mx: 'auto'
            }}>
              <Typography 
                variant="h3" 
                component="h1" 
                sx={{ 
                  mb: 2, 
                  color: '#1a1a2e', 
                  fontWeight: 'bold', 
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
                  lineHeight: { xs: 1.3, md: 1.2 }
                }}
              >
                {post.title}
              </Typography>
              <Typography 
                variant="subtitle1" 
                color="text.secondary" 
                sx={{ 
                  mb: 4, 
                  fontSize: { xs: '0.875rem', sm: '1rem', md: '1.1rem' },
                  fontStyle: 'italic'
                }}
              >
                {post.date}
              </Typography>
              <Typography 
                variant="body1" 
                component="div" 
                sx={{ 
                  color: '#333', 
                  lineHeight: 1.8,
                  fontSize: { xs: '1rem', sm: '1.05rem', md: '1.1rem' },
                  // Improve content readability on mobile
                  wordBreak: 'break-word',
                  '& img': {
                    maxWidth: '100%',
                    height: 'auto',
                    display: 'block',
                    margin: '2rem auto',
                    borderRadius: '8px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                  },
                  '& h3': {
                    fontSize: { xs: '1.3rem', sm: '1.6rem', md: '1.8rem' },
                    fontWeight: 600,
                    mt: 4,
                    mb: 2,
                    color: '#1a1a2e'
                  },
                  '& h4': {
                    fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                    fontWeight: 600,
                    mt: 3,
                    mb: 2,
                    color: '#1a1a2e'
                  },
                  '& p': {
                    mb: 2.5,
                    letterSpacing: '0.015em'
                  },
                  '& ul, & ol': {
                    ml: { xs: 2, sm: 3 },
                    mb: 2.5,
                    pr: { xs: 1, sm: 0 }
                  },
                  '& li': {
                    mb: 1
                  },
                  '& a': {
                    color: '#0066cc',
                    textDecoration: 'none',
                    wordBreak: 'break-word',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  },
                  '& blockquote': {
                    borderLeft: '4px solid #ddd',
                    pl: 2,
                    py: 1,
                    my: 2,
                    color: '#555',
                    fontStyle: 'italic'
                  },
                  '& pre, & code': {
                    overflowX: 'auto',
                    maxWidth: '100%',
                    padding: { xs: 1, sm: 2 },
                    borderRadius: '4px',
                    backgroundColor: '#f5f5f5',
                    fontSize: { xs: '0.85rem', sm: '0.9rem' }
                  }
                }} 
                dangerouslySetInnerHTML={{ __html: post.content }} 
              />
              
              <Box sx={{ 
                mt: 6, 
                p: { xs: 2, md: 4 }, 
                bgcolor: { xs: 'transparent', sm: '#f8f9fa' }, 
                borderRadius: { xs: 0, sm: 2 },
                boxShadow: { xs: 'none', sm: '0 2px 12px rgba(0,0,0,0.05)' },
                textAlign: 'center'
              }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 3, 
                    fontWeight: 'bold', 
                    color: '#333',
                    fontSize: { xs: '1.1rem', md: '1.25rem' }
                  }}
                >
                  ¿Te gustó este artículo? ¡Compártelo!
                </Typography>
                <Stack 
                  direction="row" 
                  spacing={{ xs: 1, sm: 2 }} 
                  justifyContent="center"
                >
                  <FacebookShareButton url={facebookShareUrl} quote={post.title} description={post.description} hashtag="#ADASOFT" onClick={() => customFacebookShare(facebookShareUrl, post.title, () => console.log('Compartido en Facebook'))}>
                    <FacebookIcon size={40} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={shareUrl} title={post.title} via="adasoft" hashtags={["Automatización", "Productividad", "Tecnología"]}>
                    <TwitterIcon size={40} round />
                  </TwitterShareButton>
                  <LinkedinShareButton url={shareUrl} title={post.title} summary={post.description} source="ADASOFT">
                    <LinkedinIcon size={40} round />
                  </LinkedinShareButton>
                  <WhatsappShareButton url={shareUrl} title={`${post.title}\n${post.description}`}>
                    <WhatsappIcon size={40} round />
                  </WhatsappShareButton>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Debug panel for admin - hidden in production */}
      {process.env.NODE_ENV === 'development' && (
        <Box sx={{ mt: 4, p: 2, bgcolor: '#f5f5f5', borderRadius: 2, mx: 'auto', maxWidth: 'md' }}>
          <Typography variant="h6" gutterBottom>Debug Info (solo visible en desarrollo)</Typography>
          <Typography variant="body2">ID del post: {id}</Typography>
          <Typography variant="body2">URL para compartir: {shareUrl}</Typography>
          <Typography variant="body2">URL de la imagen original: {imageUrl}</Typography>
          <Typography variant="body2">URL absoluta de la imagen: {absoluteImageUrl}</Typography>
          <Typography variant="body2">URL de la imagen optimizada: {optimizedImageUrl}</Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" gutterBottom>Para forzar la actualización del caché de Facebook:</Typography>
            <Link
              href={`https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(facebookShareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ wordBreak: 'break-all' }}
            >
              Abrir Depurador de Facebook
            </Link>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" gutterBottom>Para forzar la actualización del caché de Twitter:</Typography>
            <Link
              href={`https://cards-dev.twitter.com/validator?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ wordBreak: 'break-all' }}
            >
              Abrir Validador de Twitter Cards
            </Link>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" gutterBottom>Botón de depuración para forzar actualización de caché de Facebook:</Typography>
            <button onClick={forceRefreshFacebookCache}>Forzar actualización de caché de Facebook</button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default BlogPost;