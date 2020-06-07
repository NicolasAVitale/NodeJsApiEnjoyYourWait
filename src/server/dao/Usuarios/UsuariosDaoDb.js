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

            if (datosAcambiar.Email == undefined) {
                datosAcambiar.Email = await this.getCampoById('Email', id)
                const Email = new Map(Object.entries(datosAcambiar.Email))
                datosAcambiar.Email = Email.get('0').Email
            }
            if (datosAcambiar.Dni == undefined) {
                datosAcambiar.Dni = await this.getCampoById('Dni', id)
                const dni = new Map(Object.entries(datosAcambiar.Dni))
                datosAcambiar.Dni = dni.get('0').Dni
            }

            const datos = `Dni = '${datosAcambiar.Dni}',  Email = '${datosAcambiar.Email}'`
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

}


export default UsuariosDaoDb