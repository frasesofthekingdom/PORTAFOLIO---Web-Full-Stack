import React, { useEffect } from 'react';

const Home = () => {
  // Animaciones al hacer scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('section, .stats-bar, .hero').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // ========== useEffect para PDF (CORREGIDO - DENTRO del componente) ==========
  useEffect(() => {
    const exportToPDF = async () => {
      const element = document.getElementById('pdf-export-area');
      if (!element) return;
      
      try {
        const html2canvas = (await import('html2canvas')).default;
        const jsPDF = (await import('jspdf')).default;
        
        const canvas = await html2canvas(element, {
          scale: 2,
          backgroundColor: '#ffffff',
          logging: false
        });
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });
        
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('Julio_Lopez_Portfolio.pdf');
      } catch (error) {
        console.error('Error al generar PDF:', error);
      }
    };
    
    const pdfButton = document.getElementById('exportPDF');
    if (pdfButton) {
      pdfButton.addEventListener('click', exportToPDF);
    }
    
    return () => {
      if (pdfButton) {
        pdfButton.removeEventListener('click', exportToPDF);
      }
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="pdf-export-area">   {/* ← IMPORTANTE: Envolver todo para PDF */}
      <div className="container">
        {/* HERO SECTION */}
        <div className="hero animate">
          <p className="hero-tag">// Desarrollador de software</p>
          <h1>Hola, soy<br /><span>Julio Lopez</span></h1>
          <p className="hero-sub">
            He desarrollado varios proyectos de programación en diferentes áreas, como diseño de interfaces y aplicaciones web.
            Estos proyectos reflejan mi pasión por la programación, mi deseo de aprender y mejorar continuamente.
          </p>
          <div className="btn-group">
            <button className="btn btn-primary" onClick={() => scrollToSection('projects')}>Ver proyectos</button>
            <button className="btn btn-secondary" onClick={() => scrollToSection('contact')}>Contactar</button>
            {/* NUEVO BOTÓN PARA PDF */}
            {/* <button className="btn btn-secondary" id="exportPDF" style={{ background: 'var(--accent)', color: 'white', border: 'none' }}>
              📄 Exportar CV a PDF
            </button> */}
          </div>
        </div>

        {/* STATS BAR */}
        <div className="stats-bar">
          <div className="stat">
            <span className="stat-num">4+</span>
            <span className="stat-label">Tecnologías dominadas</span>
          </div>
          <div className="stat">
            <span className="stat-num">3</span>
            <span className="stat-label">Proyectos destacados</span>
          </div>
          <div className="stat">
            <span className="stat-num">80%</span>
            <span className="stat-label">Dedicación al código</span>
          </div>
        </div>

        {/* ABOUT SECTION */}
        <section id="about">
          <div className="section-header">
            <span className="section-tag">01 / Sobre mí</span>
            <div className="section-line"></div>
          </div>
          <div className="about-grid">
            <div>
              <p className="about-text">
                Soy estudiante de Ingeniería en Sistemas Computacionales en <strong>UTESA</strong>. 
                Mi pasión por la creatividad me impulsa a desarrollar constantemente proyectos que reflejen 
                originalidad, innovación y un valor agregado. Busco aplicar mis conocimientos técnicos
                en programación para resolver problemas y crear soluciones efectivas y únicas.
              </p>
              <p className="about-text" style={{ marginTop: '1rem' }}>
                🎵 <strong>Baterista en la iglesia</strong> - Uso la música para adorar a Dios.
              </p>
              <p className="about-text">
                📸 <strong>Creador de contenido</strong> - Administro <strong>FRASES OF THE KINGDOM</strong> en Instagram.
              </p>
            </div>
            <div className="about-details">
              <div className="detail-row">
                <span className="detail-key">Nombre</span>
                <span className="detail-val">Julio Lopez</span>
              </div>
              <div className="detail-row">
                <span className="detail-key">Rol</span>
                <span className="detail-val">Desarrollador de Software</span>
              </div>
              <div className="detail-row">
                <span className="detail-key">Ubicación</span>
                <span className="detail-val">Santiago, RD</span>
              </div>
              <div className="detail-row">
                <span className="detail-key">Universidad</span>
                <span className="detail-val">UTESA</span>
              </div>
              <div className="detail-row">
                <span className="detail-key">Instagram</span>
                <span className="detail-val">
                  <a href="https://instagram.com/the_july_lc" target="_blank" rel="noopener">@the_july_lc</a>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects">
          <div className="section-header">
            <span className="section-tag">02 / Proyectos</span>
            <div className="section-line"></div>
          </div>
          <div className="projects-grid">
            {/* NUEVO PROYECTO - Portfolio en React (Full Stack) */}
            <div className="project-card">
              <div className="project-info">
                <img 
                  className="project-img" 
                  src="/images/PORTAFOLIO.png" 
                  alt="Portfolio Profesional" 
                  loading="lazy" 
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                  <span className="project-tech">React / Node.js / MongoDB</span>
                 
                </div>
                <h3 className="project-title">Portfolio Profesional - Full Stack</h3>
                <p className="project-desc">
                  Portfolio personal desarrollado con React, Node.js, Express y MongoDB. 
                  Incluye modo oscuro/claro, menú hamburguesa responsive, galería de proyectos, 
                  formulario de contacto con base de datos y panel de administración.
                </p>
                <div className="project-tags">
                  <span className="tag">React</span>
                  <span className="tag">Node.js</span>
                  <span className="tag">Express</span>
                  <span className="tag">MongoDB</span>
                  <span className="tag">JWT</span>
                </div>
              </div>
            </div>

            {/* Sistema de Inventario - Ferretería */}
            <div className="project-card">
              <div className="project-img-wrap">
                <img className="project-img" src="/images/sistemaFerreteria.png" alt="Sistema Ferretería" loading="lazy" />
                
              </div>
              <div className="project-info">
                <span className="project-tech">C# / Windows Forms</span>
                <h3 className="project-title">Sistema de Inventario - Ferretería</h3>
                <p className="project-desc">Sistema completo para gestión de inventario de ferretería. Incluye control de stock, ventas, reportes en PDF, autenticación de usuarios.</p>
                <div className="project-tags">
                  <span className="tag">C#</span>
                  <span className="tag">.NET</span>
                  <span className="tag">SQL Server</span>
                </div>
              </div>
            </div>

          

            {/* Frases Of The Kingdom */}
            <div className="project-card">
              <div className="project-img-wrap">
                <img className="project-img" src="/images/kingdom.png" alt="Frases Of The Kingdom" loading="lazy" />
              </div>
              <div className="project-info">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                  <span className="project-tech">React / Node.js</span>
                  <a href="https://frasesofthekingdom.netlify.app/" target="_blank" rel="noopener" className="btn-visit">↗ Ver sitio</a>
                </div>
                <h3 className="project-title">Frases Of The Kingdom</h3>
                <p className="project-desc">Sitio web inspirador para compartir mensajes de fe y reflexión. Full Stack con MongoDB y autenticación.</p>
                <div className="project-tags">
                  <span className="tag">HTML5</span>
                  <span className="tag">CSS3</span>
                  <span className="tag">JavaScript</span>
                  <span className="tag">Firebase</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills">
          <div className="section-header">
            <span className="section-tag">03 / Habilidades</span>
            <div className="section-line"></div>
          </div>
          <div className="skills-grid">
            <div className="skill-group">
              <div className="skill-group-title">Lenguajes</div>
              <div className="skill-item"><span className="skill-name">C#</span><div className="skill-bar-wrap"><div className="skill-bar" style={{ width: '85%' }}></div></div></div>
              <div className="skill-item"><span className="skill-name">Java</span><div className="skill-bar-wrap"><div className="skill-bar" style={{ width: '70%' }}></div></div></div>
              <div className="skill-item"><span className="skill-name">PHP</span><div className="skill-bar-wrap"><div className="skill-bar" style={{ width: '55%' }}></div></div></div>
              <div className="skill-item"><span className="skill-name">JavaScript</span><div className="skill-bar-wrap"><div className="skill-bar" style={{ width: '50%' }}></div></div></div>
            </div>

            <div className="skill-group">
              <div className="skill-group-title">Frontend</div>
              <div className="skill-item"><span className="skill-name">HTML5</span><div className="skill-bar-wrap"><div className="skill-bar" style={{ width: '75%' }}></div></div></div>
              <div className="skill-item"><span className="skill-name">CSS3</span><div className="skill-bar-wrap"><div className="skill-bar" style={{ width: '60%' }}></div></div></div>
              <div className="skill-item"><span className="skill-name">React</span><div className="skill-bar-wrap"><div className="skill-bar" style={{ width: '50%' }}></div></div></div>
            </div>

            <div className="skill-group">
              <div className="skill-group-title">Backend & DB</div>
              <div className="skill-item"><span className="skill-name">Node.js</span><div className="skill-bar-wrap"><div className="skill-bar" style={{ width: '50%' }}></div></div></div>
              <div className="skill-item"><span className="skill-name">SQL Server</span><div className="skill-bar-wrap"><div className="skill-bar" style={{ width: '75%' }}></div></div></div>
              <div className="skill-item"><span className="skill-name">MongoDB</span><div className="skill-bar-wrap"><div className="skill-bar" style={{ width: '45%' }}></div></div></div>
            </div>

            <div className="skill-group">
              <div className="skill-group-title">Herramientas</div>
              <div className="skill-item"><span className="skill-name">Git / GitHub</span><div className="skill-bar-wrap"><div className="skill-bar" style={{ width: '50%' }}></div></div></div>
              <div className="skill-item"><span className="skill-name">VS Code</span><div className="skill-bar-wrap"><div className="skill-bar" style={{ width: '75%' }}></div></div></div>
              <div className="skill-item"><span className="skill-name">Canva / Adobe</span><div className="skill-bar-wrap"><div className="skill-bar" style={{ width: '80%' }}></div></div></div>
            </div>
          </div>
        </section>

        {/* MUSIC SECTION */}
        <section id="music">
          <div className="section-header">
            <span className="section-tag">🎵 / Música</span>
            <div className="section-line"></div>
          </div>
          <div className="about-card" style={{ background: 'var(--bg2)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ fontSize: '4rem' }}>🥁</div>
              <div>
                <h3 style={{ marginBottom: '0.5rem' }}>Baterista en la iglesia</h3>
                <p className="about-text">
                  Uso la batería como instrumento para adorar a Dios. La música es mi segunda pasión después del código,
                  y me permite conectar con lo espiritual mientras sirvo a mi comunidad.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact">
          <div className="section-header">
            <span className="section-tag">04 / Contacto</span>
            <div className="section-line"></div>
          </div>
          <div className="contact-grid">
            <a href="mailto:elfernantlopz@gmail.com" className="contact-card">
              <div className="contact-icon">✉️</div>
              <div><div className="contact-label">Email</div><div className="contact-val">elfernantlopz@gmail.com</div></div>
            </a>
            <a href="https://github.com/LopezJ25" target="_blank" rel="noopener" className="contact-card">
              <div className="contact-icon">🐙</div>
              <div><div className="contact-label">GitHub</div><div className="contact-val">github.com/LopezJ25</div></div>
            </a>
            <a href="https://www.linkedin.com/in/julio-fernando-lópez/" target="_blank" rel="noopener" className="contact-card">
              <div className="contact-icon">🔗</div>
              <div><div className="contact-label">LinkedIn</div><div className="contact-val">julio-fernando-lópez</div></div>
            </a>
            <a href="https://instagram.com/the_july_lc" target="_blank" rel="noopener" className="contact-card">
              <div className="contact-icon">📷</div>
              <div><div className="contact-label">Instagram</div><div className="contact-val">@the_july_lc</div></div>
            </a>
            <a href="https://frasesofthekingdom.netlify.app/" target="_blank" rel="noopener" className="contact-card">
              <div className="contact-icon">🌐</div>
              <div><div className="contact-label">Frases Of The Kingdom</div><div className="contact-val">frasesofthekingdom.netlify.app</div></div>
            </a>
          </div>
        </section>

        <footer>
          // Diseñado y construido por Julio Lopez · 2026
        </footer>
      </div>
    </div>
  );
};

export default Home;