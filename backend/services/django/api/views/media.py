from rest_framework.views import APIView
from rest_framework.response import Response
from api.models.category import Category
from api.models.subcategory import SubCategory
from api.models.media import Media

class GroupedMediaAPIView(APIView):
    def get(self, request):
        
        grouped = []

        categories = Category.objects.all().order_by('order', 'id')

        for category in categories:
            cat_data = {
                "category": category.name,                
                "subcategories": []
            }

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
                            "image": f"{request.scheme}://{request.get_host()}/{item.media}"

                        }
                        for item in media_items 
                    ]
                })

            grouped.append(cat_data)

        return Response(grouped)
