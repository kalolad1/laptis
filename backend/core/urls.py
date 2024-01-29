from . import views
from django.urls import path

urlpatterns = [
    path("", views.home, name="home"),
    path("centers", views.get_centers, name="get_centers"),
]
