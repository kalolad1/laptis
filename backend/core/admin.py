from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from .models import Center, User

admin.site.register(Center)
admin.site.register(User, UserAdmin)