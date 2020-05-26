// Importar los módulos de express.js
const express = require('express');
// Importar todas las rutas disponibles
const routes = require("./routes");

// Crear un servidor de express
const app = express();

// Indicarle a express dónde están las rutas del servidor
app.use("/", routes());

// Inicializar el servidor en un puerto específico, normalmente se usa 3000 pero puede ser cualquiera
app.listen(7000, () => {
    console.log("Servidor ejecutándose en el puerto 7000");
});
