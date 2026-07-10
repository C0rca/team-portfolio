import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { API_BASE_URL } from '../../context/AuthContext';
import { Sun, Moon, Globe, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoText, setLogoText] = useState('C0 Team');
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Fetch dynamic logo text
    axios.get(`${API_BASE_URL}/api/settings/general/`)
      .then(res => {
        if (res.data?.value?.logoText) {
          setLogoText(res.data.value.logoText);
        }
      })
      .catch(console.error);
      
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const menuItems = [
    { label: t('nav.home'), action: () => handleNavClick('home') },
    { label: t('nav.services'), action: () => handleNavClick('services') },
    { label: t('nav.portfolio'), action: () => handleNavClick('portfolio') },
    { label: t('nav.team'), action: () => handleNavClick('team') },
    { label: t('nav.testimonials'), action: () => handleNavClick('testimonials') },
    { label: t('nav.blog'), action: () => handleNavClick('blog') },
    { label: t('nav.contact'), action: () => handleNavClick('contact') },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={() => handleNavClick('home')}>
          {logoText && logoText.includes(' ') ? (
            <>
              <span className="logo-c">{logoText.split(' ')[0]}</span>{' '}
              <span className="logo-team">{logoText.split(' ').slice(1).join(' ')}</span>
            </>
          ) : (
            <span className="logo-team">{logoText || 'C0 Team'}</span>
          )}
        </Link>

        {/* Desktop Menu */}
        <ul className="nav-menu">
          {menuItems.map((item, idx) => (
            <li key={idx} className="nav-item">
              <button onClick={item.action} className="nav-link-btn">
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right side controls (theme, lang, auth) */}
        <div className="nav-actions">
          {/* Language Toggle */}
          <button onClick={toggleLanguage} className="action-btn lang-btn" title="Toggle Language">
            <Globe size={18} />
            <span>{language === 'fa' ? 'EN' : 'FA'}</span>
          </button>

          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="action-btn theme-btn" title="Toggle Theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>



          {/* Mobile menu toggle */}
          <button className="mobile-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-menu">
          {menuItems.map((item, idx) => (
            <li key={idx} className="mobile-nav-item">
              <button onClick={item.action} className="mobile-nav-link-btn">
                {item.label}
              </button>
            </li>
          ))}
          <li className="mobile-nav-item divider"></li>
          <li className="mobile-nav-item flex-actions">
            <button onClick={() => { toggleLanguage(); setIsOpen(false); }} className="mobile-action-btn">
              <Globe size={18} />
              <span>{language === 'fa' ? 'English' : 'فارسی'}</span>
            </button>
            <button onClick={() => { toggleTheme(); setIsOpen(false); }} className="mobile-action-btn">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
