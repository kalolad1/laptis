from django.db.models import QuerySet

from .models.application import PatientApplicationContext
from .models.user import User
from .models.center import Center


class CenterFilterer:
    def __init__(
        self, user: User, patient_application_context: PatientApplicationContext
    ) -> None:
        self.user = user
        self.patient_application_context = patient_application_context

    def get_centers(self) -> QuerySet[Center]:
        # Is the patient's sex eligible for the center?
        centers = Center.objects.filter(
            eligible_sexes__contains=[self.user.patient.sex]
        )

        # Is the patient's age eligible for the center?
        centers = centers.filter(eligible_age_minimum__lte=self.user.patient.age)
        centers = centers.filter(eligible_age_maximum__gte=self.user.patient.age)

        # Are the patient's medications eligible with the center?
        mat = self.user.patient.using_medication_assisted_therapies
        centers = centers.filter(eligible_medications__contains=mat)

        # Are the patient's mental diagnoses eligible with the center?
        mhd = self.user.patient.mental_health_diagnoses
        centers = centers.filter(eligible_mental_health_diagnoses__contains=mhd)

        # Is the patient's health insurance accepted by the center?
        centers = centers.filter(
            eligible_health_insurances__contains=[self.user.patient.health_insurance]
        )

        # Is the patient's mobility compatible with the center?
        if self.user.patient.has_disability:
            centers = centers.exclude(is_disability_compatible=False)

        # Is the patient open to faith-based treatment?
        if not self.user.patient.is_open_to_faith_based_treatment:
            centers = centers.exclude(is_faith_based_treatment=True)

        return centers
