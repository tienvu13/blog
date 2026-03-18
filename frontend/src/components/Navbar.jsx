import { Link } from 'react-router-dom';

function Navbar(){
  return(
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }} className="container">
        <Link className="navbar-brand" to="/">
          📚 My MERN Blog
        </Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/">
            🏠 Home
          </Link>
          <Link className="nav-link" to="/write">
            ✍️ Write
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar