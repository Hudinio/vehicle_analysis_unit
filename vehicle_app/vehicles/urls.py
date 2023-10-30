from django.urls import path
from .views import get_vehicles, get_unique_values

urlpatterns = [
    path('api/vehicles/', get_vehicles, name='get_vehicles'),
    path('api/unique-values/', get_unique_values, name='get_unique_values'),
]
