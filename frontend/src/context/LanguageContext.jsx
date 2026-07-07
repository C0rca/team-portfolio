import React, { createContext, useState, useEffect, useContext } from 'react';
import faTranslations from '../locales/fa.json';
import enTranslations from '../locales/en.json';

const LanguageContext = createContext();

const translations = {
  fa: faTranslations,
  en: enTranslations
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'fa'; // Default to Persian (RTL)
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    
    // Apply direction and fonts to body
    const body = document.body;
    const root = document.documentElement;
    
    if (language === 'fa') {
      body.classList.remove('dir-ltr');
      body.classList.add('dir-rtl');
      root.setAttribute('dir', 'rtl');
      root.setAttribute('lang', 'fa');
    } else {
      body.classList.remove('dir-rtl');
      body.classList.add('dir-ltr');
      root.setAttribute('dir', 'ltr');
      root.setAttribute('lang', 'en');
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'fa' ? 'en' : 'fa'));
  };

  // Helper function to resolve dot notation nested keys like 'nav.home'
  const t = (keyPath) => {
    const keys = keyPath.split('.');
    let result = translations[language];
    
    for (const key of keys) {
      if (result && result[key] !== undefined) {
        result = result[key];
      } else {
        return keyPath; // Fallback to displaying the key name itself
      }
    }
    
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
