import os

from rest_framework import serializers

from .models.application import PatientApplicationContext
from .models.center import Center
from .models.user import Patient, User


class UserSerializer(serializers.ModelSerializer[User]):
    def get_first_name(self, user):
        if user.is_provider:
            return user.provider.first_name
        elif user.is_patient:
            return user.patient.first_name

        assert False

    def get_last_name(self, user):
        if user.is_provider:
            return user.provider.last_name
        elif user.is_patient:
            return user.patient.last_name

        assert False

    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["first_name", "last_name", "id"]


class CenterSerializer(serializers.ModelSerializer[Center]):
    def get_image(self, center: Center) -> str:
        """Removes query parameters from image URL

        The image URL, if stored on S3, has query parameters appended to it,
        which are not needed. Keeping them on the URL prohibits image retrieval
        (probably because the incorrect signature is added as a query parameter).
        """
        if os.environ.get("USE_S3") == "TRUE":
            return center.image.url.split("?")[0]
        else:
            return center.image.url

    # image = serializers.SerializerMethodField()
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
