from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models.center import Center
from .models.user import Patient, Provider, User
from .models.application import Application, PatientApplicationContext


class CenterAdmin(admin.ModelAdmin):
    readonly_fields = ("id",)


admin.site.register(Center, CenterAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Patient)
admin.site.register(Provider)
admin.site.register(PatientApplicationContext)
admin.site.register(Application)
