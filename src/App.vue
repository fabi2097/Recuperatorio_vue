<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #e8f5e9; /* Un verde claro para el fondo */
}

h1, h2 {
  color: #2e7d32; /* Un verde oscuro para los encabezados */
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 8px 16px;
}

router-link {
  text-decoration: none;
  color: #2e7d32;
  padding: 8px 16px;
}

router-link:hover {
  background-color: #c8e6c9;
  border-radius: 4px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table, th, td {
  border: 1px solid #a5d6a7; /* Un verde intermedio para las bordes de la tabla */
}

th, td {
  padding: 12px 20px;
  text-align: left;
}
</style>
