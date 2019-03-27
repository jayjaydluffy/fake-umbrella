from django.db import models

class Customer(models.Model):
    name = models.CharField(max_length=100)
    contact_person = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=16)
    location = models.CharField(max_length=64)
    num_employees = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)