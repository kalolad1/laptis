from rest_framework import serializers

from .models import Center


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
