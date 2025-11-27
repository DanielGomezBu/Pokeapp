# PokeApp – Aplicación Full-Stack Django + Next.js

**Versión:** 1.0  
**Fecha:** Noviembre 2025  
**Autor:** Daniel Gómez Buenestado 
**Licencia:** Uso educativo y personal autorizado · Prohibido uso comercial sin permiso expreso

## Descripción del Proyecto

PokeApp es una aplicación full-stack educativa que demuestra una integración moderna y robusta entre:

- Backend: Django + Django REST Framework (DRF)
- Frontend: Next.js 14+ (App Router) con React

### Características principales

- Registro e inicio de sesión con autenticación por token (DRF TokenAuthentication)
- Validación automática del token en cada carga de página protegida
- Búsqueda de Pokémon mediante API interna con datos enriquecidos
- Arquitectura completamente separada entre frontend y backend
- Configuración 100% basada en variables de entorno (sin URLs hardcodeadas)
- Buenas prácticas de seguridad y desarrollo (CORS, protección CSRF, etc.)

Ideal para aprender integración real entre Django REST Framework y aplicaciones modernas de React/Next.js.


## Requisitos Previos

Backend
- Python 3.10 o superior
- pip
- virtualenv (recomendado)

Frontend
- Node.js 18 o superior
- npm ≥ 9 o yarn/pnpm

## Configuración y Ejecución

### 1. Backend (Django + DRF)

cd backend
python -m venv venv
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

Backend disponible en: http://127.0.0.1:8000

### 2. Frontend (Next.js)

cd frontend
npm install
# o yarn / pnpm
cp .env.example .env.local   # (si existe el ejemplo)

# Edita .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

npm run dev

Frontend disponible en: http://localhost:3000

## Endpoints Principales

Autenticación
POST   /auth/register/    → Registrar usuario
POST   /auth/login/       → Iniciar sesión (devuelve token)
GET    /auth/me/          → Validar token y obtener perfil

Pokémon
GET    /pokemon/          → Lista paginada
GET    /pokemon/<nombre>/ → Detalle (ej: /pokemon/pikachu)

## Usuario de Prueba

Usuario: manolo
Contraseña: 12345

## Buenas Prácticas Implementadas

- Variables de entorno con prefijo NEXT_PUBLIC_
- Separación clara de responsabilidades
- Helpers reutilizables para peticiones
- Protección automática de rutas
- CORS restringido al origen del frontend
- Código limpio y bien comentado

## Consideraciones para Producción

- Desactivar DEBUG = False
- Configurar ALLOWED_HOSTS
- Usar PostgreSQL
- Servir con Gunicorn + Nginx o plataformas (Render, Railway, etc.)
- Habilitar HTTPS
- Cambiar URLs a dominio real
- Considerar JWT en lugar de TokenAuthentication

## Licencia

Uso exclusivo con fines educativos y de desarrollo personal.
Prohibido el uso comercial sin autorización expresa del autor.

¡Listo para aprender full-stack real!
Clona, experimenta y mejora este proyecto cuanto quieras.
