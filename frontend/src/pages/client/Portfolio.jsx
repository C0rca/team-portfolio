import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../../context/LanguageContext';
import { API_BASE_URL } from '../../context/AuthContext';
import { Code, ArrowLeft, ArrowRight, Search } from 'lucide-react';

const Portfolio = () => {
  const { language, t } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters & Search
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`${API_BASE_URL}/api/projects/`)
      .then(res => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Filter projects by category and search query
  const filteredProjects = projects.filter(p => {
    const matchesCat = activeCategory === 'all' || p.category === activeCategory;
    
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCat;

    const title = (language === 'fa' ? p.title_fa : p.title_en).toLowerCase();
    const desc = (language === 'fa' ? p.description_fa : p.description_en).toLowerCase();
    const tech = p.tech_stack ? p.tech_stack.map(t => t.toLowerCase()).join(' ') : '';

    return matchesCat && (title.includes(query) || desc.includes(query) || tech.includes(query));
  });

  return (
    <div className="portfolio-page animate-fade-in section-padding" style={{ position: 'relative', minHeight: '80vh' }}>
      {/* Background decorations */}
      <div className="bg-grid-glow"></div>
      <div className="bg-radial-gradient"></div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Header and Back Link Wrapper */}
        <div className="portfolio-header-container">
          <div className="portfolio-header-titles">
            <h1 className="section-title" style={{ textAlign: 'start', margin: 0 }}>
              <span className="gradient-text">{language === 'fa' ? 'آرشیو نمونه‌کارها' : 'Our Full Portfolio'}</span>
            </h1>
            <p className="section-subtitle" style={{ textAlign: 'start', margin: '8px 0 0 0' }}>
              {language === 'fa' ? 'آرشیو کامل پروژه‌ها و محصولات توسعه داده شده' : 'Browse through all of our built projects'}
            </p>
          </div>
          
          <div className="back-home-btn-wrapper">
            <Link to="/" className="back-home-btn">
              {language === 'fa' ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
              <span>{language === 'fa' ? 'بازگشت به خانه' : 'Back to Home'}</span>
            </Link>
          </div>
        </div>

        {/* Filters and Search Bar Row */}
        <div className="portfolio-controls-bar glass-panel">
          <div className="portfolio-filters">
            {['all', 'web', 'mobile', 'ai', 'design', 'other'].map(cat => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {t(`portfolio.${cat}`)}
              </button>
            ))}
          </div>

          <div className="portfolio-search-input-wrapper">
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '45px', margin: 0 }}
              placeholder={language === 'fa' ? 'جستجو در عنوان، توضیحات یا فناوری‌ها...' : 'Search by title, description or technology...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex-center" style={{ minHeight: '30vh' }}>
            <div className="animate-pulse-slow">{language === 'fa' ? 'در حال بارگذاری پروژه‌ها...' : 'Loading projects...'}</div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="flex-center glass-panel" style={{ minHeight: '30vh', flexDirection: 'column', gap: '15px' }}>
            <Code size={48} style={{ color: 'var(--text-secondary)' }} />
            <p style={{ color: 'var(--text-secondary)' }}>
              {language === 'fa' ? 'هیچ پروژه‌ای مطابق با جستجوی شما یافت نشد.' : 'No projects matched your search criteria.'}
            </p>
          </div>
        ) : (
          <div className="project-grid">
            {filteredProjects.map((project) => (
              <div key={project.id} className="project-card glass-panel animate-fade-in-up">
                {project.image ? (
                  <img src={project.image.startsWith('http') ? project.image : `${API_BASE_URL}${project.image}`} alt={project.title_fa} className="project-image" />
                ) : (
                  <div className="project-image-placeholder">
                    <Code size={48} className="placeholder-icon" />
                  </div>
                )}
                
                <div className="project-content">
                  <span className="project-category-tag">{t(`portfolio.${project.category}`)}</span>
                  <h3 className="project-title">
                    {language === 'fa' ? project.title_fa : project.title_en}
                  </h3>
                  <p className="project-desc">
                    {language === 'fa' ? project.description_fa : project.description_en}
                  </p>

                  {project.tech_stack && project.tech_stack.length > 0 && (
                    <div className="project-tech">
                      <span className="tech-label">{t('portfolio.tech_stack')}</span>
                      <div className="tech-tags">
                        {project.tech_stack.map((tech, idx) => (
                          <span key={idx} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="project-links">
                    {project.demo_url && (
                      <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="proj-link demo-link">
                        {t('portfolio.view_demo')}
                      </a>
                    )}
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="proj-link github-link">
                        <Code size={16} />
                        <span>{t('portfolio.github_code')}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Portfolio;
