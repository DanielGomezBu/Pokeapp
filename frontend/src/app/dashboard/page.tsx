// src/app/dashboard/page.tsx
import PokemonSearch from "@/components/pokemon/PokemonSearch";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header fijo */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-800 text-center">
            PokeApp
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Busca tu Pokémon favorito
          </p>
        </div>
      </header>

      {/* Barra de búsqueda */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <PokemonSearch />
      </div>
    </div>
  );
}
