# C0 Team Full-Stack Starter Suite 🚀

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/frontend-React%20%26%20Vite-blue)](https://react.dev)
[![Django](https://img.shields.io/badge/backend-Django%20%26%20DRF-green)](https://www.djangoproject.com)
[![JWT Auth](https://img.shields.io/badge/auth-Simple%20JWT-red)](#authentication)

A modern, high-performance, and fully customizable full-stack portfolio and content management system. Built with a **React + Vite** single-page application (SPA) frontend and a **Django REST Framework (DRF)** backend, this suite is designed for agency portfolios, freelancer team pages, and small businesses needing a sleek online presence with a powerful management interface.

---

## ✨ Features

- **🌐 Dual-Language Support:** Full translation support (English & Farsi) across all core features (names, roles, descriptions, services, blog articles, and settings).
- **💼 Team & Services Directory:** Add and manage team members, their roles, custom bios, social links, and display order.
- **🎨 Showcase Portfolio:** Filterable showcase for your projects, highlighting technologies used, demo links, categories, and GitHub source links.
- **✍️ Complete Blog System:** An SEO-friendly blogging engine with slug generation, tags, article views count, and rich article content.
- **💬 Testimonials & Inquiries:** Section for client feedback (with 1-5 ratings) and an interactive contact form for project inquiries.
- **⚙️ Dynamic Site Settings:** Customize logos, hero titles, descriptions, theme variables, and background video directly from the dashboard.
- **🔐 Custom Admin Panel:** A secure custom SPA dashboard built on React, utilizing JSON Web Tokens (JWT) for authentication to manage all database records dynamically.

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** React 19 (Vite 8)
- **Routing:** React Router DOM
- **HTTP Client:** Axios (configured with interceptors for JWT tokens)
- **Icons:** Lucide React
- **Styling:** Vanilla CSS (curated, modern design system with glassmorphism & responsive dark/light schemes)

### Backend
- **Framework:** Django 5.2 (Python 3.10+)
- **API Engine:** Django REST Framework (DRF)
- **Authentication:** Simple JWT (JSON Web Tokens)
- **Database:** SQLite 3 (Default, easily configurable to PostgreSQL or MySQL)

---

## 📁 Repository Structure

```text
├── .github/                  # GitHub Issue & PR Templates
├── backend/                  # Django REST API application
│   ├── api/                  # Main business logic, models, views, and management commands
│   ├── core/                 # Core settings, WSGI/ASGI configurations, and routing
│   ├── media/                # User uploaded media assets (avatars, blogs, etc.)
│   └── manage.py             # Django project manager script
├── frontend/                 # React SPA application
│   ├── src/                  # React source files (components, contexts, locales, pages)
│   ├── index.html            # Main HTML entry point
│   ├── vite.config.js        # Vite build tool configuration
│   └── package.json          # Node.js dependencies and run scripts
└── run.bat                   # Windows batch runner to spin up both servers simultaneously
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or newer)
- [Python](https://www.python.org/) (v3.10.x or newer)

---

### Run with Windows Launcher (Recommended)
If you are on Windows, simply double-click the `run.bat` script in the root directory. It will:
1. Automatically run `npm install` inside the `frontend` folder if `node_modules` is missing.
2. Spin up the Django Backend server on [http://127.0.0.1:8000](http://127.0.0.1:8000).
3. Spin up the React + Vite frontend dev server on [http://localhost:5173](http://localhost:5173).

---

### Manual Installation & Run

#### 1. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create a virtual environment
python -m venv .venv

# Activate the virtual environment
# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations to set up sqlite database
python manage.py migrate

# Create a superuser (optional, for Django admin)
python manage.py createsuperuser

# Start the server
python manage.py runserver
```

#### 2. Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install node dependencies
npm install

# Start Vite development server
npm run dev
```

---

## 🔒 Default Credentials

When running the project with the pre-configured SQLite database, the following local admin credentials are setup:

- **Admin Dashboard URL:** [http://localhost:5173/admin-login](http://localhost:5173/admin-login)
- **Username:** `admin`
- **Password:** `admin`

*(Note: Change these immediately after deployment via the default Django admin panel at [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/))*

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
