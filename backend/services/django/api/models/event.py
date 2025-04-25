from django.db import models


class EventMedia(models.Model):
    media = models.FileField(upload_to='media/', default=None)
    media_type = models.CharField(max_length=50,default=None, choices=[('image', 'Image (png, jpg, webp, gif)'), ('video', 'Video')])
    event = models.ForeignKey('Event', related_name='events', on_delete=models.CASCADE, default=None)
    REQUIRED_FIELDS = ['media_type']

    def __str__(self):
        return self.media_type


class Event(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateField(default=None)

    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.name