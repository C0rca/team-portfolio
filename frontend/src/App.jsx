import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';

// Contexts
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';

// Layouts
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdminLayout from './components/layout/AdminLayout';

// Client Pages
import Home from './pages/client/Home';
import Portfolio from './pages/client/Portfolio';
import BlogDetail from './pages/client/BlogDetail';
import Login from './pages/client/Login';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import ProjectManager from './pages/admin/ProjectManager';
import TeamManager from './pages/admin/TeamManager';
import ServiceManager from './pages/admin/ServiceManager';
import BlogManager from './pages/admin/BlogManager';
import TestimonialManager from './pages/admin/TestimonialManager';
import MessageManager from './pages/admin/MessageManager';
import SettingsManager from './pages/admin/SettingsManager';

// Client Layout wraps Navbar and Footer around page content
const ClientLayout = () => (
  <>
    <Navbar />
    <div style={{ minHeight: '80vh', paddingTop: '80px', overflow: 'hidden', width: '100%', position: 'relative' }}>
      <Outlet />
    </div>
    <Footer />
  </>
);

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Client Routes */}
              <Route element={<ClientLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
                <Route path="/login" element={<Login />} />
              </Route>

              {/* Admin Panel Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="projects" element={<ProjectManager />} />
                <Route path="members" element={<TeamManager />} />
                <Route path="services" element={<ServiceManager />} />
                <Route path="blog" element={<BlogManager />} />
                <Route path="testimonials" element={<TestimonialManager />} />
                <Route path="messages" element={<MessageManager />} />
                <Route path="settings" element={<SettingsManager />} />
                <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
