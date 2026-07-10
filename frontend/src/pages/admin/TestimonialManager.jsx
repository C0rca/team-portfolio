"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../../context/LanguageContext';
import { API_BASE_URL } from '../../context/AuthContext';
import { Plus, Edit2, Trash2, X, Star, Check } from 'lucide-react';

const TestimonialManager = () => {
  const { language, t } = useLanguage();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Form fields
  const [clientNameFa, setClientNameFa] = useState('');
  const [clientNameEn, setClientNameEn] = useState('');
  const [clientCompanyFa, setClientCompanyFa] = useState('');
  const [clientCompanyEn, setClientCompanyEn] = useState('');
  const [feedbackFa, setFeedbackFa] = useState('');
  const [feedbackEn, setFeedbackEn] = useState('');
  const [rating, setRating] = useState(5);
  const [approved, setApproved] = useState(false);

  const fetchTestimonials = () => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/api/testimonials/`)
      .then(res => {
        setTestimonials(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setClientNameFa('');
    setClientNameEn('');
    setClientCompanyFa('');
    setClientCompanyEn('');
    setFeedbackFa('');
    setFeedbackEn('');
    setRating(5);
    setApproved(false);
    setIsModalOpen(true);
  };

  const openEditModal = (x) => {
    setEditingId(x.id);
    setClientNameFa(x.client_name_fa || '');
    setClientNameEn(x.client_name_en || '');
    setClientCompanyFa(x.client_company_fa || '');
    setClientCompanyEn(x.client_company_en || '');
    setFeedbackFa(x.feedback_fa || '');
    setFeedbackEn(x.feedback_en || '');
    setRating(x.rating || 5);
    setApproved(x.approved || false);
    setIsModalOpen(true);
  };

  const handleApproveToggle = async (x) => {
    try {
      await axios.patch(`${API_BASE_URL}/api/testimonials/${x.id}/`, { approved: !x.approved });
      setTestimonials(testimonials.map(item => item.id === x.id ? { ...item, approved: !item.approved } : item));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const payload = {
      client_name_fa: clientNameFa,
      client_name_en: clientNameEn,
      client_company_fa: clientCompanyFa,
      client_company_en: clientCompanyEn,
      feedback_fa: feedbackFa,
      feedback_en: feedbackEn,
      rating,
      approved
    };

    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/testimonials/${editingId}/`, payload);
      } else {
        await axios.post(`${API_BASE_URL}/api/testimonials/`, payload);
      }
      setIsModalOpen(false);
      fetchTestimonials();
    } catch (err) {
      console.error(err);
      alert(language === 'fa' ? 'خطا در ثبت بازخورد' : 'Error saving testimonial');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(language === 'fa' ? 'آیا از حذف این بازخورد مطمئن هستید؟' : 'Are you sure you want to delete this testimonial?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/testimonials/${id}/`);
        fetchTestimonials();
      } catch (err) {
        console.error(err);
        alert(language === 'fa' ? 'خطا در حذف بازخورد' : 'Error deleting testimonial');
      }
    }
  };

  return (
    <div className="admin-crud-page">
      <div className="crud-header">
        <h2 className="admin-page-title">{t('admin.testimonials')}</h2>
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
                <th>{language === 'fa' ? 'مشتری' : 'Client'}</th>
                <th>{language === 'fa' ? 'شرکت' : 'Company'}</th>
                <th>{language === 'fa' ? 'امتیاز' : 'Rating'}</th>
                <th>{language === 'fa' ? 'وضعیت تایید' : 'Status'}</th>
                <th>{language === 'fa' ? 'عملیات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((x) => (
                <tr key={x.id}>
                  <td>
                    <div className="bilingual-table-text">
                      <span className="primary-text">{x.client_name_fa}</span>
                      <span className="secondary-text">{x.client_name_en}</span>
                    </div>
                  </td>
                  <td>
                    <div className="bilingual-table-text">
                      <span className="primary-text">{x.client_company_fa || '-'}</span>
                      <span className="secondary-text">{x.client_company_en || '-'}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex-center" style={{ gap: '2px', color: 'gold' }}>
                      {[...Array(x.rating)].map((_, i) => <Star key={i} size={14} fill="gold" />)}
                    </div>
                  </td>
                  <td>
                    <button 
                      onClick={() => handleApproveToggle(x)} 
                      className={`badge-btn ${x.approved ? 'approved' : 'pending'}`}
                    >
                      {x.approved ? (
                        <>
                          <Check size={12} />
                          <span>{language === 'fa' ? 'تایید شده' : 'Approved'}</span>
                        </>
                      ) : (
                        <span>{language === 'fa' ? 'منتظر تایید' : 'Pending'}</span>
                      )}
                    </button>
                  </td>
                  <td>
                    <div className="action-buttons-cell">
                      <button onClick={() => openEditModal(x)} className="action-cell-btn edit" title={t('admin.edit')}>
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(x.id)} className="action-cell-btn delete" title={t('admin.delete')}>
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
          <div className="admin-modal glass-panel animate-fade-in-up" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3>{editingId ? t('admin.edit') : t('admin.add_new')}</h3>
              <button onClick={() => setIsModalOpen(false)} className="close-btn">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="modal-form">
              <div className="form-grid-columns">
                <div className="input-group">
                  <label className="input-label">نام مشتری (فارسی)</label>
                  <input type="text" className="form-input" required value={clientNameFa} onChange={(e) => setClientNameFa(e.target.value)} />
                </div>
                <div className="input-group">
                  <label className="input-label">Client Name (English)</label>
                  <input type="text" className="form-input" required value={clientNameEn} onChange={(e) => setClientNameEn(e.target.value)} />
                </div>
              </div>

              <div className="form-grid-columns">
                <div className="input-group">
                  <label className="input-label">شرکت / برند (فارسی)</label>
                  <input type="text" className="form-input" value={clientCompanyFa} onChange={(e) => setClientCompanyFa(e.target.value)} />
                </div>
                <div className="input-group">
                  <label className="input-label">Company / Brand (English)</label>
                  <input type="text" className="form-input" value={clientCompanyEn} onChange={(e) => setClientCompanyEn(e.target.value)} />
                </div>
              </div>

              <div className="form-grid-columns">
                <div className="input-group">
                  <label className="input-label">متن بازخورد (فارسی)</label>
                  <textarea className="form-input" rows="3" required value={feedbackFa} onChange={(e) => setFeedbackFa(e.target.value)}></textarea>
                </div>
                <div className="input-group">
                  <label className="input-label">Feedback (English)</label>
                  <textarea className="form-input" rows="3" required value={feedbackEn} onChange={(e) => setFeedbackEn(e.target.value)}></textarea>
                </div>
              </div>

              <div className="form-grid-columns">
                <div className="input-group">
                  <label className="input-label">امتیاز (۱ تا ۵ ستاره)</label>
                  <select className="form-input" value={rating} onChange={(e) => setRating(parseInt(e.target.value) || 5)}>
                    <option value="5">۵ ستاره / Excellent</option>
                    <option value="4">۴ ستاره / Good</option>
                    <option value="3">۳ ستاره / Average</option>
                    <option value="2">۲ ستاره / Poor</option>
                    <option value="1">۱ ستاره / Terrible</option>
                  </select>
                </div>

                <div className="input-group checkbox-group">
                  <label className="checkbox-container">
                    <input type="checkbox" checked={approved} onChange={(e) => setApproved(e.target.checked)} />
                    <span className="checkbox-label">انتشار خودکار در سایت (Approved)</span>
                  </label>
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

export default TestimonialManager;
