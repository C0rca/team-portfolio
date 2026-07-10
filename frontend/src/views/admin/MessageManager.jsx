"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../../context/LanguageContext';
import { API_BASE_URL } from '../../context/AuthContext';
import { Trash2, Mail, Check, X, Eye } from 'lucide-react';

const MessageManager = () => {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchMessages = () => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/api/messages/`)
      .then(res => {
        setMessages(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const openMessageDetails = async (msg) => {
    setSelectedMessage(msg);
    setIsModalOpen(true);
    
    // If unread, mark as read on backend
    if (msg.status === 'unread') {
      try {
        await axios.patch(`${API_BASE_URL}/api/messages/${msg.id}/`, { status: 'read' });
        // Update local list state
        setMessages(messages.map(m => m.id === msg.id ? { ...m, status: 'read' } : m));
      } catch (err) {
        console.error('Failed to mark message as read:', err);
      }
    }
  };

  const handleMarkAsRead = async (id, e) => {
    e.stopPropagation(); // prevent modal trigger
    try {
      await axios.patch(`${API_BASE_URL}/api/messages/${id}/`, { status: 'read' });
      setMessages(messages.map(m => m.id === id ? { ...m, status: 'read' } : m));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id, e) => {
    if (e) e.stopPropagation(); // prevent modal trigger
    if (window.confirm(language === 'fa' ? 'آیا از حذف این پیام مطمئن هستید؟' : 'Are you sure you want to delete this message?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/messages/${id}/`);
        setIsModalOpen(false);
        fetchMessages();
      } catch (err) {
        console.error(err);
        alert(language === 'fa' ? 'خطا در حذف پیام' : 'Error deleting message');
      }
    }
  };

  return (
    <div className="admin-crud-page">
      <div className="crud-header">
        <h2 className="admin-page-title">{t('admin.messages')}</h2>
      </div>

      {loading ? (
        <div className="flex-center" style={{ minHeight: '30vh' }}>
          <div className="animate-pulse-slow">{language === 'fa' ? 'در حال بارگذاری...' : 'Loading...'}</div>
        </div>
      ) : messages.length === 0 ? (
        <div className="glass-panel text-center" style={{ padding: '60px 24px' }}>
          <Mail size={48} className="placeholder-icon animate-pulse-slow" style={{ margin: '0 auto 16px auto', display: 'block' }} />
          <p className="no-data-text">{t('admin.no_messages')}</p>
        </div>
      ) : (
        <div className="table-responsive glass-panel">
          <table className="admin-table">
            <thead>
              <tr>
                <th>{language === 'fa' ? 'فرستنده' : 'Sender'}</th>
                <th>{language === 'fa' ? 'موضوع' : 'Subject'}</th>
                <th>{language === 'fa' ? 'تاریخ ارسال' : 'Date'}</th>
                <th>{language === 'fa' ? 'وضعیت' : 'Status'}</th>
                <th>{language === 'fa' ? 'عملیات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m.id} className={`clickable-row ${m.status === 'unread' ? 'unread-bg' : ''}`} onClick={() => openMessageDetails(m)}>
                  <td>
                    <div className="bilingual-table-text">
                      <span className="primary-text">{m.name}</span>
                      <span className="secondary-text">{m.email}</span>
                    </div>
                  </td>
                  <td><strong>{m.subject}</strong></td>
                  <td>{new Date(m.created_at).toLocaleString(language === 'fa' ? 'fa-IR' : 'en-US')}</td>
                  <td>
                    <span className={`msg-status-badge ${m.status}`}>
                      {m.status === 'unread' ? t('admin.unread') : t('admin.read')}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons-cell" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => openMessageDetails(m)} className="action-cell-btn edit" title={t('admin.edit')}>
                        <Eye size={16} />
                      </button>
                      {m.status === 'unread' && (
                        <button onClick={(e) => handleMarkAsRead(m.id, e)} className="action-cell-btn approve" title={t('admin.mark_as_read')}>
                          <Check size={16} />
                        </button>
                      )}
                      <button onClick={(e) => handleDelete(m.id, e)} className="action-cell-btn delete" title={t('admin.delete')}>
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

      {/* Message Details Modal */}
      {isModalOpen && selectedMessage && (
        <div className="admin-modal-overlay">
          <div className="admin-modal glass-panel animate-fade-in-up" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3>{language === 'fa' ? 'جزئیات پیام دریافتی' : 'Message Details'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="close-btn">
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body message-detail-body">
              <div className="msg-meta-block">
                <div className="meta-field">
                  <span className="meta-label">{language === 'fa' ? 'فرستنده:' : 'Sender:'}</span>
                  <strong className="meta-value">{selectedMessage.name}</strong>
                </div>
                <div className="meta-field">
                  <span className="meta-label">{language === 'fa' ? 'ایمیل:' : 'Email:'}</span>
                  <span className="meta-value">{selectedMessage.email}</span>
                </div>
                <div className="meta-field">
                  <span className="meta-label">{language === 'fa' ? 'موضوع:' : 'Subject:'}</span>
                  <strong className="meta-value">{selectedMessage.subject}</strong>
                </div>
                <div className="meta-field">
                  <span className="meta-label">{language === 'fa' ? 'تاریخ ارسال:' : 'Sent Date:'}</span>
                  <span className="meta-value">{new Date(selectedMessage.created_at).toLocaleString(language === 'fa' ? 'fa-IR' : 'en-US')}</span>
                </div>
              </div>

              <div className="msg-content-block">
                <span className="meta-label">{language === 'fa' ? 'متن پیام:' : 'Message Content:'}</span>
                <p className="msg-body-text pre-wrap-text">{selectedMessage.message}</p>
              </div>

              <div className="modal-footer" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', marginTop: '20px' }}>
                <button type="button" onClick={() => handleDelete(selectedMessage.id)} className="btn btn-danger">
                  <Trash2 size={16} />
                  <span>{t('admin.delete')}</span>
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">
                  {language === 'fa' ? 'بستن' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageManager;
