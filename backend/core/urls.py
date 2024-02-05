from . import views
from django.urls import path

urlpatterns = [
    path("", views.home, name="home"),
    path("centers", views.get_centers, name="get_centers"),
    path("centers/<str:id>", views.get_center, name="get_center"),
    path("filter/<str:center_type>", views.filter_centers, name="filter_centers"),
]
