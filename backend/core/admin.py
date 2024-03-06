from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Center, User

admin.site.register(Center)
admin.site.register(User, UserAdmin)
