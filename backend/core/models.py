from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.contrib.postgres.fields import ArrayField
from django.db import models

from typing import List


class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, email: str, password: str, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError("The given email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email: str, password: str, **extra_fields):
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):
    """User model."""

    username = None
    email = models.EmailField("email address", unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS: List[str] = []

    objects = UserManager()


class ProviderProfile(models.Model):
    user = models.OneToOneField(
        User,
        related_name="provider_profile",
        on_delete=models.CASCADE,
        primary_key=True,
    )


class ClientProfile(models.Model):
    user = models.OneToOneField(
        User, related_name="client_profile", on_delete=models.CASCADE, primary_key=True
    )


class CenterType(models.TextChoices):
    DETOX = "detox"
    CLINICAL_STABILIZATION_SERVICES = "clinical stabilization services"
    TRANSITIONAL_SUPPORT_SERVICES = "transitional support services"
    RESIDENTIAL = "residential"


# ArrayField defaults
class Sex(models.TextChoices):
    MALE = "male"
    FEMALE = "female"


def get_eligible_sex_default():
    return ["male", "female"]


def get_eligible_medications_default():
    return ["methadone"]


def get_eligible_mental_health_diagnoses_default():
    return ["depression", "anxiety", "ADHD"]


def get_eligible_health_insurances_default():
    return ["MassHealth", "Blue Cross"]


class Center(models.Model):
    name = models.CharField(max_length=200, default="")
    address = models.CharField(max_length=200, default="")

    center_type = models.CharField(
        max_length=200, choices=CenterType.choices, default=CenterType.RESIDENTIAL
    )
    image = models.ImageField(upload_to="centers/images/", blank=True)
    phone_number = models.CharField(max_length=200, default="")
    website = models.CharField(max_length=200, default="")

    eligible_sexes = ArrayField(
        models.CharField(max_length=200, choices=Sex.choices),
        default=get_eligible_sex_default,
    )

    eligible_age_minimum = models.IntegerField(default=1)
    eligible_age_maximum = models.IntegerField(default=9999)

    eligible_medications = ArrayField(
        models.CharField(max_length=200), default=get_eligible_medications_default
    )

    eligible_mental_health_diagnoses = ArrayField(
        models.CharField(max_length=200),
        default=get_eligible_mental_health_diagnoses_default,
    )

    eligible_health_insurances = ArrayField(
        models.CharField(max_length=200), default=get_eligible_health_insurances_default
    )

    is_disability_compatible = models.BooleanField(default=True)
    is_faith_based_treatment = models.BooleanField(default=False)

    def __str__(self):
        return self.name
