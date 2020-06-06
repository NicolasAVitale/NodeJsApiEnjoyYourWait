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

    static esUsuarioValido(usuario) {
        try {
            Usuario.validar(usuario)
        } catch (error) {
            throw new CustomError(400, 'el usuario a ingresar es invalido', error)
        }
    }
}


export default UsuariosApi