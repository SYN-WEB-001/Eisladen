import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🍦</span>
          <span className="logo-text">Eiskaltes Hörnchen</span>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <a href="#sorten" className="nav-link">Sorten</a>
          <Link to="/bewertungen" className="nav-link">Bewertungen</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
