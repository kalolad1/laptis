from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.contrib.postgres.fields import ArrayField
from django.db import models

from typing import List

class User(AbstractUser):
    pass


class CenterType(models.TextChoices):
    DETOX = "detox"
    CLINICAL_STABILIZATION_SERVICES = "clinical stabilization services"
    TRANSITIONAL_SUPPORT_SERVICES = "transitional support services"
    RESIDENTIAL = "residential"


# ArrayField defaults
class Sex(models.TextChoices):
    MALE = "male"
    FEMALE = "female"


def get_eligible_sex_default():
    return ["male", "female"]


def get_eligible_medications_default():
    return ["methadone"]


def get_eligible_mental_health_diagnoses_default():
    return ["depression", "anxiety", "ADHD"]


def get_eligible_health_insurances_default():
    return ["MassHealth", "Blue Cross"]


class Center(models.Model):
    name = models.CharField(max_length=200, default="")
    address = models.CharField(max_length=200, default="")

    center_type = models.CharField(
        max_length=200, choices=CenterType.choices, default=CenterType.RESIDENTIAL
    )
    image = models.ImageField(upload_to="centers/images/", blank=True)
    phone_number = models.CharField(max_length=200, default="")
    website = models.CharField(max_length=200, default="")

    eligible_sexes = ArrayField(
        models.CharField(max_length=200, choices=Sex.choices),
        default=get_eligible_sex_default,
    )

    eligible_age_minimum = models.IntegerField(default=1)
    eligible_age_maximum = models.IntegerField(default=9999)

    eligible_medications = ArrayField(
        models.CharField(max_length=200), default=get_eligible_medications_default
    )

    eligible_mental_health_diagnoses = ArrayField(
        models.CharField(max_length=200),
        default=get_eligible_mental_health_diagnoses_default,
    )

    eligible_health_insurances = ArrayField(
        models.CharField(max_length=200), default=get_eligible_health_insurances_default
    )

    is_disability_compatible = models.BooleanField(default=True)
    is_faith_based_treatment = models.BooleanField(default=False)

    def __str__(self):
        return self.name
