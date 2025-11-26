"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Helper para hacer fetch con token
  const fetchWithToken = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem("token");
    const headers = {
      ...(options.headers || {}),
      ...(token ? { Authorization: `Token ${token}` } : {}),
    };
    return fetch(url, { ...options, headers });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al iniciar sesión");
        return;
      }

      // Guardamos token
      localStorage.setItem("token", data.token);

      // Comprobamos /auth/me/ inmediatamente
      const meRes = await fetchWithToken("http://127.0.0.1:8000/auth/me/");
      if (!meRes.ok) {
        setError("No se pudo validar usuario con el token");
        return;
      }

      const meData = await meRes.json();
      console.log("Usuario logueado:", meData);

      // Redirigir al dashboard
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="bg-white p-10 rounded-2xl shadow-2xl w-96">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Iniciar sesión
      </h2>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

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
        ¿No tienes cuenta?{" "}
        <button
          onClick={() => router.push("/register")}
          className="text-indigo-600 font-medium"
        >
          Regístrate
        </button>
      </p>
    </div>
  );
}
