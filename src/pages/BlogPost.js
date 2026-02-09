import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Container, Typography, Box, CardMedia, Stack, Link } from '@mui/material';
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
const customFacebookShare = (url, title, description, imageUrl) => {
  console.log('Compartiendo en Facebook con URL:', url);
  console.log('Título:', title);
  console.log('Descripción:', description);
  console.log('Imagen:', imageUrl);
  
  // Usar método básico de compartir de Facebook (no requiere configuración de dominio)
  // Este método lee los meta tags Open Graph directamente de la página
  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  window.open(fbShareUrl, '_blank', 'width=626,height=436');
};

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  // Add a reference to track if component is mounted
  const isMounted = useRef(true);
  const post = blogPosts.find(post => post.id === id);
  
  // Asegurarnos de que las URLs sean absolutas y accesibles
  const baseUrl = 'https://adasoft.com.ar';
  // Usar el formato con hash para que funcione con GitHub Pages y HashRouter
  const shareUrl = `${baseUrl}/#/blog/${id}`;
  
  // Preparar las variables de imagen SOLO si el post existe
  let imageUrl = '';
  let absoluteImageUrl = '';
  let isoDate = new Date().toISOString();
  const timestamp = new Date().getTime();
  
  // Preparar datos solo si el post existe
  if (post) {
    console.log('Procesando post con ID:', id);
    console.log('Imagen del post:', post.image);
    console.log('Base URL:', baseUrl);
    
    // Para la imagen de visualización, usar ruta relativa (funciona en dev y prod)
    // En desarrollo, usar la ruta relativa directamente
    // En producción, el build process manejará las rutas correctamente
    imageUrl = post.image.startsWith('/') ? post.image : `/${post.image}`;
    
    // Para meta tags de redes sociales, necesitamos URL absoluta HTTPS
    let imageForMetaTags = post.image;
    if (!post.image.startsWith('http')) {
      // Asegurar que la ruta comience con /
      const imagePath = post.image.startsWith('/') ? post.image : `/${post.image}`;
      imageForMetaTags = `${baseUrl}${imagePath}`;
    }
    
    // Para la URL absoluta usada en meta tags, eliminamos cualquier parámetro existente
    // que podría estar causando problemas con las redes sociales
    let cleanImageUrl = imageForMetaTags;
    if (cleanImageUrl.includes('?')) {
      cleanImageUrl = cleanImageUrl.split('?')[0];
      console.log('Limpiando URL de parámetros:', cleanImageUrl);
    }
    
    // Asegurarnos de que la URL sea HTTPS (WhatsApp requiere HTTPS)
    if (cleanImageUrl.startsWith('http://')) {
      cleanImageUrl = cleanImageUrl.replace('http://', 'https://');
      console.log('Convirtiendo HTTP a HTTPS:', cleanImageUrl);
    }
    
    // Asegurarnos de que la URL absoluta sea correcta para redes sociales
    absoluteImageUrl = cleanImageUrl; // Sin cache buster para meta tags
    console.log('URL absoluta final para meta tags:', absoluteImageUrl);
    console.log('Verificar que la imagen sea accesible en:', absoluteImageUrl);
    
    // Manejo especial para el post id:4 - Reemplazar webp con jpg para mejor compatibilidad con redes sociales
    if (id === '4') {
      // Para el post 4, usar la imagen específica jpg en lugar de webp
      absoluteImageUrl = `${baseUrl}/images/gmail-ai.webp`;
      
      // Facebook prefiere jpg para thumbnails, así que convertimos si es necesario
      if (absoluteImageUrl.endsWith('.webp')) {
        const jpgVersion = absoluteImageUrl.replace(/\.webp$/, '.jpg');
        absoluteImageUrl = jpgVersion;
      }
      
      console.log('Imagen especial para post 4:', absoluteImageUrl);
    }
    
    // Crear fecha en formato ISO para Schema.org
    try {
      isoDate = post.date ? new Date(post.date).toISOString() : new Date().toISOString();
    } catch (e) {
      console.warn(`Could not parse date for post ${id}: ${post.date}`);
      isoDate = new Date().toISOString();
    }
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
    if (imageUrl) {
      const preloadImage = new Image();
      preloadImage.src = `${imageUrl}?v=${timestamp}`;
      // Use isMounted ref to avoid state updates on unmounted component
      preloadImage.onload = () => {
        if (isMounted.current) {
          console.log('Imagen precargada correctamente:', imageUrl);
        }
      };
      preloadImage.onerror = () => {
        if (isMounted.current) {
          console.error('Error al precargar la imagen:', imageUrl);
        }
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
    
    // Cleanup function to prevent memory leaks and async operations after unmount
    return () => {
      isMounted.current = false;
    };
  }, [post, shareUrl, id, location, navigate]);

  // Efecto adicional para forzar la actualización de metatags específicamente para redes sociales
  useEffect(() => {
    if (!post) return;
    
    // Este efecto se ejecuta solo una vez cuando se carga el componente
    const forceMetaTagsUpdate = async () => {
      try {
        // Crear tags directamente en la cabecera HTML principal (no solo en React-Helmet)
        // para asegurar que los crawlers de redes sociales los detecten inmediatamente
        const head = document.querySelector('head');
        
        // Función para crear o actualizar meta tags
        const updateMetaTag = (property, content, isName = false) => {
          // Primero eliminar si ya existe
          const existingTag = isName 
            ? document.querySelector(`meta[name="${property}"]`)
            : document.querySelector(`meta[property="${property}"]`);
            
          if (existingTag) {
            existingTag.remove();
          }
          
          const tag = document.createElement('meta');
          if (isName) {
            tag.setAttribute('name', property);
          } else {
            tag.setAttribute('property', property);
          }
          tag.setAttribute('content', content);
          head.appendChild(tag);
          console.log(`Meta tag creado/actualizado: ${property} = ${content}`);
        };
        
        // Actualizar title directamente (esto ayuda con los crawlers de FB)
        document.title = `${post.title} | ADASOFT`;
        
        // Crear/actualizar un link canónico para la URL
        const canonicalLink = document.querySelector('link[rel="canonical"]');
        if (canonicalLink) {
          canonicalLink.href = shareUrl;
        } else {
          const link = document.createElement('link');
          link.rel = 'canonical';
          link.href = shareUrl;
          head.appendChild(link);
        }
        
        // Asegurarse de que la url de la imagen sea absoluta y HTTPS
        let finalImageUrl = absoluteImageUrl.startsWith('http') 
          ? absoluteImageUrl 
          : `${baseUrl}${absoluteImageUrl.startsWith('/') ? absoluteImageUrl : `/${absoluteImageUrl}`}`;
        
        // Forzar HTTPS (WhatsApp y otras redes requieren HTTPS)
        if (finalImageUrl.startsWith('http://')) {
          finalImageUrl = finalImageUrl.replace('http://', 'https://');
        }
        
        // Asegurar que no tenga parámetros de caché para meta tags
        if (finalImageUrl.includes('?')) {
          finalImageUrl = finalImageUrl.split('?')[0];
        }
        
        console.log('URL de imagen final para meta tags:', finalImageUrl);
        
        // Meta tag obligatorio para Facebook
        updateMetaTag('fb:app_id', '2375482829489229');
        
        // Preparar descripción mejorada para compartir (sin hashtags y con "Continuar leyendo")
        const shareDescription = `${post.description.split('#')[0].trim()} - Continuar leyendo →`;
        
        // Metadatos Open Graph - Usado por Facebook, Instagram, LinkedIn y WhatsApp
        updateMetaTag('og:url', shareUrl);
        updateMetaTag('og:type', 'article');
        updateMetaTag('og:title', post.title);
        updateMetaTag('og:description', shareDescription);
        updateMetaTag('og:image', finalImageUrl);
        updateMetaTag('og:image:secure_url', finalImageUrl);
        updateMetaTag('og:image:type', 'image/jpeg');
        updateMetaTag('og:image:width', '1200');
        updateMetaTag('og:image:height', '630');
        updateMetaTag('og:image:alt', post.title);
        updateMetaTag('og:site_name', 'ADASOFT');
        updateMetaTag('og:locale', 'es_AR');
        updateMetaTag('article:author', 'ADASOFT');
        updateMetaTag('article:published_time', isoDate);
        updateMetaTag('article:modified_time', isoDate);
        
        // Meta description estándar - Usado por buscadores y algunas redes
        updateMetaTag('description', shareDescription, true);
        
        // Metadatos para Twitter
        updateMetaTag('twitter:card', 'summary_large_image', true);
        updateMetaTag('twitter:title', post.title, true);
        updateMetaTag('twitter:description', shareDescription, true);
        updateMetaTag('twitter:image', finalImageUrl, true);
        updateMetaTag('twitter:image:alt', post.title, true);
        updateMetaTag('twitter:site', '@adasoft', true);
        updateMetaTag('twitter:creator', '@adasoft', true);
        
        // Realizar una precarga de la imagen para asegurar que está en caché
        const img = new Image();
        img.onload = () => {
          if (isMounted.current) {
            console.log('Imagen precargada correctamente:', finalImageUrl);
          }
        };
        img.onerror = () => {
          if (isMounted.current) {
            console.error('Error al precargar la imagen:', finalImageUrl);
            // Intentar con una imagen de respaldo si es necesario
            if (id === '4') {
              const fallbackImage = `${baseUrl}/images/gmail.jpg`;
              console.log('Usando imagen de respaldo:', fallbackImage);
              updateMetaTag('og:image', fallbackImage);
              updateMetaTag('og:image:secure_url', fallbackImage);
              updateMetaTag('twitter:image', fallbackImage, true);
            }
          }
        };
        img.src = finalImageUrl;
        
      } catch (error) {
        console.error('Error al actualizar meta tags:', error);
      }
    };
    
    // Ejecutar actualización de meta tags
    forceMetaTagsUpdate();
    
    return () => {
      // Cleanup for this effect
    };
  }, [post, absoluteImageUrl, shareUrl, id, baseUrl, imageUrl, timestamp]);
  
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
      {post ? (
        <>
          <Helmet>
            {/* Título básico del documento */}
            <title>{post.title} | ADASOFT</title>
            
            {/* Link canónico para la URL */}
            <link rel="canonical" href={shareUrl} />
            
            {/* Metadatos Open Graph - Usado por Facebook, Instagram, LinkedIn y WhatsApp */}
            <meta property="fb:app_id" content="2375482829489229" />
            <meta property="og:url" content={shareUrl} />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={post.title} />
            <meta property="og:description" content={`${post.description.split('#')[0].trim()} - Continuar leyendo →`} />
            <meta property="og:image" content={absoluteImageUrl} />
            <meta property="og:image:secure_url" content={absoluteImageUrl} />
            <meta property="og:image:type" content="image/jpeg" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={post.title} />
            {/* Meta tag adicional para WhatsApp - asegurar que use HTTPS */}
            <meta property="og:image:url" content={absoluteImageUrl} />
            <meta property="og:site_name" content="ADASOFT" />
            <meta property="og:locale" content="es_AR" />
            <meta property="article:author" content="ADASOFT" />
            <meta property="article:published_time" content={isoDate} />
            <meta property="article:modified_time" content={isoDate} />
            
            {/* Meta description estándar - Usado por buscadores y algunas redes */}
            <meta name="description" content={`${post.description.split('#')[0].trim()} - Continuar leyendo →`} />
            
            {/* Metadatos para Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={post.title} />
            <meta name="twitter:description" content={`${post.description.split('#')[0].trim()} - Continuar leyendo →`} />
            <meta name="twitter:image" content={absoluteImageUrl} />
            <meta name="twitter:image:alt" content={post.title} />
            <meta name="twitter:site" content="@adasoft" />
            <meta name="twitter:creator" content="@adasoft" />
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
                  image={imageUrl.startsWith('http') ? `${imageUrl}?v=${timestamp}` : `${process.env.PUBLIC_URL || ''}${imageUrl}`}
                  alt={post.title}
                  loading="eager"
                  onError={(e) => {
                    console.error('Error cargando imagen:', imageUrl);
                    e.target.style.display = 'none';
                  }}
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
                  {/* Autor del post - siempre mostrar "por Ana Sanchez" */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <CardMedia
                      component="img"
                      image={post.authorImage || '/images/Ana.jpeg'}
                      alt="Ana Sanchez"
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                        mr: 2
                      }}
                    />
                    <Typography variant="subtitle2" color="text.primary" sx={{ fontWeight: 500 }}>
                      por Ana Sanchez
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body1" 
                    component="div" 
                    sx={{ 
                      color: '#333', 
                      lineHeight: 1.8,
                      fontSize: { xs: '1rem', sm: '1.05rem', md: '1.1rem' },
                      // Improve content readability on mobile
                      wordBreak: 'break-word',
                      maxWidth: { xs: '100%', sm: '90%', md: '85%', lg: '80%', xl: '75%' },
                      mx: 'auto',
                      px: { xs: 1, sm: 2, md: 2.5, lg: 3, xl: 3.5 },
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
                      // Grid responsive para cards de beneficios - móvil en columna, desktop en fila
                      '& .benefits-grid-professional, & .benefits-grid-client': {
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
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
                      <div onClick={() => {
                        const shareDesc = `${post.description.split('#')[0].trim()} - Continuar leyendo →`;
                        customFacebookShare(shareUrl, post.title, shareDesc, absoluteImageUrl);
                      }} style={{ cursor: 'pointer' }}>
                        <FacebookIcon size={40} round />
                      </div>
                      <TwitterShareButton 
                        url={shareUrl} 
                        title={post.title}
                        via="adasoft"
                        hashtags={["Tecnología", "Jujuy", "Profesionales"]}
                        description={`${post.description.split('#')[0].trim()} - Continuar leyendo →`}
                      >
                        <TwitterIcon size={40} round />
                      </TwitterShareButton>
                      <LinkedinShareButton 
                        url={shareUrl} 
                        title={post.title} 
                        summary={`${post.description.split('#')[0].trim()} - Continuar leyendo →`} 
                        source="ADASOFT"
                        description={`${post.description.split('#')[0].trim()} - Continuar leyendo →`}
                      >
                        <LinkedinIcon size={40} round />
                      </LinkedinShareButton>
                      <WhatsappShareButton 
                        url={shareUrl} 
                        title={`${post.title} - ${post.description.split('#')[0].trim()} - Continuar leyendo →`} 
                        separator=" " 
                      >
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
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" gutterBottom>Para forzar la actualización del caché de Facebook:</Typography>
                <Link
                  href={`https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(shareUrl)}`}
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
                <button onClick={() => console.log('Forzar actualización de caché de Facebook')}>Forzar actualización de caché de Facebook</button>
              </Box>
            </Box>
          )}
        </>
      ) : null}
    </>
  );
};

// Set displayName for better debugging
BlogPost.displayName = 'BlogPost';

export default BlogPost;