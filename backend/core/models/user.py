import random
import string

from django.contrib.auth.models import UserManager
from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUserManager(UserManager["User"]):
    def _generate_random_string(self) -> str:
        return "".join(random.choice(string.ascii_letters) for _ in range(12))

    def create_patient(self, first_name: str, last_name: str, age: int) -> "User":
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
            user=user, first_name=first_name, last_name=last_name, age=age
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
    age = models.IntegerField(default=-1)
