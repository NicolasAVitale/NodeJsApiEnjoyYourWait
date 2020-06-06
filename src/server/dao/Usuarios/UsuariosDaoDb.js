import UsuariosDao from './UsuariosDao.js'
import CustomError from '../../errores/CustomError.js'
import DbClientFactory from '../../db/DbClientFactory.js'

class UsuariosDaoDb extends UsuariosDao {


    constructor(){
        super()
        this.client = DbClientFactory.getDbClient()
        this.tabla = 'dbo.Usuarios'
        this.idName = 'idUsuario'
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

    async add(usuarioNuevo) {
        try {
            const usuario = await this.client.insertUsuario(usuarioNuevo,this.tabla)
        } catch (err) {
            throw new CustomError(500, 'error al crear el usuario', err)
        }
        return usuarioNuevo
    }

}


export default UsuariosDaoDb