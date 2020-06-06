import Joi from '@hapi/joi';

class Producto{
    
    constructor(nombre, precio, idTipo, imagen){
        this.nombre = nombre
        this.precio = precio
        this.idTipo = idTipo
        this.imagen = imagen

    }

    static validar(producto){

        const productoSchema = Joi.object({
            nombre: Joi.string().trim().min(1).max(150).required(),
            precio: Joi.number().precision(2).min(1).max(9999).required(),
            idTipo: Joi.number().integer().min(1).required(),
            imagen: Joi.string().trim().min(0).max(100)
        })
        const { error } = productoSchema.validate(producto)

        if (error) {
            throw error
        }
        
    }
}

export default Producto