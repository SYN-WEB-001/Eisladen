import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Testimonials from './components/Testimonials';
import SortenUebersicht from './components/SortenUebersicht';
import DetailSeite from './pages/DetailSeite';
import './App.css';

function App() {
  return (
    <Router>
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
      </Routes>
    </Router>
  );
}

export default App;
