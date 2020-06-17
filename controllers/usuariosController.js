// Importar el modelo a utilizar
const Usuario = require("../models/Usuario");

exports.formularioCrearCuenta = (req, res, next) => {
    res.render("registrarse", { layout: "auth" });
};

exports.crearCuenta = async (req, res, next) => {
    // Obtener los datos de la nueva cuenta
    // Obtener por destructuring
    const { fullname, email, password } = req.body;

    // Intentar crear el usuario
    try{
        await Usuario.create({
            fullname,
            email,
            password
        });

        // Redireccionar el usuario al formulario de inicio de sesión
        res.render("iniciar_sesion", { layout: "auth" });
    } catch(error){
        res.render("registrarse", {layout: "auth" }, {
            error
        });
    }
};