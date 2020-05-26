// Importar express router
const express = require("express");
const routes = express.Router();

// Construir las rutas disponibles para el servidor
// Las rutas deben exportarse para poder ser utilizados en otros archivos
module.exports = function() {
    routes.get('/');

    return routes;
};