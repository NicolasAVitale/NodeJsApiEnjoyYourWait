import Joi from '@hapi/joi';

class Producto{
    
    constructor(detalle, nombre, precio, idPrecio, imagen = "null"){
        this.nombre = nombre
        this.precio = precio
        this.idTipo = idPrecio
        this.imagen = imagen

    }

    static validar(producto){
        const productoSchema = {
            nombre: Joi.string().alphanum().min(150).required(),
            precio: Joi.number().integer().min(0).required(),
            idTipo: Joi.number().integer().min(1).required(),
            imagen: Joi.string().alphanum().min(100)
        }

        const { error } = Joi.validate(producto, productoSchema)
        if (error) {
            throw error
        }
    }
}

export default Producto