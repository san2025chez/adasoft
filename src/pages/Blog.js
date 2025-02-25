import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
const Blog = () => {
  const navigate = useNavigate();

  const handlePostClick = (postId) => {
    navigate(`/blog/${postId}`);
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box sx={{ py: 8, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Container maxWidth="lg">
      <Typography variant="h2" style={{
          color: '#444',
          fontSize: isMobile ? '23px' : '30px',
          letterSpacing: '4px',
          marginBottom: '32px',
          fontWeight: 300,
          lineHeight: isMobile ? '23px' : '28px',
          textTransform: 'uppercase',
          padding: '15px'
        }}>
          Blog
        </Typography>
        <Grid container spacing={4}>
          {blogPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card 
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)'
                  }
                }}
              >
                <CardActionArea onClick={() => handlePostClick(post.id)}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={post.image}
                    alt={post.title}
                    sx={{
                      objectFit: 'cover'
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography 
                      variant="h5" 
                      component="h2" 
                      gutterBottom
                      sx={{
                        fontWeight: 'bold',
                        fontSize: { xs: '1.25rem', md: '1.5rem' }
                      }}
                    >
                      {post.title}
                    </Typography>
                    <Typography 
                      variant="subtitle1" 
                      color="text.secondary" 
                      gutterBottom
                      sx={{ mb: 2 }}
                    >
                      {post.subtitle}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      color="text.secondary" 
                      display="block"
                      sx={{ mb: 2 }}
                    >
                      {post.date}
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
                      {post.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Blog;
