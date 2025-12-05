import { useState, useEffect } from 'react';
import { Box, Container, Typography, Card, CardContent, CardMedia, Chip, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SortenUebersicht() {
  const [sorten, setSorten] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Alle');
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

  const handleCategoryChange = (event, newCategory) => {
    if (newCategory !== null) {
      setSelectedCategory(newCategory);
    }
  };

  const filteredSorten = selectedCategory === 'Alle' 
    ? sorten 
    : sorten.filter(sorte => sorte.kategorie === selectedCategory);

  const categories = ['Alle', 'Milch', 'Vegan', 'Sorbet', 'Klassiker', 'Saison'];

  return (
    <Box id="sorten" sx={{ py: 8 }}>
      <Container>
        <Typography 
          variant="h2" 
          component="h2" 
          align="center" 
          gutterBottom
          sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 700 }}
        >
          Unsere Eissorten
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <ToggleButtonGroup
            value={selectedCategory}
            exclusive
            onChange={handleCategoryChange}
            aria-label="Eiskategorie auswählen"
            sx={{
              flexWrap: 'wrap',
              gap: 1,
              '& .MuiToggleButton-root': {
                px: 3,
                py: 1,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 500,
              }
            }}
          >
            {categories.map((category) => (
              <ToggleButton 
                key={category} 
                value={category}
                sx={{
                  '&.Mui-selected': {
                    bgcolor: '#0288D1',
                    color: 'white',
                    '&:hover': {
                      bgcolor: '#0277BD',
                    }
                  }
                }}
              >
                {category}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        <Typography 
          variant="h5" 
          align="center" 
          color="text.secondary" 
          sx={{ mb: 3, fontSize: { xs: '1.25rem', md: '1.5rem' } }}
        >
          {filteredSorten.length} {filteredSorten.length === 1 ? 'Sorte' : 'Sorten'} gefunden
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
          {filteredSorten.map((sorte) => (
            <Card
              key={sorte.slug}
              sx={{ cursor: 'pointer', height: '100%' }}
              onClick={() => navigate(`/sorte/${sorte.slug}`)}
            >
              <CardMedia
                component="img"
                height="200"
                image={sorte.bild || '/img/cookies.svg'}
                alt={sorte.name}
                sx={{
                  objectFit: 'cover',
                  bgcolor: '#e0e0e0',
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  //fallbac
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

