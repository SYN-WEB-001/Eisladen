import { Box, Typography, Button, Container } from '@mui/material';

function Hero() {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        py: 10,
        textAlign: 'center',
      }}
    >
      <Container>
        <Typography variant="h1" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Gelateria Fiorentina
        </Typography>
        <Typography variant="h5" component="p" sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}>
          Täglich frisches Eis aus der Innenstadt – mit Liebe gemacht seit Generationen
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            bgcolor: 'white',
            color: '#667eea',
            '&:hover': { bgcolor: '#f5f5f5' },
          }}
          onClick={() => {
            document.getElementById('sorten')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Unsere Sorten entdecken
        </Button>
      </Container>
    </Box>
  );
}

export default Hero;

