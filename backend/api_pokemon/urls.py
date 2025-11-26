from django.urls import path
from .views import PokemonSearchView

urlpatterns = [
    path('search/', PokemonSearchView.as_view(), name='pokemon-search'),
]
