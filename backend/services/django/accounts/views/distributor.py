from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from drf_spectacular.utils import extend_schema
from ..models.distributor import Distributor
from ..serializers.distributor import DistributorSerializer
from ..permissions import IsAuthenticated

@extend_schema(tags=['Distributor'])
class DistributorViewSet(viewsets.ModelViewSet):
    queryset = Distributor.objects.select_related('created_by', 'verified_by').all()
    serializer_class = DistributorSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'], url_path='verified')
    def get_verified_distributors(self, request):
        verified_distributors = self.queryset.filter(is_verified=True)
        serializer = self.get_serializer(verified_distributors, many=True)
        return Response(serializer.data)
