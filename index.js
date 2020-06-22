// Importar los módulos de express.js
const express = require("express");
// Importar Handlebars
const exphbs = require("express-handlebars");
// Importar body parser que nos permite acceder al cuerpo de la
// peticion HTTP
const bodyParser = require("body-parser");
// Importar todas las rutas disponibles
const routes = require("./routes");
// Importar el passport para permitir el inicio de sesión
const passport = require("./config/passport");
// Importar cookieParser
const cookieParser = require("cookie-parser");
// Importar Session
const session = require("express-session");

// Crear la conexión con la base de datos
const db = require("./config/db");

// Importar el modelo
require("./models/Proyecto");
require("./models/Usuario");

// Realizar la conexión a la base de datos
// Sequelize se conecta mediante promises
// https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise
db.sync()
  .then(() => console.log("Conectado con el servidor de BD"))
  .catch((error) => console.log(error));

// Crear un servidor de express
const app = express();

// Indicarle al servidor la carpeta de archivos estáticos
app.use(express.static("public"));

// Indicar el template engine a utilizar (Handlebars)
app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main",
    extname: ".hbs",
  })
);

app.set("view engine", "hbs");

// Habilitatr bodyParser para leer los datos enviados por POST
app.use(bodyParser.urlencoded({ extended: true }));

// Habilitar el uso de cookieParser
app.use(cookieParser());

// Habilitar las sesiones de usuario
// Las sesiones le permitiran al usuario navegar entre las distintas páginas del sitio
// con una sola autenticación
app.use(
  session({
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Crear una instancia de passport y cargar nuestra estrategia
app.use(passport.initialize());
app.use(passport.session());

// Pasar alguos valores mediante middleware
app.use((req, res, next) => {
  res.locals.usuario = { ... req.user } || null;
  next();
});

// Indicarle a express dónde están las rutas del servidor
app.use("/", routes());

// Inicializar el servidor en un puerto en específico
app.listen(7000, () => {
  console.log("Servidor ejecutandose en el puerto 7000");
});
