import React, { useState } from 'react';
import { Link, useNavigate, useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  LayoutDashboard, Briefcase, Users, Cpu, BookOpen, Star, 
  MessageSquare, Settings, LogOut, Home, Menu, X, Sun, Moon, Globe 
} from 'lucide-react';

const AdminLayout = () => {
  const { user, logout, loading } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  if (loading) {
    return (
      <div className="admin-loading flex-center">
        <div className="animate-pulse-slow">
          {language === 'fa' ? 'در حال بارگذاری پنل...' : 'Loading Panel...'}
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const menuItems = [
    { label: t('admin.dashboard'), path: '/admin/dashboard', icon: LayoutDashboard },
    { label: t('admin.projects'), path: '/admin/projects', icon: Briefcase },
    { label: t('admin.members'), path: '/admin/members', icon: Users },
    { label: t('admin.services'), path: '/admin/services', icon: Cpu },
    { label: t('admin.blog'), path: '/admin/blog', icon: BookOpen },
    { label: t('admin.testimonials'), path: '/admin/testimonials', icon: Star },
    { label: t('admin.messages'), path: '/admin/messages', icon: MessageSquare },
    { label: t('admin.settings'), path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-layout-container">
      {/* 1. Mobile Top Header */}
      <header className="admin-mobile-header glass-panel">
        <button className="mobile-toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="admin-mobile-logo">
          <span className="logo-c">C0</span>
          <span>Panel</span>
        </div>
      </header>

      {/* 2. Admin Sidebar */}
      <aside className={`admin-sidebar glass-panel ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-logo-section">
          <Link to="/" className="admin-logo">
            <span className="logo-c">C0</span>
            <span className="logo-team">Team</span>
            <span className="logo-badge-admin">Admin</span>
          </Link>
        </div>

        <nav className="admin-nav">
          <ul className="admin-menu">
            {menuItems.map((item, idx) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={idx}>
                  <Link 
                    to={item.path} 
                    className={`admin-nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <IconComponent size={18} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="admin-footer-actions">
          <Link to="/" className="admin-nav-link site-link">
            <Home size={18} />
            <span>{language === 'fa' ? 'بازگشت به سایت' : 'Go to Site'}</span>
          </Link>
          <button onClick={handleLogout} className="admin-nav-link logout-btn-sidebar">
            <LogOut size={18} />
            <span>{t('nav.logout')}</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div className="admin-sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* 3. Main Content Panel */}
      <main className="admin-main-content">
        <header className="admin-topbar glass-panel">
          <div className="admin-user-info">
            <span>{language === 'fa' ? 'خوش آمدید،' : 'Welcome,'} <strong>{user.username}</strong></span>
          </div>

          <div className="admin-topbar-actions">
            {/* Language Toggle */}
            <button onClick={toggleLanguage} className="action-btn lang-btn" title="Toggle Language">
              <Globe size={16} />
              <span>{language === 'fa' ? 'EN' : 'FA'}</span>
            </button>

            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="action-btn theme-btn" title="Toggle Theme">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </header>

        {/* Content Outlet for children pages */}
        <div className="admin-page-content animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
