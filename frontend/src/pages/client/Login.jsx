"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { LogIn, Lock, User } from 'lucide-react';

import { useEffect } from "react";
const Login = () => {
  const { user, login } = useAuth();
  const { language, t } = useLanguage();
  const navigate = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to admin dashboard
  
  useEffect(() => {
    if (user) {
      navigate.push('/admin/dashboard');
    }
  }, [user, navigate]);
  if (user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(username, password);
    setLoading(false);

    if (result.success) {
      navigate.push('/admin/dashboard');
    } else {
      setError(result.message || (language === 'fa' ? 'خطا در ورود' : 'Login Error'));
    }
  };

  return (
    <div className="login-container flex-center">
      <div className="bg-grid-glow"></div>
      <div className="bg-radial-gradient"></div>

      <div className="login-card glass-panel animate-fade-in-up">
        <div className="login-header">
          <div className="login-logo">
            <span className="logo-c">C0</span>
            <span className="logo-team">Team</span>
          </div>
          <h2 className="login-title">
            {language === 'fa' ? 'ورود به پنل مدیریت' : 'Admin Panel Login'}
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">{t('admin.username')}</label>
            <div className="input-with-icon">
              <User size={18} className="input-icon-left" />
              <input
                type="text"
                className="form-input icon-padding"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">{t('admin.password')}</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon-left" />
              <input
                type="password"
                className="form-input icon-padding"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="form-alert error">{error}</div>
          )}

          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? (
              <span>{language === 'fa' ? 'در حال ورود...' : 'Logging in...'}</span>
            ) : (
              <>
                <LogIn size={18} />
                <span>{t('nav.login')}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
