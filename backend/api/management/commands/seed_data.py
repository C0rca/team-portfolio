from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import TeamMember, Project, Service, Article, Testimonial, SiteSetting

class Command(BaseCommand):
    help = 'Seeds initial demo data for C0 Team website'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding database...')

        # 1. Create Superuser
        admin_user, created = User.objects.get_or_create(username='admin')
        if created:
            admin_user.set_password('admin')
            admin_user.is_superuser = True
            admin_user.is_staff = True
            admin_user.save()
            self.stdout.write(self.style.SUCCESS('Admin user created successfully (username: admin, password: admin)'))
        else:
            self.stdout.write('Admin user already exists.')

        # 2. Seed Team Members
        members_data = [
            {
                'name_fa': 'امیرحسین میریعقوبی',
                'name_en': 'Amirhossein Miryaghoubi',
                'role_fa': 'توسعه‌دهنده بک‌اند و مهندس دواپس',
                'role_en': 'Backend Developer & DevOps Engineer',
                'bio_fa': 'مسلط به پایتون، جنگو، لینوکس، Docker و Kubernetes. متخصص در راه‌اندازی خطوط لوله CI/CD، اتوماسیون با Ansible، مدیریت وب‌سرورهای Nginx و بهینه‌سازی دیتابیس‌های PostgreSQL و Redis.',
                'bio_en': 'Skilled in Python, Django, Linux, Docker, and Kubernetes. Specialist in CI/CD pipeline automation (GitLab/GitHub), Ansible scripting, Nginx configuration, and database tuning (PostgreSQL/Redis).',
                'github_url': 'https://github.com',
                'linkedin_url': 'https://linkedin.com',
                'order': 1
            },
            {
                'name_fa': 'دانیال مشتاقی',
                'name_en': 'Danial Moshtaghi',
                'role_fa': 'طراح UI/UX و توسعه‌دهنده فرانت‌اند',
                'role_en': 'UI/UX Designer & Frontend Developer',
                'bio_fa': 'مسلط به طراحی واسط کاربری در Figma و پیاده‌سازی فرانت‌اند با React، Next.js، TypeScript و Tailwind CSS. متخصص در توسعه کامپوننت‌های بهینه، استایل‌دهی مدرن و انیمیشن‌های CSS/Framer Motion.',
                'bio_en': 'Experienced in Figma prototyping, and frontend development with React, Next.js, TypeScript, and Tailwind CSS. Focused on reusable components, responsive layouts, and performance optimization.',
                'github_url': 'https://github.com',
                'linkedin_url': 'https://linkedin.com',
                'order': 2
            },
            {
                'name_fa': 'مهدی رسولی',
                'name_en': 'Mehdi Rasouli',
                'role_fa': 'مهندس یادگیری ماشین و هوش مصنوعی',
                'role_en': 'Machine Learning & AI Engineer',
                'bio_fa': 'مسلط به توسعه و استقرار مدل‌های ML/DL با PyTorch و Scikit-learn. با تجربه در کار با ترانسفورمرها (HuggingFace)، پیاده‌سازی LLMها، بینایی ماشین (OpenCV) و ساخت APIهای سریع با FastAPI.',
                'bio_en': 'Proficient in building and deploying ML/DL models with PyTorch and Scikit-learn. Experienced in HuggingFace Transformers, LLM fine-tuning, computer vision (OpenCV), and FastAPI.',
                'github_url': 'https://github.com',
                'linkedin_url': 'https://linkedin.com',
                'order': 3
            }
        ]

        for m in members_data:
            TeamMember.objects.get_or_create(
                name_fa=m['name_fa'],
                name_en=m['name_en'],
                defaults=m
            )
        self.stdout.write(self.style.SUCCESS(f'Seeded {len(members_data)} team members.'))

        # 3. Seed Services
        services_data = [
            {
                'title_fa': 'توسعه وب‌سایت‌های پیشرفته',
                'title_en': 'Advanced Web Development',
                'description_fa': 'طراحی و توسعه وب‌سایت‌ها و سامانه‌های اختصاصی مقیاس‌پذیر با معماری مدرن.',
                'description_en': 'Design and development of custom, scalable web systems using modern architecture.',
                'icon': 'Code',
                'price_fa': 'شروع از ۱۵ میلیون تومان',
                'price_en': 'Starting at $500',
                'order': 1
            },
            {
                'title_fa': 'اپلیکیشن‌های موبایل (Native/Cross)',
                'title_en': 'Mobile Applications',
                'description_fa': 'تولید اپلیکیشن‌های روان و کاربرپسند برای اندروید و iOS با کارایی بالا.',
                'description_en': 'Creating smooth, user-friendly mobile applications for Android & iOS with high performance.',
                'icon': 'Smartphone',
                'price_fa': 'شروع از ۲۵ میلیون تومان',
                'price_en': 'Starting at $800',
                'order': 2
            },
            {
                'title_fa': 'توسعه و ادغام هوش مصنوعی',
                'title_en': 'AI Development & Integration',
                'description_fa': 'پیاده‌سازی مدل‌های هوش مصنوعی، یادگیری ماشین و پردازش داده در کسب‌وکار شما.',
                'description_en': 'Implementing AI models, machine learning, and data processing solutions for your business.',
                'icon': 'Cpu',
                'price_fa': 'بر اساس پروژه',
                'price_en': 'Project-based',
                'order': 3
            },
            {
                'title_fa': 'طراحی رابط و تجربه کاربری (UI/UX)',
                'title_en': 'UI/UX Design',
                'description_fa': 'طراحی گرافیکی منحصر‌به‌فرد، پروتوتایپ و تحقیقات کاربری برای حداکثر فروش و تعامل.',
                'description_en': 'Unique graphic design, prototyping, and user research for maximum conversion and engagement.',
                'icon': 'Palette',
                'price_fa': 'شروع از ۸ میلیون تومان',
                'price_en': 'Starting at $300',
                'order': 4
            }
        ]

        for s in services_data:
            Service.objects.get_or_create(
                title_fa=s['title_fa'],
                title_en=s['title_en'],
                defaults=s
            )
        self.stdout.write(self.style.SUCCESS(f'Seeded {len(services_data)} services.'))

        # 4. Seed Projects
        projects_data = [
            {
                'title_fa': 'پلتفرم تجارت الکترونیک پیتزاکرفت',
                'title_en': 'PizzaCraft E-Commerce Platform',
                'description_fa': 'یک وبسایت مدرن سفارش آنلاین پیتزا با پنل مدیریت و شخصی‌سازی سه‌بعدی.',
                'description_en': 'A modern online pizza ordering platform with admin panel and 3D customization.',
                'long_description_fa': 'پروژه پیتزاکرفت یک راه‌حل جامع تجارت الکترونیک است که به کاربران اجازه می‌دهد مواد تشکیل‌دهنده پیتزای خود را انتخاب کرده و سفارش دهند. این سیستم شامل ادمین پنل پیشرفته و داشبورد آماری است.',
                'long_description_en': 'PizzaCraft is a comprehensive e-commerce solution that lets users customize their pizza ingredients, place orders, and pay online. Features a rich administration dashboard.',
                'tech_stack': ['React', 'Node.js', 'Express', 'MongoDB', 'Three.js'],
                'demo_url': 'https://pizzacraft-demo.com',
                'github_url': 'https://github.com',
                'category': 'web',
                'featured': True,
                'order': 1
            },
            {
                'title_fa': 'اپلیکیشن سلامت هوشمند «هلثی‌فای»',
                'title_en': 'Healthyfy Smart Health App',
                'description_fa': 'اپلیکیشن موبایل تناسب اندام با قابلیت پایش سلامت مبتنی بر هوش مصنوعی.',
                'description_en': 'Mobile fitness tracking app integrated with AI-powered health insights.',
                'long_description_fa': 'اپلیکیشن هلثی‌فای با استفاده از سنسورهای موبایل و تحلیل داده‌ها، عادات غذایی و ورزشی کاربر را تحلیل کرده و برنامه‌های ورزشی اختصاصی پیشنهاد می‌دهد.',
                'long_description_en': 'Healthyfy tracks daily activities, exercises, and calorie intake to provide personalized health goals and AI-driven recommendations.',
                'tech_stack': ['React Native', 'Python', 'FastAPI', 'PyTorch', 'PostgreSQL'],
                'demo_url': 'https://healthyfy.com',
                'github_url': 'https://github.com',
                'category': 'mobile',
                'featured': True,
                'order': 2
            },
            {
                'title_fa': 'سیستم تحلیل هوشمند بورس و کریپتو',
                'title_en': 'Smart Crypto & Stock Analyzer',
                'description_fa': 'سامانه تحت وب تحلیل روند بازار سرمایه بر اساس اخبار شبکه های اجتماعی.',
                'description_en': 'Web system analyzing stock and crypto trends based on social media sentiment.',
                'long_description_fa': 'این سامانه با جمع‌آوری داده‌ها از توییتر و تلگرام، احساسات بازار را نسبت به ارزهای دیجیتال و سهام بورس تهران بررسی و پیش‌بینی می‌کند.',
                'long_description_en': 'A market sentiment analysis engine parsing social media posts in real-time to forecast crypto and stock trends using NLP.',
                'tech_stack': ['Django', 'Python', 'NLTK', 'Transformers', 'React'],
                'demo_url': 'https://analyzer-demo.com',
                'github_url': 'https://github.com',
                'category': 'ai',
                'featured': False,
                'order': 3
            }
        ]

        for p in projects_data:
            Project.objects.get_or_create(
                title_fa=p['title_fa'],
                title_en=p['title_en'],
                defaults=p
            )
        self.stdout.write(self.style.SUCCESS(f'Seeded {len(projects_data)} projects.'))

        # 5. Seed Testimonials
        testimonials_data = [
            {
                'client_name_fa': 'علیرضا حسینی',
                'client_name_en': 'Alireza Hosseini',
                'client_company_fa': 'فناوری اطلاعات فردا',
                'client_company_en': 'Farda IT Corp',
                'feedback_fa': 'تیم C0 فوق‌العاده حرفه‌ای و وقت‌شناس هستند. وبسایت ما دقیقاً طبق نیازمندی‌ها و با ظرافت خاصی پیاده شد.',
                'feedback_en': 'C0 Team is highly professional and punctual. Our website was built exactly according to specifications with excellent craftsmanship.',
                'rating': 5,
                'approved': True
            },
            {
                'client_name_fa': 'مهسا احمدی',
                'client_name_en': 'Mahsa Ahmadi',
                'client_company_fa': 'فروشگاه آنلاین شیک‌پوش',
                'client_company_en': 'ShikPoosh Online Shop',
                'feedback_fa': 'توسعه اپلیکیشن موبایل ما توسط این تیم انجام شد. پشتیبانی عالی و کیفیت کد بسیار بالا بود.',
                'feedback_en': 'They developed our mobile application. Great support and extremely high code quality.',
                'rating': 5,
                'approved': True
            }
        ]

        for t in testimonials_data:
            Testimonial.objects.get_or_create(
                client_name_fa=t['client_name_fa'],
                client_name_en=t['client_name_en'],
                defaults=t
            )
        self.stdout.write(self.style.SUCCESS(f'Seeded {len(testimonials_data)} testimonials.'))

        # 6. Seed Blog Articles
        articles_data = [
            {
                'title_fa': 'چرا ری‌اکت در سال ۲۰۲۶ همچنان پادشاه فرانت‌اند است؟',
                'title_en': 'Why React remains the King of Frontend in 2026',
                'content_fa': 'ری‌اکت با تغییرات و بهبودهای مداوم خود مثل React Compiler و معماری سرور کامپوننت، توانسته محبوبیت خود را در بین توسعه‌دهندگان حفظ کند...',
                'content_en': 'React continues to dominate frontend web development due to its rich ecosystem, performance optimizations, and the long-awaited React Compiler...',
                'author': admin_user,
                'tags': ['React', 'Frontend', 'Web Development'],
                'slug': 'why-react-remains-king-2026'
            },
            {
                'title_fa': 'نقش هوش مصنوعی در آینده برنامه‌نویسی',
                'title_en': 'The Role of AI in the Future of Programming',
                'content_fa': 'امروزه ابزارهای هوش مصنوعی به برنامه‌نویسان کمک می‌کنند تا کدهای بهینه‌تر و سریع‌تری بنویسند، اما آیا هوش مصنوعی جایگزین انسان خواهد شد؟',
                'content_en': 'AI coding assistants are helping developers write cleaner, safer code faster. But will AI completely replace human programmers? Let\'s analyze...',
                'author': admin_user,
                'tags': ['AI', 'Programming', 'Machine Learning'],
                'slug': 'role-of-ai-in-future-programming'
            }
        ]

        for a in articles_data:
            Article.objects.get_or_create(
                slug=a['slug'],
                defaults=a
            )
        self.stdout.write(self.style.SUCCESS(f'Seeded {len(articles_data)} articles.'))

        # 7. Seed Site Settings
        settings_data = [
            {
                'key': 'general',
                'value': {
                    'logoText': 'C0 Team',
                    'email': 'info@c0team.com',
                    'phone': '+98 912 345 6789',
                    'address_fa': 'تهران، میدان ونک، برج نگار',
                    'address_en': 'Negar Tower, Vanak Sq, Tehran',
                    'socials': {
                        'github': 'https://github.com',
                        'linkedin': 'https://linkedin.com',
                        'instagram': 'https://instagram.com'
                    }
                }
            },
            {
                'key': 'homepage',
                'value': {
                    'logoText': 'C0 Team',
                    'hero': {
                        'title_fa_1': 'ما ایده‌های شما را به',
                        'title_fa_2': 'کدهای قدرتمند',
                        'title_fa_3': 'تبدیل می‌کنیم',
                        'title_en_1': 'We turn your ideas into',
                        'title_en_2': 'Powerful Code',
                        'title_en_3': '',
                        'subtitle_fa': 'تیم برنامه‌نویسی C0 متشکل از متخصصین با انگیزه، آماده توسعه وب‌سایت‌ها، اپلیکیشن‌های موبایل و سیستم‌های مبتنی بر هوش مصنوعی با بالاترین کیفیت و امنیت.',
                        'subtitle_en': 'C0 Team consists of passionate developers and designers ready to build robust web systems, mobile applications, and AI integrations with premium quality.',
                        'contactBtn_fa': 'مشاوره رایگان / همکاری',
                        'contactBtn_en': 'Get Free Consultation',
                        'portfolioBtn_fa': 'مشاهده نمونه‌کارها',
                        'portfolioBtn_en': 'View Portfolio'
                    },
                    'sections': {
                        'services_title_fa': 'خدمات ما',
                        'services_title_en': 'Our Services',
                        'services_subtitle_fa': 'توانمندی‌ها و تخصص‌های تیم ما در راستای رشد کسب‌وکار شما',
                        'services_subtitle_en': 'Professional capabilities tailored to accelerate your business growth',
                        'portfolio_title_fa': 'پروژه‌های ما',
                        'portfolio_title_en': 'Our Work',
                        'portfolio_subtitle_fa': 'برخی از آخرین کارهای انجام شده توسط تیم برنامه‌نویسی C0',
                        'portfolio_subtitle_en': 'Explore some of the recent projects successfully developed by C0 Team',
                        'team_title_fa': 'اعضای تیم ما',
                        'team_title_en': 'Meet the Team',
                        'team_subtitle_fa': 'متخصصان مجرب و خلاقی که در کنار شما هستند',
                        'team_subtitle_en': 'Creative developers and designers dedicated to your success',
                        'testimonials_title_fa': 'نظرات مشتریان',
                        'testimonials_title_en': 'What Clients Say',
                        'testimonials_subtitle_fa': 'رضایت و تجربه مشتریان گرامی از همکاری با ما',
                        'testimonials_subtitle_en': 'Honest reviews and testimonials from our collaborative partners',
                        'blog_title_fa': 'آخرین مقالات بلاگ',
                        'blog_title_en': 'Latest Insights',
                        'blog_subtitle_fa': 'نوشته‌های آموزشی و اخبار حوزه فناوری اطلاعات',
                        'blog_subtitle_en': 'Tech news, development tutorials, and updates from C0 Team',
                        'contact_title_fa': 'تماس با ما',
                        'contact_title_en': 'Contact Us',
                        'contact_subtitle_fa': 'پاسخگوی سوالات شما هستیم؛ فرم زیر را پر کنید تا با شما تماس بگیریم',
                        'contact_subtitle_en': 'Got a project in mind? Drop us a line and let\'s build it together'
                    },
                    'video': {
                        'enabled': True,
                        'url': '',
                        'opacity': 0.15,
                        'blur': 3.0,
                        'overlayDarkness': 0.7
                    }
                }
            }
        ]

        for s in settings_data:
            SiteSetting.objects.get_or_create(
                key=s['key'],
                defaults=s
            )
        self.stdout.write(self.style.SUCCESS(f'Seeded site settings.'))
        self.stdout.write(self.style.SUCCESS('Database seeding completed successfully!'))
