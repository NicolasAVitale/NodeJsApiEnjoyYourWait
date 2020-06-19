import Usuario from '../models/Usuario.js'
import UsuariosDaoFactory from '../dao/Usuarios/UsuarioDaoFactory.js'
import CustomError from '../errores/CustomError.js'

class UsuariosApi {

    constructor() {
        this.usuariosDao = UsuariosDaoFactory.getDao()
    }


    async buscar(queryParams) {
        let usuarios
        if (queryParams.size == 0) {
            usuarios = await this.usuariosDao.getAll()
        } else if (queryParams.has('id')) {
            const id = parseInt(queryParams.get('id'))
            usuarios = await this.usuariosDao.getById(id)
        } else if (queryParams.has('rol')) {
            const rol = parseInt(queryParams.get('rol'))
            usuarios = await this.usuariosDao.getByRol(rol)
        } else {
            throw new CustomError(400, 'parametros de consulta invalidos', queryParams)
        }

        return usuarios
    }

    async agregar(userAgregar) {
        UsuariosApi.esUsuarioValido(userAgregar)
        const userAgregado = await this.usuariosDao.add(userAgregar)
        return userAgregado
    }

    async actualizar(id, datosAactualizar) {
        const usuarioActualizado = await this.usuariosDao.updateById(id, datosAactualizar)
        return usuarioActualizado
    }
    
    async eliminar(id) {
        await this.usuariosDao.deleteById(id)
    }

    static esUsuarioValido(usuario) {
        try {
            Usuario.validar(usuario)
        } catch (error) {
            throw new CustomError(400, 'el usuario a ingresar es invalido', error)
        }
    }

    async findUserByName(nombre, pass) {
        try {
            return await this.usuariosDao.getByNameAndPass(nombre,pass)
        } catch (error) {
            throw new CustomError(400, 'No se encontraron datos', error)
        }
    }

    async findUserById(id) {
        try {
            return await this.usuariosDao.getById(id)
        } catch (error) {
            throw new CustomError(400, 'No se encontraron datos', error)
        }
    }
}


export default UsuariosApi