const db = require('mysql2-promise')();
const dotEnv = require('dotenv');

//configuracion de variables de entorno
dotEnv.config();

//asignar los valores del entorno a la configuracion de la base de datos
const DBConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}

db.configure(DBConfig);

module.exports = db;