import Producto from '../models/Producto.js'

function validarProductos(productos) {
    for (const producto of productos) {
        validarProducto(productos)
    }
}

function validarProducto(producto) {
    Producto.validar(producto)
}


export {
    validarProductos,
    validarProducto
}