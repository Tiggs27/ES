from django.urls import path, include
from .views import GetUserOrders, MakeNewOrder, LoginUser, RegisterUser, ConfirmDelivery

urlpatterns = [
    path('orders/', GetUserOrders.as_view()),
    path('newOrder/', MakeNewOrder.as_view()),
    path('loginUser/', LoginUser.as_view()),
    path('registerUser/', RegisterUser.as_view()),
    path('confirmDelivery/', ConfirmDelivery.as_view())
]
