from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.conf import settings
from rest_framework.routers import DefaultRouter
from api.views.media import MediaViewSet
from api.views.event import EventViewSet
from frontend.views import index

router = DefaultRouter()
router.register(r'media', MediaViewSet, basename='media')
router.register(r'events', EventViewSet, basename='event')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + [
    re_path(r'^(?!api/).*$', index),  # Exclude paths starting with 'api/' from being routed to 'index'
]
