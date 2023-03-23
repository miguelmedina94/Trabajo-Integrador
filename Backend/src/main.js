const express = require('express');
const dotEnv = require('dotenv');
const routes = require('./routes');
const cors = require('cors');

//configura las variables de entorno
dotEnv.config();

//asigna el puerto de entorno y configura la app
const app = express();
app.use(cors());
app.set("PORT", process.env.API_PORT || 8080);

//aplica el middleware para parsear los json
app.use(express.json({ limit: "50mb"}));

//aplica la ruta
app.use("/api", routes);

module.exports = app;