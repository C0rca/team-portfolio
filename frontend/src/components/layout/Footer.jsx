"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../../context/LanguageContext';
import { API_BASE_URL } from '../../context/AuthContext';
import { Github, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const { language, t } = useLanguage();
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    // Attempt to load settings from API
    axios.get(`${API_BASE_URL}/api/settings/general/`)
      .then(res => setSettings(res.data.value))
      .catch(err => {
        // Fallback default settings
        setSettings({
          logoText: 'C0 Team',
          email: 'info@c0team.com',
          phone: '+98 912 345 6789',
          address_fa: 'تهران، میدان ونک، برج نگار',
          address_en: 'Negar Tower, Vanak Sq, Tehran',
          socials: {
            github: 'https://github.com',
            linkedin: 'https://linkedin.com',
            instagram: 'https://instagram.com'
          }
        });
      });
  }, []);

  if (!settings) return null;

  const currentAddress = language === 'fa' ? settings.address_fa : settings.address_en;

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Info Column */}
        <div className="footer-col info-col">
          <div className="footer-logo">
            {settings.logoText && settings.logoText.includes(' ') ? (
              <>
                <span className="logo-c">{settings.logoText.split(' ')[0]}</span>{' '}
                <span className="logo-team">{settings.logoText.split(' ').slice(1).join(' ')}</span>
              </>
            ) : (
              <span className="logo-team">{settings.logoText || 'C0 Team'}</span>
            )}
          </div>
          <p className="footer-desc">
            {language === 'fa' 
              ? 'همراه شما در مسیر توسعه راه‌حل‌های هوشمند دیجیتال، طراحی نرم‌افزارهای اختصاصی و تحول دیجیتال کسب‌وکار.' 
              : 'Your partner in developing smart digital solutions, custom software engineering, and business digital transformation.'}
          </p>
          <div className="footer-socials">
            {settings.socials?.github && (
              <a href={settings.socials.github} target="_blank" rel="noopener noreferrer" className="social-icon">
                <Github size={18} />
              </a>
            )}
            {settings.socials?.linkedin && (
              <a href={settings.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon">
                <Linkedin size={18} />
              </a>
            )}
            {settings.socials?.instagram && (
              <a href={settings.socials.instagram} target="_blank" rel="noopener noreferrer" className="social-icon">
                <Instagram size={18} />
              </a>
            )}
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-col links-col">
          <h4 className="footer-heading">
            {language === 'fa' ? 'دسترسی سریع' : 'Quick Links'}
          </h4>
          <ul className="footer-links">
            <li><a href="#home">{t('nav.home')}</a></li>
            <li><a href="#services">{t('nav.services')}</a></li>
            <li><a href="#portfolio">{t('nav.portfolio')}</a></li>
            <li><a href="#team">{t('nav.team')}</a></li>
            <li><a href="#blog">{t('nav.blog')}</a></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="footer-col contact-col">
          <h4 className="footer-heading">
            {language === 'fa' ? 'اطلاعات تماس' : 'Contact Info'}
          </h4>
          <ul className="footer-contact-list">
            {settings.phone && (
              <li>
                <Phone size={16} />
                <span className="contact-text ltr-text">{settings.phone}</span>
              </li>
            )}
            {settings.email && (
              <li>
                <Mail size={16} />
                <span className="contact-text">{settings.email}</span>
              </li>
            )}
            {currentAddress && (
              <li>
                <MapPin size={16} />
                <span className="contact-text">{currentAddress}</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p className="copyright">
          © {new Date().getFullYear()} C0 Team. {language === 'fa' ? 'تمامی حقوق محفوظ است.' : 'All rights reserved.'}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
