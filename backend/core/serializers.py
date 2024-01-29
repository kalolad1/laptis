from rest_framework import serializers
from .models import Center


class CenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Center
        fields = ["name", "address", "center_type", "image"]
