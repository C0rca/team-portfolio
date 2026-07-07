import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../../context/LanguageContext';
import { API_BASE_URL } from '../../context/AuthContext';
import { Calendar, Eye, ArrowLeft, ArrowRight, User } from 'lucide-react';

const BlogDetail = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/api/articles/${slug}/`)
      .then(res => {
        setArticle(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(language === 'fa' ? 'مقاله یافت نشد یا مشکلی رخ داده است.' : 'Article not found or an error occurred.');
        setLoading(false);
      });
  }, [slug, language]);

  if (loading) {
    return (
      <div className="blog-detail-container flex-center">
        <div className="animate-pulse-slow">
          {language === 'fa' ? 'در حال بارگذاری مقاله...' : 'Loading article...'}
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="blog-detail-container text-center">
        <div className="form-alert error" style={{ display: 'inline-block', margin: '40px 0' }}>
          {error}
        </div>
        <div>
          <Link to="/" className="btn btn-secondary">
            {language === 'fa' ? 'بازگشت به خانه' : 'Go Back Home'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-detail-container animate-fade-in">
      <div className="bg-grid-glow"></div>
      <div className="bg-radial-gradient"></div>

      <div className="blog-detail-card glass-panel">
        {/* Back Button */}
        <Link to="/" className="back-link">
          {language === 'fa' ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
          <span>{language === 'fa' ? 'بازگشت به خانه' : 'Back to Home'}</span>
        </Link>

        {/* Cover Image */}
        {article.cover_image && (
          <img 
            src={article.cover_image.startsWith('http') ? article.cover_image : `${API_BASE_URL}${article.cover_image}`} 
            alt={language === 'fa' ? article.title_fa : article.title_en} 
            className="detail-cover-image"
          />
        )}

        {/* Title */}
        <h1 className="detail-title">
          {language === 'fa' ? article.title_fa : article.title_en}
        </h1>

        {/* Meta Info */}
        <div className="detail-meta">
          <span className="meta-item">
            <User size={16} />
            <span>{article.author_details?.first_name || article.author_details?.username || 'Admin'}</span>
          </span>
          <span className="meta-item">
            <Calendar size={16} />
            <span>{new Date(article.created_at).toLocaleDateString(language === 'fa' ? 'fa-IR' : 'en-US')}</span>
          </span>
          <span className="meta-item">
            <Eye size={16} />
            <span>{article.views_count} {language === 'fa' ? 'بازدید' : 'Views'}</span>
          </span>
        </div>

        {/* Content */}
        <div className="detail-content">
          {language === 'fa' ? (
            <p className="pre-wrap-text">{article.content_fa}</p>
          ) : (
            <p className="pre-wrap-text">{article.content_en}</p>
          )}
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="detail-tags">
            {article.tags.map((tag, idx) => (
              <span key={idx} className="detail-tag">#{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
