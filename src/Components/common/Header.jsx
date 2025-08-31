import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="logo-link">
          <div className="logo">
            <span className="logo-icon">🚑</span>
            <span className="logo-text">Emergency Dispatch</span>
          </div>
        </Link>
        
        <nav className="main-nav">
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}