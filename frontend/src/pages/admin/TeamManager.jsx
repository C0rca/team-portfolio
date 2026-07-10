"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../../context/LanguageContext';
import { API_BASE_URL } from '../../context/AuthContext';
import { Plus, Edit2, Trash2, X, Upload } from 'lucide-react';

const TeamManager = () => {
  const { language, t } = useLanguage();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Form fields
  const [nameFa, setNameFa] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [roleFa, setRoleFa] = useState('');
  const [roleEn, setRoleEn] = useState('');
  const [bioFa, setBioFa] = useState('');
  const [bioEn, setBioEn] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [order, setOrder] = useState(0);
  
  // Avatar upload
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  
  // Save status alerts
  const [saveStatus, setSaveStatus] = useState({ success: null, loading: false, message: '' });

  const fetchMembers = () => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/api/members/`)
      .then(res => {
        setMembers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setNameFa('');
    setNameEn('');
    setRoleFa('');
    setRoleEn('');
    setBioFa('');
    setBioEn('');
    setGithubUrl('');
    setLinkedinUrl('');
    setOrder(0);
    setAvatarFile(null);
    setAvatarPreview('');
    setSaveStatus({ success: null, loading: false, message: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (m) => {
    setEditingId(m.id);
    setNameFa(m.name_fa || '');
    setNameEn(m.name_en || '');
    setRoleFa(m.role_fa || '');
    setRoleEn(m.role_en || '');
    setBioFa(m.bio_fa || '');
    setBioEn(m.bio_en || '');
    setGithubUrl(m.github_url || '');
    setLinkedinUrl(m.linkedin_url || '');
    setOrder(m.order || 0);
    setAvatarFile(null);
    setAvatarPreview(m.avatar ? (m.avatar.startsWith('http') ? m.avatar : `${API_BASE_URL}${m.avatar}`) : '');
    setSaveStatus({ success: null, loading: false, message: '' });
    setIsModalOpen(true);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaveStatus({ success: null, loading: true, message: '' });

    const formData = new FormData();
    formData.append('name_fa', nameFa);
    formData.append('name_en', nameEn);
    formData.append('role_fa', roleFa);
    formData.append('role_en', roleEn);
    formData.append('bio_fa', bioFa);
    formData.append('bio_en', bioEn);
    formData.append('github_url', githubUrl);
    formData.append('linkedin_url', linkedinUrl);
    formData.append('order', order);
    
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    try {
      if (editingId) {
        await axios.patch(`${API_BASE_URL}/api/members/${editingId}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post(`${API_BASE_URL}/api/members/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      setSaveStatus({ 
        success: true, 
        loading: false, 
        message: language === 'fa' ? 'تغییرات با موفقیت ذخیره شد!' : 'Changes saved successfully!' 
      });
      setTimeout(() => {
        setIsModalOpen(false);
        fetchMembers();
      }, 1500);
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.detail || 
                     (err.response?.data ? JSON.stringify(err.response.data) : '') || 
                     err.message || 
                     (language === 'fa' ? 'خطا در ثبت اطلاعات' : 'Error saving member');
      setSaveStatus({ 
        success: false, 
        loading: false, 
        message: errMsg
      });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(language === 'fa' ? 'آیا از حذف این عضو مطمئن هستید؟' : 'Are you sure you want to delete this member?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/members/${id}/`);
        fetchMembers();
      } catch (err) {
        console.error(err);
        alert(language === 'fa' ? 'خطا در حذف عضو' : 'Error deleting member');
      }
    }
  };

  return (
    <div className="admin-crud-page">
      <div className="crud-header">
        <h2 className="admin-page-title">{t('admin.members')}</h2>
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
                <th>{language === 'fa' ? 'تصویر' : 'Avatar'}</th>
                <th>{language === 'fa' ? 'نام' : 'Name'}</th>
                <th>{language === 'fa' ? 'نقش' : 'Role'}</th>
                <th>{language === 'fa' ? 'ترتیب' : 'Order'}</th>
                <th>{language === 'fa' ? 'عملیات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id}>
                  <td>
                    {m.avatar ? (
                      <img src={m.avatar.startsWith('http') ? m.avatar : `${API_BASE_URL}${m.avatar}`} alt="" className="table-thumbnail circular" />
                    ) : (
                      <div className="table-thumbnail circular placeholder"></div>
                    )}
                  </td>
                  <td>
                    <div className="bilingual-table-text">
                      <span className="primary-text">{m.name_fa}</span>
                      <span className="secondary-text">{m.name_en}</span>
                    </div>
                  </td>
                  <td>
                    <div className="bilingual-table-text">
                      <span className="primary-text">{m.role_fa}</span>
                      <span className="secondary-text">{m.role_en}</span>
                    </div>
                  </td>
                  <td>{m.order}</td>
                  <td>
                    <div className="action-buttons-cell">
                      <button onClick={() => openEditModal(m)} className="action-cell-btn edit" title={t('admin.edit')}>
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(m.id)} className="action-cell-btn delete" title={t('admin.delete')}>
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
                  <label className="input-label">نام عضو (فارسی)</label>
                  <input type="text" className="form-input" required value={nameFa} onChange={(e) => setNameFa(e.target.value)} />
                </div>
                <div className="input-group">
                  <label className="input-label">Member Name (English)</label>
                  <input type="text" className="form-input" required value={nameEn} onChange={(e) => setNameEn(e.target.value)} />
                </div>
              </div>

              <div className="form-grid-columns">
                <div className="input-group">
                  <label className="input-label">نقش / تخصص (فارسی)</label>
                  <input type="text" className="form-input" required value={roleFa} onChange={(e) => setRoleFa(e.target.value)} />
                </div>
                <div className="input-group">
                  <label className="input-label">Role / Specialty (English)</label>
                  <input type="text" className="form-input" required value={roleEn} onChange={(e) => setRoleEn(e.target.value)} />
                </div>
              </div>

              <div className="form-grid-columns">
                <div className="input-group">
                  <label className="input-label">بیوگرافی (فارسی)</label>
                  <textarea className="form-input" rows="3" value={bioFa} onChange={(e) => setBioFa(e.target.value)}></textarea>
                </div>
                <div className="input-group">
                  <label className="input-label">Bio (English)</label>
                  <textarea className="form-input" rows="3" value={bioEn} onChange={(e) => setBioEn(e.target.value)}></textarea>
                </div>
              </div>

              <div className="form-grid-columns-three">
                <div className="input-group">
                  <label className="input-label">لینک گیت‌هاب</label>
                  <input type="url" className="form-input ltr-text" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} />
                </div>
                <div className="input-group">
                  <label className="input-label">لینک لینکدین</label>
                  <input type="url" className="form-input ltr-text" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} />
                </div>
                <div className="input-group">
                  <label className="input-label">ترتیب نمایش</label>
                  <input type="number" className="form-input" value={order} onChange={(e) => setOrder(parseInt(e.target.value) || 0)} />
                </div>
              </div>

              {/* Avatar upload preview */}
              <div className="input-group">
                <label className="input-label">{t('admin.members')}</label>
                <div className="image-upload-wrapper">
                  {avatarPreview ? (
                    <div className="upload-preview-container">
                      <img src={avatarPreview} alt="Preview" className="upload-preview circular" />
                      <button type="button" onClick={() => { setAvatarFile(null); setAvatarPreview(''); }} className="remove-preview-btn">
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="file-upload-label">
                      <Upload size={24} />
                      <span>{language === 'fa' ? 'انتخاب تصویر پروفایل' : 'Choose Profile Picture'}</span>
                      <input type="file" accept="image/*" className="hidden-file-input" onChange={handleAvatarChange} />
                    </label>
                  )}
                </div>
              </div>

              {saveStatus.message && (
                <div className={`form-alert ${saveStatus.success ? 'success' : 'error'}`}>
                  {saveStatus.message}
                </div>
              )}

              <div className="modal-footer">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary" disabled={saveStatus.loading}>
                  {t('admin.cancel')}
                </button>
                <button type="submit" className="btn btn-primary" disabled={saveStatus.loading}>
                  {saveStatus.loading ? (language === 'fa' ? 'در حال ذخیره...' : 'Saving...') : t('admin.save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManager;
