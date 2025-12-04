import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
} from '@mui/material';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #4FC3F7 0%, #0288D1 100%)',
        color: '#ffffff',
        mt: 4,
        pt: 3,
        pb: 1,
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Grid
          container
          spacing={{ xs: 3, sm: 4 }}
          sx={{
            mb: 2,
          }}
        >
          {/* Brand Section */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  mb: 1,
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    fontSize: '2rem',
                  }}
                >
                  🍦
                </Typography>
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#ffffff',
                  }}
                >
                  Eiskaltes Hörnchen
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  lineHeight: 1.6,
                  fontSize: '1.1rem',
                }}
              >
                Ein React-Projekt von Sven, Holger, Eric und Serge!
              </Typography>
            </Box>
          </Grid>

          {/* Opening Hours */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <Typography
                variant="h6"
                component="h4"
                sx={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  mb: 1,
                }}
              >
                Öffnungszeiten
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  lineHeight: 1.6,
                  fontSize: '1.1rem',
                }}
              >
                Mo - Fr: 12:00 - 20:00 Uhr
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  lineHeight: 1.6,
                  fontSize: '1.1rem',
                }}
              >
                Sa - So: 11:00 - 21:00 Uhr
              </Typography>
            </Box>
          </Grid>

          {/* Contact */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <Typography
                variant="h6"
                component="h4"
                sx={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  mb: 1,
                }}
              >
                Kontakt
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  lineHeight: 1.6,
                  fontSize: '1.1rem',
                }}
              >
                📍 Musterstraße 123, 12345 Berlin
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  lineHeight: 1.6,
                  fontSize: '1.1rem',
                }}
              >
                📞 +49 123 456789
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  lineHeight: 1.6,
                  fontSize: '1.1rem',
                }}
              >
                ✉️ info@eiskalteshoernchen.de
              </Typography>
            </Box>
          </Grid>

          {/* Social Links */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <Typography
                variant="h6"
                component="h4"
                sx={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  mb: 1,
                }}
              >
                Folge uns
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.5,
                  alignItems: { xs: 'center', md: 'flex-start' },
                }}
              >
                <Link
                  href="#"
                  aria-label="Facebook"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    display: 'inline-block',
                    '&:hover': {
                      color: '#ffffff',
                      transform: 'translateX(5px)',
                    },
                  }}
                >
                  Facebook
                </Link>
                <Link
                  href="#"
                  aria-label="Instagram"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    display: 'inline-block',
                    '&:hover': {
                      color: '#ffffff',
                      transform: 'translateX(5px)',
                    },
                  }}
                >
                  Instagram
                </Link>
                <Link
                  href="#"
                  aria-label="Twitter"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    display: 'inline-block',
                    '&:hover': {
                      color: '#ffffff',
                      transform: 'translateX(5px)',
                    },
                  }}
                >
                  Twitter
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider
          sx={{
            borderColor: 'rgba(255, 255, 255, 0.2)',
            my: 2,
          }}
        />

        <Box
          sx={{
            textAlign: 'center',
            pt: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.9rem',
            }}
          >
            &copy; {currentYear} Eiskaltes Hörnchen. Alle Rechte vorbehalten.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
