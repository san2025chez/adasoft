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
    
      <Box sx={{ 
        pt: { xs: '64px', sm: '72px' }, 
        pb: 8, 
        bgcolor: '#f8f9fa', 
        minHeight: '100vh' 
      }}>
        <Container maxWidth="lg" sx={{ 
          px: { xs: 2, sm: 3, md: 4 }
        }}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              mb: 1, 
              mt: { xs: 3, md: 4 }, 
              fontWeight: 'bold', 
              color: '#1a1a2e',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              textAlign: { xs: 'center', md: 'left' },
              px: { xs: 1, sm: 0 }
            }}
          >
            Blog
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: { xs: 4, md: 6 }, 
              color: '#666',
              fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
              textAlign: { xs: 'center', md: 'left' },
              maxWidth: '800px',
              px: { xs: 1, sm: 0 }
            }}
          >
            Artículos sobre automatización, integración y desarrollo de software
          </Typography>
          
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {blogPosts.map((post) => (
              <Grid item key={post.id} xs={12} sm={6} md={4}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    border: 'none',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                    '&:hover': {
                      transform: { xs: 'none', sm: 'translateY(-8px)' },
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    },
                    mb: { xs: 1, sm: 0 },
                  }}
                >
                  <CardActionArea 
                    component={RouterLink} 
                    to={`/blog/${post.id}`} 
                    sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      height: '100%', 
                      alignItems: 'stretch',
                      '&:focus': {
                        outline: 'none'
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={post.image}
                      alt={post.title}
                      sx={{ 
                        height: { xs: '200px', sm: '220px' },
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                        '&:hover': {
                          transform: 'scale(1.05)'
                        }
                      }}
                    />
                    <CardContent sx={{ 
                      flexGrow: 1, 
                      p: { xs: 3, sm: 3 },
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderTop: { xs: '1px solid #f0f0f0', sm: 'none' }
                    }}>
                      <Box>
                        <Typography 
                          variant="subtitle2" 
                          color="text.secondary" 
                          component="div"
                          sx={{ 
                            mb: 1,
                            fontSize: { xs: '0.75rem', sm: '0.875rem' }
                          }}
                        >
                          {post.date}
                        </Typography>
                        <Typography 
                          variant="h5" 
                          component="h2" 
                          sx={{ 
                            fontWeight: 600,
                            mb: 1,
                            color: '#1a1a2e',
                            fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.4rem' },
                            lineHeight: 1.3
                          }}
                        >
                          {post.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ 
                            fontSize: { xs: '0.875rem', sm: '0.9rem', md: '1rem' },
                            lineHeight: 1.6,
                            // Limit to 3 lines with ellipsis
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {post.description.split('#')[0].trim()} {/* Remove hashtags from preview */}
                        </Typography>
                      </Box>
                      <Typography 
                        variant="body2" 
                        color="primary"
                        sx={{ 
                          mt: 2,
                          fontWeight: 500,
                          fontSize: { xs: '0.875rem', sm: '0.9rem' }
                        }}
                      >
                        Leer más
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
