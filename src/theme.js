// src/theme.js
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: { main: '#6c4f3d' },    // warmes Schoko-Braun
    secondary: { main: '#F7D6BD' },  // Vanille / Creme Akzent
    background: { default: '#fffaf6' },
    text: { primary: '#2c2c2c' }
  },
  typography: {
    // default fallback family: Baloo 2
    fontFamily: '"Baloo 2", Arial, sans-serif',

    // h1 & h2: Amatic SC (handgeschrieben)
    h1: {
      fontFamily: '"Amatic SC", cursive',
      fontWeight: 700,
      fontSize: '3rem',
      letterSpacing: '1px',
      lineHeight: 1.05
    },
    h2: {
      fontFamily: '"Amatic SC", cursive',
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.08
    },

    // h3: Baloo 2
    h3: {
      fontFamily: '"Baloo 2", sans-serif',
      fontWeight: 700,
      fontSize: '1.6rem'
    },
    h4: {
      fontFamily: '"Baloo 2", sans-serif',
      fontWeight: 700
    },
    // h5: Amatic SC (leicht, warm)
    h5: {
      fontFamily: '"Amatic SC", cursive',
      fontWeight: 400,
      fontSize: '1.1rem'
    },
    h6: {
      fontFamily: '"Baloo 2", sans-serif',
      fontWeight: 700
    },

    // Body / UI: Baloo 2 & Amatic SC
    body1: {
      fontFamily: '"Amatic SC", cursive',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.5
    },
    body2: {
      fontFamily: '"Amatic SC", cursive',
      fontWeight: 300,
      fontSize: '0.9rem'
    },

    // Buttons, small text
    button: {
      fontFamily: '"Baloo 2", sans-serif',
      fontWeight: 600,
      textTransform: 'none'
    },
    caption: {
      fontFamily: '"Baloo 2", sans-serif',
      fontWeight: 300,
      fontSize: '0.75rem'
    }
  },
  components: {
    // kleine Anpassungen für MUI-Komponenten
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          padding: '10px 18px'
        }
      }
    }
  }
});

theme = responsiveFontSizes(theme);

export default theme;
