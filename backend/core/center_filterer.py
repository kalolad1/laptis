from django.db.models import QuerySet

from .models.application import PatientApplicationContext
from .models.user import User
from .models.center import Center


class CenterFilterer:
    def __init__(
        self, user: User, patient_application_context: PatientApplicationContext
    ) -> None:
        self._user = user
        self._patient_application_context = patient_application_context

    def get_centers(self) -> QuerySet[Center]:
        # Is the patient's sex eligible for the center?
        centers = Center.objects.filter(
            eligible_sexes__contains=[self._user.patient.sex]
        )

        # Is the patient's age eligible for the center?
        centers = centers.filter(eligible_age_minimum__lte=self._user.patient.age)
        centers = centers.filter(eligible_age_maximum__gte=self._user.patient.age)

        # Are the patient's medications eligible with the center?
        mat = self._user.patient.using_medication_assisted_therapies
        centers = centers.filter(eligible_medications__contains=mat)

        # Are the patient's mental diagnoses eligible with the center?
        mhd = self._user.patient.mental_health_diagnoses
        centers = centers.filter(eligible_mental_health_diagnoses__contains=mhd)

        # Is the patient's health insurance accepted by the center?
        centers_accepting_all_insurance = centers.filter(
            eligible_health_insurances__contains=["All insurance"]
        )
        centers = centers.filter(
            eligible_health_insurances__contains=[self._user.patient.health_insurance]
        )

        centers = centers | centers_accepting_all_insurance

        # Is the patient's mobility compatible with the center?
        if self._user.patient.has_disability:
            centers = centers.exclude(accepts_patients_with_disabilities=False)

        # Is the patient open to faith-based treatment?
        if not self._user.patient.is_open_to_faith_based_treatment:
            centers = centers.exclude(is_faith_based_treatment=True)

        return centers
