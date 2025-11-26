// src/app/page.tsx
import { redirect } from "next/navigation";   // ← IMPORT CORRECTO

export default function Home() {
  redirect("/login");   // ← con comillas y barra: "/login"
}