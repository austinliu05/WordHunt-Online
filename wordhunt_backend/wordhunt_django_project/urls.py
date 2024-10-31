from django.urls import path
from .views import solve_board

urlpatterns = [
    path('solve/', solve_board, name='solve_board'),
]