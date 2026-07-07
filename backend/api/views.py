from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Sum
from django.contrib.auth.models import User

from .models import TeamMember, Project, Service, Article, ContactMessage, Testimonial, SiteSetting
from .serializers import (
    UserSerializer, TeamMemberSerializer, ProjectSerializer, ServiceSerializer,
    ArticleSerializer, ContactMessageSerializer, ContactMessageAdminSerializer,
    TestimonialSerializer, SiteSettingSerializer
)

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]


class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'

    def perform_create(self, serializer):
        # Automatically assign the logged-in user as author
        serializer.save(author=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Increment view count
        instance.views_count += 1
        instance.save(update_fields=['views_count'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    
    def get_serializer_class(self):
        if self.request.user and self.request.user.is_authenticated:
            return ContactMessageAdminSerializer
        return ContactMessageSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]


class TestimonialViewSet(viewsets.ModelViewSet):
    serializer_class = TestimonialSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        # Public users see only approved testimonials
        if self.request.user and self.request.user.is_authenticated:
            return Testimonial.objects.all()
        return Testimonial.objects.filter(approved=True)


class SiteSettingViewSet(viewsets.ModelViewSet):
    queryset = SiteSetting.objects.all()
    serializer_class = SiteSettingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'key'

    @action(detail=True, methods=['post'], url_path='upload-file')
    def upload_file(self, request, key=None):
        file_obj = request.FILES.get('file')
        if not file_obj:
            return Response({'error': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)
        
        ext = file_obj.name.split('.')[-1].lower()
        if ext not in ['mp4', 'webm', 'png', 'jpg', 'jpeg', 'svg']:
            return Response({'error': 'Unsupported file type'}, status=status.HTTP_400_BAD_REQUEST)
            
        import uuid
        from django.core.files.storage import default_storage
        from django.core.files.base import ContentFile
        
        filename = f"asset_{key}_{uuid.uuid4().hex[:8]}.{ext}"
        path = default_storage.save(f"settings/{filename}", ContentFile(file_obj.read()))
        url = default_storage.url(path)
        
        return Response({'url': url}, status=status.HTTP_200_OK)


class DashboardStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        total_projects = Project.objects.count()
        total_articles = Article.objects.count()
        total_members = TeamMember.objects.count()
        total_views = Article.objects.aggregate(Sum('views_count'))['views_count__sum'] or 0
        unread_messages = ContactMessage.objects.filter(status='unread').count()
        total_messages = ContactMessage.objects.count()
        pending_testimonials = Testimonial.objects.filter(approved=False).count()

        # Recent messages (last 5)
        recent_messages = ContactMessage.objects.order_by('-created_at')[:5]
        messages_serializer = ContactMessageAdminSerializer(recent_messages, many=True)

        return Response({
            'stats': {
                'projects': total_projects,
                'articles': total_articles,
                'members': total_members,
                'blog_views': total_views,
                'unread_messages': unread_messages,
                'total_messages': total_messages,
                'pending_testimonials': pending_testimonials,
            },
            'recent_messages': messages_serializer.data
        })
