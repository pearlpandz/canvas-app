from django.urls import path
from api.views.media import GroupedMediaAPIView

urlpatterns = [
     path('media/grouped', GroupedMediaAPIView.as_view(), name='grouped-media'),
]