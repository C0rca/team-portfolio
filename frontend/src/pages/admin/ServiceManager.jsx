import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../../context/LanguageContext';
import { API_BASE_URL } from '../../context/AuthContext';
import { Plus, Edit2, Trash2, X, Code, Smartphone, Cpu, Palette } from 'lucide-react';

const IconMap = {
  Code: Code,
  Smartphone: Smartphone,
  Cpu: Cpu,
  Palette: Palette
};

const ServiceManager = () => {
  const { language, t } = useLanguage();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Form fields
  const [titleFa, setTitleFa] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [descFa, setDescFa] = useState('');
  const [descEn, setDescEn] = useState('');
  const [icon, setIcon] = useState('Code');
  const [priceFa, setPriceFa] = useState('');
  const [priceEn, setPriceEn] = useState('');
  const [order, setOrder] = useState(0);

  const fetchServices = () => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/api/services/`)
      .then(res => {
        setServices(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setTitleFa('');
    setTitleEn('');
    setDescFa('');
    setDescEn('');
    setIcon('Code');
    setPriceFa('');
    setPriceEn('');
    setOrder(0);
    setIsModalOpen(true);
  };

  const openEditModal = (s) => {
    setEditingId(s.id);
    setTitleFa(s.title_fa || '');
    setTitleEn(s.title_en || '');
    setDescFa(s.description_fa || '');
    setDescEn(s.description_en || '');
    setIcon(s.icon || 'Code');
    setPriceFa(s.price_fa || '');
    setPriceEn(s.price_en || '');
    setOrder(s.order || 0);
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const payload = {
      title_fa: titleFa,
      title_en: titleEn,
      description_fa: descFa,
      description_en: descEn,
      icon,
      price_fa: priceFa,
      price_en: priceEn,
      order
    };

    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/services/${editingId}/`, payload);
      } else {
        await axios.post(`${API_BASE_URL}/api/services/`, payload);
      }
      setIsModalOpen(false);
      fetchServices();
    } catch (err) {
      console.error(err);
      alert(language === 'fa' ? 'خطا در ثبت خدمت' : 'Error saving service');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(language === 'fa' ? 'آیا از حذف این خدمت مطمئن هستید؟' : 'Are you sure you want to delete this service?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/services/${id}/`);
        fetchServices();
      } catch (err) {
        console.error(err);
        alert(language === 'fa' ? 'خطا در حذف خدمت' : 'Error deleting service');
      }
    }
  };

  return (
    <div className="admin-crud-page">
      <div className="crud-header">
        <h2 className="admin-page-title">{t('admin.services')}</h2>
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
                <th>{language === 'fa' ? 'آیکون' : 'Icon'}</th>
                <th>{language === 'fa' ? 'عنوان' : 'Title'}</th>
                <th>{language === 'fa' ? 'تعرفه (فارسی)' : 'Price (Fa)'}</th>
                <th>{language === 'fa' ? 'ترتیب' : 'Order'}</th>
                <th>{language === 'fa' ? 'عملیات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => {
                const IconComponent = IconMap[s.icon] || Code;
                return (
                  <tr key={s.id}>
                    <td>
                      <div className="table-thumbnail placeholder circular flex-center" style={{ color: 'var(--accent-primary)' }}>
                        <IconComponent size={20} />
                      </div>
                    </td>
                    <td>
                      <div className="bilingual-table-text">
                        <span className="primary-text">{s.title_fa}</span>
                        <span className="secondary-text">{s.title_en}</span>
                      </div>
                    </td>
                    <td>{s.price_fa || '-'}</td>
                    <td>{s.order}</td>
                    <td>
                      <div className="action-buttons-cell">
                        <button onClick={() => openEditModal(s)} className="action-cell-btn edit" title={t('admin.edit')}>
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(s.id)} className="action-cell-btn delete" title={t('admin.delete')}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
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
                  <label className="input-label">عنوان خدمت (فارسی)</label>
                  <input type="text" className="form-input" required value={titleFa} onChange={(e) => setTitleFa(e.target.value)} />
                </div>
                <div className="input-group">
                  <label className="input-label">Service Title (English)</label>
                  <input type="text" className="form-input" required value={titleEn} onChange={(e) => setTitleEn(e.target.value)} />
                </div>
              </div>

              <div className="form-grid-columns">
                <div className="input-group">
                  <label className="input-label">توضیح خدمت (فارسی)</label>
                  <textarea className="form-input" rows="3" required value={descFa} onChange={(e) => setDescFa(e.target.value)}></textarea>
                </div>
                <div className="input-group">
                  <label className="input-label">Description (English)</label>
                  <textarea className="form-input" rows="3" required value={descEn} onChange={(e) => setDescEn(e.target.value)}></textarea>
                </div>
              </div>

              <div className="form-grid-columns-three">
                <div className="input-group">
                  <label className="input-label">آیکون نمایش</label>
                  <select className="form-input" value={icon} onChange={(e) => setIcon(e.target.value)}>
                    <option value="Code">کد / Code</option>
                    <option value="Smartphone">موبایل / Smartphone</option>
                    <option value="Cpu">هوش مصنوعی / Cpu</option>
                    <option value="Palette">طراحی / Palette</option>
                  </select>
                </div>
                
                <div className="input-group">
                  <label className="input-label">ترتیب نمایش</label>
                  <input type="number" className="form-input" value={order} onChange={(e) => setOrder(parseInt(e.target.value) || 0)} />
                </div>
              </div>

              <div className="form-grid-columns">
                <div className="input-group">
                  <label className="input-label">قیمت / هزینه (فارسی)</label>
                  <input type="text" className="form-input" value={priceFa} onChange={(e) => setPriceFa(e.target.value)} placeholder="مثال: شروع از ۱۰ میلیون" />
                </div>
                <div className="input-group">
                  <label className="input-label">Price / Fee (English)</label>
                  <input type="text" className="form-input" value={priceEn} onChange={(e) => setPriceEn(e.target.value)} placeholder="e.g. Starting from $300" />
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

export default ServiceManager;
