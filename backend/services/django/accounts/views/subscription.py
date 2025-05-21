from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from ..permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema
from ..models.subscription import Subscription
from ..serializers.subscription import SubscriptionSerializer
from ..models.license import License
from django.db.models import Count

@extend_schema(tags=['Subscription'])
class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'], url_path='active')
    def get_active_subscriptions(self, request):
        active_subscriptions = self.queryset.filter(is_active=True)
        serializer = self.get_serializer(active_subscriptions, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path='current')
    def subscriptions(self, request):
        subscriptions = Subscription.objects.annotate(license_count=Count('licenses'))
        data = [
            {
                **SubscriptionSerializer(sub).data,
                'license_count': sub.license_count
            }
            for sub in subscriptions
        ]
        return Response(data)