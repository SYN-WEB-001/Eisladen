import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Rating,
  Button,
  Divider,
  Grid,
  LinearProgress,
  Chip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';

function BewertungenSeite() {
  const [testimonials, setTestimonials] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/testimonials.json')
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(err => console.error('Fehler beim Laden der Testimonials:', err));
  }, []);

  // Durchschnittsbewertung berechnen
  const durchschnitt = testimonials.length > 0
    ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
    : 0;

  // Bewertungsverteilung berechnen
  const ratingCounts = [5, 4, 3, 2, 1].map(stars => 
    testimonials.filter(t => t.rating === stars).length
  );

  const getAvatarColor = (index) => {
    const colors = ['#0288D1', '#4FC3F7', '#FFA726', '#FF6B9D', '#42A5F5'];
    return colors[index % colors.length];
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #4FC3F7 0%, #0288D1 100%)',
          py: 6,
          color: 'white'
        }}
      >
        <Container>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            sx={{ 
              mb: 3,
              color: 'white',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
            }}
          >
            Zurück zur Startseite
          </Button>

          <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
            Kundenbewertungen
          </Typography>
          <Typography variant="h6" align="center" sx={{ opacity: 0.9 }}>
            Was unsere Kunden über unser handgemachtes Eis sagen
          </Typography>
        </Container>
      </Box>

      <Container sx={{ py: 6 }}>
        {/* Rating Overview */}
        <Card sx={{ mb: 6, overflow: 'visible' }}>
          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                <Typography variant="h1" component="div" sx={{ fontWeight: 'bold', color: '#0288D1' }}>
                  {durchschnitt}
                </Typography>
                <Rating value={parseFloat(durchschnitt)} readOnly precision={0.1} size="large" />
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                  Basierend auf {testimonials.length} Bewertungen
                </Typography>
                <Chip 
                  icon={<StarIcon />} 
                  label="Ausgezeichnet" 
                  sx={{ 
                    mt: 2, 
                    bgcolor: '#4FC3F7', 
                    color: 'white',
                    fontWeight: 'bold'
                  }} 
                />
              </Grid>

              <Grid item xs={12} md={8}>
                {[5, 4, 3, 2, 1].map((stars, index) => {
                  const count = ratingCounts[index];
                  const percentage = testimonials.length > 0 
                    ? (count / testimonials.length) * 100 
                    : 0;
                  
                  return (
                    <Box key={stars} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" sx={{ minWidth: 80 }}>
                        {stars} Sterne
                      </Typography>
                      <Box sx={{ flex: 1, mx: 2 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={percentage} 
                          sx={{
                            height: 10,
                            borderRadius: 5,
                            bgcolor: '#e0e0e0',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: '#4FC3F7'
                            }
                          }}
                        />
                      </Box>
                      <Typography variant="body2" sx={{ minWidth: 50, textAlign: 'right' }}>
                        {count} ({Math.round(percentage)}%)
                      </Typography>
                    </Box>
                  );
                })}
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Reviews */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
            Alle Bewertungen
          </Typography>
          <Divider sx={{ mb: 4, borderColor: '#4FC3F7', borderWidth: 2 }} />
        </Box>

        <Grid container spacing={3}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  transition: 'all 0.3s',
                  border: '2px solid transparent',
                  '&:hover': { 
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                    borderColor: '#4FC3F7'
                  } 
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar 
                      sx={{ 
                        mr: 2, 
                        bgcolor: getAvatarColor(index),
                        width: 56,
                        height: 56,
                        fontSize: '1.5rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {testimonial.name[0]}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {testimonial.name}
                      </Typography>
                      <Rating value={testimonial.rating} readOnly size="small" />
                    </Box>
                  </Box>
                  <Box 
                    sx={{ 
                      bgcolor: '#f9f9f9', 
                      p: 2, 
                      borderRadius: 2,
                      borderLeft: '4px solid #4FC3F7'
                    }}
                  >
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontStyle: 'italic', 
                        color: 'text.primary',
                        lineHeight: 1.7
                      }}
                    >
                      "{testimonial.text}"
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: 6, p: 4, bgcolor: 'white', borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            Möchten Sie auch eine Bewertung abgeben?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Teilen Sie Ihre Erfahrung mit unserem Eis!
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/')}
            sx={{
              bgcolor: '#0288D1',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': { bgcolor: '#0277BD' },
            }}
          >
            Zur Startseite
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default BewertungenSeite;
