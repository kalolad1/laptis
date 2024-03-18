# Generated by Django 4.2.4 on 2024-03-17 17:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0005_application"),
    ]

    operations = [
        migrations.CreateModel(
            name="Provider",
            fields=[
                (
                    "user",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        primary_key=True,
                        serialize=False,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                ("first_name", models.CharField(default="", max_length=200)),
                ("last_name", models.CharField(default="", max_length=200)),
            ],
        ),
        migrations.AddField(
            model_name="user",
            name="is_provider",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="patient",
            name="provider",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="core.provider",
            ),
        ),
    ]
