from . import views
from django.urls import path

urlpatterns = [
    path("centers", views.get_centers, name="get_centers"),
    path("centers/<str:id>", views.get_center, name="get_center"),
    path("filter_centers", views.filter_centers, name="filter_centers"),
]
