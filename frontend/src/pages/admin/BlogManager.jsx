"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../../context/LanguageContext';
import { API_BASE_URL } from '../../context/AuthContext';
import { Plus, Edit2, Trash2, X, Upload } from 'lucide-react';

const BlogManager = () => {
  const { language, t } = useLanguage();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Form fields
  const [titleFa, setTitleFa] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [contentFa, setContentFa] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [slug, setSlug] = useState('');
  
  // Tags
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  
  // Image
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const fetchArticles = () => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/api/articles/`)
      .then(res => {
        setArticles(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setTitleFa('');
    setTitleEn('');
    setContentFa('');
    setContentEn('');
    setSlug('');
    setTags([]);
    setTagInput('');
    setImageFile(null);
    setImagePreview('');
    setIsModalOpen(true);
  };

  const openEditModal = (a) => {
    setEditingId(a.id);
    setTitleFa(a.title_fa || '');
    setTitleEn(a.title_en || '');
    setContentFa(a.content_fa || '');
    setContentEn(a.content_en || '');
    setSlug(a.slug || '');
    setTags(a.tags || []);
    setTagInput('');
    setImageFile(null);
    setImagePreview(a.cover_image ? (a.cover_image.startsWith('http') ? a.cover_image : `${API_BASE_URL}${a.cover_image}`) : '');
    setIsModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const addTag = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      const val = tagInput.trim();
      if (val && !tags.includes(val)) {
        setTags([...tags, val]);
        setTagInput('');
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    // Auto generate slug if empty
    const finalSlug = slug.trim() || titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const formData = new FormData();
    formData.append('title_fa', titleFa);
    formData.append('title_en', titleEn);
    formData.append('content_fa', contentFa);
    formData.append('content_en', contentEn);
    formData.append('slug', finalSlug);
    formData.append('tags', JSON.stringify(tags));
    
    if (imageFile) {
      formData.append('cover_image', imageFile);
    }

    try {
      if (editingId) {
        await axios.patch(`${API_BASE_URL}/api/articles/${finalSlug}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post(`${API_BASE_URL}/api/articles/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      setIsModalOpen(false);
      fetchArticles();
    } catch (err) {
      console.error(err);
      alert(language === 'fa' ? 'خطا در ثبت مقاله' : 'Error saving article');
    }
  };

  const handleDelete = async (slugVal) => {
    if (window.confirm(language === 'fa' ? 'آیا از حذف این مقاله مطمئن هستید؟' : 'Are you sure you want to delete this article?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/articles/${slugVal}/`);
        fetchArticles();
      } catch (err) {
        console.error(err);
        alert(language === 'fa' ? 'خطا در حذف مقاله' : 'Error deleting article');
      }
    }
  };

  return (
    <div className="admin-crud-page">
      <div className="crud-header">
        <h2 className="admin-page-title">{t('admin.blog')}</h2>
        <button onClick={openAddModal} className="btn btn-primary">
          <Plus size={18} />
          <span>{t('admin.add_new')}</span>
        </button>
      </div>

      {loading ? (
        <div className="flex-center" style={{ minHeight: '30vh' }}>
          <div className="animate-pulse-slow">{language === 'fa' ? 'در حال بارگذاری...' : 'Loading...'}</div>
        </div>
      ) : (
        <div className="table-responsive glass-panel">
          <table className="admin-table">
            <thead>
              <tr>
                <th>{language === 'fa' ? 'کاور' : 'Cover'}</th>
                <th>{language === 'fa' ? 'عنوان' : 'Title'}</th>
                <th>{language === 'fa' ? 'اسلاگ' : 'Slug'}</th>
                <th>{language === 'fa' ? 'تعداد بازدید' : 'Views'}</th>
                <th>{language === 'fa' ? 'عملیات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr key={a.id}>
                  <td>
                    {a.cover_image ? (
                      <img src={a.cover_image.startsWith('http') ? a.cover_image : `${API_BASE_URL}${a.cover_image}`} alt="" className="table-thumbnail" />
                    ) : (
                      <div className="table-thumbnail placeholder"></div>
                    )}
                  </td>
                  <td>
                    <div className="bilingual-table-text">
                      <span className="primary-text">{a.title_fa}</span>
                      <span className="secondary-text">{a.title_en}</span>
                    </div>
                  </td>
                  <td><code className="slug-code">{a.slug}</code></td>
                  <td>{a.views_count}</td>
                  <td>
                    <div className="action-buttons-cell">
                      <button onClick={() => openEditModal(a)} className="action-cell-btn edit" title={t('admin.edit')}>
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(a.slug)} className="action-cell-btn delete" title={t('admin.delete')}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal glass-panel animate-fade-in-up">
            <div className="modal-header">
              <h3>{editingId ? t('admin.edit') : t('admin.add_new')}</h3>
              <button onClick={() => setIsModalOpen(false)} className="close-btn">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="modal-form">
              <div className="form-grid-columns">
                <div className="input-group">
                  <label className="input-label">عنوان مقاله (فارسی)</label>
                  <input type="text" className="form-input" required value={titleFa} onChange={(e) => setTitleFa(e.target.value)} />
                </div>
                <div className="input-group">
                  <label className="input-label">Article Title (English)</label>
                  <input type="text" className="form-input" required value={titleEn} onChange={(e) => setTitleEn(e.target.value)} />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">اسلاگ یکتا (برای لینک آدرسبار) / Custom URL Slug</label>
                <input 
                  type="text" 
                  className="form-input ltr-text" 
                  placeholder={language === 'fa' ? 'مثال: custom-article-slug (اختیاری)' : 'e.g. custom-article-slug (optional)'}
                  value={slug} 
                  onChange={(e) => setSlug(e.target.value)} 
                />
              </div>

              <div className="form-grid-columns">
                <div className="input-group">
                  <label className="input-label">محتوای مقاله (فارسی)</label>
                  <textarea className="form-input" rows="8" required value={contentFa} onChange={(e) => setContentFa(e.target.value)}></textarea>
                </div>
                <div className="input-group">
                  <label className="input-label">Article Content (English)</label>
                  <textarea className="form-input" rows="8" required value={contentEn} onChange={(e) => setContentEn(e.target.value)}></textarea>
                </div>
              </div>

              {/* Tags Array Editor */}
              <div className="input-group">
                <label className="input-label">تگ‌ها / Tags</label>
                <div className="tech-input-row">
                  <input 
                    type="text" 
                    className="form-input" 
                    value={tagInput} 
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={addTag}
                    placeholder={language === 'fa' ? 'افزودن با فشردن Enter' : 'Press Enter to add'}
                  />
                  <button type="button" onClick={addTag} className="btn btn-secondary">{t('admin.add_new')}</button>
                </div>
                <div className="tech-tags-editor">
                  {tags.map((tag, idx) => (
                    <span key={idx} className="editor-tag">
                      <span>#{tag}</span>
                      <button type="button" onClick={() => removeTag(tag)} className="tag-remove-btn">
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Cover Image Upload preview */}
              <div className="input-group">
                <label className="input-label">{t('admin.image')}</label>
                <div className="image-upload-wrapper">
                  {imagePreview ? (
                    <div className="upload-preview-container">
                      <img src={imagePreview} alt="Preview" className="upload-preview" />
                      <button type="button" onClick={() => { setImageFile(null); setImagePreview(''); }} className="remove-preview-btn">
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="file-upload-label">
                      <Upload size={24} />
                      <span>{language === 'fa' ? 'انتخاب تصویر کاور' : 'Choose Cover Image'}</span>
                      <input type="file" accept="image/*" className="hidden-file-input" onChange={handleImageChange} />
                    </label>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">
                  {t('admin.cancel')}
                </button>
                <button type="submit" className="btn btn-primary">
                  {t('admin.save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManager;
