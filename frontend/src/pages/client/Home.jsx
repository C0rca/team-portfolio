"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import { useLanguage } from '../../context/LanguageContext';
import { API_BASE_URL } from '../../context/AuthContext';
import { 
  Code, Smartphone, Cpu, Palette, Globe, Github, Linkedin, 
  Mail, Phone, MapPin, Send, MessageSquare, BookOpen, Star, ChevronLeft, ChevronRight, Eye, Calendar,
  ArrowLeft, ArrowRight
} from 'lucide-react';

// Mapping string icons from db to Lucide React components
const IconMap = {
  Code: Code,
  Smartphone: Smartphone,
  Cpu: Cpu,
  Palette: Palette
};

const Home = ({ initialData }) => {
  const { language, t } = useLanguage();
  const pathname = usePathname();
  
  // Data States
  const [services, setServices] = useState(initialData?.services || []);
  const [projects, setProjects] = useState(initialData?.projects || []);
  const [team, setTeam] = useState(initialData?.members || []);
  const [testimonials, setTestimonials] = useState(initialData?.testimonials || []);
  const [articles, setArticles] = useState(initialData?.articles || []);
  const [settings, setSettings] = useState(initialData?.settings || null);
  const [homepageSettings, setHomepageSettings] = useState(initialData?.homepageSettings || null);

  // Filter for projects
  const [activeCategory, setActiveCategory] = useState('all');

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState({ loading: false, success: null, error: null });

  // Testimonials Carousel index
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  // Scroll logic on mount
  useEffect(() => {
    // Scroll to section if hash exists in URL
    if (typeof window !== 'undefined' && window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [pathname]);

  // Project category filters helper
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  // Handle Contact Form Submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: null, error: null });
    try {
      await axios.post(`${API_BASE_URL}/api/messages/`, formData);
      setFormStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setFormStatus({ loading: false, success: false, error: err.response?.data?.message || t('contact.error') });
    }
  };

  const nextTestimonial = () => {
    setTestimonialIdx(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIdx(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="home-page animate-fade-in">
      {/* Background decorations */}
      <div className="bg-grid-glow"></div>
      <div className="bg-radial-gradient"></div>
      <div className="hero-glow-1"></div>
      <div className="hero-glow-2"></div>

      {homepageSettings?.video?.enabled && (() => {
        const videoSrc = homepageSettings.video.url
          ? (homepageSettings.video.url.startsWith('http') ? homepageSettings.video.url : `${API_BASE_URL}${homepageSettings.video.url}`)
          : 'https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-loop-41793-large.mp4';
        return (
          <div 
            className="hero-video-wrapper" 
            style={{ 
              opacity: homepageSettings.video.opacity !== undefined ? homepageSettings.video.opacity : 0.15 
            }}
          >
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              key={videoSrc} 
              className="hero-video-element"
              style={{
                filter: `blur(${homepageSettings.video.blur !== undefined ? homepageSettings.video.blur : 3}px)`
              }}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
            <div 
              className="hero-video-overlay"
              style={{
                background: `radial-gradient(circle at center, rgba(10, 10, 18, ${homepageSettings.video.overlayDarkness !== undefined ? Math.max(0, homepageSettings.video.overlayDarkness - 0.2) : 0.5}) 0%, rgba(10, 10, 18, ${homepageSettings.video.overlayDarkness !== undefined ? homepageSettings.video.overlayDarkness : 0.7}) 100%)`
              }}
            ></div>
          </div>
        );
      })()}

      {/* 1. HERO SECTION */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          
          <h1 className="hero-title animate-fade-in-up">
            {homepageSettings?.hero?.[`title_${language}_1`] || t('hero.title_part1')} <br />
            <span className="gradient-text">{homepageSettings?.hero?.[`title_${language}_2`] || t('hero.title_part2')}</span> <br />
            {homepageSettings?.hero?.[`title_${language}_3`] || t('hero.title_part3')}
          </h1>
          
          <p className="hero-subtitle animate-fade-in-up">
            {homepageSettings?.hero?.[`subtitle_${language}`] || t('hero.subtitle')}
          </p>

          <div className="hero-buttons animate-fade-in-up">
            <a href="#contact" className="btn btn-primary">
              <Send size={18} />
              <span>{homepageSettings?.hero?.[`contactBtn_${language}`] || t('hero.contact_btn')}</span>
            </a>
            <a href="#portfolio" className="btn btn-secondary">
              <BookOpen size={18} />
              <span>{homepageSettings?.hero?.[`portfolioBtn_${language}`] || t('hero.portfolio_btn')}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section id="services" className="section-padding">
        <div className="section-header">
          <h2 className="section-title">{homepageSettings?.sections?.[`services_title_${language}`] || t('services.title')}</h2>
          <p className="section-subtitle">{homepageSettings?.sections?.[`services_subtitle_${language}`] || t('services.subtitle')}</p>
        </div>
        
        <div className="services-grid">
          {services.map((service) => {
            const IconComponent = IconMap[service.icon] || Code;
            return (
              <div key={service.id} className="service-card glass-panel">
                <div className="service-icon-container">
                  <IconComponent size={32} className="service-icon" />
                </div>
                <h3 className="service-title">
                  {language === 'fa' ? service.title_fa : service.title_en}
                </h3>
                <p className="service-desc">
                  {language === 'fa' ? service.description_fa : service.description_en}
                </p>
                {service.price_fa && (
                  <div className="service-price">
                    <span>{language === 'fa' ? service.price_fa : service.price_en}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. TEAM SECTION */}
      <section id="team" className="section-padding">
        <div className="section-header">
          <h2 className="section-title">{homepageSettings?.sections?.[`team_title_${language}`] || t('team.title')}</h2>
          <p className="section-subtitle">{homepageSettings?.sections?.[`team_subtitle_${language}`] || t('team.subtitle')}</p>
        </div>

        <div className="team-grid">
          {(() => {
            const frameUrl = homepageSettings?.teamFrameUrl
              ? (homepageSettings.teamFrameUrl.startsWith('http') ? homepageSettings.teamFrameUrl : `${API_BASE_URL}${homepageSettings.teamFrameUrl}`)
              : '/team-frame.png';
            return team.map((member) => (
              <div 
                key={member.id} 
                className="team-card glass-panel"
                style={{ '--team-frame-url': `url(${frameUrl})` }}
              >
              <div className="team-avatar-container">
                {member.avatar ? (
                  <img src={member.avatar.startsWith('http') ? member.avatar : `${API_BASE_URL}${member.avatar}`} alt={member.name_fa} className="team-avatar" />
                ) : (
                  <div className="team-avatar-placeholder">
                    {member.name_fa.slice(0, 1)}
                  </div>
                )}
              </div>
              <h3 className="team-member-name">
                {language === 'fa' ? member.name_fa : member.name_en}
              </h3>
              <span className="team-member-role">
                {language === 'fa' ? member.role_fa : member.role_en}
              </span>
              <p className="team-member-bio">
                {language === 'fa' ? member.bio_fa : member.bio_en}
              </p>
              
              <div className="team-socials">
                {member.github_url && (
                  <a href={member.github_url} target="_blank" rel="noopener noreferrer" className="social-icon">
                    <Github size={16} />
                  </a>
                )}
                {member.linkedin_url && (
                  <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="social-icon">
                    <Linkedin size={16} />
                  </a>
                )}
            </div>
          </div>
        ))
        })()}
        </div>
      </section>

      {/* 4. PORTFOLIO SECTION */}
      <section id="portfolio" className="section-padding">
        <div className="section-header">
          <h2 className="section-title">{homepageSettings?.sections?.[`portfolio_title_${language}`] || t('portfolio.title')}</h2>
          <p className="section-subtitle">{homepageSettings?.sections?.[`portfolio_subtitle_${language}`] || t('portfolio.subtitle')}</p>
        </div>

        {/* Filters */}
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

        {/* Project Grid */}
        <div className="project-grid">
          {(filteredProjects.length > 5 ? filteredProjects.slice(0, 4) : filteredProjects.slice(0, 5)).map((project) => (
            <div key={project.id} className="project-card glass-panel">
              {project.image ? (
                <img src={project.image.startsWith('http') ? project.image : `${API_BASE_URL}${project.image}`} alt={project.title_fa} className="project-image" />
              ) : (
                <div className="project-image-placeholder">
                  <Code size={48} className="placeholder-icon animate-pulse-slow" />
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
                      <Github size={16} />
                      <span>{t('portfolio.github_code')}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredProjects.length > 5 && (
            <div className="project-card glass-panel explore-more-card flex-center" style={{ minHeight: '350px' }}>
              <div className="explore-more-content" style={{ textAlign: 'center', padding: '30px 20px' }}>
                <div className="explore-icon-wrapper" style={{ marginBottom: '20px', display: 'inline-flex', padding: '15px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)' }}>
                  <Code size={36} className="animate-bounce" />
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', color: 'var(--text-primary)' }}>
                  {language === 'fa' ? `+${filteredProjects.length - 4} پروژه دیگر` : `+${filteredProjects.length - 4} More Projects`}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.5' }}>
                  {language === 'fa' ? 'تمام کارهای ما را در صفحه آرشیو مشاهده کنید' : 'Explore all of our work in the archive'}
                </p>
                <Link href="/portfolio" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <span>{language === 'fa' ? 'مشاهده همه' : 'View All'}</span>
                  {language === 'fa' ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* View Full Portfolio Button */}
        <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
          <Link href="/portfolio" className="btn btn-secondary explore-portfolio-btn" style={{ padding: '14px 28px', border: '1px solid var(--border-color)', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <span>{language === 'fa' ? 'مشاهده آرشیو کامل نمونه‌کارها' : 'View Full Portfolio Archive'}</span>
            {language === 'fa' ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
          </Link>
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION */}
      {testimonials.length > 0 && (
        <section id="testimonials" className="section-padding bg-dark-tint">
          <div className="section-header">
            <h2 className="section-title">{homepageSettings?.sections?.[`testimonials_title_${language}`] || t('testimonials.title')}</h2>
            <p className="section-subtitle">{homepageSettings?.sections?.[`testimonials_subtitle_${language}`] || t('testimonials.subtitle')}</p>
          </div>

          <div className="testimonials-carousel-wrapper">
            <div className="testimonials-carousel-container">
              <button className="carousel-control-btn prev" onClick={prevTestimonial}>
                {language === 'fa' ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
              </button>

              <div className="testimonial-slide glass-panel">
                <div className="quote-mark">“</div>
                <div className="testimonial-stars">
                  {[...Array(testimonials[testimonialIdx].rating)].map((_, i) => (
                    <Star key={i} size={16} fill="gold" stroke="gold" />
                  ))}
                </div>
                <p className="testimonial-text">
                  " {language === 'fa' ? testimonials[testimonialIdx].feedback_fa : testimonials[testimonialIdx].feedback_en} "
                </p>
                <div className="testimonial-client">
                  <h4 className="client-name">
                    {language === 'fa' ? testimonials[testimonialIdx].client_name_fa : testimonials[testimonialIdx].client_name_en}
                  </h4>
                  <span className="client-company">
                    {language === 'fa' ? testimonials[testimonialIdx].client_company_fa : testimonials[testimonialIdx].client_company_en}
                  </span>
                </div>
              </div>

              <button className="carousel-control-btn next" onClick={nextTestimonial}>
                {language === 'fa' ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
              </button>
            </div>

            {/* Carousel Dots */}
            <div className="carousel-dots">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  className={`dot-btn ${testimonialIdx === idx ? 'active' : ''}`}
                  onClick={() => setTestimonialIdx(idx)}
                  title={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. BLOG SECTION */}
      {articles.length > 0 && (
        <section id="blog" className="section-padding">
          <div className="section-header">
            <h2 className="section-title">{homepageSettings?.sections?.[`blog_title_${language}`] || t('blog.title')}</h2>
            <p className="section-subtitle">{homepageSettings?.sections?.[`blog_subtitle_${language}`] || t('blog.subtitle')}</p>
          </div>

          <div className="articles-grid">
            {articles.map((art) => (
              <div key={art.id} className="article-card glass-panel">
                {art.cover_image ? (
                  <img src={art.cover_image.startsWith('http') ? art.cover_image : `${API_BASE_URL}${art.cover_image}`} alt={art.title_fa} className="article-image" />
                ) : (
                  <div className="article-image-placeholder">
                    <BookOpen size={40} className="placeholder-icon" />
                  </div>
                )}

                <div className="article-content">
                  <h3 className="article-card-title">
                    {language === 'fa' ? art.title_fa : art.title_en}
                  </h3>
                  
                  <div className="article-meta">
                    <span className="meta-item">
                      <Calendar size={14} />
                      <span>{new Date(art.created_at).toLocaleDateString(language === 'fa' ? 'fa-IR' : 'en-US')}</span>
                    </span>
                    <span className="meta-item">
                      <Eye size={14} />
                      <span>{art.views_count} {t('blog.views')}</span>
                    </span>
                  </div>

                  <a href={`/blog/${art.slug}`} className="btn btn-secondary read-more-btn">
                    <span>{t('blog.read_more')}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. CONTACT SECTION */}
      <section id="contact" className="section-padding">
        <div className="section-header">
          <h2 className="section-title">{homepageSettings?.sections?.[`contact_title_${language}`] || t('contact.title')}</h2>
          <p className="section-subtitle">{homepageSettings?.sections?.[`contact_subtitle_${language}`] || t('contact.subtitle')}</p>
        </div>

        <div className="contact-section-container">
          {/* Quick info list */}
          {settings && (
            <div className="contact-info-panel glass-panel">
              <h3 className="info-title">{language === 'fa' ? 'راه‌های ارتباطی' : 'Quick Connections'}</h3>
              
              <ul className="info-list">
                {settings.phone && (
                  <li>
                    <Phone size={20} className="info-icon" />
                    <div>
                      <span className="info-label">{language === 'fa' ? 'تلفن تماس' : 'Phone'}</span>
                      <span className="info-value ltr-text">{settings.phone}</span>
                    </div>
                  </li>
                )}
                {settings.email && (
                  <li>
                    <Mail size={20} className="info-icon" />
                    <div>
                      <span className="info-label">{language === 'fa' ? 'پست الکترونیک' : 'Email Address'}</span>
                      <span className="info-value">{settings.email}</span>
                    </div>
                  </li>
                )}
                {(settings.address_fa || settings.address_en) && (
                  <li>
                    <MapPin size={20} className="info-icon" />
                    <div>
                      <span className="info-label">{language === 'fa' ? 'نشانی دفتر' : 'Office Address'}</span>
                      <span className="info-value">{language === 'fa' ? settings.address_fa : settings.address_en}</span>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Form */}
          <form className="contact-form glass-panel" onSubmit={handleContactSubmit}>
            <div className="input-group">
              <label className="input-label">{t('contact.name')}</label>
              <input 
                type="text" 
                className="form-input" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div className="input-group">
              <label className="input-label">{t('contact.email')}</label>
              <input 
                type="email" 
                className="form-input" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="input-group">
              <label className="input-label">{t('contact.subject')}</label>
              <input 
                type="text" 
                className="form-input" 
                required 
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              />
            </div>

            <div className="input-group">
              <label className="input-label">{t('contact.message')}</label>
              <textarea 
                className="form-input" 
                rows="5" 
                required 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>

            {formStatus.success === true && (
              <div className="form-alert success">{t('contact.success')}</div>
            )}
            {formStatus.success === false && (
              <div className="form-alert error">{formStatus.error}</div>
            )}

            <button type="submit" className="btn btn-primary" disabled={formStatus.loading}>
              {formStatus.loading ? (
                <span>{t('contact.sending')}</span>
              ) : (
                <>
                  <Send size={18} />
                  <span>{t('contact.send')}</span>
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
