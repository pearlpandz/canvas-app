from django.contrib import admin
from .models import User, Subscription, License, Distributor, MasterDistributor

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'mobile_number', 'is_verified', 'date_joined')
    search_fields = ('email', 'mobile_number', 'first_name', 'last_name')
    list_filter = ('is_verified', 'date_joined')

@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'duration_days', 'created_at', 'updated_at')
    search_fields = ('name',)
    list_filter = ('created_at', 'updated_at')

@admin.register(License)
class LicenseAdmin(admin.ModelAdmin):
    list_display = ('code', 'subscription', 'issued_to_distributor', 'issued_to_master_distributor', 'created_at')
    search_fields = ('code',)
    list_filter = ('created_at', 'subscription')

@admin.register(Distributor)
class DistributorAdmin(admin.ModelAdmin):
    list_display = ('first_name','last_name', 'email', 'mobile_number')
    search_fields = ('first_name','last_name', 'email', 'mobile_number')

@admin.register(MasterDistributor)
class MasterDistributorAdmin(admin.ModelAdmin):
    list_display = ('first_name','last_name', 'email', 'mobile_number')
    search_fields = ('first_name','last_name', 'email', 'mobile_number')
