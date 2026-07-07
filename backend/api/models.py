from django.db import models
from django.contrib.auth.models import User

class TeamMember(models.Model):
    name_fa = models.CharField(max_length=150, verbose_name="نام (فارسی)")
    name_en = models.CharField(max_length=150, verbose_name="Name (English)")
    role_fa = models.CharField(max_length=150, verbose_name="نقش (فارسی)")
    role_en = models.CharField(max_length=150, verbose_name="Role (English)")
    bio_fa = models.TextField(verbose_name="بیوگرافی (فارسی)", blank=True, null=True)
    bio_en = models.TextField(verbose_name="Bio (English)", blank=True, null=True)
    avatar = models.ImageField(upload_to="avatars/", blank=True, null=True, verbose_name="تصویر پروفایل")
    github_url = models.URLField(blank=True, null=True, verbose_name="لینک گیت‌هاب")
    linkedin_url = models.URLField(blank=True, null=True, verbose_name="لینک لینکدین")
    order = models.IntegerField(default=0, verbose_name="ترتیب نمایش")

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "عضو تیم"
        verbose_name_plural = "اعضای تیم"

    def __str__(self):
        return f"{self.name_fa} ({self.role_en})"


class Project(models.Model):
    CATEGORY_CHOICES = [
        ('web', 'وبسایت / Web App'),
        ('mobile', 'اپلیکیشن موبایل / Mobile App'),
        ('ai', 'هوش مصنوعی / AI & Data Science'),
        ('design', 'طراحی و رابط کاربری / UI/UX Design'),
        ('other', 'سایر / Other'),
    ]

    title_fa = models.CharField(max_length=200, verbose_name="عنوان (فارسی)")
    title_en = models.CharField(max_length=200, verbose_name="Title (English)")
    description_fa = models.TextField(verbose_name="توضیحات کوتاه (فارسی)")
    description_en = models.TextField(verbose_name="Short Description (English)")
    long_description_fa = models.TextField(verbose_name="توضیحات کامل (فارسی)", blank=True, null=True)
    long_description_en = models.TextField(verbose_name="Long Description (English)", blank=True, null=True)
    image = models.ImageField(upload_to="projects/", blank=True, null=True, verbose_name="تصویر پروژه")
    tech_stack = models.JSONField(default=list, verbose_name="تکنولوژی‌های استفاده شده")
    demo_url = models.URLField(blank=True, null=True, verbose_name="لینک دمو")
    github_url = models.URLField(blank=True, null=True, verbose_name="لینک سورس‌کد")
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='web', verbose_name="دسته‌بندی")
    order = models.IntegerField(default=0, verbose_name="ترتیب نمایش")
    featured = models.BooleanField(default=False, verbose_name="پروژه ویژه")

    class Meta:
        ordering = ['order', '-id']
        verbose_name = "پروژه"
        verbose_name_plural = "پروژه‌ها"

    def __str__(self):
        return self.title_fa


class Service(models.Model):
    title_fa = models.CharField(max_length=150, verbose_name="عنوان خدمت (فارسی)")
    title_en = models.CharField(max_length=150, verbose_name="Service Title (English)")
    description_fa = models.TextField(verbose_name="توضیحات (فارسی)")
    description_en = models.TextField(verbose_name="Description (English)")
    icon = models.CharField(max_length=50, default="Code", verbose_name="نام آیکون (Lucide)")
    price_fa = models.CharField(max_length=100, blank=True, null=True, verbose_name="قیمت (فارسی)")
    price_en = models.CharField(max_length=100, blank=True, null=True, verbose_name="Price (English)")
    order = models.IntegerField(default=0, verbose_name="ترتیب نمایش")

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "خدمت"
        verbose_name_plural = "خدمات"

    def __str__(self):
        return self.title_fa


class Article(models.Model):
    title_fa = models.CharField(max_length=250, verbose_name="عنوان مقاله (فارسی)")
    title_en = models.CharField(max_length=250, verbose_name="Article Title (English)")
    content_fa = models.TextField(verbose_name="محتوا (فارسی)")
    content_en = models.TextField(verbose_name="Content (English)")
    cover_image = models.ImageField(upload_to="blog/", blank=True, null=True, verbose_name="تصویر کاور")
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name="نویسنده")
    tags = models.JSONField(default=list, verbose_name="تگ‌ها")
    views_count = models.IntegerField(default=0, verbose_name="تعداد بازدید")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ایجاد")
    slug = models.SlugField(max_length=250, unique=True, verbose_name="اسلاگ (URL-friendly)")

    class Meta:
        ordering = ['-created_at']
        verbose_name = "مقاله"
        verbose_name_plural = "مقالات"

    def __str__(self):
        return self.title_fa


class ContactMessage(models.Model):
    STATUS_CHOICES = [
        ('unread', 'خوانده نشده'),
        ('read', 'خوانده شده'),
    ]

    name = models.CharField(max_length=150, verbose_name="نام فرستنده")
    email = models.EmailField(verbose_name="ایمیل")
    subject = models.CharField(max_length=200, verbose_name="موضوع")
    message = models.TextField(verbose_name="متن پیام")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='unread', verbose_name="وضعیت")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ارسال")

    class Meta:
        ordering = ['-created_at']
        verbose_name = "پیام تماس"
        verbose_name_plural = "پیام‌های تماس"

    def __str__(self):
        return f"پیام از طرف {self.name} - {self.subject}"


class Testimonial(models.Model):
    client_name_fa = models.CharField(max_length=150, verbose_name="نام مشتری (فارسی)")
    client_name_en = models.CharField(max_length=150, verbose_name="Client Name (English)")
    client_company_fa = models.CharField(max_length=150, verbose_name="شرکت/برند مشتری (فارسی)", blank=True, null=True)
    client_company_en = models.CharField(max_length=150, verbose_name="Client Company (English)", blank=True, null=True)
    client_avatar = models.ImageField(upload_to="testimonials/", blank=True, null=True, verbose_name="تصویر مشتری")
    feedback_fa = models.TextField(verbose_name="بازخورد (فارسی)")
    feedback_en = models.TextField(verbose_name="Feedback (English)")
    rating = models.IntegerField(default=5, verbose_name="امتیاز (۱ تا ۵)")
    approved = models.BooleanField(default=False, verbose_name="تایید شده")

    class Meta:
        verbose_name = "نظر مشتری"
        verbose_name_plural = "نظرات مشتریان"

    def __str__(self):
        return f"{self.client_name_fa} - {self.client_company_fa or ''}"


class SiteSetting(models.Model):
    key = models.CharField(max_length=100, unique=True, verbose_name="کلید تنظیمات")
    value = models.JSONField(verbose_name="مقدار تنظیمات (JSON)")

    class Meta:
        verbose_name = "تنظیمات سایت"
        verbose_name_plural = "تنظیمات سایت"

    def __str__(self):
        return self.key
