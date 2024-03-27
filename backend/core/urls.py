from django.urls import path
from rest_framework_simplejwt import views as jwt_views

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
    path("create_patient", views.create_patient, name="create_patient"),
    path("get_patients", views.get_patients, name="get_patients"),
    path(
        "create_patient_application_context",
        views.create_patient_application_context,
        name="create_patient_application_context",
    ),
    path(
        "create_application",
        views.create_application,
        name="create_application",
    ),
    path("get_logged_in_user", views.get_logged_in_user, name="get_logged_in_user"),
    path("sign_up", views.sign_up, name="sign_up"),
    path("log_out", views.LogoutView.as_view(), name="log_out"),
    path("token", jwt_views.TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh", jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
]
