import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">
            <span className="footer-icon">🍦</span>
            Eiskaltes Hörnchen
          </h3>
          <p className="footer-description">
            Ein React-Projekt von Sven, Holger, Eric und Serge!
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Öffnungszeiten</h4>
          <p>Mo - Fr: 12:00 - 20:00 Uhr</p>
          <p>Sa - So: 11:00 - 21:00 Uhr</p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Kontakt</h4>
          <p>📍 Musterstraße 123, 12345 Berlin</p>
          <p>📞 +49 123 456789</p>
          <p>✉️ info@eiskalteshoernchen.de</p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Folge uns</h4>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="Facebook">Facebook</a>
            <a href="#" className="social-link" aria-label="Instagram">Instagram</a>
            <a href="#" className="social-link" aria-label="Twitter">Twitter</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Eiskaltes Hörnchen. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  );
}

export default Footer;
