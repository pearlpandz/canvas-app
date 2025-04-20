from django.contrib import admin
from django.utils.html import format_html
from api.models.category import Category
from api.models.subcategory import SubCategory
from api.models.media import Media

class SubCategoryInline(admin.StackedInline):
    model = SubCategory
    extra = 0

@admin.register(Category)
class CategoryAdminConfig(admin.ModelAdmin):
    exclude = []
    list_display = ['id','name', 'subcategories_list', 'order']
    search_fields=['name']
    list_filter=['name']
    # actions=[make_inactive,make_active]
    list_per_page = 10
    sortable_by=['id','name']
    ordering = ['order', 'id']
    inlines = [SubCategoryInline]

    def subcategories_list(self, obj):
        subcats = obj.subcategories.all()
        if not subcats:
            return "-"
        return ", ".join(subcat.name for subcat in subcats)
    
    subcategories_list.short_description = "Subcategories"

@admin.register(Media)
class MediaAdminConfig(admin.ModelAdmin):
    list_display = ('image_tag', 'title',)
    filter_horizontal = ('categories', 'subcategories')  # Nice UI for multi-select

    def image_tag(self, obj):
        if obj.media:
            return format_html('<img src="{}" width="60" height="60" style="object-fit:cover;border-radius:4px;" />', obj.media.url)
        return "-"
    
    image_tag.short_description = 'Image'