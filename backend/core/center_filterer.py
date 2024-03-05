from typing import Dict, Any

from .models import Center


class CenterFilterer:
    def __init__(self, patient_context: Dict[str, Any]):
        self.sex = patient_context["sex"]
        self.age = patient_context["age"]

        self.street_address = patient_context["streetAddress"]
        self.city = patient_context["city"]
        self.state = patient_context["state"]
        self.country = patient_context["country"]
        self.zip_code = patient_context["zipCode"]

        self.medication_assisted_therapy = patient_context[
            "medicationAssistedTherapy"
        ].split(",")
        self.substance_use = patient_context["substanceUse"].split(",")
        self.mental_health_diagnoses = patient_context["mentalHealthDiagnoses"].split(
            ","
        )
        self.suicidal_ideation = (
            True if patient_context["suicidalIdeation"] == "yes" else False
        )

        self.health_insurance = patient_context["healthInsurance"]
        self.health_insurance_identifier = patient_context["healthInsuranceIdentifier"]

        self.has_disability = (
            True if patient_context["hasDisability"] == "yes" else False
        )
        self.is_open_to_faith_based_treatment = (
            True if patient_context["isOpenToFaithBasedTreatment"] == "yes" else False
        )

    def get_centers(self):
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
