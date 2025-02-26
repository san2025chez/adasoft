import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Typography, Box, Paper, CardMedia, Stack, Grid, Card, CardContent, CardActionArea, Divider } from '@mui/material';
import { blogPosts } from '../data/blogData';
import { Helmet } from 'react-helmet';
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
  console.log("el id es:", id);
  
  const navigate = useNavigate();
  
  const post = blogPosts.find(post => post.id === id);

  if (!post) {
    navigate('/blog');
    return null;
  }


if (!id) {
  navigate('/blog');
  return null;
}



  // Construir URLs absolutas
  const baseUrl = 'https://adasoft.com.ar';
  const shareUrl = `${baseUrl}/#/blog/${id}`;
  const imageUrl = post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`;
  
  // Filtrar posts relacionados (excluyendo el post actual)
  const relatedPosts = blogPosts
    .filter(p => p.id !== id)
    .slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{post.title} | ADASOFT</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={shareUrl} />
        
        {/* Open Graph / Facebook Meta Tags */}
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${post.title} | ADASOFT`} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:secure_url" content={imageUrl} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:site_name" content="ADASOFT" />
        
        {/* WhatsApp specific meta tags */}
        <meta property="og:image:alt" content={post.title} />
        
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ADASOFT" />
        <meta name="twitter:creator" content="@ADASOFT" />
        <meta name="twitter:title" content={`${post.title} | ADASOFT`} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:image:alt" content={post.title} />
      </Helmet>
      
      <Box sx={{ 
        pt: { xs: '64px', sm: '72px' }, 
        pb: 8, 
        bgcolor: '#f5f5f5', 
        minHeight: '100vh' 
      }}>
        <Container maxWidth="lg">
          <Paper elevation={3} sx={{ overflow: 'hidden', mb: 4 }}>
            <CardMedia
              component="img"
              sx={{
                width: '100%',
                height: { xs: '300px', sm: '400px', md: '500px' },
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              image={imageUrl}
              alt={post.title}
            />
            <Box sx={{ p: { xs: 3, md: 5 } }}>
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  mb: 2,
                  color: '#333',
                  fontWeight: 'bold',
                  fontSize: { xs: '2rem', md: '2.5rem' }
                }}
              >
                {post.title}
              </Typography>

              <Typography 
                variant="subtitle1" 
                color="text.secondary" 
                sx={{ 
                  mb: 3,
                  fontSize: { xs: '1rem', md: '1.1rem' }
                }}
              >
                {post.date}
              </Typography>

              <Typography 
                variant="body1" 
                component="div"
                sx={{
                  color: '#333',
                  lineHeight: 1.7,
                  fontSize: { 
                    xs: '0.875rem', 
                    sm: '1rem' 
                  }
                }}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Social Share Section */}
              <Box sx={{ 
                mt: 6,
                p: 4,
                bgcolor: '#fff',
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 3,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#333'
                  }}
                >
                  ¿Te gustó este artículo? ¡Compártelo!
                </Typography>
                
                {/* Preview Card */}
                <Paper 
  elevation={0} 
  sx={{ 
    mb: 4, 
    border: '1px solid #e0e0e0',
    borderRadius: 1,
    overflow: 'hidden'
  }}
>
  <Box 
    component="article" 
    sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}
  >
    <Box sx={{ width: { xs: '100%', sm: '200px' }, height: { xs: '200px', sm: 'auto' } }}>
      <img 
        src={imageUrl} 
        alt={post.title}
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover' 
        }}
      />
    </Box>
    <Box sx={{ p: 2, flex: 1 }}>
      <Typography variant="subtitle1" fontWeight="bold" component="h2">
        {post.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        {post.description}
      </Typography>
    </Box>
  </Box>
</Paper>

                <Stack 
                  direction="row" 
                  spacing={2} 
                  justifyContent="center"
                  sx={{ 
                    '& button': {
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)'
                      }
                    }
                  }}
                >
                  <FacebookShareButton url={shareUrl} quote={post.title} hashtags={['IA', 'MachineLearning', 'InteligenciaArtificial','adaSoftware']}>
                    <FacebookIcon size={56} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={shareUrl} title={post.title} hashtags={[['IA', 'MachineLearning', 'InteligenciaArtificial','adaSoftware']]}>
                    <TwitterIcon size={56} round />
                  </TwitterShareButton>
                  <LinkedinShareButton url={shareUrl} title={post.title} summary={post.description}>
                    <LinkedinIcon size={56} round />
                  </LinkedinShareButton>
                  <WhatsappShareButton url={shareUrl} title={post.title}>
                    <WhatsappIcon size={56} round />
                  </WhatsappShareButton>
                </Stack>
              </Box>
            </Box>
          </Paper>

          {/* Related Posts Section */}
          <Box sx={{ mt: 8, mb: 4 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                mb: 4, 
                fontWeight: 'bold',
                textAlign: 'center',
                color: '#333'
              }}
            >
              Artículos Relacionados
            </Typography>
            <Grid container spacing={4}>
              {relatedPosts.map((relatedPost) => (
                <Grid item xs={12} sm={6} md={4} key={relatedPost.id}>
                  <Card sx={{ 
                    height: '100%',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)'
                    }
                  }}>
                    <CardActionArea component={Link} to={`/blog/${relatedPost.id}`}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={relatedPost.image}
                        alt={relatedPost.title}
                      />
                      <CardContent>
                        <Typography 
                          variant="h6" 
                          sx={{
                            fontWeight: 'bold',
                            mb: 1
                          }}
                        >
                          {relatedPost.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {relatedPost.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default BlogPost;
