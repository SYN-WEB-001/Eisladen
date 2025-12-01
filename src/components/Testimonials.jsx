import { useState, useEffect } from 'react';
import { Box, Container, Typography, Card, CardContent, Avatar, Rating } from '@mui/material';

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch('/testimonials.json')
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(err => console.error('Fehler beim Laden der Testimonials:', err));
  }, []);

  return (
    <Box sx={{ py: 8, bgcolor: '#f5f5f5' }}>
      <Container>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
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
                  <Avatar sx={{ mr: 2 }}>{testimonial.name[0]}</Avatar>
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
      </Container>
    </Box>
  );
}

export default Testimonials;

