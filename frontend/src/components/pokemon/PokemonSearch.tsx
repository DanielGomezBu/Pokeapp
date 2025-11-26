// src/components/pokemon/PokemonSearch.tsx
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

  // Datos de ejemplo (más adelante vendrán del backend)
  const allPokemon = [
    {
      name: "pikachu",
      number: 25,
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
      types: ["electric"],
      region: "kanto",
      stats: [
        { name: "hp", value: 35 },
        { name: "attack", value: 55 },
        { name: "defense", value: 40 },
        { name: "special-attack", value: 50 },
        { name: "special-defense", value: 50 },
        { name: "speed", value: 90 },
      ],
    },
    {
      name: "charmander",
      number: 4,
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
      types: ["fire"],
      region: "kanto",
      stats: [
        { name: "hp", value: 39 },
        { name: "attack", value: 52 },
        { name: "defense", value: 43 },
        { name: "special-attack", value: 60 },
        { name: "special-defense", value: 50 },
        { name: "speed", value: 65 },
      ],
    },
    {
      name: "lucario",
      number: 448,
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png",
      types: ["fighting", "steel"],
      region: "sinnoh",
      stats: [
        { name: "hp", value: 70 },
        { name: "attack", value: 110 },
        { name: "defense", value: 70 },
        { name: "special-attack", value: 115 },
        { name: "special-defense", value: 70 },
        { name: "speed", value: 90 },
      ],
    },
  ];

  const filtered = allPokemon.filter((p) => {
    return (
      (!search.name || p.name.toLowerCase().includes(search.name.toLowerCase())) &&
      (!search.number || p.number.toString().includes(search.number)) &&
      (!search.type || p.types.includes(search.type.toLowerCase())) &&
      (!search.region || p.region.toLowerCase().includes(search.region.toLowerCase()))
    );
  });
// hay que añadir mas tipos, y imagenes en vez de letras
  return (
    <div>
      {/* Filtros */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-12 gap-4">
    {/* Nombre → ocupa 5 columnas (el más grande) */}
    <input
      type="text"
      placeholder="Nombre del Pokémon"
      value={search.name}
      onChange={(e) => setSearch({ ...search, name: e.target.value })}
      className="col-span-12 md:col-span-5 px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-600 text-gray-900 font-medium text-lg"
    />

    {/* Número → ocupa 2 columnas */}
    <input
      type="text"
      placeholder="Nº"
      value={search.number}
      onChange={(e) => setSearch({ ...search, number: e.target.value })}
      className="col-span-6 md:col-span-2 px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-600 text-gray-900 font-medium text-lg"
    />

    {/* Tipo → ocupa 3 columnas */}
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

    {/* Región → ocupa 2 columnas */}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((pokemon) => (
          <PokemonCard key={pokemon.number} pokemon={pokemon} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 text-xl mt-12">
          No se encontró ningún Pokémon
        </p>
      )}
    </div>
  );
}