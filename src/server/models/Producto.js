import Joi from '@hapi/joi';

class Producto{
    
    constructor(detalle, nombre, precio, idPrecio, imagen = "null"){
        this.nombre = nombre
        this.precio = precio
        this.idPrecio = idPrecio
        this.imagen = imagen

    }

    static validar(producto){
        const productoSchema = {
            nombre: Joi.string().alphanum().min(1).required(),
            precio: Joi.number().integer().min(0).required(),
            idTipo: Joi.number().integer().min(1).required(),
            imagen: Joi.string().alphanum()
        }

        const { error } = Joi.validate(producto, productoSchema)
        if (error) {
            throw error
        }
    }
}

export default Producto