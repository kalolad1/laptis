from django.db import models
from .user import User
from .center import Center


class PatientApplicationContext(models.Model):
    patient_application_context_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    has_had_suicidal_thoughts_in_last_90_days = models.BooleanField(default=False)
    has_used_drugs_in_last_90_days = models.BooleanField(default=False)


class Application(models.Model):
    application_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    center = models.ForeignKey(Center, on_delete=models.CASCADE)
    patient_application_context = models.ForeignKey(
        PatientApplicationContext, on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=200, default="pending")
