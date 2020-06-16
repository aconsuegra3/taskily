// Importar los módulos
const Sequelize = require('sequelize');
const db = require("../config/db");
const Proyecto = require("./Proyecto");
const bcrypt = require("bcrypt-nodejs");

// Definir el modelo Usuario
const Usuario = db.define(
    "usuario", 
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fullname: {
            type: Sequelize.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Debes ingresar tu nombre"
                }            
            }
        },
        email: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: {
                args: true,
                msg: "Ya existe un usuario registrado con esta dirección de correo"
            },
            validate: {
                notEmpty: {
                    msg: "Debes ingresar un correo electrónico"
                },
                isEmail: {
                    msg: "Verifica que tu correo es un correo electrónico válido"
                }
            }
        },
        password: {
            type: Sequelize.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Debes ingresar una contraseña"
                }
            }
        },
        token:  Sequelize.STRING,
        expiration: Sequelize.DATE
    },
    {
        hooks: {
            beforeCreate(usuario) {
                // Realizar el hash del password
                usuario.password = bcrypt.hashSync(
                    usuario.password, 
                    bcrypt.genSaltSync(13)
                );
            },
        },
    }
);
// definir que el usuario tiene muchos proyectos
Usuario.hasMany(Proyecto);

// Métodos personalizados
// nos permite agregarle metodos al modelo para encargarse de ciartas tareas
// Verificar si el password enviado (sin hash) es igual al almacenado(hash)
Usuario.prototype.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = Usuario;