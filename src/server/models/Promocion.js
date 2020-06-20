import Joi from '@hapi/joi';

class Promocion{
    
    /*Revisar bien si es necesario que le pase todo aquello en el constructor*/
    constructor(descripcion, fechaInicio, fechaBaja, esPremio){
        this.idPromocion = idPromocion
        this.descripcion = descripcion
        this.fechaInicio = fechaInicio
        this.fechaBaja = fechaBaja
        this.esPremio = esPremio        
        this.activo = activo
    }

    static validar(promocion){
        const promocionSchema = Joi.object({
            idPromocion: Joi.number().integer(),
            descripcion: Joi.string().trim().min(1).max(150).required(),
            fechaInicio: Joi.date().format('YYYY-MM-DD'),
            fechaBaja: Joi.date().format('YYYY-MM-DD'),
            esPremio: Joi.number().integer().min(0).max(1),
            activo: Joi.number().integer().min(0).max(1)
        })
        const { error } = promocionSchema.validate(promocion)
        console.log(error)
        if (error) {
            throw error
        }
        
    }
}

export default Promocion