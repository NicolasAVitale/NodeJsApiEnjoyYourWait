import JoiBase from "@hapi/joi" 
import JoiDate from "@hapi/joi-date"
const Joi = JoiBase.extend(JoiDate) // extend Joi with Joi Date

class Usuario {

    constructor(dni, nombre, apellido, email, fechaNacimiento, contrasena, idRol,fechaPrimerIngreso,activo) {
        this.dni = dni
        this.nombre = nombre
        this.apellido = apellido
        this.email = email
        this.fechaNacimiento = fechaNacimiento
        this.contrasena = contrasena
        this.idRol = idRol
        this.fechaPrimerIngreso = fechaPrimerIngreso
        this.activo = activo
    }

    static validar(usuario) {

        const usuarioSchema = Joi.object({
            dni: Joi.number().integer().min(1).max(99999999).required(),
            nombre: Joi.string().alphanum().min(1).max(150).required(),
            apellido: Joi.string().alphanum().min(1).max(150).required(),
            email: Joi.string().email(),
            fechaNacimiento: Joi.date().format('YYYY-MM-DD'),
            contrasena: Joi.string().alphanum().min(0).max(100),
            idRol: Joi.number().integer().min(1).required(),
            fechaPrimerIngreso: Joi.date().format('YYYY-MM-DD'),
            activo: Joi.number().integer().min(1)
        })

        const { error } = usuarioSchema.validate(usuario)

        if (error) {
            throw error
        }
    }
}

export default Usuario