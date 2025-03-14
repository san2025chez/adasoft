import React from 'react';
import { Container, Typography, Card, CardContent, CardMedia, CardActionArea, Grid, Box } from '@mui/material';
import { blogPosts } from '../data/blogData';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Blog = () => {
  // Base URL for canonical links
  const baseUrl = 'https://adasoft.com.ar';

  // Crear Schema.org JSON-LD para la lista de blogs
  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'headline': 'Blog de ADASOFT - Desarrollo de Software y Diseño Web',
    'description': 'Artículos sobre desarrollo de software, diseño web, automatización e innovación tecnológica para potenciar tu negocio.',
    'url': `${baseUrl}/blog`,
    'publisher': {
      '@type': 'Organization',
      'name': 'ADASOFT',
      'logo': {
        '@type': 'ImageObject',
        'url': `${baseUrl}/images/logotrans2.png`
      }
    },
    'blogPost': blogPosts.map(post => ({
      '@type': 'BlogPosting',
      'headline': post.title,
      'description': post.description,
      'datePublished': post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
      'image': post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`,
      'url': `${baseUrl}/blog/${post.id}`,
      'author': {
        '@type': 'Organization',
        'name': 'ADASOFT'
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>Blog sobre Desarrollo de Software y Diseño Web | ADASOFT</title>
        <meta name="description" content="Artículos sobre desarrollo de software, diseño web, automatización, integración y tecnologías innovadoras para potenciar tu negocio." />
        <meta name="keywords" content="blog tecnológico, desarrollo software, diseño web, automatización, tecnología, software a medida, páginas web, sistemas información" />
        <link rel="canonical" href={`${baseUrl}/blog`} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${baseUrl}/blog`} />
        <meta property="og:title" content="Blog sobre Desarrollo de Software y Diseño Web | ADASOFT" />
        <meta property="og:description" content="Artículos sobre desarrollo de software, diseño web, automatización, integración y tecnologías innovadoras para potenciar tu negocio." />
        <meta property="og:image" content={`${baseUrl}/images/og-blog.jpg`} />
        <meta property="og:site_name" content="ADASOFT" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`${baseUrl}/blog`} />
        <meta name="twitter:title" content="Blog sobre Desarrollo de Software y Diseño Web | ADASOFT" />
        <meta name="twitter:description" content="Artículos sobre desarrollo de software, diseño web, automatización, integración y tecnologías innovadoras para potenciar tu negocio." />
        <meta name="twitter:image" content={`${baseUrl}/images/og-blog.jpg`} />
        <meta name="twitter:site" content="@adasoft" />

        {/* Schema.org JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify(blogListSchema)}
        </script>
      </Helmet>
    
      <Box sx={{ pt: { xs: '64px', sm: '72px' }, pb: 8, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" sx={{ mb: 1, mt: 4, fontWeight: 'bold', color: '#333' }}>
            Blog
          </Typography>
          <Typography variant="h5" sx={{ mb: 6, color: '#666' }}>
            Artículos sobre automatización, integración y desarrollo de software
          </Typography>
          
          <Grid container spacing={4}>
            {blogPosts.map((post) => (
              <Grid item key={post.id} xs={12} sm={6} md={4}>
                <Card 
                  elevation={3} 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 8
                    }
                  }}
                >
                  <CardActionArea 
                    component={RouterLink} 
                    to={`/blog/${post.id}`} 
                    sx={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'stretch' }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={post.image}
                      alt={post.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="overline" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                        {post.date}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 'bold', color: '#333' }}>
                        {post.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {post.subtitle}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Blog;
