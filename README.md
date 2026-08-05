<div align="center">


# 🏠 Conecta Hogar - Frontend

<p align="center">
  <img src="./src/assets/images/logo.png" width="180" alt="Conecta Hogar"/>
</p>

### Plataforma web para conectar clientes con profesionales especializados en servicios para el hogar.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Material UI](https://img.shields.io/badge/Material_UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-000000?style=for-the-badge&logo=framer&logoColor=white)

</div>

---

# 📖 Descripción

**Conecta Hogar** es una aplicación web desarrollada para facilitar el contacto entre usuarios que necesitan realizar trabajos en sus hogares y profesionales especializados en distintas áreas.

El frontend fue desarrollado utilizando **React** y **TypeScript**, implementando una arquitectura basada en componentes reutilizables y una interfaz moderna enfocada en la experiencia del usuario.

La aplicación consume una API REST desarrollada en Spring Boot, encargada de administrar toda la lógica de negocio y el acceso a los datos.

---

# 🎯 Objetivos

- Facilitar la búsqueda de profesionales.
- Mejorar la experiencia de contratación de servicios.
- Proporcionar una interfaz intuitiva.
- Consumir información desde una API REST.
- Implementar buenas prácticas de desarrollo Frontend.

---

# ✨ Características

- Inicio de sesión.
- Registro de usuarios.
- Navegación mediante React Router.
- Diseño responsive.
- Componentes reutilizables.
- Consumo de API REST.
- Organización modular del proyecto.
- Animaciones para mejorar la experiencia del usuario.
- Manejo de rutas protegidas.
- Interfaces tipadas con TypeScript.

---

# 🛠 Tecnologías utilizadas

| Tecnología | Descripción |
|------------|------------|
| React | Biblioteca principal del proyecto |
| TypeScript | Tipado estático |
| Vite | Herramienta de desarrollo |
| React Router | Navegación SPA |
| Material UI | Componentes visuales |
| Tailwind CSS | Estilos |
| Motion | Animaciones |
| Lucide React | Iconografía |
| HTML5 | Marcado |
| CSS3 | Estilos |

---

# 📁 Estructura del proyecto

```
src/
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── styles/
│
├── components/
│   ├── Navbar/
│   ├── Footer/
│   ├── Cards/
│   └── UI/
│
├── pages/
│   ├── Home/
│   ├── Login/
│   ├── Register/
│   ├── Services/
│   ├── Contact/
│   └── Profile/
│
├── routes/
│
├── services/
│
├── hooks/
│
├── types/
│
├── App.tsx
│
└── main.tsx
```

---

# 🏛 Arquitectura

El proyecto sigue una arquitectura basada en componentes.

```
Usuario

↓

React Router

↓

Pages

↓

Components

↓

Services

↓

API REST (Spring Boot)
```

Cada componente posee una única responsabilidad, permitiendo que la aplicación sea escalable y fácil de mantener.

---

# 🚀 Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/valentina-lulic/conecta-hogar-web.git
```

---

## 2. Entrar al proyecto

```bash
cd conecta-hogar-web
```

---

## 3. Instalar dependencias

```bash
npm install
```

---

## 4. Ejecutar el proyecto

```bash
npm run dev
```

---

## 5. Abrir en el navegador

```
http://localhost:5173
```

---

# ⚙ Variables de entorno

Si el proyecto utiliza variables de entorno, crear un archivo:

```
.env
```

Ejemplo

```env
VITE_API_URL=http://localhost:8080
```

---

# 🔗 Backend

Este proyecto consume la API desarrollada en el siguiente repositorio:

👉 https://github.com/NicolasLuna2001/Conecta-hogar-backend

Para el correcto funcionamiento del sistema es necesario ejecutar el backend antes de iniciar el frontend.

---

# 📱 Diseño Responsive

La interfaz fue diseñada para funcionar correctamente en:

- 💻 Computadoras
- 📱 Smartphones
- 📟 Tablets

---

# 🎨 Principios de diseño

Durante el desarrollo se buscó:

- Componentes reutilizables.
- Código limpio.
- Navegación sencilla.
- Separación entre lógica y presentación.
- Interfaz intuitiva.
- Escalabilidad.

---



# Página principal

<div align="center">

![image alt](https://github.com/bunni3sby/ImagenesREADMEConectaHogar/blob/c39c74c0b3689db9d17fc97766a3b4819ff5010f/Imagenes/PaginaPrincipalCH.png)

</div align="center">

---


# 🔄 Flujo de la aplicación

```
Usuario

↓

Interfaz React

↓

Petición HTTP

↓

Spring Boot

↓

Base de Datos

↓

Respuesta JSON

↓

Actualización de la interfaz
```

---

# 📚 Aprendizajes

Durante el desarrollo de este proyecto se aplicaron conocimientos sobre:

- React.
- TypeScript.
- React Router.
- Componentes reutilizables.
- Consumo de APIs REST.
- Organización de proyectos.
- Manejo de estados.
- Diseño responsive.

---

# 👨‍💻 Equipo de desarrollo

<div align="center">

<p align="center">
  <img
    src="https://github.com/bunni3sby/ImagenesREADMEConectaHogar/blob/b982ecf50b012b76c3df8eec564883a2e3b7809b/Imagenes/CodeToCash.jpg"
    alt="Code To Cash"
    width="250">
</p>

# CODE TO CA$H
</div>




- Valentina Milena Lulic | Front End
- Denisse Labrana Henriquez | Front End
- Benjamin Andres Pinto | Front End
- Nicolas Gerard Luna | Back End
- Jorge Ivan Gatica | Back End
- Aaron Esteban Guerra | Back end
