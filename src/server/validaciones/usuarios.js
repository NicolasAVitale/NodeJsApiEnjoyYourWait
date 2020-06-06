import Usuario from '../models/Usuario.js'

function validarUsuarios(usuarios) {
    for (const usuario of usuarios) {
        validarProducto(usuario)
    }
}

function validarUsuario(usuario) {
    Usuario.validar(usuario)
}


export {
    validarUsuarios,
    validarUsuario
}