from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .serializers import RegisterSerializer
import requests

# REGISTER
class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = Token.objects.create(user=user)
            return Response({
                'token': token.key,
                'user': user.username
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# LOGIN
class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        return Response({'error': 'Credenciales inválidas'}, status=400)

# BÚSQUEDA POKÉMON (usa PokeAPI) AÑADIR BUSQUEDA POR NUMERO Y TIPO Y REGIÓN
class PokemonSearchView(APIView):
    def get(self, request):
        query = request.query_params.get('q', '').lower()
        url = f"https://pokeapi.co/api/v2/pokemon?limit=1010"
        response = requests.get(url).json()
        results = []

        for pokemon in response['results']:
            if query in pokemon['name']:
                data = requests.get(pokemon['url']).json()
                results.append({
                    'name': data['name'].capitalize(),
                    'number': data['id'],
                    'image': data['sprites']['other']['official-artwork']['front_default'] or data['sprites']['front_default'],
                    'types': [t['type']['name'] for t in data['types']],
                    'region': self.get_region(data['id']),
                    'stats': {s['stat']['name'].replace('special-', 'sp-'): s['base_stat'] for s in data['stats']}
                })
                if len(results) >= 20:
                    break
        return Response(results)

    def get_region(self, id):
        if id <= 151: return "Kanto"
        elif id <= 251: return "Johto"
        elif id <= 386: return "Hoenn"
        elif id <= 493: return "Sinnoh"
        elif id <= 649: return "Teselia"
        elif id <= 721: return "Kalos"
        elif id <= 809: return "Alola"
        else: return "Galar"
