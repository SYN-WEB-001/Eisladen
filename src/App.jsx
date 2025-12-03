import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Testimonials from './components/Testimonials';
import SortenUebersicht from './components/SortenUebersicht';
import DetailSeite from './pages/DetailSeite';
import BewertungenSeite from './pages/BewertungenSeite';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <SortenUebersicht />
                <Testimonials />
              </>
            }
          />
          <Route path="/sorte/:slug" element={<DetailSeite />} />
          <Route path="/bewertungen" element={<BewertungenSeite />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
