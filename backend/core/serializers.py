from rest_framework import serializers

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
    class Meta:
        model = Patient
        fields = ["first_name", "last_name", "age"]
