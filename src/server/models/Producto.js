import Joi from '@hapi/joi';

class Producto{
    
    constructor(id, detalle){
        this.id = id;
        this.detalle = detalle;
    }

    static validar(producto){
        const productoSchema = {
            id: Joi.number().integer().min(0),
            detalle: Joi.string().alphanum().min(1).required()
        }

        const { error } = Joi.validate(producto, productoSchema)
        if (error) {
            throw error
        }
    }
}

Producto.currentId = 0

export default Producto