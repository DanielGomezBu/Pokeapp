from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
import requests
from concurrent.futures import ThreadPoolExecutor
from rest_framework.permissions import IsAuthenticated

# BÚSQUEDA POKÉMON (usa PokeAPI) AÑADIR BUSQUEDA POR NUMERO Y TIPO Y REGIÓN
class PokemonSearchView(APIView):
    def get(self, request):
        query = request.query_params.get('q', '').lower()
        queryid = request.query_params.get('number', '')
        querytype = request.query_params.get('type', '').lower()
        queryregion = request.query_params.get('region', '').lower()
        limit = 30

        # Paso 1: Obtener lista inicial de Pokémon
        if querytype:
            # Filtrar por tipo primero
            type_url = f"https://pokeapi.co/api/v2/type/{querytype}"
            try:
                type_response = requests.get(type_url, timeout=10).json()
                all_pokemon = [p['pokemon']['name'] for p in type_response.get('pokemon', [])]
            except requests.RequestException:
                return Response({"error": "No se pudo conectar con la API de tipos"}, status=503)
        else:
            # Obtener todos los Pokémon si no hay tipo
            url = "https://pokeapi.co/api/v2/pokemon?limit=1500"
            try:
                response = requests.get(url, timeout=10).json()
                all_pokemon = [p['name'] for p in response.get('results', [])]
            except requests.RequestException:
                return Response({"error": "No se pudo conectar con la API"}, status=503)

        # Paso 2: Filtrar por nombre y número
        filtered_pokemon = []
        for name in all_pokemon:
            if query and query not in name.lower():
                continue
            if queryid:
                # Necesitamos obtener ID del Pokémon para comparar
                try:
                    data = requests.get(f"https://pokeapi.co/api/v2/pokemon/{name}", timeout=10).json()
                except requests.RequestException:
                    continue
                if str(data['id']) != str(queryid):
                    continue
            filtered_pokemon.append(name)
            if len(filtered_pokemon) >= 900:  # límite para no sobrecargar requests paralelas
                break

        # Paso 3: Obtener datos completos en paralelo solo de los Pokémon filtrados
        results = []

        def fetch_pokemon_data(name):
            try:
                data = requests.get(f"https://pokeapi.co/api/v2/pokemon/{name}", timeout=10).json()
            except requests.RequestException:
                return None

            # Filtro por región
            region = self.get_region(data['id']).lower()
            if queryregion and queryregion != region:
                return None

            return {
                'name': data['name'].capitalize(),
                'number': data['id'],
                'image': data['sprites']['other']['official-artwork']['front_default']
                        or data['sprites']['front_default'],
                'types': [t['type']['name'] for t in data['types']],
                'region': self.get_region(data['id']),
                'stats': [
                    {'name': s['stat']['name'].replace('special-', 'sp-'), 'value': s['base_stat']}
                    for s in data['stats']
                ]
            }

        with ThreadPoolExecutor(max_workers=10) as executor:
            for res in executor.map(fetch_pokemon_data, filtered_pokemon):
                if res:
                    results.append(res)
                if len(results) >= limit:
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
