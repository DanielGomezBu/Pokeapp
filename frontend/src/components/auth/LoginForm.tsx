// src/components/auth/LoginForm.tsx
"use client"; // Necesario porque vamos a usar useState más adelante

import { useState } from "react";

export default function LoginForm() 
{
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí más adelante pondremos la llamada al backend
    alert(`Usuario: ${username}\nContraseña: ${password}`);
  };

  return (
    <div className="bg-white p-10 rounded-2xl shadow-2xl w-96">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Iniciar sesión
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500 text-gray-900 font-medium"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500 text-gray-900"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Entrar
        </button>
      </form>

      <p className="text-center mt-6 text-gray-600">
        ¿No tienes cuenta? <span className="text-indigo-600 font-medium">Regístrate</span>
      </p>
    </div>
  );
}