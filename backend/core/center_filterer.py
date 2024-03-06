from typing import Any, Dict, List

from django.db.models import QuerySet

from .models import Center


class CenterFilterer:
    def __init__(self, patient_context: Dict[str, Any]) -> None:
        self.sex: str = patient_context["sex"]
        self.age: int = patient_context["age"]

        self.street_address: str = patient_context["street_address"]
        self.city: str = patient_context["city"]
        self.state: str = patient_context["state"]
        self.country: str = patient_context["country"]
        self.zip_code: str = patient_context["zip_code"]

        self.medication_assisted_therapy: List[str] = patient_context[
            "medication_assisted_therapy"
        ].split(",")
        self.substance_use: List[str] = patient_context["substance_use"].split(",")
        self.mental_health_diagnoses: List[str] = patient_context[
            "mental_health_diagnoses"
        ].split(",")
        self.suicidal_ideation: bool = (
            True if patient_context["suicidal_ideation"] == "yes" else False
        )

        self.health_insurance: str = patient_context["health_insurance"]
        self.health_insurance_identifier: str = patient_context[
            "health_insurance_identifier"
        ]

        self.has_disability: bool = (
            True if patient_context["has_disability"] == "yes" else False
        )
        self.is_open_to_faith_based_treatment: bool = (
            True
            if patient_context["is_open_to_faith_based_treatment"] == "yes"
            else False
        )

    def get_centers(self) -> QuerySet[Center]:
        # Is the patient's sex eligible for the center?
        centers = Center.objects.filter(eligible_sexes__contains=[self.sex])

        # Is the patient's age eligible for the center?
        centers = centers.filter(eligible_age_minimum__lte=self.age)
        centers = centers.filter(eligible_age_maximum__gte=self.age)

        # Are the patient's medications eligible with the center?
        centers = centers.filter(
            eligible_medications__contains=self.medication_assisted_therapy
        )

        # Are the patient's mental diagnoses eligible with the center?
        centers = centers.filter(
            eligible_mental_health_diagnoses__contains=self.mental_health_diagnoses
        )

        # Is the patient's health insurance accepted by the center?
        centers = centers.filter(
            eligible_health_insurances__contains=[self.health_insurance]
        )

        # Is the patient's mobility compatible with the center?
        if self.has_disability:
            centers = centers.exclude(is_disability_compatible=False)

        # Is the patient open to faith-based treatment?
        if not self.is_open_to_faith_based_treatment:
            centers = centers.exclude(is_faith_based_treatment=True)

        return centers
