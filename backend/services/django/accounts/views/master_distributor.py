from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema
from ..models.master_distributor import MasterDistributor
from ..serializers.master_distributor import MasterDistributorSerializer

@extend_schema(tags=['Master Distributor'])
class MasterDistributorViewSet(viewsets.ModelViewSet):
    queryset = MasterDistributor.objects.all()
    serializer_class = MasterDistributorSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'], url_path='verified')
    def get_verified_distributors(self, request):
        verified_distributors = self.queryset.filter(is_verified=True)
        serializer = self.get_serializer(verified_distributors, many=True)
        return Response(serializer.data)