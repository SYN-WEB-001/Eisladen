import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Card, CardContent, Avatar, Rating, Button } from '@mui/material';

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/testimonials.json')
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(err => console.error('Fehler beim Laden der Testimonials:', err));
  }, []);

  return (
    <Box id="testimonials" sx={{ py: 8, bgcolor: '#ffffff' }}>
      <Container>
        <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ color: '#000000' }}>
          Was unsere Kunden sagen
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: 3,
            mt: 2,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <Card key={index} sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ mr: 2, bgcolor: '#0288D1' }}>{testimonial.name[0]}</Avatar>
                  <Box>
                    <Typography variant="h6">{testimonial.name}</Typography>
                    <Rating value={testimonial.rating} readOnly size="small" />
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  "{testimonial.text}"
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/bewertungen')}
            sx={{
              bgcolor: '#0288D1',
              '&:hover': { bgcolor: '#0277BD' },
            }}
          >
            Alle Bewertungen anzeigen
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Testimonials;

