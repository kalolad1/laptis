from typing import List

from django.db import models
from django.contrib.postgres.fields import ArrayField


class CenterType(models.TextChoices):
    DETOX: str = "detox"
    CLINICAL_STABILIZATION_SERVICES: str = "clinical stabilization services"
    TRANSITIONAL_SUPPORT_SERVICES: str = "transitional support services"
    RESIDENTIAL: str = "residential"


# ArrayField defaults
class Sex(models.TextChoices):
    MALE: str = "male"
    FEMALE: str = "female"


def get_eligible_sex_default() -> List[str]:
    return ["male", "female"]


def get_eligible_medications_default() -> List[str]:
    return ["methadone"]


def get_eligible_mental_health_diagnoses_default() -> List[str]:
    return ["depression", "anxiety", "ADHD"]


def get_eligible_health_insurances_default() -> List[str]:
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

    def __str__(self) -> str:
        return self.name
