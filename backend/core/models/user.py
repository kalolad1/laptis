import random
import string

from django.contrib.auth.models import UserManager
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField
from django.db import models


class CustomUserManager(UserManager["User"]):
    def _generate_random_string(self) -> str:
        return "".join(random.choice(string.ascii_letters) for _ in range(12))

    def create_patient(self, **fields) -> "User":
        # Randomize username, email, and password for now as patients
        # don't need this right away.
        email = self._generate_random_string() + "@example.com"
        password = self._generate_random_string()

        user = User.objects.create_user(
            username=email, email=email, password=password, is_patient=True
        )
        Patient.objects.create(user=user, **fields)
        return user

    def create_provider(self, email: str, password: str, **fields) -> "User":
        user = User.objects.create_user(
            username=email, email=email, password=password, is_provider=True
        )
        Provider.objects.create(user=user, **fields)
        return user

    def create_new_user(
        self, email: str, password: str, is_patient=False, is_provider=False, **fields
    ) -> "User":
        if is_patient:
            user = self.create_patient(**fields)
        elif is_provider:
            user = self.create_provider(email=email, password=password, **fields)

        return user

    def create_superuser(self, username, email, password):
        user = super().create_superuser(username, email, password)
        user.save()
        return user


class User(AbstractUser):
    is_patient = models.BooleanField(default=False)
    is_provider = models.BooleanField(default=False)

    objects = CustomUserManager()  # type: ignore


class Provider(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    first_name = models.CharField(max_length=200, default="")
    last_name = models.CharField(max_length=200, default="")

    def __str__(self):
        return f"{self.user.email}"


PLACEMENT_STATUSES = [
    ("pending", "Pending"),
    ("applied", "Applied"),
    ("accepted", "Accepted"),
    ("rejected", "Rejected"),
    ("in_treatment", "In treatment"),
    ("completed_treatment", "Completed treatment"),
]


class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    provider = models.ForeignKey(Provider, on_delete=models.SET_NULL, null=True)

    first_name = models.CharField(max_length=200, default="")
    last_name = models.CharField(max_length=200, default="")
    sex = models.CharField(max_length=200, default="")
    age = models.IntegerField(default=-1)
    languages = ArrayField(models.CharField(max_length=200), default=list)

    address = models.CharField(max_length=200, default="")
    can_travel = models.BooleanField(default=True)
    miles_can_travel = models.IntegerField(default=100)

    is_held_in_confinement = models.BooleanField(default=False)
    weeks_held_in_confinement = models.IntegerField(default=0)
    criminal_history = models.CharField(max_length=10000, default="")

    using_medication_assisted_therapies = ArrayField(
        models.CharField(max_length=200), default=list
    )
    using_substances = ArrayField(models.CharField(max_length=200), default=list)
    mental_health_diagnoses = ArrayField(models.CharField(max_length=200), default=list)

    health_insurance = models.CharField(max_length=200, default="")
    health_insurance_identifier = models.CharField(max_length=200, default="")

    has_disability = models.BooleanField(default=False)
    is_open_to_faith_based_treatment = models.BooleanField(default=False)

    placement_status = models.CharField(
        max_length=200, choices=PLACEMENT_STATUSES, default="pending"
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
