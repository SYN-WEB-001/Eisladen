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
        // Lädt Rezensionen aus den Daten der Sorte
        if (gefundeneSorte && gefundeneSorte.rezensionen) {
          setRezensionen(gefundeneSorte.rezensionen);
        } else {
          setRezensionen([]);
        }
      })
      .catch(err => console.error('Fehler beim Laden:', err));
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
            component="img"
            src={sorte.bild}
            alt={sorte.name}
            sx={{
              width: '100%',
              height: 300,
              objectFit: 'cover',
              bgcolor: '#e0e0e0',
            }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
         
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

        {rezensionen.length > 0 ? (
          rezensionen.map((rezension, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h6">{rezension.name}</Typography>
                  <Rating value={rezension.rating} readOnly size="small" />
                </Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, fontSize: '0.95rem' }}>
                  {rezension.datum}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '1.05rem', lineHeight: 1.7 }}>
                  {rezension.text}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
            Noch keine Rezensionen vorhanden.
          </Typography>
        )}
      </Container>
    </Box>
  );
}

export default DetailSeite;

