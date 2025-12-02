import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button, Container } from '@mui/material';

function Header() {
  const location = useLocation();
  const isBewertungenPage = location.pathname === '/bewertungen';
  const isDetailPage = location.pathname.startsWith('/sorte/');
  const shouldHideSorten = isBewertungenPage || isDetailPage;

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: '#ffffff',
        color: '#333',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 100,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            px: { xs: 1, sm: 2 },
          }}
        >
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              textDecoration: 'none',
              color: 'inherit',
              transition: 'transform 0.2s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <Typography
              component="span"
              sx={{
                fontSize: { xs: '1.5rem', sm: '2rem' },
                mr: 0.5,
              }}
            >
              🍦
            </Typography>
            <Typography
              variant="h6"
              component="span"
              sx={{
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
                fontWeight: 'bold',
                color: '#0288D1',
              }}
            >
              Eiskaltes Hörnchen
            </Typography>
          </Box>

          <Box
            component="nav"
            sx={{
              display: 'flex',
              gap: { xs: 1, sm: 2 },
              alignItems: 'center',
            }}
          >
            <Button
              component={Link}
              to="/"
              sx={{
                color: '#333',
                fontWeight: 500,
                textTransform: 'none',
                fontSize: { xs: '0.9rem', sm: '1rem' },
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: 0,
                  height: '2px',
                  bgcolor: '#0288D1',
                  transition: 'width 0.3s ease',
                },
                '&:hover': {
                  color: '#0288D1',
                  bgcolor: 'transparent',
                  '&::after': {
                    width: '100%',
                  },
                },
              }}
            >
              Home
            </Button>
            {!shouldHideSorten && (
              <Button
                component="a"
                href="#sorten"
                sx={{
                  color: '#333',
                  fontWeight: 500,
                  textTransform: 'none',
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: 0,
                    height: '2px',
                    bgcolor: '#0288D1',
                    transition: 'width 0.3s ease',
                  },
                  '&:hover': {
                    color: '#0288D1',
                    bgcolor: 'transparent',
                    '&::after': {
                      width: '100%',
                    },
                  },
                }}
              >
                Sorten
              </Button>
            )}
            <Button
              component={Link}
              to="/bewertungen"
              sx={{
                color: '#333',
                fontWeight: 500,
                textTransform: 'none',
                fontSize: { xs: '0.9rem', sm: '1rem' },
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: 0,
                  height: '2px',
                  bgcolor: '#0288D1',
                  transition: 'width 0.3s ease',
                },
                '&:hover': {
                  color: '#0288D1',
                  bgcolor: 'transparent',
                  '&::after': {
                    width: '100%',
                  },
                },
              }}
            >
              Bewertungen
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
