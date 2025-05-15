from django.db import models

class MasterDistributor(models.Model):
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    email = models.EmailField(unique=True)
    mobile_number = models.CharField(max_length=15, unique=True)
    password = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now_add=True)
    is_verified = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"