import React, { useState, useEffect } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">// Julio Lopez</div>

        <button className="menu-toggle" onClick={toggleMenu} aria-label="Abrir menú">
          ☰
        </button>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a onClick={() => scrollToSection('about')}>Sobre mí</a>
          <a onClick={() => scrollToSection('projects')}>Proyectos</a>
          <a onClick={() => scrollToSection('skills')}>Habilidades</a>
          <a onClick={() => scrollToSection('contact')}>Contacto</a>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
