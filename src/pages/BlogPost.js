import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  const post = blogPosts.find(post => post.id === id);
  
  // Asegurarnos de que las URLs sean absolutas y accesibles
  const baseUrl = 'https://adasoft.com.ar';
  const shareUrl = `${baseUrl}/blog/${id}`;
  
  // Forzar actualización de meta tags
  useEffect(() => {
    if (!post) return;

    // Actualizar meta tags
    const updateMetaTags = () => {
      // Actualizar Open Graph meta tags
      document.querySelector('meta[property="og:url"]')?.setAttribute('content', shareUrl);
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', post.title);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', post.description);
      document.querySelector('meta[property="og:image"]')?.setAttribute('content', post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`);
      
      // Actualizar Twitter meta tags
      document.querySelector('meta[name="twitter:url"]')?.setAttribute('content', shareUrl);
      document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', post.title);
      document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', post.description);
      document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`);
    };

    // Actualizar meta tags después de que el componente se monte
    updateMetaTags();

    // Actualizar Facebook si está disponible
    if (typeof window.FB !== 'undefined') {
      window.FB.XFBML.parse();
    }
  }, [post, shareUrl]);

  if (!post || !id) {
    navigate('/blog');
    return null;
  }

  const imageUrl = post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`;

  return (
    <>
      <Helmet prioritizeSeoTags>
        <title>{`${post.title} | ADASOFT`}</title>
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
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="ADASOFT" />
        
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@adasoft" />
        <meta name="twitter:creator" content="@adasoft" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:image:alt" content={post.title} />

        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="ADASOFT" />
        <meta name="publisher" content="ADASOFT" />
      </Helmet>

      <Box sx={{ pt: { xs: '64px', sm: '72px' }, pb: 8, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
        <Container maxWidth="lg">
          <Paper elevation={3} sx={{ overflow: 'hidden', mb: 4 }}>
            <CardMedia
              component="img"
              sx={{ width: '100%', height: { xs: '300px', sm: '400px', md: '500px' }, objectFit: 'cover' }}
              image={imageUrl}
              alt={post.title}
            />
            <Box sx={{ p: { xs: 3, md: 5 } }}>
              <Typography variant="h3" component="h1" sx={{ mb: 2, color: '#333', fontWeight: 'bold', fontSize: { xs: '2rem', md: '2.5rem' } }}>
                {post.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3, fontSize: { xs: '1rem', md: '1.1rem' } }}>
                {post.date}
              </Typography>
              <Typography variant="body1" component="div" sx={{ color: '#333', lineHeight: 1.7, fontSize: { xs: '0.875rem', sm: '1rem' } }} dangerouslySetInnerHTML={{ __html: post.content }} />
              
              <Box sx={{ mt: 6, p: 4, bgcolor: '#fff', borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <Typography variant="h6" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold', color: '#333' }}>
                  ¿Te gustó este artículo? ¡Compártelo!
                </Typography>
                <Stack direction="row" spacing={2} justifyContent="center">
                  <FacebookShareButton url={shareUrl} quote={post.title}>
                    <FacebookIcon size={40} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={shareUrl} title={post.title}>
                    <TwitterIcon size={40} round />
                  </TwitterShareButton>
                  <LinkedinShareButton url={shareUrl} title={post.title}>
                    <LinkedinIcon size={40} round />
                  </LinkedinShareButton>
                  <WhatsappShareButton url={shareUrl} title={post.title}>
                    <WhatsappIcon size={40} round />
                  </WhatsappShareButton>
                </Stack>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default BlogPost;