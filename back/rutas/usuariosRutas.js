const express = require('express');
const UsuarioControl = require('../control/usuariosControl');
//Importar el paquete connect-multiparty
const multipart = require('connect-multiparty');
// A través de connect-multiparty, apuntamos a la carpeta que deseemos en que se guarden los archivos
const subirImgDirectorio = multipart({uploadDir: './archivos/usuarios'});

var api = express.Router();
//protección de rutas en Angular -> Guardss


// Ruta Registrar Usuario -> angular url http:localhost:3000/api/
api.post('/registro', UsuarioControl.registrarUsuario);
// Ruta Login
api.post('/iniciar-sesion', UsuarioControl.login);
// Ruta Actualizar Usuario
api.put('/actualizar-usuario/:id', UsuarioControl.actualizarUsuario);

// Ruta Subir imagen Usuario
api.put('/subirImagen/:id', subirImgDirectorio, UsuarioControl.subirImg);

// Ruta mostrar Imagen Usuario

api.get('/obtenerImagen/:imageFile', UsuarioControl.mostrarArchivo);

// Exportal el módulo
module.exports = api;