# Generated by Django 4.2.4 on 2024-03-14 19:01

import core.models.user
from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0001_initial"),
    ]

    operations = [
        migrations.AlterModelManagers(
            name="user",
            managers=[
                ("objects", core.models.user.CustomUserManager()),
            ],
        ),
    ]
