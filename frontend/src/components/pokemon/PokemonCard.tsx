// src/components/pokemon/PokemonCard.tsx
import { Pokemon } from "@/types";

type Props = {
  pokemon: Pokemon;
};

export default function PokemonCard({ pokemon }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition duration-300">
      {/* Cabecera con degradado según tipo principal */}
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-full h-64 object-contain drop-shadow-2xl"
        />
      </div>

      {/* Cuerpo */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-3xl font-bold capitalize text-gray-800">
            {pokemon.name}
          </h2>
          <span className="text-2xl font-bold text-gray-500">
            #{String(pokemon.number).padStart(3, "0")}
          </span>
        </div>

        {/* Tipos */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-sm font-bold capitalize shadow-md"
            >
              {type}
            </span>
          ))}
        </div>

        {/* Región */}
        <p className="text-sm text-gray-600 mb-4 capitalize">
          Región: <span className="font-semibold">{pokemon.region}</span>
        </p>

        {/* Stats */}
        <div className="space-y-3">
  {Array.isArray(pokemon.stats) ? (
    pokemon.stats.map((stat) => (
      <div key={stat.name}>
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium text-gray-700 capitalize">{stat.name}</span>
          <span className="text-gray-500">{stat.value}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${stat.value}%` }}
          ></div>
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-400 text-sm">Sin estadísticas disponibles</p>
  )}
</div>
      </div>
    </div>
  );
}