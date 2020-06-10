const Usuario = require('../modelo/usuario');
// Importar el módulo File Systen de Node 
const fs = require('fs');
// Importar el módulo Path de Node
const path = require('path');

// Funcion Registro Usuario
function registrarUsuario(req, res){
    var usuario = new Usuario();
    var parametros = req.body;

    usuario.nombre = parametros.nombre;
    usuario.apellido = parametros.apellido;
    usuario.correo = parametros.correo;
    usuario.contrasena = parametros.contrasena;
    usuario.rol = 'usuario';
    usuario.imagen = null;

    // funcion save para interactuar con la BD
    usuario.save((err, usuarioNuevo)=>{
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!usuarioNuevo){
                res.status(200).send({message: "No fue posible realizar el registro"});
            }else{
                res.status(200).send({
                    message: "Usuario Creado",
                    usuario: usuarioNuevo
                });
            }
        }
    });
}

// Función Lógin
function login(req, res){
    var parametros = req.body;
    var correoUsuario = parametros.correo;
    var contraUsuario = parametros.contrasena;

    Usuario.findOne({correo: correoUsuario}, (err, usuarioLogueado)=>{
        if(err){
            res.status(500).send({message: "Error  en el servidor"});
        }else{
            if(!usuarioLogueado){
                res.status(200).send({message: "Usuario inexistente"});
            }else{
                if(usuarioLogueado.contrasena != contraUsuario){
                    res.status(200).send({message: "Contraseña incorrecta"});
                }else{
                    res.status(200).send({
                        message: "Usuario Logueado!",
                        usuario: usuarioLogueado
                    });
                }
            }
        }
    });
}

// Función Actualizar Usuario
function actualizarUsuario(req, res){
    // localhost:3000/api/editar/:id
    var usuarioId = req.params.id;
    var nuevosDatosUsuario = req.body;

    Usuario.findByIdAndUpdate(usuarioId, nuevosDatosUsuario, (err, usuarioActualizado)=>{
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!usuarioActualizado){
                res.status(200).send({message: "No fue posible Actualizar tus datos"});
            }else{
                res.status(200).send({
                    message: "Usuario Actualizado!",
                    usuario: nuevosDatosUsuario
                });
            }
        }
    });
}

// Función subir  img 
function subirImg(req, res){
    var usuarioId = req.params.id;
    var nombreArchivo = " No has subido ninguna imagen...";

    // Validar si efectivamente se está enviando un archivo
    if(req.files){
        // Vamos a ir analizando la ruta del archivo, el nombre y la extensión
        // c:\\usuarios\descargas\imagen.png  hacer spling
        var rutaArchivo = req.files.imagen.path;
        console.log(`ruta Archivo: ${rutaArchivo}`);

        // Haremos un split para separar elemetos
        // Esto nos generará un arreglo de datos
        var partirArchivo = rutaArchivo.split('\\');
        console.log(`partir Archivo: ${partirArchivo}`);

        // Acceder a la posición que contiene el nombre del archivo
        var nombreArchivo = partirArchivo[2];
        console.log(`Posición dato: ${nombreArchivo}`);

        // Haremos un split para separar el nombre del archivo de la extensión
        // ['imagen', 'png']
        var extensionImg = nombreArchivo.split('\.');
        console.log(`partirImg: ${extensionImg}`);

        // Accedemos a la posición de la extensión del archivo
        var extensionArchivo = extensionImg[1];
        console.log(`Extensión Archivo:  ${extensionArchivo}`);

        // Validar si el formato del archivo es aceptable
        if(extensionArchivo == 'png' || extensionArchivo == 'jpg'){
            // Actualizar del usuario el campo imagen
            Usuario.findByIdAndUpdate(usuarioId, {imagen: nombreArchivo}, (err, usuarioConImg)=>{
                if(err){
                    res.status(500).send({message: "Error en el servidor"});
                }else{
                    if(!usuarioConImg){
                        res.status(200).send({message: "No fue posible subir la imagen"});
                    }else{
                        res.status(200).send({
                            message: "Imagen anexada!",
                            imagen: nombreArchivo,
                            usuario: usuarioConImg
                        });
                    }
                }
            });
        }else{
            // Formato no válido
            res.status(200).send({message: "Formato inválido! El archivo no es una imagen"});
        }

    }else{
        res.status(200).send({message: "No has subido imagenes"});
    }
}

// Función Mostrar Archivo
function mostrarArchivo(req, res){
    // Pedir el archivo que queremos mostrar
    var archivo = req.params.imageFile;
    // Ubicación del archivo
    var ruta = './archivos/usuarios/'+archivo;

    // Validar si existe o no
    // fs.exists('La ruta del archivo a buscar', (existencia)=>{})
    fs.exists(ruta, (exists)=>{
        if(exists){
            res.sendFile(path.resolve(ruta));
        }else{
            res.status(200).send({message: "Imagen no encontrada"});
        }
    });
}
// Exportar paquete de Funciones 
module.exports = {
    registrarUsuario,
    login,
    actualizarUsuario,
    subirImg,
    mostrarArchivo
}

// Eliminar Usuario