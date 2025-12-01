import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Rating,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function DetailSeite() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [sorte, setSorte] = useState(null);
  const [rezensionen, setRezensionen] = useState([]);

  useEffect(() => {
    fetch('/eissorten.json')
      .then(res => res.json())
      .then(data => {
        const gefundeneSorte = data.find(s => s.slug === slug);
        setSorte(gefundeneSorte);
      })
      .catch(err => console.error('Fehler beim Laden:', err));

    // Beispiel-Rezensionen (könnten auch aus JSON kommen)
    setRezensionen([
      {
        name: 'Anna M.',
        text: 'Absolut köstlich! Die cremigste Konsistenz, die ich je probiert habe.',
        rating: 5,
        datum: '2024-01-15'
      },
      {
        name: 'Max K.',
        text: 'Sehr empfehlenswert! Perfekter Geschmack und Qualität.',
        rating: 5,
        datum: '2024-01-10'
      }
    ]);
  }, [slug]);

  if (!sorte) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography>Eissorte nicht gefunden</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 8 }}>
      <Container>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mb: 4 }}
        >
          Zurück zur Übersicht
        </Button>

        <Card sx={{ mb: 4 }}>
          <Box
            sx={{
              height: 300,
              bgcolor: '#e0e0e0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h1">🍦</Typography>
          </Box>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
              <Typography variant="h3" component="h1">
                {sorte.name}
              </Typography>
              <Chip label={sorte.kategorie} color="primary" />
            </Box>
            <Typography variant="body1" paragraph>
              {sorte.beschreibung}
            </Typography>
          </CardContent>
        </Card>

        <Typography variant="h4" component="h2" gutterBottom>
          Rezensionen
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {rezensionen.map((rezension, index) => (
          <Card key={index} sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="h6">{rezension.name}</Typography>
                <Rating value={rezension.rating} readOnly size="small" />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {rezension.datum}
              </Typography>
              <Typography variant="body1">{rezension.text}</Typography>
            </CardContent>
          </Card>
        ))}
      </Container>
    </Box>
  );
}

export default DetailSeite;

