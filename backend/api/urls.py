from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet, TeamMemberViewSet, ProjectViewSet, ServiceViewSet,
    ArticleViewSet, ContactMessageViewSet, TestimonialViewSet, SiteSettingViewSet,
    DashboardStatsView
)

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'members', TeamMemberViewSet, basename='member')
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'services', ServiceViewSet, basename='service')
router.register(r'articles', ArticleViewSet, basename='article')
router.register(r'messages', ContactMessageViewSet, basename='message')
router.register(r'testimonials', TestimonialViewSet, basename='testimonial')
router.register(r'settings', SiteSettingViewSet, basename='setting')

urlpatterns = [
    path('dashboard/stats/', DashboardStatsView.as_view(), name='dashboard-stats'),
    path('', include(router.urls)),
]
