from .models import Center


class CenterFilterer:
    def __init__(self, patient_context):
        self.sex = patient_context["sex"]
        self.date_of_birth = patient_context["dateOfBirth"]

        self.street_address = patient_context["streetAddress"]
        self.city = patient_context["city"]
        self.state = patient_context["state"]
        self.country = patient_context["country"]
        self.zip_code = patient_context["zipCode"]

        self.medication_assisted_therapy = patient_context["medicationAssistedTherapy"]
        self.substance_use = patient_context["substanceUse"]
        self.mental_health_diagnoses = patient_context["mentalHealthDiagnoses"]
        self.suicidal_ideation = patient_context["suicidalIdeation"]

        self.health_insurance = patient_context["healthInsurance"]
        self.health_insurance_identifier = patient_context["healthInsuranceIdentifier"]

        self.mobility_restrictions = patient_context["mobilityRestrictions"]
        self.faith_based_treatment = patient_context["faithBasedTreatment"]

    def get_centers(self):
        print("GETTING CENTERS")
        Center.objects.all()
        return None
