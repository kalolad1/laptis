from rest_framework import serializers

from .models.application import PatientApplicationContext
from .models.center import Center
from .models.user import Patient


class CenterSerializer(serializers.ModelSerializer[Center]):
    class Meta:
        model = Center
        fields = [
            "name",
            "address",
            "center_type",
            "image",
            "id",
            "phone_number",
            "website",
            "eligible_health_insurances",
        ]


class PatientSerializer(serializers.ModelSerializer[Patient]):
    def get_placement_status(self, patient):
        return patient.get_placement_status_display()

    placement_status = serializers.SerializerMethodField()

    class Meta:
        model = Patient
        fields = ["first_name", "last_name", "age", "user_id", "placement_status"]


class PatientApplicationContextSerializer(
    serializers.ModelSerializer[PatientApplicationContext]
):
    class Meta:
        model = PatientApplicationContext
        fields = [
            "patient_application_context_id",
        ]
