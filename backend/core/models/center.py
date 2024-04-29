from typing import List

from django.db import models
from django.contrib.postgres.fields import ArrayField


class CenterType(models.TextChoices):
    DETOX: str = "detox"
    CLINICAL_STABILIZATION_SERVICES: str = "clinical stabilization services"
    TRANSITIONAL_SUPPORT_SERVICES: str = "transitional support services"
    RESIDENTIAL_REHABILITATION: str = "residential rehabilitation"
    OUTPATIENT_REHAB: str = "outpatient rehab"
    MULTIPLE_OUTPATIENT: str = "multiple outpatient"
    DUAL_DIAGNOSIS: str = "dual diagnosis"
    BOAT: str = "BOAT"
    PHP: str = "PHP"


# ArrayField defaults
class Sex(models.TextChoices):
    MALE: str = "male"
    FEMALE: str = "female"
    OTHER: str = "other"


def get_eligible_sex_default() -> List[str]:
    return ["male", "female", "other"]


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
        max_length=200,
        choices=CenterType.choices,
        default=CenterType.RESIDENTIAL_REHABILITATION,
    )
    image = models.FileField(upload_to="centers/images/", blank=True)
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

    accepts_patients_with_co_occuring_disorders = models.BooleanField(default=False)
    accepts_patients_on_methadone = models.BooleanField(default=False)
    accepts_patients_who_are_pregnant = models.BooleanField(default=False)
    accepts_patients_with_disabilities = models.BooleanField(default=False)
    accepts_patients_who_are_uninsured = models.BooleanField(default=False)

    is_faith_based_treatment = models.BooleanField(default=False)

    available_beds = models.IntegerField(default=0)

    def __str__(self) -> str:
        return self.name
