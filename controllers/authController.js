// Este controlador se encargará solo de tareas de autenticación
// Importar passport
const passport = require("passport");
// Importar el modelo de Usuario
const Usuario = require("../models/Usuario");
// Importar el sequelize
const Sequelize = require("sequelize");

// Verificar si el usuario se puede autenticar con sus credenciales
exports.autenticarUsuario = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/iniciar_sesion",
  badRequestMessage: "Debes ingresar tu correo electrónico y tu contraseña",
});

exports.cerrarSesion = (req, res, next) => {
  // Al cerrar sesión redirigimos al usuario al inicio de sesión
  req.session.destroy(() => {
    res.redirect("/iniciar_sesion");
  });
};

exports.usuarioAutenticado = (req, res, next) => {
  // Si el usario está autenticado que contiene con la petición
  if (req.isAuthenticated()){
    return next();
  }

  // Si el usuario no está autenticado, iniciar sesión
  return res.redirect("/iniciar_sesion");
};