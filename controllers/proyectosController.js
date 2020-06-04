// Importar los modelos necesarios
const Proyecto = require("../models/Proyecto");

// Muestra todos los proyectos del usuario
exports.home = (req, res, next) => {
  res.render("crear_proyecto");
};

// Permite la creación de un nuevo proyecto
exports.nuevoProyecto = (req, res, next) => {
  // validar que el input del formulario tenga valor
  // para acceder a los valores y asignarlos en un solo paso
  // vamos a utilziar destructuring.
  const { nombre } = req.body;
  //const { nombre, numeroUno, numeroDos } = req.body;

  const errores = [];
  
  // Verificar si el nombre del proyecto tiene un valor
  if(!nombre){
    errores.push({error: 'El nombre del proyecto no puede estar vacío'});
    //res.send("Debes asignar nombre al proyecto!");
  }
  // else {
    // res.send(`Proyecto almacenado correctamente. la suma es:  , ${Number(numeroUno) + Number(numeroDos)}`);
    // res.send("Proyecto almacenado correctamente");
  // }
  if(errores.length){
    res.render("crear_proyecto", {
      errores,
    });
  } else {
    // Insertar el proyecto a la BD
    res.send("Insertado en la BD");
  }
};