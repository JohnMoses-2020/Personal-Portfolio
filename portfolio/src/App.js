import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredWord, setHoveredWord] = useState(null);
  const [isHoveringDescription, setIsHoveringDescription] = useState(false);
  const [typedTextIndex, setTypedTextIndex] = useState(0);
  const [vhsEffect, setVhsEffect] = useState(false);
  const heroRef = useRef(null);
  const cursorRef = useRef(null);
  
  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  
  // Completely rewritten cursor effect to ensure it works correctly
  useEffect(() => {
    // Create a cursor element
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-dot');
    document.body.appendChild(cursor);
    
    // Function to update cursor position - use clientX and clientY directly
    const updateCursorPosition = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      
      // Direct style assignment for more reliable positioning
      cursor.style.left = x + 'px';
      cursor.style.top = y + 'px';
    };
    
    // Add event listener to the entire document
    document.addEventListener('mousemove', updateCursorPosition);
    
    // Store reference to the cursor element
    cursorRef.current = cursor;
    
    // Clean up on component unmount
    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      if (cursor && cursor.parentNode) {
        document.body.removeChild(cursor);
      }
    };
  }, []);

  // Word data for animation - already visible without hover
  const titleWords = [
    { id: 'word1', text: 'Creative', line: 1 },
    { id: 'word2', text: 'Developer', line: 2 },
    { id: 'word3', text: '&', line: 2 },
    { id: 'word4', text: 'Designer', line: 3 }
  ];
  
  const descriptionText = "Crafting beautiful digital experiences through clean code and thoughtful design.";
  const descriptionWords = descriptionText.split(' ');

  // Handle typing effect for description
  useEffect(() => {
    if (isHoveringDescription) {
      const timer = setTimeout(() => {
        if (typedTextIndex < descriptionWords.length) {
          setTypedTextIndex(typedTextIndex + 1);
        }
      }, 150);

      return () => clearTimeout(timer);
    } else {
      setTypedTextIndex(0);
    }
  }, [isHoveringDescription, typedTextIndex, descriptionWords.length]);

  // Projects data
  const projects = [
    {
      id: 1,
      title: 'Web Design Portfolio',
      category: 'Web Development',
      year: '2024',
      image: '/assets/web-design.jpeg',
      link: '#'
    },
    {
      id: 2,
      title: 'E-Commerce Platform',
      category: 'Web Development',
      year: '2023',
      image: '/assets/e-commerce.jpeg',
      link: '#'
    },
    {
      id: 3,
      title: 'Mobile App Design',
      category: 'UI/UX',
      year: '2023',
      image: '/assets/mobile-app.jpeg.png',
      link: '#'
    }
  ];

  // Skills data
  const skills = [
    'HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 
    'TypeScript', 'Firebase', 'UI/UX Design', 'Responsive Design'
  ];

  return (
    <div className={`portfolio ${vhsEffect ? 'vhs-effect' : ''}`}>
      {/* VHS Effect Overlays */}
      {vhsEffect && (
        <>
          <div className="vhs-overlay"></div>
          <div className="scanlines"></div>
        </>
      )}
      
      {/* VHS Effect Toggle Button */}
      <button 
        className="vhs-toggle" 
        onClick={() => setVhsEffect(!vhsEffect)}
      >
        {vhsEffect ? 'VHS OFF' : 'VHS ON'}
      </button>
      
      {/* Retro Sun */}
      <div className="sun-container">
        <div className="sun"></div>
      </div>
      
      {/* Retro Icons */}
      <div className="retro-icons">
        <div className="cassette-icon"></div>
        <div className="computer-icon"></div>
      </div>
      
      {/* Vintage Computer */}
      <div className="vintage-computer">
        <div className="computer-screen">
          <div className="screen-content">HELLO WORLD</div>
        </div>
      </div>
      
      {/* Cassette Tape */}
      <div className="cassette-tape">
        <div className="cassette-label">PORTFOLIO.WAV</div>
      </div>
      
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-logo">
          <span className="boombox-icon"></span>
          John Moses
        </div>
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
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
      
      {/* Hero section */}
      <section 
        id="home" 
        className="hero"
        ref={heroRef}
      >
        <div className="hero-content">
          <h1 className="hero-title">
            {/* Title words with line breaks between lines */}
            <div className="hero-title-line">
              {titleWords
                .filter(word => word.line === 1)
                .map(word => (
                  <span 
                    key={word.id}
                    className={`hero-word ${hoveredWord === word.id ? 'word-hover' : ''}`}
                    onMouseEnter={() => setHoveredWord(word.id)}
                    onMouseLeave={() => setHoveredWord(null)}
                  >
                    {word.text}
                  </span>
                ))}
            </div>
            <div className="hero-title-line">
              {titleWords
                .filter(word => word.line === 2)
                .map(word => (
                  <span 
                    key={word.id}
                    className={`hero-word ${hoveredWord === word.id ? 'word-hover' : ''}`}
                    onMouseEnter={() => setHoveredWord(word.id)}
                    onMouseLeave={() => setHoveredWord(null)}
                  >
                    {word.text}{' '}
                  </span>
                ))}
            </div>
            <div className="hero-title-line">
              {titleWords
                .filter(word => word.line === 3)
                .map(word => (
                  <span 
                    key={word.id}
                    className={`hero-word ${hoveredWord === word.id ? 'word-hover' : ''}`}
                    onMouseEnter={() => setHoveredWord(word.id)}
                    onMouseLeave={() => setHoveredWord(null)}
                  >
                    {word.text}
                  </span>
                ))}
            </div>
          </h1>
          <p 
            className={`hero-description ${isHoveringDescription ? 'typing' : ''}`}
            onMouseEnter={() => setIsHoveringDescription(true)}
            onMouseLeave={() => setIsHoveringDescription(false)}
          >
            {isHoveringDescription ? (
              <span className="typing-text">
                {descriptionWords.slice(0, typedTextIndex + 1).join(' ')}
                <span className="typing-cursor">|</span>
              </span>
            ) : (
              descriptionText
            )}
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
              I'm a web developer and designer based in Seattle, Washington with a passion for creating clean, 
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
          >
            hello@johnmoses.com
          </a>
          <div className="social-links">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              LinkedIn
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              Twitter
            </a>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="footer">
        <div className="copyright">
          &copy; {new Date().getFullYear()} <span className="boombox-icon"></span> My Portfolio
        </div>
        <div className="retro-stamps">
          <div className="stamp stamp-a">VHS</div>
          <div className="stamp stamp-b">STEREO</div>
          <div className="stamp stamp-c">HI-FI</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
