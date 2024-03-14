from django.urls import path

from . import views

urlpatterns = [
    path("centers", views.get_centers, name="get_centers"),
    path("centers/<str:id>", views.get_center, name="get_center"),
    path("filter_centers", views.filter_centers, name="filter_centers"),
    path(
        "get_typeform_response",
        views.get_typeform_response,
        name="get_typeform_response",
    ),
    path("create_new_patient", views.create_new_patient, name="create_new_patient"),
    path("get_patients", views.get_patients, name="get_patients"),
]
