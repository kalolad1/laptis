from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from .models import User


class SignUpForm(UserCreationForm):
    email = forms.EmailField(max_length=200, help_text="Required")

    class Meta:
        model = User
        fields = ("email", "password1", "password2")


class LogInForm(AuthenticationForm):
    email = forms.CharField(max_length=200)
    password = forms.CharField(widget=forms.PasswordInput)
