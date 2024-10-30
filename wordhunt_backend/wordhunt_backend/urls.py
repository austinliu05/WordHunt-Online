from django.urls import path
from .views import getDictionary

urlpatterns = [
    path('get-dictionary', getDictionary, name='get-dictionary'),
]
