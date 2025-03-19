import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Container, Typography, Box, Paper, CardMedia, Stack } from '@mui/material';
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

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const post = blogPosts.find(post => post.id === id);
  
  // Asegurarnos de que las URLs sean absolutas y accesibles
  const baseUrl = 'https://adasoft.com.ar';
  const shareUrl = `${baseUrl}/blog/${id}`;
  
  useEffect(() => {
    // Debug para ayudar en el diagnóstico
    console.log('Cargando blog post:', id);
    console.log('Location:', location.pathname);
    
    // Si no se encuentra el post, redirigir al blog
    if (!post) {
      console.error(`Post no encontrado: ${id}`);
      navigate('/blog');
      return;
    }

    // Actualizar Facebook si está disponible (esto ayuda con FBXML)
    if (typeof window.FB !== 'undefined') {
      window.FB.XFBML.parse();
    }
    
    // Aseguramos que las meta tags se carguen correctamente para crawlers
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', shareUrl);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', post.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', post.description);
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`);

    // Añadir palabras clave relevantes al título de la página
    document.title = `${post.title} | ADASOFT - Desarrollo de Software y Diseño Web`;
  }, [post, shareUrl, id, location, navigate]);

  // Si no hay post, no renderizamos nada (el efecto se encargará de redirigir)
  if (!post) {
    return null;
  }

  const imageUrl = post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`;
  
  // Crear fecha en formato ISO para Schema.org
  const isoDate = post.date ? new Date(post.date).toISOString() : new Date().toISOString();

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
    'image': imageUrl,
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
        
        {/* Open Graph / Facebook Meta Tags */}
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:secure_url" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={post.title} />
        <meta property="og:site_name" content="ADASOFT" />
        <meta property="article:published_time" content={isoDate} />
        <meta property="article:author" content="ADASOFT" />
        <meta property="article:section" content="Tecnología" />
        <meta property="article:tag" content="software, desarrollo web, diseño web, servicios informáticos" />
        
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@adasoft" />
        <meta name="twitter:creator" content="@adasoft" />
        <meta name="twitter:url" content={shareUrl} />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:image:alt" content={post.title} />

        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="author" content="ADASOFT" />
        <meta name="publisher" content="ADASOFT" />
        <meta name="keywords" content="desarrollo software, páginas web, aplicaciones, diseño web, software a medida, soluciones tecnológicas" />
        
        {/* Schema.org JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgArticle)}
        </script>
      </Helmet>

      <Box sx={{ pt: { xs: '64px', sm: '72px' }, pb: 8, bgcolor: '#f8f9fa', minHeight: '100vh' }}>
        <Container maxWidth="lg" disableGutters={true} sx={{ px: { xs: 0, sm: 2 } }}>
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
                height: { xs: '180px', sm: '300px', md: '400px', lg: '500px' }, 
                objectFit: 'cover' 
              }}
              image={imageUrl}
              alt={post.title}
            />
            <Box sx={{ 
              p: { xs: 2, sm: 3, md: 5 },
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
                    margin: '0 auto'
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
                  <FacebookShareButton url={shareUrl} quote={post.title} description={post.description} hashtag="#ADASOFT">
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
    </>
  );
};

export default BlogPost;