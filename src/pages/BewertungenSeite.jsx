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
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

  return (
    <Box sx={{ py: 8, minHeight: '80vh' }}>
      <Container>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mb: 4 }}
        >
          Zurück zur Startseite
        </Button>

        <Typography variant="h2" component="h1" gutterBottom align="center">
          Kundenbewertungen
        </Typography>

        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="div" gutterBottom>
            {durchschnitt}
          </Typography>
          <Rating value={parseFloat(durchschnitt)} readOnly precision={0.1} size="large" />
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Basierend auf {testimonials.length} Bewertungen
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={3}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 2, bgcolor: '#558B2F' }}>{testimonial.name[0]}</Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6">{testimonial.name}</Typography>
                      <Rating value={testimonial.rating} readOnly size="small" />
                    </Box>
                  </Box>
                  <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                    "{testimonial.text}"
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default BewertungenSeite;
