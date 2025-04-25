from django.urls import path
from api.views.media import GroupedMediaAPIView
from .views.event import EventListView, EventViewSet

urlpatterns = [
     path('media/grouped', GroupedMediaAPIView.as_view(), name='grouped-media'),
     path('events/<dd-mm-yyyy:date>/', EventListView.as_view(), name='event-list-by-date'),
]