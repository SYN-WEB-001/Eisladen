import { useState, useEffect } from 'react';
import { Box, Container, Typography, Card, CardContent, CardMedia, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SortenUebersicht() {
  const [sorten, setSorten] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/eissorten.json')
      .then(res => res.json())
      .then(data => setSorten(data))
      .catch(err => console.error('Fehler beim Laden der Sorten:', err));
  }, []);

  const getCategoryColor = (kategorie) => {
    const colors = {
      'Milch': 'primary',
      'Vegan': 'success',
      'Sorbet': 'info',
      'Klassiker': 'warning',
      'Saison': 'error'
    };
    return colors[kategorie] || 'default';
  };

  return (
    <Box id="sorten" sx={{ py: 8 }}>
      <Container>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Unsere Eissorten
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
            mt: 2,
          }}
        >
          {sorten.map((sorte) => (
            <Card
              key={sorte.slug}
              sx={{ cursor: 'pointer', height: '100%' }}
              onClick={() => navigate(`/sorte/${sorte.slug}`)}
            >
              <CardMedia
                component="img"
                height="200"
                image={sorte.bild || '/placeholder.jpg'}
                alt={sorte.name}
                sx={{
                  objectFit: 'cover',
                  bgcolor: '#e0e0e0',
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
           
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                  <Typography variant="h5" component="h3">
                    {sorte.name}
                  </Typography>
                  <Chip
                    label={sorte.kategorie}
                    color={getCategoryColor(sorte.kategorie)}
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {sorte.beschreibung}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default SortenUebersicht;

