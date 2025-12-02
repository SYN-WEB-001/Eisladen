// React Hooks für State Management und Side Effects
import { useState, useEffect } from 'react';
// React Router Hook für Navigation zwischen Seiten
import { useNavigate } from 'react-router-dom';
// Material-UI Komponenten für das UI-Design
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
  TextField,
  Alert,
  Snackbar,
} from '@mui/material';
// Material-UI Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';

/**
 * BewertungenSeite - Komponente für die Anzeige aller Kundenbewertungen
 * Zeigt eine Übersicht mit Durchschnittsbewertung, Bewertungsverteilung und einzelnen Bewertungen
 */
function BewertungenSeite() {
  // State für die Liste aller Testimonials/Bewertungen
  const [testimonials, setTestimonials] = useState([]);
  // State für Formularfelder
  const [formData, setFormData] = useState({
    name: '',
    text: '',
    rating: 0,
  });
  // State für Snackbar (Benachrichtigung)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  // Hook für Navigation zu anderen Seiten
  const navigate = useNavigate();

  // Side Effect: Lädt die Bewertungen beim ersten Rendern der Komponente
  useEffect(() => {
    // Lädt Bewertungen aus JSON-Datei
    fetch('/testimonials.json')
      .then(res => res.json())
      .then(jsonData => {
        // Lädt zusätzliche Bewertungen aus localStorage
        const localReviews = JSON.parse(localStorage.getItem('localReviews') || '[]');
        // Kombiniert beide Quellen
        setTestimonials([...jsonData, ...localReviews]);
      })
      .catch(err => console.error('Fehler beim Laden der Testimonials:', err));
  }, []);

  // Berechnet die durchschnittliche Bewertung aus allen Testimonials
  // Summiert alle Ratings und teilt durch die Anzahl der Bewertungen
  const durchschnitt = testimonials.length > 0
    ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
    : 0;
/* reduce — метод массива в JavaScript. Сигнатура:

js
array.reduce((accumulator, currentValue, currentIndex, array) => { ... }, initialValue)
accumulator (у тебя sum) — накопитель, куда складываются результаты.

currentValue (у тебя t) — текущий элемент массива.

initialValue (у тебя 0) — начальное значение аккумулятора. */
  // Berechnet die Verteilung der Bewertungen (wie viele 5-Sterne, 4-Sterne, etc.)
  // Erstellt ein Array mit der Anzahl der Bewertungen für jede Sterneanzahl (5 bis 1)
  const ratingCounts = [5, 4, 3, 2, 1].map(stars => 
    testimonials.filter(t => t.rating === stars).length
  );

  // Hilfsfunktion: Gibt eine Farbe für den Avatar basierend auf dem Index zurück
  // Verwendet einen Farbkreis, um verschiedene Avatare visuell zu unterscheiden
  const getAvatarColor = (index) => {
    const colors = ['#0288D1', '#4FC3F7', '#FFA726', '#FF6B9D', '#42A5F5'];
    return colors[index % colors.length];
  };

  // Handler für Formular-Änderungen
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler für Rating-Änderung
  const handleRatingChange = (event, newValue) => {
    setFormData(prev => ({
      ...prev,
      rating: newValue || 0
    }));
  };

  // Handler für Formular-Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validierung
    if (!formData.name.trim() || !formData.text.trim() || formData.rating === 0) {
      setSnackbar({
        open: true,
        message: 'Bitte füllen Sie alle Felder aus und geben Sie eine Bewertung ab.',
        severity: 'error'
      });
      return;
    }

    // Erstellt neues Review-Objekt
    const newReview = {
      name: formData.name.trim(),
      text: formData.text.trim(),
      rating: formData.rating,
      avatar: '', // Wird nicht verwendet, Avatar wird aus Initialen generiert
    };

    // Lädt vorhandene lokale Reviews
    const localReviews = JSON.parse(localStorage.getItem('localReviews') || '[]');
    
    // Fügt neues Review hinzu
    const updatedReviews = [...localReviews, newReview];
    
    // Speichert in localStorage
    localStorage.setItem('localReviews', JSON.stringify(updatedReviews));
    
    // Aktualisiert State
    setTestimonials(prev => [...prev, newReview]);
    
    // Setzt Formular zurück
    setFormData({
      name: '',
      text: '',
      rating: 0,
    });

    // Zeigt Erfolgsmeldung
    setSnackbar({
      open: true,
      message: 'Vielen Dank für Ihre Bewertung!',
      severity: 'success'
    });
  };

  // Handler für Snackbar schließen
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    // Hauptcontainer mit minimaler Höhe und Hintergrundfarbe
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Hero Section - Header-Bereich mit Gradient-Hintergrund */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #4FC3F7 0%, #0288D1 100%)',
          py: 6,
          color: 'white'
        }}
      >
        <Container>
          {/* Zurück-Button zur Navigation zur Startseite */}
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

          {/* Hauptüberschrift der Seite */}
          <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
            Kundenbewertungen
          </Typography>
          {/* Untertitel mit Beschreibung */}
          <Typography variant="h6" align="center" sx={{ opacity: 0.9 }}>
            Was unsere Kunden über unser handgemachtes Eis sagen
          </Typography>
        </Container>
      </Box>

      {/* Hauptinhalt der Seite mit Padding */}
      <Container sx={{ py: 6 }}>
        {/* Rating Overview Card - Zeigt Übersicht über alle Bewertungen */}
        <Card sx={{ mb: 6, overflow: 'visible' }}>
          <CardContent sx={{ p: 4 }}>
            {/* Grid-Layout für die Bewertungsübersicht */}
            <Grid container spacing={4} alignItems="center">
              {/* Linke Spalte: Durchschnittsbewertung und Gesamtanzahl */}
              <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: 'center' }}>
                {/* Große Anzeige der Durchschnittsbewertung */}
                <Typography variant="h1" component="div" sx={{ fontWeight: 'bold', color: '#0288D1' }}>
                  {durchschnitt}
                </Typography>
                {/* Sterne-Rating Komponente für visuelle Darstellung */}
                <Rating value={parseFloat(durchschnitt)} readOnly precision={0.1} size="large" />
                {/* Text mit Gesamtanzahl der Bewertungen */}
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                  Basierend auf {testimonials.length} Bewertungen
                </Typography>
                {/* Chip-Badge mit "Ausgezeichnet" Label */}
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

              {/* Rechte Spalte: Detaillierte Bewertungsverteilung */}
              <Grid size={{ xs: 12, md: 8 }}>
                {/* Iteriert über alle Sternebewertungen von 5 bis 1 */}
                {[5, 4, 3, 2, 1].map((stars, index) => {
                  // Anzahl der Bewertungen für diese Sterneanzahl
                  const count = ratingCounts[index];
                  // Berechnet den Prozentsatz dieser Bewertungen
                  const percentage = testimonials.length > 0 
                    ? (count / testimonials.length) * 100 
                    : 0;
                  
                  return (
                    // Container für jede Bewertungsstufe
                    <Box key={stars} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      {/* Label mit Sterneanzahl */}
                      <Typography variant="body2" sx={{ minWidth: 80 }}>
                        {stars} Sterne
                      </Typography>
                      {/* Progress Bar für visuelle Darstellung des Anteils */}
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
                      {/* Text mit Anzahl und Prozentsatz */}
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

        {/* Sektion: Alle einzelnen Bewertungen */}
        <Box sx={{ mb: 4 }}>
          {/* Überschrift für die Bewertungsliste */}
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
            Alle Bewertungen
          </Typography>
          {/* Visueller Trennstrich mit Brand-Farbe */}
          <Divider sx={{ mb: 4, borderColor: '#4FC3F7', borderWidth: 2 }} />
        </Box>

        {/* Grid-Container für die Bewertungskarten */}
        <Grid container spacing={3}>
          {/* Iteriert über alle Testimonials und erstellt eine Karte für jede Bewertung */}
          {testimonials.map((testimonial, index) => (
            // Responsive Grid: 1 Spalte auf Mobile, 2 Spalten auf Desktop
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              {/* Karte für einzelne Bewertung mit Hover-Effekt */}
              <Card 
                sx={{ 
                  height: '100%', 
                  transition: 'all 0.3s',
                  border: '2px solid transparent',
                  // Hover-Effekt: Karte hebt sich leicht an
                  '&:hover': { 
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                    borderColor: '#4FC3F7'
                  } 
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* Header-Bereich mit Avatar und Name */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {/* Avatar mit Initialen des Kunden */}
                    <Avatar 
                      sx={{ 
                        mr: 2, 
                        bgcolor: getAvatarColor(index), // Dynamische Farbe basierend auf Index
                        width: 56,
                        height: 56,
                        fontSize: '1.5rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {testimonial.name[0]}
                    </Avatar>
                    {/* Name und Rating */}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {testimonial.name}
                      </Typography>
                      {/* Sterne-Rating für diese Bewertung */}
                      <Rating value={testimonial.rating} readOnly size="small" />
                    </Box>
                  </Box>
                  {/* Text-Box mit dem Bewertungstext */}
                  <Box 
                    sx={{ 
                      bgcolor: '#f9f9f9', 
                      p: 2, 
                      borderRadius: 2,
                      borderLeft: '4px solid #4FC3F7' // Akzent-Linie links
                    }}
                  >
                    {/* Bewertungstext in kursiver Schrift */}
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

        {/* Formular-Sektion für neue Bewertungen */}
        <Card sx={{ mt: 6 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
              Ihre Bewertung abgeben
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Teilen Sie Ihre Erfahrung mit unserem Eis!
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Name-Feld */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Ihr Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#4FC3F7',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#0288D1',
                        },
                      },
                    }}
                  />
                </Grid>
                
                {/* Rating-Feld */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                      Ihre Bewertung
                    </Typography>
                    <Rating
                      name="rating"
                      value={formData.rating}
                      onChange={handleRatingChange}
                      size="large"
                      sx={{
                        '& .MuiRating-iconFilled': {
                          color: '#FFA726',
                        },
                        '& .MuiRating-iconHover': {
                          color: '#FFA726',
                        },
                      }}
                    />
                  </Box>
                </Grid>
                
                {/* Text-Feld */}
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Ihre Bewertung"
                    name="text"
                    value={formData.text}
                    onChange={handleInputChange}
                    required
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder="Erzählen Sie uns von Ihrem Erlebnis..."
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#4FC3F7',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#0288D1',
                        },
                      },
                    }}
                  />
                </Grid>
                
                {/* Submit-Button */}
                <Grid size={{ xs: 12 }}>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      onClick={() => navigate('/')}
                      sx={{
                        borderColor: '#0288D1',
                        color: '#0288D1',
                        '&:hover': {
                          borderColor: '#0277BD',
                          bgcolor: 'rgba(2, 136, 209, 0.04)',
                        },
                      }}
                    >
                      Zur Startseite
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      sx={{
                        bgcolor: '#0288D1',
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        '&:hover': { bgcolor: '#0277BD' },
                      }}
                    >
                      Bewertung absenden
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>

        {/* Snackbar für Benachrichtigungen */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default BewertungenSeite;
