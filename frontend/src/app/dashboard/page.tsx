"use client"; // importante para usar hooks

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PokemonSearch from "@/components/pokemon/PokemonSearch";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false); // nuevo estado
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login"); // redirige si no hay token
      return;
    }

    // Validar token con backend
    fetch(`${API_URL}/auth/me/`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("No autorizado");
        return res.json();
      })
      .then(() => {
        setAuthorized(true); // usuario autorizado
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        router.replace("/login");
      });
  }, [router, API_URL]);

  // Mientras cargamos o no estamos autorizados, no renderizamos nada
  if (loading || !authorized) return <p className="text-center mt-12">Cargando...</p>;

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
