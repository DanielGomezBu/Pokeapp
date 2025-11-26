"use client";

import { useState, useEffect } from "react";
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
  const [tempSearch, setTempSearch] = useState("");


  // Función para buscar Pokémon en el backend
  const fetchPokemon = async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();
      if (search.name) params.append("q", search.name);
      if (search.number) params.append("number", search.number);
      if (search.type) params.append("type", search.type);
      if (search.region) params.append("region", search.region);

      const token = localStorage.getItem("token"); // si quieres proteger la ruta
      const res = await fetch(`http://127.0.0.1:8000/api/pokemon/?${params.toString()}`, {
        headers: token
          ? { Authorization: `Token ${token}` }
          : undefined,
      });

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

  // Ejecutar búsqueda al cambiar algún filtro
  useEffect(() => {
    fetchPokemon();
  }, [search]);

  return (
    <div>
      {/* Filtros */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-12 gap-4">
          {/* Nombre */}
          <input
            type="text"
            placeholder="Nombre del Pokémon"
            value={tempSearch}
            onChange={(e) => setTempSearch(e.target.value)} // Guardamos temporalmente
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Evita el submit por defecto del formulario
                setSearch({ ...search, name: tempSearch }); // Solo actualiza search al presionar Enter
              }
  }}
  className="col-span-12 md:col-span-5 px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-600 text-gray-900 font-medium text-lg"
/>

          {/* Número */}
          <input
            type="text"
            placeholder="Nº"
            value={search.number}
            onChange={(e) => setSearch({ ...search, number: e.target.value })}
            className="col-span-6 md:col-span-2 px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-600 text-gray-900 font-medium text-lg"
          />

          {/* Tipo */}
          <select
            value={search.type}
            onChange={(e) => setSearch({ ...search, type: e.target.value })}
            className="col-span-6 md:col-span-3 px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 font-medium text-lg cursor-pointer"
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
          <input
            type="text"
            placeholder="Región"
            value={search.region}
            onChange={(e) => setSearch({ ...search, region: e.target.value })}
            className="col-span-12 md:col-span-2 px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-600 text-gray-900 font-medium text-lg"
          />
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
