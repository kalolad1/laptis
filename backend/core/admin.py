from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models.center import Center
from .models.user import Patient, User
from .models.application import PatientApplicationContext

admin.site.register(Center)
admin.site.register(User, UserAdmin)
admin.site.register(Patient)
admin.site.register(PatientApplicationContext)
