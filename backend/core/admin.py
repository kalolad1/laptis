from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models.center import Center
from .models.user import User

admin.site.register(Center)
admin.site.register(User, UserAdmin)
