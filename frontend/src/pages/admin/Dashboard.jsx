import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../../context/LanguageContext';
import { API_BASE_URL } from '../../context/AuthContext';
import { Briefcase, BookOpen, Users, Eye, MessageSquare, Mail, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/dashboard/stats/`)
      .then(res => {
        setStats(res.data.stats);
        setRecentMessages(res.data.recent_messages);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex-center" style={{ minHeight: '40vh' }}>
        <div className="animate-pulse-slow">
          {language === 'fa' ? 'در حال بارگذاری اطلاعات داشبورد...' : 'Loading Dashboard Stats...'}
        </div>
      </div>
    );
  }

  const statCards = [
    { label: t('admin.total_projects'), value: stats?.projects || 0, icon: Briefcase, color: 'var(--accent-cyan)' },
    { label: t('admin.total_articles'), value: stats?.articles || 0, icon: BookOpen, color: 'var(--accent-secondary)' },
    { label: t('admin.total_members'), value: stats?.members || 0, icon: Users, color: 'var(--accent-primary)' },
    { label: t('admin.total_views'), value: stats?.blog_views || 0, icon: Eye, color: '#e11d48' },
    { label: t('admin.unread_messages'), value: stats?.unread_messages || 0, icon: MessageSquare, color: '#f59e0b', highlight: (stats?.unread_messages || 0) > 0 },
    { label: t('admin.pending_testimonials'), value: stats?.pending_testimonials || 0, icon: AlertCircle, color: '#10b981' }
  ];

  return (
    <div className="admin-dashboard-page">
      <h2 className="admin-page-title">{t('admin.stats_overview')}</h2>

      {/* Grid of stats cards */}
      <div className="stats-grid">
        {statCards.map((card, idx) => {
          const IconComponent = card.icon;
          return (
            <div key={idx} className={`stat-card glass-panel ${card.highlight ? 'highlight-border' : ''}`}>
              <div className="stat-card-left">
                <span className="stat-value">{card.value}</span>
                <span className="stat-label">{card.label}</span>
              </div>
              <div className="stat-card-icon" style={{ backgroundColor: `${card.color}20`, color: card.color }}>
                <IconComponent size={24} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Messages Section */}
      <div className="recent-messages-section glass-panel" style={{ marginTop: '40px' }}>
        <div className="section-title-bar">
          <h3>{t('admin.recent_messages')}</h3>
          <button onClick={() => navigate('/admin/messages')} className="btn btn-secondary text-btn">
            <span>{language === 'fa' ? 'مشاهده همه' : 'View All'}</span>
            {language === 'fa' ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
          </button>
        </div>

        {recentMessages.length === 0 ? (
          <p className="no-data-text">{t('admin.no_messages')}</p>
        ) : (
          <div className="dashboard-messages-list">
            {recentMessages.map((msg) => (
              <div key={msg.id} className={`dashboard-msg-item ${msg.status === 'unread' ? 'unread' : ''}`} onClick={() => navigate('/admin/messages')}>
                <div className="msg-icon-circle">
                  <Mail size={18} />
                </div>
                <div className="msg-details">
                  <div className="msg-header-row">
                    <span className="msg-sender">{msg.name}</span>
                    <span className="msg-time">{new Date(msg.created_at).toLocaleDateString(language === 'fa' ? 'fa-IR' : 'en-US')}</span>
                  </div>
                  <span className="msg-subject">{msg.subject}</span>
                </div>
                <span className={`msg-status-badge ${msg.status}`}>
                  {msg.status === 'unread' ? t('admin.unread') : t('admin.read')}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
