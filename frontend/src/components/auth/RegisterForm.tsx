// src/components/auth/RegisterForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.password2) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Aquí más adelante irá la llamada real al backend
    alert(`Registro simulado:\nUsuario: ${form.username}\nEmail: ${form.email}`);
    
    // Simulamos éxito y vamos al login
    router.push("/login");
  };

  return (
    <div className="bg-white p-10 rounded-2xl shadow-2xl w-96">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Crear cuenta
      </h2>

      {error && <p className="text-red-500 text-center mb-4 font-medium">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="username"
          placeholder="Usuario"
          value={form.username}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-600 text-gray-900 font-medium"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-600 text-gray-900 font-medium"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-600 text-gray-900 font-medium"
          required
        />

        <input
          type="password"
          name="password2"
          placeholder="Repetir contraseña"
          value={form.password2}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-600 text-gray-900 font-medium"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Registrarse
        </button>
      </form>

      <p className="text-center mt-6 text-gray-600">
        ¿Ya tienes cuenta?{" "}
        <button
          onClick={() => router.push("/login")}
          className="text-indigo-600 font-medium hover:underline"
        >
          Inicia sesión
        </button>
      </p>
    </div>
  );
}