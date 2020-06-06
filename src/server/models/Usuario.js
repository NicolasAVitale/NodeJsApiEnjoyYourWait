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

        // const usuarioSchema = {
        //     dni: Joi.string().alphanum().min(1).max(150).required(),
        //     nombre: Joi.number().integrer().min(1).required(),
        //     apellido: Joi.number().integer().min(1).required(),
        //     email: Joi.string().alphanum().min(0).max(100),
        //     fechaNacimiento: Joi.string().alphanum().min(0).max(100),
        //     contrasena: Joi.string().alphanum().min(0).max(100),
        //     idRol: Joi.string().alphanum().min(0).max(100),
        //     fechaPrimerIngreso: Joi.string().alphanum().min(0).max(100),
        // }

        // const { error } = Joi.validate(usuario, usuarioSchema)
        // if (error) {
        //     throw error
        // }
        return usuario
    }
}

export default Usuario