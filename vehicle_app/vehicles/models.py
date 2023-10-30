from django.db import models

class Vehicle(models.Model):
    YEAR_CHOICES = [(r, r) for r in range(2003, 2024)]
    
    year = models.IntegerField(choices=YEAR_CHOICES)
    make = models.CharField(max_length=255)
    model = models.CharField(max_length=255)
    trim = models.CharField(max_length=255)
    # ... Add other fields similarly ...
