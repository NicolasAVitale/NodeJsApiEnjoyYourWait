import Joi from "@hapi/joi"

class Usuario {

    constructor(dni, nombre, apellido, email, fechaNacimiento, contrasena, idRol,fechaPrimerIngreso) {
        this.dni = dni
        this.nombre = nombre
        this.apellido = apellido
        this.email = email
        this.fechaNacimiento = fechaNacimiento
        this.contrasena = contrasena
        this.idRol = idRol
        this.fechaPrimerIngreso = fechaPrimerIngreso
    }

    static validar(usuario) {

        const usuarioSchema = {
            dni: Joi.number().integer().min(1).max(99999999).required(),
            nombre: Joi.string().alphanum().min(1).max(150).required(),
            apellido: Joi.string().alphanum().min(1).max(150).required(),
            email: Joi.string().email().required(),
            fechaNacimiento: Joi.date().required(),
            contrasena: Joi.string().alphanum().min(0).max(100),
            idRol: Joi.number().integer().min(1).required(),
            fechaPrimerIngreso: Joi.date().required()
        }

        const { error } = usuarioSchema.validate(usuario)
        if (error) {
            throw error
        }
    }
}

export default Usuario