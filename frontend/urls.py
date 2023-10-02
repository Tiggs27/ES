from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('makeOrder',index),
    path('listOrder',index),
    path('login',index),
    path('signUp',index)
]
