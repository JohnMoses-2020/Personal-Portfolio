import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Handle mouse movement for custom cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Projects data
  const projects = [
    {
      id: 1,
      title: 'Web Design Portfolio',
      category: 'Web Development',
      year: '2024',
      image: 'https://via.placeholder.com/600x400/f5f5f5/333333',
      link: '#'
    },
    {
      id: 2,
      title: 'E-Commerce Platform',
      category: 'Web Development',
      year: '2023',
      image: 'https://via.placeholder.com/600x400/f5f5f5/333333',
      link: '#'
    },
    {
      id: 3,
      title: 'Mobile App Design',
      category: 'UI/UX',
      year: '2023',
      image: 'https://via.placeholder.com/600x400/f5f5f5/333333',
      link: '#'
    }
  ];

  // Skills data
  const skills = [
    'HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 
    'TypeScript', 'Firebase', 'UI/UX Design', 'Responsive Design'
  ];

  return (
    <div className="portfolio">
      {/* Custom cursor */}
      <div 
        className={`cursor ${isHoveringLink ? 'cursor-grow' : ''}`}
        style={{ 
          left: `${cursorPosition.x}px`, 
          top: `${cursorPosition.y}px` 
        }}
      />
      
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-logo">John Moses</div>
        <div 
          className={`nav-toggle ${menuOpen ? 'open' : ''}`} 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
        </div>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li>
            <a 
              href="#home" 
              className={activeSection === 'home' ? 'active' : ''}
              onClick={() => {
                setActiveSection('home');
                setMenuOpen(false);
              }}
              onMouseEnter={() => setIsHoveringLink(true)}
              onMouseLeave={() => setIsHoveringLink(false)}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#work" 
              className={activeSection === 'work' ? 'active' : ''}
              onClick={() => {
                setActiveSection('work');
                setMenuOpen(false);
              }}
              onMouseEnter={() => setIsHoveringLink(true)}
              onMouseLeave={() => setIsHoveringLink(false)}
            >
              Work
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              className={activeSection === 'about' ? 'active' : ''}
              onClick={() => {
                setActiveSection('about');
                setMenuOpen(false);
              }}
              onMouseEnter={() => setIsHoveringLink(true)}
              onMouseLeave={() => setIsHoveringLink(false)}
            >
              About
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              className={activeSection === 'contact' ? 'active' : ''}
              onClick={() => {
                setActiveSection('contact');
                setMenuOpen(false);
              }}
              onMouseEnter={() => setIsHoveringLink(true)}
              onMouseLeave={() => setIsHoveringLink(false)}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
      
      {/* Hero section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-title-line">Creative</span>
            <span className="hero-title-line">Developer &</span>
            <span className="hero-title-line">Designer</span>
          </h1>
          <p className="hero-description">
            Crafting beautiful digital experiences through clean code and thoughtful design.
          </p>
        </div>
      </section>
      
      {/* Work section */}
      <section id="work" className="work">
        <div className="section-header">
          <h2>Selected Work</h2>
          <p>Recent projects I've been working on</p>
        </div>
        <div className="projects-grid">
          {projects.map(project => (
            <div 
              key={project.id} 
              className="project-card"
              onMouseEnter={() => setIsHoveringLink(true)}
              onMouseLeave={() => setIsHoveringLink(false)}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <div className="project-meta">
                  <span className="project-category">{project.category}</span>
                  <span className="project-year">{project.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* About section */}
      <section id="about" className="about">
        <div className="section-header">
          <h2>About Me</h2>
        </div>
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a web developer and designer based in Seattle, with a passion for creating clean, 
              functional, and visually appealing digital experiences. With expertise in front-end development
              and UI/UX design, I strive to build websites that not only look great but also provide
              exceptional user experiences.
            </p>
            <p>
              When I'm not coding, you can find me cheering for the Seattle Mariners, exploring the 
              Pacific Northwest, or experimenting with new technologies.
            </p>
          </div>
          <div className="skills">
            <h3>Skills</h3>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact section */}
      <section id="contact" className="contact">
        <div className="section-header">
          <h2>Get In Touch</h2>
          <p>Have a project in mind? Let's work together.</p>
        </div>
        <div className="contact-content">
          <a 
            href="mailto:hello@johnmoses.com" 
            className="contact-link"
            onMouseEnter={() => setIsHoveringLink(true)}
            onMouseLeave={() => setIsHoveringLink(false)}
          >
            hello@johnmoses.com
          </a>
          <div className="social-links">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
              onMouseEnter={() => setIsHoveringLink(true)}
              onMouseLeave={() => setIsHoveringLink(false)}
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
              onMouseEnter={() => setIsHoveringLink(true)}
              onMouseLeave={() => setIsHoveringLink(false)}
            >
              LinkedIn
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
              onMouseEnter={() => setIsHoveringLink(true)}
              onMouseLeave={() => setIsHoveringLink(false)}
            >
              Twitter
            </a>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>© 2024 John Moses. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
