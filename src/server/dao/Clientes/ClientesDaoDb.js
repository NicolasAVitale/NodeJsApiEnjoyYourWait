import ClientesDao from './ClientesDao.js'
import CustomError from '../../errores/CustomError.js'
import DbClientFactory from '../../db/DbClientFactory.js'

class ClientesDaoDb extends ClientesDao {


    constructor(){
        super()
        this.client = DbClientFactory.getDbClient()
        this.tabla = 'dbo.Clientes'
        this.idName = 'idCliente'
        this.dniName = 'dni'
    }

     async getAll() {
        try {
            const clientes = await this.client.fetchData('*', this.tabla)
            return clientes
        } catch (err) {
            throw new CustomError(500, 'error al obtener todos los clientes', err)
        }
    }

    async getById(id) {
        try {
            const clientes = await this.client.getByID('*', this.tabla, id , this.idName)
            return clientes
        } catch (err) {
            throw new CustomError(500, 'error al obtener todos los clientes', err)
        }
    }

    async add(clienteNuevo) {
        try {
            const existe = await this.getByDni(clienteNuevo.dni)

            if (existe.rowsAffected == 0){
                const cliente = await this.client.insertCliente(clienteNuevo,this.tabla)
                const id = await this.getByDni(clienteNuevo.dni)
                clienteNuevo.idCliente = id.recordset[0].idCliente
                return clienteNuevo
            }else{
                const cliente = await this.updateById(existe.recordset[0].idCliente,clienteNuevo)
                clienteNuevo.idCliente = existe.recordset[0].idCliente
                return clienteNuevo
            }
            
        } catch (err) {
            throw new CustomError(500, 'error al crear el cliente', err)
        }
        
    }

    async deleteById(id) {
        let result
        try {
            result = await this.client.deleteById(id, this.idName, this.tabla)
            return result
        } catch (err) {
            throw new CustomError(500, 'error al eliminar el cliente', err)
        }

    }

    async updateById(id, datosAcambiar) {
        let result
        try {
            if (datosAcambiar.dni == undefined) {
                datosAcambiar.dni = await this.getCampoById('dni', id)
                const dni = new Map(Object.entries(datosAcambiar.dni))
                datosAcambiar.dni = dni.get('0').dni
            }
            if (datosAcambiar.nombre == undefined) {
                datosAcambiar.nombre = await this.getCampoById('nombre', id)
                const nombre = new Map(Object.entries(datosAcambiar.nombre))
                datosAcambiar.nombre = nombre.get('0').nombre
            }
            if (datosAcambiar.apellido == undefined) {
                datosAcambiar.apellido = await this.getCampoById('apellido', id)
                const apellido = new Map(Object.entries(datosAcambiar.apellido))
                datosAcambiar.apellido = apellido.get('0').apellido
            }
            if (datosAcambiar.email == undefined) {
                datosAcambiar.email = await this.getCampoById('email', id)
                const email = new Map(Object.entries(datosAcambiar.email))
                datosAcambiar.email = email.get('0').email
            }
            if (datosAcambiar.fechaNacimiento == undefined) {
                datosAcambiar.fechaNacimiento = await this.getCampoById('fechaNacimiento', id)
                const fechaNacimiento = new Map(Object.entries(datosAcambiar.fechaNacimiento))
                datosAcambiar.fechaNacimiento = fechaNacimiento.get('0').fechaNacimiento
            }
            if (datosAcambiar.activo == undefined) {
                datosAcambiar.activo = await this.getCampoById('activo', id)
                const activo = new Map(Object.entries(datosAcambiar.activo))
                datosAcambiar.activo = activo.get('0').activo
            }
            const datos = `dni = ${datosAcambiar.dni}, nombre = '${datosAcambiar.nombre}', apellido = '${datosAcambiar.apellido}', email = '${datosAcambiar.email}', fechaNacimiento = '${datosAcambiar.fechaNacimiento}', activo = ${datosAcambiar.activo}`
            result = await this.client.updateById(id, this.idName, this.tabla, datos)

        } catch (error) {
            throw new CustomError(500, `error al editar el cliente`, error)
        }

        if (result.rowsAffected == 0) {
            throw new CustomError(404, `no existe un cliente para editar con id: ${id}`, { id })
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

    async getByDni(dni) {
        try {
            const clientes = await this.client.getByID('*', this.tabla, dni, this.dniName)
            return clientes
        } catch (err) {
            throw new CustomError(500, 'error al obtener todos los clientes', err)
        }
    }

}


export default ClientesDaoDb