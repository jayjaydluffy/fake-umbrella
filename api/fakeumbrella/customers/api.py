from customers.models import Customer
from rest_framework import viewsets, permissions
from .serializers import CustomerSerializer

# Customer Viewset

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = CustomerSerializer