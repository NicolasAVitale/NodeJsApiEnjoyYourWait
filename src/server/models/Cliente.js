import JoiBase from "@hapi/joi" 
import JoiDate from "@hapi/joi-date"
const Joi = JoiBase.extend(JoiDate) // extend Joi with Joi Date

class Cliente {

    constructor(dni, nombre, apellido, email, fechaNacimiento, activo) {
        this.dni = dni
        this.nombre = nombre
        this.apellido = apellido
        this.email = email
        this.fechaNacimiento = fechaNacimiento
        this.activo = activo
    }

    static validar(cliente) {

        const clienteSchema = Joi.object({
            dni: Joi.number().integer().min(1).max(99999999).required(),
            nombre: Joi.string().alphanum().min(1).max(150).required(),
            apellido: Joi.string().alphanum().min(1).max(150).required(),
            email: Joi.string().email(),
            fechaNacimiento: Joi.date().format('YYYY-MM-DD'),
            activo: Joi.number().integer().min(1)
        })

        const { error } = clienteSchema.validate(cliente)

        if (error) {
            throw error
        }
    }
}

export default Cliente