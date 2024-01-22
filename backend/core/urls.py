from . import views
from django.urls import path

urlpatterns = [
    path("", views.home, name="home"),
    path(
        "filter/<str:center_type>/",
        views.homepage_with_filter,
        name="homepage_with_filter",
    ),
    path("centers/<int:pk>", views.center_view, name="center_view"),
    path("sign_up/", views.sign_up, name="sign_up"),
    path("log_in/", views.log_in, name="log_in"),
    path("log_out/", views.log_out, name="log_out"),
]
