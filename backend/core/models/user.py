import random
import string
from typing import List

from django.contrib.auth.models import UserManager
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField
from django.db import models


class CustomUserManager(UserManager["User"]):
    def _generate_random_string(self) -> str:
        return "".join(random.choice(string.ascii_letters) for _ in range(12))

    def create_patient(
        self,
        first_name: str,
        last_name: str,
        age: int,
        sex: str,
        address: str,
        using_medication_assisted_therapies: List[str],
        using_substances: List[str],
        mental_health_diagnoses: List[str],
        health_insurance: str,
        health_insurance_identifier: str,
        has_disability: bool,
        is_open_to_faith_based_treatment: bool,
    ) -> "User":
        # Randomize username, email, and password for now as patients
        # don't need this right away.
        username = self._generate_random_string()
        email = self._generate_random_string() + "@example.com"
        password = self._generate_random_string()

        user = User.objects.create(username=username, email=email)
        user.is_patient = True
        user.set_password(password)
        user.save()

        Patient.objects.create(
            user=user,
            first_name=first_name,
            last_name=last_name,
            age=age,
            sex=sex,
            address=address,
            using_medication_assisted_therapies=using_medication_assisted_therapies,
            using_substances=using_substances,
            mental_health_diagnoses=mental_health_diagnoses,
            health_insurance=health_insurance,
            health_insurance_identifier=health_insurance_identifier,
            has_disability=has_disability,
            is_open_to_faith_based_treatment=is_open_to_faith_based_treatment,
        )

        return user

    def create_superuser(self, username, email, password):
        user = super().create_superuser(username, email, password)
        user.save()
        return user


class User(AbstractUser):
    is_patient = models.BooleanField(default=False)

    objects = CustomUserManager()  # type: ignore


class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    first_name = models.CharField(max_length=200, default="")
    last_name = models.CharField(max_length=200, default="")
    sex = models.CharField(max_length=200, default="")
    age = models.IntegerField(default=-1)
    address = models.CharField(max_length=200, default="")

    using_medication_assisted_therapies = ArrayField(
        models.CharField(max_length=200), default=list
    )
    using_substances = ArrayField(models.CharField(max_length=200), default=list)
    mental_health_diagnoses = ArrayField(models.CharField(max_length=200), default=list)

    health_insurance = models.CharField(max_length=200, default="")
    health_insurance_identifier = models.CharField(max_length=200, default="")
    has_disability = models.BooleanField(default=False)
    is_open_to_faith_based_treatment = models.BooleanField(default=False)
