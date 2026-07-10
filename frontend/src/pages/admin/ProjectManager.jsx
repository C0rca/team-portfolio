"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../../context/LanguageContext';
import { API_BASE_URL } from '../../context/AuthContext';
import { Plus, Edit2, Trash2, X, Upload, Check } from 'lucide-react';

const ProjectManager = () => {
  const { language, t } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Form fields
  const [titleFa, setTitleFa] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [descFa, setDescFa] = useState('');
  const [descEn, setDescEn] = useState('');
  const [longDescFa, setLongDescFa] = useState('');
  const [longDescEn, setLongDescEn] = useState('');
  const [category, setCategory] = useState('web');
  const [order, setOrder] = useState(0);
  const [featured, setFeatured] = useState(false);
  const [demoUrl, setDemoUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  
  // Tech stack tags
  const [techInput, setTechInput] = useState('');
  const [techStack, setTechStack] = useState([]);
  
  // Image file upload
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const fetchProjects = () => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/api/projects/`)
      .then(res => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setTitleFa('');
    setTitleEn('');
    setDescFa('');
    setDescEn('');
    setLongDescFa('');
    setLongDescEn('');
    setCategory('web');
    setOrder(0);
    setFeatured(false);
    setDemoUrl('');
    setGithubUrl('');
    setTechStack([]);
    setTechInput('');
    setImageFile(null);
    setImagePreview('');
    setIsModalOpen(true);
  };

  const openEditModal = (p) => {
    setEditingId(p.id);
    setTitleFa(p.title_fa || '');
    setTitleEn(p.title_en || '');
    setDescFa(p.description_fa || '');
    setDescEn(p.description_en || '');
    setLongDescFa(p.long_description_fa || '');
    setLongDescEn(p.long_description_en || '');
    setCategory(p.category || 'web');
    setOrder(p.order || 0);
    setFeatured(p.featured || false);
    setDemoUrl(p.demo_url || '');
    setGithubUrl(p.github_url || '');
    setTechStack(p.tech_stack || []);
    setTechInput('');
    setImageFile(null);
    setImagePreview(p.image ? (p.image.startsWith('http') ? p.image : `${API_BASE_URL}${p.image}`) : '');
    setIsModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const addTechTag = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      const val = techInput.trim();
      if (val && !techStack.includes(val)) {
        setTechStack([...techStack, val]);
        setTechInput('');
      }
    }
  };

  const removeTechTag = (tagToRemove) => {
    setTechStack(techStack.filter(t => t !== tagToRemove));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Use FormData for file upload
    const formData = new FormData();
    formData.append('title_fa', titleFa);
    formData.append('title_en', titleEn);
    formData.append('description_fa', descFa);
    formData.append('description_en', descEn);
    formData.append('long_description_fa', longDescFa);
    formData.append('long_description_en', longDescEn);
    formData.append('category', category);
    formData.append('order', order);
    formData.append('featured', featured);
    formData.append('demo_url', demoUrl);
    formData.append('github_url', githubUrl);
    formData.append('tech_stack', JSON.stringify(techStack));
    
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      if (editingId) {
        await axios.patch(`${API_BASE_URL}/api/projects/${editingId}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post(`${API_BASE_URL}/api/projects/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert(language === 'fa' ? 'خطا در ثبت اطلاعات' : 'Error saving project');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(language === 'fa' ? 'آیا از حذف این پروژه مطمئن هستید؟' : 'Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/projects/${id}/`);
        fetchProjects();
      } catch (err) {
        console.error(err);
        alert(language === 'fa' ? 'خطا در حذف پروژه' : 'Error deleting project');
      }
    }
  };

  return (
    <div className="admin-crud-page">
      <div className="crud-header">
        <h2 className="admin-page-title">{t('admin.projects')}</h2>
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
                <th>{language === 'fa' ? 'تصویر' : 'Image'}</th>
                <th>{language === 'fa' ? 'عنوان' : 'Title'}</th>
                <th>{language === 'fa' ? 'دسته‌بندی' : 'Category'}</th>
                <th>{language === 'fa' ? 'ترتیب' : 'Order'}</th>
                <th>{language === 'fa' ? 'ویژه' : 'Featured'}</th>
                <th>{language === 'fa' ? 'عملیات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id}>
                  <td>
                    {p.image ? (
                      <img src={p.image.startsWith('http') ? p.image : `${API_BASE_URL}${p.image}`} alt="" className="table-thumbnail" />
                    ) : (
                      <div className="table-thumbnail placeholder"></div>
                    )}
                  </td>
                  <td>
                    <div className="bilingual-table-text">
                      <span className="primary-text">{p.title_fa}</span>
                      <span className="secondary-text">{p.title_en}</span>
                    </div>
                  </td>
                  <td>{t(`portfolio.${p.category}`)}</td>
                  <td>{p.order}</td>
                  <td>
                    {p.featured ? (
                      <span className="badge-featured"><Check size={14} /></span>
                    ) : (
                      <span className="badge-regular">-</span>
                    )}
                  </td>
                  <td>
                    <div className="action-buttons-cell">
                      <button onClick={() => openEditModal(p)} className="action-cell-btn edit" title={t('admin.edit')}>
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="action-cell-btn delete" title={t('admin.delete')}>
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
              {/* Form Grid */}
              <div className="form-grid-columns">
                <div className="input-group">
                  <label className="input-label">عنوان پروژه (فارسی)</label>
                  <input type="text" className="form-input" required value={titleFa} onChange={(e) => setTitleFa(e.target.value)} />
                </div>
                <div className="input-group">
                  <label className="input-label">Project Title (English)</label>
                  <input type="text" className="form-input" required value={titleEn} onChange={(e) => setTitleEn(e.target.value)} />
                </div>
              </div>

              <div className="form-grid-columns">
                <div className="input-group">
                  <label className="input-label">توضیح کوتاه (فارسی)</label>
                  <textarea className="form-input" rows="2" required value={descFa} onChange={(e) => setDescFa(e.target.value)}></textarea>
                </div>
                <div className="input-group">
                  <label className="input-label">Short Description (English)</label>
                  <textarea className="form-input" rows="2" required value={descEn} onChange={(e) => setDescEn(e.target.value)}></textarea>
                </div>
              </div>

              <div className="form-grid-columns">
                <div className="input-group">
                  <label className="input-label">توضیح کامل (فارسی)</label>
                  <textarea className="form-input" rows="4" value={longDescFa} onChange={(e) => setLongDescFa(e.target.value)}></textarea>
                </div>
                <div className="input-group">
                  <label className="input-label">Long Description (English)</label>
                  <textarea className="form-input" rows="4" value={longDescEn} onChange={(e) => setLongDescEn(e.target.value)}></textarea>
                </div>
              </div>

              <div className="form-grid-columns-three">
                <div className="input-group">
                  <label className="input-label">دسته‌بندی</label>
                  <select className="form-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="web">وبسایت / Web App</option>
                    <option value="mobile">اپلیکیشن موبایل / Mobile App</option>
                    <option value="ai">هوش مصنوعی / AI & Data Science</option>
                    <option value="design">طراحی UI/UX</option>
                    <option value="other">سایر / Other</option>
                  </select>
                </div>
                
                <div className="input-group">
                  <label className="input-label">ترتیب نمایش</label>
                  <input type="number" className="form-input" value={order} onChange={(e) => setOrder(parseInt(e.target.value) || 0)} />
                </div>

                <div className="input-group checkbox-group">
                  <label className="checkbox-container">
                    <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
                    <span className="checkbox-label">پروژه ویژه (Featured)</span>
                  </label>
                </div>
              </div>

              <div className="form-grid-columns">
                <div className="input-group">
                  <label className="input-label">لینک دمو</label>
                  <input type="url" className="form-input ltr-text" value={demoUrl} onChange={(e) => setDemoUrl(e.target.value)} />
                </div>
                <div className="input-group">
                  <label className="input-label">لینک گیت‌هاب</label>
                  <input type="url" className="form-input ltr-text" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} />
                </div>
              </div>

              {/* Tech stack array editor */}
              <div className="input-group">
                <label className="input-label">فناوری‌ها / Tech Stack</label>
                <div className="tech-input-row">
                  <input 
                    type="text" 
                    className="form-input" 
                    value={techInput} 
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={addTechTag}
                    placeholder={language === 'fa' ? 'افزودن با فشردن Enter' : 'Press Enter to add'}
                  />
                  <button type="button" onClick={addTechTag} className="btn btn-secondary">{t('admin.add_new')}</button>
                </div>
                <div className="tech-tags-editor">
                  {techStack.map((tag, idx) => (
                    <span key={idx} className="editor-tag">
                      <span>{tag}</span>
                      <button type="button" onClick={() => removeTechTag(tag)} className="tag-remove-btn">
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Image upload preview */}
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
                      <span>{language === 'fa' ? 'انتخاب تصویر پروژه' : 'Choose Project Image'}</span>
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

export default ProjectManager;
