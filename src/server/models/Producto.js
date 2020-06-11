import Joi from '@hapi/joi';

class Producto{
    
    constructor(nombre, precio, idTipo, imagen){
        this.idProducto = idProducto
        this.nombre = nombre
        this.precio = precio
        this.idTipo = idTipo
        this.imagen = imagen
        this.activo = activo
    }

    static validar(producto){
        const productoSchema = Joi.object({
            idProducto: Joi.number().integer(),
            nombre: Joi.string().trim().min(1).max(150).required(),
            precio: Joi.number().precision(2).min(1).max(9999).required(),
            idTipo: Joi.number().integer().min(1).required(),
            imagen: Joi.string().trim().min(0).max(100),
            activo: Joi.number().integer().min(0).max(1)
        })
        const { error } = productoSchema.validate(producto)
        console.log(error)
        if (error) {
            throw error
        }
        
    }
}

export default Producto