import UsuariosDao from './UsuariosDao.js'
import CustomError from '../../errores/CustomError.js'
import DbClientFactory from '../../db/DbClientFactory.js'

class UsuariosDaoDb extends UsuariosDao {


    constructor(){
        super()
        this.client = DbClientFactory.getDbClient()
        this.tabla = 'dbo.Usuarios'
        this.idName = 'idUsuario'
        this.emailName = 'email'
        this.nombreName = 'nombre'
        this.passName = 'contrasena'
    }

     async getAll() {
        try {
            const usuarios = await this.client.fetchData('*', this.tabla)
            return usuarios
        } catch (err) {
            throw new CustomError(500, 'error al obtener todos los usuarios', err)
        }
    }

    async getById(id) {
        try {
            const usuarios = await this.client.getByID('*', this.tabla, id , this.idName)
            return usuarios
        } catch (err) {
            throw new CustomError(500, 'error al obtener todos los usuarios', err)
        }
    }

    async getByRol(rol) {
        try {
            const usuarios = await this.client.getByRol('*', this.tabla, rol , this.idName)
            return usuarios
        } catch (err) {
            throw new CustomError(500, 'error al obtener todos los usuarios', err)
        }
    }

    async add(usuarioNuevo) {
        try {
            const usuario = await this.client.insertUsuario(usuarioNuevo,this.tabla)
        } catch (err) {
            throw new CustomError(500, 'error al crear el usuario', err)
        }
        return usuarioNuevo
    }

    async deleteById(id) {
        let result
        try {
            result = await this.client.deleteById(id, this.idName, this.tabla)
            return result
        } catch (err) {
            throw new CustomError(500, 'error al eliminar el usuario', err)
        }

    }

    async updateById(id, datosAcambiar) {
        let result
        try {

            if (datosAcambiar.email == undefined) {
                datosAcambiar.email = await this.getCampoById('email', id)
                const email = new Map(Object.entries(datosAcambiar.email))
                datosAcambiar.email = email.get('0').email
            }

            const datos = `email = '${datosAcambiar.email}'`
            result = await this.client.updateById(id, this.idName, this.tabla, datos)
        } catch (error) {
            throw new CustomError(500, `error al editar el usuario`, error)
        }

        if (result.rowsAffected == 0) {
            throw new CustomError(404, `no existe un usuario para editar con id: ${id}`, { id })
        } else {
            return result
        }

    }

    async getCampoById(data, id) {
        try {
            const campoGet = await this.client.getByID(data, this.tabla, id, this.idName)
            return campoGet.recordset
        } catch (err) {
            throw new CustomError(500, 'error al obtener el campo', err)
        }
    }

    async getByNameAndPass(name,pass) {
        try {
            const usuarios = await this.client.getByNameAndPass('*', this.tabla,name,pass, this.nombreName, this.passName)
            return usuarios
        } catch (err) {
            throw new CustomError(500, 'error al obtener todos los usuarios', err)
        }
    }

    async login(login) {
        try {
            const usuario = await this.client.login('*', this.tabla,login.email, login.contrasena, this.emailName, this.passName)
            return usuario
        } catch (err) {
            throw new CustomError(500, 'error al loguear', err)
        }
    }

}


export default UsuariosDaoDb