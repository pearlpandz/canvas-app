from django.db import models
from django.conf import settings

class Distributor(models.Model):
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    email = models.EmailField(unique=True)
    mobile_number = models.CharField(max_length=15, unique=True)
    password = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now_add=True)
    is_verified = models.BooleanField(default=True)
    created_by = models.ForeignKey(
        'accounts.MasterDistributor', on_delete=models.CASCADE, related_name='created_distributors', null=True, blank=True
    )
    verified_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='verified_distributors'
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name}"