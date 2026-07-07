import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../../context/LanguageContext';
import { API_BASE_URL } from '../../context/AuthContext';
import { Save, Github, Linkedin, Instagram, Mail, Phone, MapPin, Sliders, Layout, Type } from 'lucide-react';

const SettingsManager = () => {
  const { language, t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState({ success: null, loading: false });
  const [activeTab, setActiveTab] = useState('general');

  // General Settings
  const [logoText, setLogoText] = useState('C0 Team');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [addressFa, setAddressFa] = useState('');
  const [addressEn, setAddressEn] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [instagram, setInstagram] = useState('');

  // Homepage Settings: Hero Section
  const [heroTitleFa1, setHeroTitleFa1] = useState('');
  const [heroTitleFa2, setHeroTitleFa2] = useState('');
  const [heroTitleFa3, setHeroTitleFa3] = useState('');
  const [heroTitleEn1, setHeroTitleEn1] = useState('');
  const [heroTitleEn2, setHeroTitleEn2] = useState('');
  const [heroTitleEn3, setHeroTitleEn3] = useState('');
  const [heroSubtitleFa, setHeroSubtitleFa] = useState('');
  const [heroSubtitleEn, setHeroSubtitleEn] = useState('');
  const [heroContactBtnFa, setHeroContactBtnFa] = useState('');
  const [heroContactBtnEn, setHeroContactBtnEn] = useState('');
  const [heroPortfolioBtnFa, setHeroPortfolioBtnFa] = useState('');
  const [heroPortfolioBtnEn, setHeroPortfolioBtnEn] = useState('');

  // Homepage Settings: Section Titles
  const [servicesTitleFa, setServicesTitleFa] = useState('');
  const [servicesTitleEn, setServicesTitleEn] = useState('');
  const [servicesSubtitleFa, setServicesSubtitleFa] = useState('');
  const [servicesSubtitleEn, setServicesSubtitleEn] = useState('');

  const [portfolioTitleFa, setPortfolioTitleFa] = useState('');
  const [portfolioTitleEn, setPortfolioTitleEn] = useState('');
  const [portfolioSubtitleFa, setPortfolioSubtitleFa] = useState('');
  const [portfolioSubtitleEn, setPortfolioSubtitleEn] = useState('');

  const [teamTitleFa, setTeamTitleFa] = useState('');
  const [teamTitleEn, setTeamTitleEn] = useState('');
  const [teamSubtitleFa, setTeamSubtitleFa] = useState('');
  const [teamSubtitleEn, setTeamSubtitleEn] = useState('');

  const [testimonialsTitleFa, setTestimonialsTitleFa] = useState('');
  const [testimonialsTitleEn, setTestimonialsTitleEn] = useState('');
  const [testimonialsSubtitleFa, setTestimonialsSubtitleFa] = useState('');
  const [testimonialsSubtitleEn, setTestimonialsSubtitleEn] = useState('');

  const [blogTitleFa, setBlogTitleFa] = useState('');
  const [blogTitleEn, setBlogTitleEn] = useState('');
  const [blogSubtitleFa, setBlogSubtitleFa] = useState('');
  const [blogSubtitleEn, setBlogSubtitleEn] = useState('');

  const [contactTitleFa, setContactTitleFa] = useState('');
  const [contactTitleEn, setContactTitleEn] = useState('');
  const [contactSubtitleFa, setContactSubtitleFa] = useState('');
  const [contactSubtitleEn, setContactSubtitleEn] = useState('');

  // Homepage Settings: Video Background
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoOpacity, setVideoOpacity] = useState(0.15);
  const [videoBlur, setVideoBlur] = useState(3.0);
  const [videoOverlayDarkness, setVideoOverlayDarkness] = useState(0.7);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Homepage Settings: Team Frame
  const [teamFrameUrl, setTeamFrameUrl] = useState('');
  const [uploadingFrame, setUploadingFrame] = useState(false);
  const [frameUploadError, setFrameUploadError] = useState('');

  useEffect(() => {
    setLoading(true);
    const p1 = axios.get(`${API_BASE_URL}/api/settings/general/`);
    const p2 = axios.get(`${API_BASE_URL}/api/settings/homepage/`);

    Promise.all([p1, p2])
      .then(([res1, res2]) => {
        const val1 = res1.data.value;
        if (val1) {
          setLogoText(val1.logoText || 'C0 Team');
          setEmail(val1.email || '');
          setPhone(val1.phone || '');
          setAddressFa(val1.address_fa || '');
          setAddressEn(val1.address_en || '');
          setGithub(val1.socials?.github || '');
          setLinkedin(val1.socials?.linkedin || '');
          setInstagram(val1.socials?.instagram || '');
        }

        const val2 = res2.data.value;
        if (val2) {
          setHeroTitleFa1(val2.hero?.title_fa_1 || '');
          setHeroTitleFa2(val2.hero?.title_fa_2 || '');
          setHeroTitleFa3(val2.hero?.title_fa_3 || '');
          setHeroTitleEn1(val2.hero?.title_en_1 || '');
          setHeroTitleEn2(val2.hero?.title_en_2 || '');
          setHeroTitleEn3(val2.hero?.title_en_3 || '');
          setHeroSubtitleFa(val2.hero?.subtitle_fa || '');
          setHeroSubtitleEn(val2.hero?.subtitle_en || '');
          setHeroContactBtnFa(val2.hero?.contactBtn_fa || '');
          setHeroContactBtnEn(val2.hero?.contactBtn_en || '');
          setHeroPortfolioBtnFa(val2.hero?.portfolioBtn_fa || '');
          setHeroPortfolioBtnEn(val2.hero?.portfolioBtn_en || '');

          setServicesTitleFa(val2.sections?.services_title_fa || '');
          setServicesTitleEn(val2.sections?.services_title_en || '');
          setServicesSubtitleFa(val2.sections?.services_subtitle_fa || '');
          setServicesSubtitleEn(val2.sections?.services_subtitle_en || '');

          setPortfolioTitleFa(val2.sections?.portfolio_title_fa || '');
          setPortfolioTitleEn(val2.sections?.portfolio_title_en || '');
          setPortfolioSubtitleFa(val2.sections?.portfolio_subtitle_fa || '');
          setPortfolioSubtitleEn(val2.sections?.portfolio_subtitle_en || '');

          setTeamTitleFa(val2.sections?.team_title_fa || '');
          setTeamTitleEn(val2.sections?.team_title_en || '');
          setTeamSubtitleFa(val2.sections?.team_subtitle_fa || '');
          setTeamSubtitleEn(val2.sections?.team_subtitle_en || '');

          setTestimonialsTitleFa(val2.sections?.testimonials_title_fa || '');
          setTestimonialsTitleEn(val2.sections?.testimonials_title_en || '');
          setTestimonialsSubtitleFa(val2.sections?.testimonials_subtitle_fa || '');
          setTestimonialsSubtitleEn(val2.sections?.testimonials_subtitle_en || '');

          setBlogTitleFa(val2.sections?.blog_title_fa || '');
          setBlogTitleEn(val2.sections?.blog_title_en || '');
          setBlogSubtitleFa(val2.sections?.blog_subtitle_fa || '');
          setBlogSubtitleEn(val2.sections?.blog_subtitle_en || '');

          setContactTitleFa(val2.sections?.contact_title_fa || '');
          setContactTitleEn(val2.sections?.contact_title_en || '');
          setContactSubtitleFa(val2.sections?.contact_subtitle_fa || '');
          setContactSubtitleEn(val2.sections?.contact_subtitle_en || '');

          setVideoEnabled(val2.video?.enabled !== undefined ? val2.video.enabled : true);
          setVideoUrl(val2.video?.url || '');
          setVideoOpacity(val2.video?.opacity !== undefined ? val2.video.opacity : 0.15);
          setVideoBlur(val2.video?.blur !== undefined ? val2.video.blur : 3.0);
          setVideoOverlayDarkness(val2.video?.overlayDarkness !== undefined ? val2.video.overlayDarkness : 0.7);
          setTeamFrameUrl(val2.teamFrameUrl || '');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaveStatus({ success: null, loading: true });

    const generalPayload = {
      logoText,
      email,
      phone,
      address_fa: addressFa,
      address_en: addressEn,
      socials: { github, linkedin, instagram }
    };

    const homepagePayload = {
      logoText,
      hero: {
        title_fa_1: heroTitleFa1,
        title_fa_2: heroTitleFa2,
        title_fa_3: heroTitleFa3,
        title_en_1: heroTitleEn1,
        title_en_2: heroTitleEn2,
        title_en_3: heroTitleEn3,
        subtitle_fa: heroSubtitleFa,
        subtitle_en: heroSubtitleEn,
        contactBtn_fa: heroContactBtnFa,
        contactBtn_en: heroContactBtnEn,
        portfolioBtn_fa: heroPortfolioBtnFa,
        portfolioBtn_en: heroPortfolioBtnEn
      },
      sections: {
        services_title_fa: servicesTitleFa,
        services_title_en: servicesTitleEn,
        services_subtitle_fa: servicesSubtitleFa,
        services_subtitle_en: servicesSubtitleEn,
        portfolio_title_fa: portfolioTitleFa,
        portfolio_title_en: portfolioTitleEn,
        portfolio_subtitle_fa: portfolioSubtitleFa,
        portfolio_subtitle_en: portfolioSubtitleEn,
        team_title_fa: teamTitleFa,
        team_title_en: teamTitleEn,
        team_subtitle_fa: teamSubtitleFa,
        team_subtitle_en: teamSubtitleEn,
        testimonials_title_fa: testimonialsTitleFa,
        testimonials_title_en: testimonialsTitleEn,
        testimonials_subtitle_fa: testimonialsSubtitleFa,
        testimonials_subtitle_en: testimonialsSubtitleEn,
        blog_title_fa: blogTitleFa,
        blog_title_en: blogTitleEn,
        blog_subtitle_fa: blogSubtitleFa,
        blog_subtitle_en: blogSubtitleEn,
        contact_title_fa: contactTitleFa,
        contact_title_en: contactTitleEn,
        contact_subtitle_fa: contactSubtitleFa,
        contact_subtitle_en: contactSubtitleEn
      },
      video: {
        enabled: videoEnabled,
        url: videoUrl,
        opacity: videoOpacity,
        blur: videoBlur,
        overlayDarkness: videoOverlayDarkness
      },
      teamFrameUrl: teamFrameUrl
    };

    try {
      await axios.patch(`${API_BASE_URL}/api/settings/general/`, { value: generalPayload });
      await axios.patch(`${API_BASE_URL}/api/settings/homepage/`, { value: homepagePayload });
      setSaveStatus({ success: true, loading: false });
      setTimeout(() => setSaveStatus({ success: null, loading: false }), 3000);
    } catch (err) {
      console.error(err);
      setSaveStatus({ success: false, loading: false });
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      setUploadError(language === 'fa' ? 'حجم ویدیو نباید بیشتر از ۱۵ مگابایت باشد.' : 'Video size must not exceed 15MB.');
      return;
    }

    setUploadingVideo(true);
    setUploadError('');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/settings/homepage/upload-file/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      setVideoUrl(res.data.url);
    } catch (err) {
      console.error(err);
      setUploadError(language === 'fa' ? 'آپلود ویدیو با خطا مواجه شد.' : 'Failed to upload video.');
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleFrameUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setFrameUploadError(language === 'fa' ? 'حجم تصویر قاب نباید بیشتر از ۵ مگابایت باشد.' : 'Frame image size must not exceed 5MB.');
      return;
    }

    setUploadingFrame(true);
    setFrameUploadError('');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/settings/homepage/upload-file/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      setTeamFrameUrl(res.data.url);
    } catch (err) {
      console.error(err);
      setFrameUploadError(language === 'fa' ? 'آپلود قاب با خطا مواجه شد.' : 'Failed to upload frame.');
    } finally {
      setUploadingFrame(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-center" style={{ minHeight: '30vh' }}>
        <div className="animate-pulse-slow">{language === 'fa' ? 'در حال بارگذاری...' : 'Loading...'}</div>
      </div>
    );
  }

  return (
    <div className="admin-crud-page">
      <div className="crud-header">
        <h2 className="admin-page-title">{t('admin.settings')}</h2>
      </div>

      {/* Tabs Menu */}
      <div className="admin-tabs" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button 
          onClick={() => setActiveTab('general')} 
          className={`tab-btn btn ${activeTab === 'general' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Sliders size={16} />
          <span>{language === 'fa' ? 'تماس و لوگو' : 'Contact & Logo'}</span>
        </button>
        <button 
          onClick={() => setActiveTab('hero')} 
          className={`tab-btn btn ${activeTab === 'hero' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Layout size={16} />
          <span>{language === 'fa' ? 'بخش هدر و معرفی اولیه' : 'Hero Section'}</span>
        </button>
        <button 
          type="button"
          onClick={() => setActiveTab('sections')} 
          className={`tab-btn btn ${activeTab === 'sections' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Type size={16} />
          <span>{language === 'fa' ? 'عناوین و توضیحات بخش‌ها' : 'Section Headers'}</span>
        </button>
        <button 
          type="button"
          onClick={() => setActiveTab('video')} 
          className={`tab-btn btn ${activeTab === 'video' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Sliders size={16} />
          <span>{language === 'fa' ? 'ویدیو پس‌زمینه و قاب اعضا' : 'Video & Team Frame'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="glass-panel" style={{ padding: '40px', marginTop: '20px' }}>
        
        {/* TAB 1: GENERAL SETTINGS */}
        {activeTab === 'general' && (
          <div className="tab-content animate-fade-in">
            <h3 style={{ marginBottom: '24px' }}>{language === 'fa' ? 'تنظیمات عمومی و تماس' : 'General & Contact Settings'}</h3>

            <div className="input-group" style={{ marginBottom: '20px' }}>
              <label className="input-label">متن لوگو سایت (Logo Text)</label>
              <input type="text" className="form-input" required value={logoText} onChange={(e) => setLogoText(e.target.value)} />
            </div>

            <div className="form-grid-columns">
              <div className="input-group">
                <label className="input-label">
                  <Mail size={16} style={{ display: 'inline-block', margin: '0 4px', verticalAlign: 'middle' }} />
                  <span>ایمیل ارتباطی</span>
                </label>
                <input type="email" className="form-input ltr-text" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="input-group">
                <label className="input-label">
                  <Phone size={16} style={{ display: 'inline-block', margin: '0 4px', verticalAlign: 'middle' }} />
                  <span>تلفن تماس</span>
                </label>
                <input type="text" className="form-input ltr-text" required value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>

            <div className="form-grid-columns">
              <div className="input-group">
                <label className="input-label">
                  <MapPin size={16} style={{ display: 'inline-block', margin: '0 4px', verticalAlign: 'middle' }} />
                  <span>آدرس فیزیکی (فارسی)</span>
                </label>
                <textarea className="form-input" rows="2" value={addressFa} onChange={(e) => setAddressFa(e.target.value)}></textarea>
              </div>

              <div className="input-group">
                <label className="input-label">
                  <MapPin size={16} style={{ display: 'inline-block', margin: '0 4px', verticalAlign: 'middle' }} />
                  <span>Address (English)</span>
                </label>
                <textarea className="form-input" rows="2" value={addressEn} onChange={(e) => setAddressEn(e.target.value)}></textarea>
              </div>
            </div>

            <h3 style={{ margin: '40px 0 24px 0', borderTop: '1px solid var(--border-color)', paddingTop: '30px' }}>
              {language === 'fa' ? 'شبکه‌های اجتماعی' : 'Social Media Profiles'}
            </h3>

            <div className="form-grid-columns-three">
              <div className="input-group">
                <label className="input-label">
                  <Github size={16} style={{ display: 'inline-block', margin: '0 4px', verticalAlign: 'middle' }} />
                  <span>GitHub URL</span>
                </label>
                <input type="url" className="form-input ltr-text" value={github} onChange={(e) => setGithub(e.target.value)} />
              </div>

              <div className="input-group">
                <label className="input-label">
                  <Linkedin size={16} style={{ display: 'inline-block', margin: '0 4px', verticalAlign: 'middle' }} />
                  <span>LinkedIn URL</span>
                </label>
                <input type="url" className="form-input ltr-text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
              </div>

              <div className="input-group">
                <label className="input-label">
                  <Instagram size={16} style={{ display: 'inline-block', margin: '0 4px', verticalAlign: 'middle' }} />
                  <span>Instagram URL</span>
                </label>
                <input type="url" className="form-input ltr-text" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HERO SECTION TEXTS */}
        {activeTab === 'hero' && (
          <div className="tab-content animate-fade-in">
            <h3 style={{ marginBottom: '24px' }}>{language === 'fa' ? 'تنظیمات بخش هدر و معرفی اولیه (Hero Section)' : 'Hero Section Texts'}</h3>

            <h4 style={{ margin: '20px 0 10px 0', color: 'var(--accent-primary)' }}>متن‌های فارسی (Persian)</h4>
            <div className="form-grid-columns-three">
              <div className="input-group">
                <label className="input-label">عنوان خط اول (مثال: ما ایده‌های شما را به)</label>
                <input type="text" className="form-input" value={heroTitleFa1} onChange={(e) => setHeroTitleFa1(e.target.value)} />
              </div>
              <div className="input-group">
                <label className="input-label">عنوان خط دوم - رنگی (مثال: کدهای قدرتمند)</label>
                <input type="text" className="form-input" value={heroTitleFa2} onChange={(e) => setHeroTitleFa2(e.target.value)} />
              </div>
              <div className="input-group">
                <label className="input-label">عنوان خط سوم (مثال: تبدیل می‌کنیم)</label>
                <input type="text" className="form-input" value={heroTitleFa3} onChange={(e) => setHeroTitleFa3(e.target.value)} />
              </div>
            </div>

            <div className="input-group" style={{ margin: '20px 0' }}>
              <label className="input-label">توضیح کوتاه زیر عنوان اصلی (فارسی)</label>
              <textarea className="form-input" rows="3" value={heroSubtitleFa} onChange={(e) => setHeroSubtitleFa(e.target.value)}></textarea>
            </div>

            <div className="form-grid-columns" style={{ marginBottom: '20px' }}>
              <div className="input-group">
                <label className="input-label">متن دکمه اول - تماس (فارسی)</label>
                <input type="text" className="form-input" value={heroContactBtnFa} onChange={(e) => setHeroContactBtnFa(e.target.value)} />
              </div>
              <div className="input-group">
                <label className="input-label">متن دکمه دوم - نمونه‌کارها (فارسی)</label>
                <input type="text" className="form-input" value={heroPortfolioBtnFa} onChange={(e) => setHeroPortfolioBtnFa(e.target.value)} />
              </div>
            </div>

            <h4 style={{ margin: '40px 0 10px 0', borderTop: '1px solid var(--border-color)', paddingTop: '20px', color: 'var(--accent-primary)' }}>English Texts</h4>
            <div className="form-grid-columns-three">
              <div className="input-group">
                <label className="input-label">Title Line 1</label>
                <input type="text" className="form-input ltr-text" value={heroTitleEn1} onChange={(e) => setHeroTitleEn1(e.target.value)} />
              </div>
              <div className="input-group">
                <label className="input-label">Title Line 2 (Colored)</label>
                <input type="text" className="form-input ltr-text" value={heroTitleEn2} onChange={(e) => setHeroTitleEn2(e.target.value)} />
              </div>
              <div className="input-group">
                <label className="input-label">Title Line 3</label>
                <input type="text" className="form-input ltr-text" value={heroTitleEn3} onChange={(e) => setHeroTitleEn3(e.target.value)} />
              </div>
            </div>

            <div className="input-group" style={{ margin: '20px 0' }}>
              <label className="input-label">Subtitle (English)</label>
              <textarea className="form-input ltr-text" rows="3" value={heroSubtitleEn} onChange={(e) => setHeroSubtitleEn(e.target.value)}></textarea>
            </div>

            <div className="form-grid-columns">
              <div className="input-group">
                <label className="input-label">Contact Button Text (English)</label>
                <input type="text" className="form-input ltr-text" value={heroContactBtnEn} onChange={(e) => setHeroContactBtnEn(e.target.value)} />
              </div>
              <div className="input-group">
                <label className="input-label">Portfolio Button Text (English)</label>
                <input type="text" className="form-input ltr-text" value={heroPortfolioBtnEn} onChange={(e) => setHeroPortfolioBtnEn(e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SECTION HEADERS */}
        {activeTab === 'sections' && (
          <div className="tab-content animate-fade-in">
            <h3 style={{ marginBottom: '24px' }}>{language === 'fa' ? 'تنظیمات عناوین و توضیحات بخش‌ها' : 'Section Headers Settings'}</h3>

            {/* SERVICES SECTION */}
            <div style={{ marginBottom: '30px', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
              <h4 style={{ color: 'var(--accent-primary)' }}>بخش خدمات (Services Section)</h4>
              <div className="form-grid-columns">
                <div className="input-group">
                  <label className="input-label">عنوان (فارسی / English)</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" className="form-input" placeholder="فارسی" value={servicesTitleFa} onChange={(e) => setServicesTitleFa(e.target.value)} />
                    <input type="text" className="form-input ltr-text" placeholder="English" value={servicesTitleEn} onChange={(e) => setServicesTitleEn(e.target.value)} />
                  </div>
                </div>
                <div className="input-group">
                  <label className="input-label">توضیح کوتاه (فارسی / English)</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" className="form-input" placeholder="فارسی" value={servicesSubtitleFa} onChange={(e) => setServicesSubtitleFa(e.target.value)} />
                    <input type="text" className="form-input ltr-text" placeholder="English" value={servicesSubtitleEn} onChange={(e) => setServicesSubtitleEn(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>

            {/* PORTFOLIO SECTION */}
            <div style={{ marginBottom: '30px', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
              <h4 style={{ color: 'var(--accent-primary)' }}>بخش نمونه‌کارها (Portfolio Section)</h4>
              <div className="form-grid-columns">
                <div className="input-group">
                  <label className="input-label">عنوان (فارسی / English)</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" className="form-input" placeholder="فارسی" value={portfolioTitleFa} onChange={(e) => setPortfolioTitleFa(e.target.value)} />
                    <input type="text" className="form-input ltr-text" placeholder="English" value={portfolioTitleEn} onChange={(e) => setPortfolioTitleEn(e.target.value)} />
                  </div>
                </div>
                <div className="input-group">
                  <label className="input-label">توضیح کوتاه (فارسی / English)</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" className="form-input" placeholder="فارسی" value={portfolioSubtitleFa} onChange={(e) => setPortfolioSubtitleFa(e.target.value)} />
                    <input type="text" className="form-input ltr-text" placeholder="English" value={portfolioSubtitleEn} onChange={(e) => setPortfolioSubtitleEn(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>

            {/* TEAM SECTION */}
            <div style={{ marginBottom: '30px', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
              <h4 style={{ color: 'var(--accent-primary)' }}>بخش اعضای تیم (Team Section)</h4>
              <div className="form-grid-columns">
                <div className="input-group">
                  <label className="input-label">عنوان (فارسی / English)</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" className="form-input" placeholder="فارسی" value={teamTitleFa} onChange={(e) => setTeamTitleFa(e.target.value)} />
                    <input type="text" className="form-input ltr-text" placeholder="English" value={teamTitleEn} onChange={(e) => setTeamTitleEn(e.target.value)} />
                  </div>
                </div>
                <div className="input-group">
                  <label className="input-label">توضیح کوتاه (فارسی / English)</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" className="form-input" placeholder="فارسی" value={teamSubtitleFa} onChange={(e) => setTeamSubtitleFa(e.target.value)} />
                    <input type="text" className="form-input ltr-text" placeholder="English" value={teamSubtitleEn} onChange={(e) => setTeamSubtitleEn(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>

            {/* TESTIMONIALS SECTION */}
            <div style={{ marginBottom: '30px', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
              <h4 style={{ color: 'var(--accent-primary)' }}>بخش نظرات مشتریان (Testimonials Section)</h4>
              <div className="form-grid-columns">
                <div className="input-group">
                  <label className="input-label">عنوان (فارسی / English)</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" className="form-input" placeholder="فارسی" value={testimonialsTitleFa} onChange={(e) => setTestimonialsTitleFa(e.target.value)} />
                    <input type="text" className="form-input ltr-text" placeholder="English" value={testimonialsTitleEn} onChange={(e) => setTestimonialsTitleEn(e.target.value)} />
                  </div>
                </div>
                <div className="input-group">
                  <label className="input-label">توضیح کوتاه (فارسی / English)</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" className="form-input" placeholder="فارسی" value={testimonialsSubtitleFa} onChange={(e) => setTestimonialsSubtitleFa(e.target.value)} />
                    <input type="text" className="form-input ltr-text" placeholder="English" value={testimonialsSubtitleEn} onChange={(e) => setTestimonialsSubtitleEn(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>

            {/* BLOG SECTION */}
            <div style={{ marginBottom: '30px', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
              <h4 style={{ color: 'var(--accent-primary)' }}>بخش بلاگ (Blog Section)</h4>
              <div className="form-grid-columns">
                <div className="input-group">
                  <label className="input-label">عنوان (فارسی / English)</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" className="form-input" placeholder="فارسی" value={blogTitleFa} onChange={(e) => setBlogTitleFa(e.target.value)} />
                    <input type="text" className="form-input ltr-text" placeholder="English" value={blogTitleEn} onChange={(e) => setBlogTitleEn(e.target.value)} />
                  </div>
                </div>
                <div className="input-group">
                  <label className="input-label">توضیح کوتاه (فارسی / English)</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" className="form-input" placeholder="فارسی" value={blogSubtitleFa} onChange={(e) => setBlogSubtitleFa(e.target.value)} />
                    <input type="text" className="form-input ltr-text" placeholder="English" value={blogSubtitleEn} onChange={(e) => setBlogSubtitleEn(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>

            {/* CONTACT SECTION */}
            <div style={{ marginBottom: '10px' }}>
              <h4 style={{ color: 'var(--accent-primary)' }}>بخش تماس با ما (Contact Section)</h4>
              <div className="form-grid-columns">
                <div className="input-group">
                  <label className="input-label">عنوان (فارسی / English)</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" className="form-input" placeholder="فارسی" value={contactTitleFa} onChange={(e) => setContactTitleFa(e.target.value)} />
                    <input type="text" className="form-input ltr-text" placeholder="English" value={contactTitleEn} onChange={(e) => setContactTitleEn(e.target.value)} />
                  </div>
                </div>
                <div className="input-group">
                  <label className="input-label">توضیح کوتاه (فارسی / English)</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" className="form-input" placeholder="فارسی" value={contactSubtitleFa} onChange={(e) => setContactSubtitleFa(e.target.value)} />
                    <input type="text" className="form-input ltr-text" placeholder="English" value={contactSubtitleEn} onChange={(e) => setContactSubtitleEn(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: HERO BACKGROUND VIDEO */}
        {activeTab === 'video' && (
          <div className="tab-content animate-fade-in">
            <h3 style={{ marginBottom: '24px' }}>{language === 'fa' ? 'تنظیمات ویدیو پس‌زمینه هدر' : 'Hero Background Video Settings'}</h3>

            <div className="input-group" style={{ marginBottom: '24px' }}>
              <label className="checkbox-container" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={videoEnabled} 
                  onChange={(e) => setVideoEnabled(e.target.checked)} 
                  style={{ width: '18px', height: '18px' }}
                />
                <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>{language === 'fa' ? 'فعالسازی ویدیو پس‌زمینه' : 'Enable Background Video'}</span>
              </label>
            </div>

            {videoEnabled && (
              <>
                {/* File Upload Input */}
                <div className="input-group" style={{ marginBottom: '20px' }}>
                  <label className="input-label">{language === 'fa' ? 'آپلود فایل ویدیو (فرمت MP4/WebM، حداکثر ۱۵ مگابایت)' : 'Upload Video File (MP4/WebM, max 15MB)'}</label>
                  <input 
                    type="file" 
                    accept="video/mp4,video/webm" 
                    className="form-input" 
                    onChange={handleVideoUpload} 
                    disabled={uploadingVideo}
                  />
                  {uploadingVideo && <p style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', marginTop: '5px' }}>{language === 'fa' ? 'در حال آپلود فایل... لطفا منتظر بمانید' : 'Uploading file... Please wait'}</p>}
                  {uploadError && <p style={{ color: 'red', fontSize: '0.85rem', marginTop: '5px' }}>{uploadError}</p>}
                </div>

                {/* Video URL */}
                <div className="input-group" style={{ marginBottom: '20px' }}>
                  <label className="input-label">{language === 'fa' ? 'آدرس ویدیو (URL)' : 'Video URL'}</label>
                  <input 
                    type="text" 
                    className="form-input ltr-text" 
                    placeholder="e.g. /media/settings/asset_homepage_abc.mp4" 
                    value={videoUrl} 
                    onChange={(e) => setVideoUrl(e.target.value)} 
                  />
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '5px' }}>
                    {language === 'fa' ? 'می‌توانید فایل آپلود کنید یا آدرس یک لینک مستقیم ویدیو را وارد کنید. در صورت خالی بودن، فایل موقت استفاده می‌شود.' : 'You can upload a file or enter a direct video link. If left blank, a fallback video will be used.'}
                  </p>
                </div>

                {/* Video Opacity Slider */}
                <div className="input-group" style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label className="input-label" style={{ margin: 0 }}>{language === 'fa' ? 'شفافیت ویدیو (Opacity)' : 'Video Opacity'}</label>
                    <span style={{ fontWeight: 'bold', color: 'var(--accent-primary)' }}>{videoOpacity}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.05" 
                    max="1.0" 
                    step="0.05" 
                    className="form-input" 
                    style={{ padding: 0 }}
                    value={videoOpacity} 
                    onChange={(e) => setVideoOpacity(parseFloat(e.target.value))} 
                  />
                </div>

                {/* Video Blur Slider */}
                <div className="input-group" style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label className="input-label" style={{ margin: 0 }}>{language === 'fa' ? 'میزان تاری پس‌زمینه (Blur)' : 'Blur Radius'}</label>
                    <span style={{ fontWeight: 'bold', color: 'var(--accent-primary)' }}>{videoBlur}px</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="15" 
                    step="0.5" 
                    className="form-input" 
                    style={{ padding: 0 }}
                    value={videoBlur} 
                    onChange={(e) => setVideoBlur(parseFloat(e.target.value))} 
                  />
                </div>

                {/* Overlay Darkness Slider */}
                <div className="input-group" style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label className="input-label" style={{ margin: 0 }}>{language === 'fa' ? 'شدت تاریکی لایه شیشه‌ای (Overlay Darkness)' : 'Overlay Darkness'}</label>
                    <span style={{ fontWeight: 'bold', color: 'var(--accent-primary)' }}>{videoOverlayDarkness}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.0" 
                    max="0.95" 
                    step="0.05" 
                    className="form-input" 
                    style={{ padding: 0 }}
                    value={videoOverlayDarkness} 
                    onChange={(e) => setVideoOverlayDarkness(parseFloat(e.target.value))} 
                  />
                </div>
                {/* TEAM MEMBER CARD FRAME SETTINGS */}
                <hr style={{ margin: '30px 0', borderColor: 'var(--border-color)' }} />
                <h4 style={{ marginBottom: '16px', color: 'var(--accent-primary)' }}>{language === 'fa' ? 'تصویر قاب تزئینی کارت‌های اعضای تیم' : 'Team Member Card Frame'}</h4>

                {/* File Upload Input */}
                <div className="input-group" style={{ marginBottom: '20px' }}>
                  <label className="input-label">{language === 'fa' ? 'آپلود تصویر قاب جدید (فرمت PNG بدون پس‌زمینه)' : 'Upload Frame Image (PNG, transparent background)'}</label>
                  <input 
                    type="file" 
                    accept="image/png" 
                    className="form-input" 
                    onChange={handleFrameUpload} 
                    disabled={uploadingFrame}
                  />
                  {uploadingFrame && <p style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', marginTop: '5px' }}>{language === 'fa' ? 'در حال آپلود فایل... لطفا منتظر بمانید' : 'Uploading file... Please wait'}</p>}
                  {frameUploadError && <p style={{ color: 'red', fontSize: '0.85rem', marginTop: '5px' }}>{frameUploadError}</p>}
                </div>

                {/* Frame URL */}
                <div className="input-group" style={{ marginBottom: '20px' }}>
                  <label className="input-label">{language === 'fa' ? 'آدرس تصویر قاب (URL)' : 'Frame Image URL'}</label>
                  <input 
                    type="text" 
                    className="form-input ltr-text" 
                    placeholder="e.g. /media/settings/asset_homepage_xyz.png" 
                    value={teamFrameUrl} 
                    onChange={(e) => setTeamFrameUrl(e.target.value)} 
                  />
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '5px' }}>
                    {language === 'fa' ? 'در صورت خالی بودن، از قاب پیش‌فرض پروژه (/team-frame.png) استفاده خواهد شد.' : 'If left blank, the default project frame (/team-frame.png) will be used.'}
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        {/* ALERTS & SUBMIT BUTTON */}
        {saveStatus.success === true && (
          <div className="form-alert success" style={{ marginTop: '24px' }}>
            {language === 'fa' ? 'تنظیمات با موفقیت ذخیره شد.' : 'Settings saved successfully.'}
          </div>
        )}
        {saveStatus.success === false && (
          <div className="form-alert error" style={{ marginTop: '24px' }}>
            {language === 'fa' ? 'خطا در ثبت اطلاعات.' : 'Error saving settings.'}
          </div>
        )}

        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn btn-primary" disabled={saveStatus.loading}>
            <Save size={18} />
            <span>{saveStatus.loading ? (language === 'fa' ? 'در حال ذخیره...' : 'Saving...') : t('admin.save')}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsManager;
