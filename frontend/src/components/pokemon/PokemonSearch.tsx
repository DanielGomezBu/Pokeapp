"use client";

import { useState } from "react";
import PokemonCard from "./PokemonCard";

export default function PokemonSearch() {
  const [search, setSearch] = useState({
    name: "",
    number: "",
    type: "",
    region: "",
  });

  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Valores temporales para escribir sin disparar búsqueda
  const [tempName, setTempName] = useState("");
  const [tempNumber, setTempNumber] = useState("");
  const [tempType, setTempType] = useState("");
  const [tempRegion, setTempRegion] = useState("");

  // Ahora recibe los filtros directamente (no depende del estado)
  const fetchPokemon = async (filters: any) => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();
      if (filters.name) params.append("q", filters.name);
      if (filters.number) params.append("number", filters.number);
      if (filters.type) params.append("type", filters.type);
      if (filters.region) params.append("region", filters.region);

      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://127.0.0.1:8000/pokemon/search/?${params.toString()}`,
        {
          headers: token ? { Authorization: `Token ${token}` } : undefined,
        }
      );

      const data = await res.json();

      if (res.ok) {
        setPokemonList(data);
      } else {
        setError(data.error || "Error al obtener Pokémon");
      }
    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  // Sincroniza los valores temporales → reales y ejecuta búsqueda
  const applyFilters = () => {
    const newFilters = {
      name: tempName,
      number: tempNumber,
      type: tempType,
      region: tempRegion,
    };

    setSearch(newFilters); // Guardar filtros actuales en memoria
    fetchPokemon(newFilters); // Buscar con los filtros correctos inmediatamente
  };

  return (
    <div>
      {/* Filtros */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-12 gap-4">
          
          {/* Nombre */}
          <input
            type="text"
            placeholder="Nombre del Pokémon"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") applyFilters();
            }}
            className="col-span-12 md:col-span-5 px-5 py-4 border border-gray-300 rounded-xl
            focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-600 text-gray-900 font-medium text-lg"
          />

          {/* Número */}
          <input
            type="text"
            placeholder="Nº"
            value={tempNumber}
            onChange={(e) => setTempNumber(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") applyFilters();
            }}
            className="col-span-6 md:col-span-2 px-5 py-4 border border-gray-300 rounded-xl
            focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-600 text-gray-900 font-medium text-lg"
          />

          {/* Tipo */}
          <select
            value={tempType}
            onChange={(e) => setTempType(e.target.value)}
            className="col-span-6 md:col-span-3 px-5 py-4 border border-gray-300 rounded-xl
            focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 font-medium text-lg cursor-pointer"
          >
            <option value="">Todos los tipos</option>
            <option value="electric">Eléctrico</option>
            <option value="fire">Fuego</option>
            <option value="water">Agua</option>
            <option value="grass">Planta</option>
            <option value="fighting">Lucha</option>
            <option value="steel">Acero</option>
            <option value="normal">Normal</option>
            <option value="psychic">Psíquico</option>
            <option value="dragon">Dragón</option>
          </select>

          {/* Región */}
          <select
            value={tempRegion}
            onChange={(e) => setTempRegion(e.target.value)}
            className="col-span-12 md:col-span-2 px-5 py-4 border border-gray-300 rounded-xl
            focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 font-medium text-lg cursor-pointer"
          >
            <option value="">Todas las regiones</option>
            <option value="Kanto">Kanto</option>
            <option value="Johto">Johto</option>
            <option value="Hoenn">Hoenn</option>
            <option value="Sinnoh">Sinnoh</option>
            <option value="Teselia">Teselia</option>
            <option value="Kalos">Kalos</option>
            <option value="Alola">Alola</option>
            <option value="Galar">Galar</option>
          </select>
        </div>

        {/* Botón Buscar */}
        <div className="mt-6">
          <button
            onClick={applyFilters}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold text-lg transition"
          >
            Buscar
          </button>
        </div>
      </div>

      {/* Resultados */}
      {loading ? (
        <p className="text-center text-gray-500 text-xl mt-12">Cargando...</p>
      ) : error ? (
        <p className="text-center text-red-500 text-xl mt-12">{error}</p>
      ) : pokemonList.length === 0 ? (
        <p className="text-center text-gray-500 text-xl mt-12">
          No se encontró ningún Pokémon
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pokemonList.map((pokemon) => (
            <PokemonCard key={pokemon.number} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
}
