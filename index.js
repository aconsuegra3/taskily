// Importar los módulos de express.js
const express = require('express');

// Crear un servidor de express
const app = express()

// Inicializar el servidor en un puerto específico, normalmente se usa 3000 pero puede ser cualquiera
app.listen(7000, () => {
    console.log("Servidor ejecutándose en el puerto 7000");
});
