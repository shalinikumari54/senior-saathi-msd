import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-primary">
            Senior Saathi
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-text hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-text hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/services" className="text-text hover:text-primary transition-colors">
              Services
            </Link>
            <Link to="/contact" className="text-text hover:text-primary transition-colors">
              Contact
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-text hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-text hover:text-primary transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-text hover:text-primary transition-colors">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <Link to="/" className="block py-2 text-text hover:text-primary">
              Home
            </Link>
            <Link to="/about" className="block py-2 text-text hover:text-primary">
              About
            </Link>
            <Link to="/services" className="block py-2 text-text hover:text-primary">
              Services
            </Link>
            <Link to="/contact" className="block py-2 text-text hover:text-primary">
              Contact
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="block py-2 text-text hover:text-primary">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block py-2 text-text hover:text-primary"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2 text-text hover:text-primary">
                  Login
                </Link>
                <Link to="/register" className="block py-2 btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
