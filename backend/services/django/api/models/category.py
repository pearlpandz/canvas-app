from django.db import models

class SubCategory(models.Model):
    name = models.CharField(max_length=255)
    category = models.ForeignKey('Category', related_name='subcategories', on_delete=models.CASCADE, default=None)

    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return f'{self.name}'

    def __unicode__(self):
        return str(self.name)

class Category(models.Model):
    name = models.CharField(max_length=255)
    order = models.IntegerField(default=1000)

    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return f'{self.name}'

    def __unicode__(self):
        return str(self.name)
    
class Media(models.Model):
    media = models.FileField(upload_to='media/', default=None)
    media_type = models.CharField(max_length=50,default=None, choices=[('image', 'Image (png, jpg, webp, gif)'), ('video', 'Video')])
    title = models.CharField(max_length=100)
    categories = models.ManyToManyField(Category, related_name='media', blank=True)
    subcategories = models.ManyToManyField(SubCategory, related_name='media', blank=True)

    REQUIRED_FIELDS = ['media', 'media_type', 'title', 'categories']

    def __str__(self):
        return self.title