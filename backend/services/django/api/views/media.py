from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from rest_framework.reverse import reverse

from api.models.category import Category
from api.models.subcategory import SubCategory
from api.models.media import Media

class MediaViewSet(ViewSet):
    def list(self, request):
        return Response({
            'grouped': request.build_absolute_uri(reverse('media-grouped', request=request)),
        })

    @action(detail=False, methods=['get'], url_path='grouped', url_name='grouped')
    def grouped(self, request):

        grouped = []

        categories = Category.objects.all().order_by('order', 'id')

        for category in categories:
            cat_data = {
                "category": category.name,                
                "subcategories": []
            }

            # Check if subcategories exist for the category
            media_items = Media.objects.filter(categories=category).distinct()[:10]  # limit to 10 items
            # If no subcategories, include media at the root level of the category
            if not SubCategory.objects.filter(category=category).exists():
                cat_data["media"] = [
                    {
                        "id": item.id,
                        "title": item.title,
                        "image": f"{request.scheme}://{request.get_host()}/uploads/{item.media}"
                    }
                    for item in media_items
                ]
                
            subcategories = SubCategory.objects.filter(category=category).order_by('name')

            for subcategory in subcategories:
                media_items = Media.objects.filter(
                    categories=category,
                    subcategories=subcategory
                ).distinct()[:10]  # limit to 10 items

                cat_data["subcategories"].append({
                    "name": subcategory.name,
                    "media": [
                        {
                            "id": item.id,
                            "title": item.title,
                            "image": f"{request.scheme}://{request.get_host()}/uploads/{item.media}"

                        }
                        for item in media_items 
                    ]
                })

            grouped.append(cat_data)

        return Response(grouped)
