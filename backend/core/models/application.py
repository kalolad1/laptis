from django.db import models
from .user import User


class PatientApplicationContext(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    has_had_suicidal_thoughts_in_last_90_days = models.BooleanField(default=False)
    has_used_drugs_in_last_90_days = models.BooleanField(default=False)
    patient_application_context_id = models.AutoField(primary_key=True)
