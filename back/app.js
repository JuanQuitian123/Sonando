const express = require('express');
const app = express();
// Declaracioon de cors -> CORS lo dejaremos al finalnpm
const cors = require('cors');

// Declaración de la constante de las rutas de usuarios
const usuarioRutas = require('./rutas/usuariosRutas'); 

// -- MIDDLEWARES --
app.use(express.json());
app.use(cors());

// Consumo de las rutas 
app.use('/api', usuarioRutas);

// -- Fin de MIDDLEWARES -- 

// Exportación del módulo
module.exports = app;