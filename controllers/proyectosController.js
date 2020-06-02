// Importar los modelos necesarios
const Proyecto = require("../models/Proyecto");

// Muestra todos los proyectos del usuario
exports.home = (req, res, next) => {
  res.render("crear_proyecto");
};

// Permite la creación de un nuevo proyecto
exports.nuevoProyecto = (req, res, next) => {
  res.send("Aqui se crea un nuevo proyecto");
};