import FilaClientesDao from './FilaClientesDao.js'
import CustomError from '../../errores/CustomError.js'
import DbClientFactory from '../../db/DbClientFactory.js'

class FilaClientesDaoDb extends FilaClientesDao {

    constructor(){
        super()
        this.client = DbClientFactory.getDbClient()
        this.tabla = 'dbo.FilaCliente'
        this.idName = 'idCliente'
    }

    async calculateTimeAndPeopleById(id, capacidad, tiempo) {
        try {
            const tiempoPersonasCliente = await this.client.calculateTimeAndPeopleById(id, capacidad, tiempo)
            return tiempoPersonasCliente
        } catch (err) {
            throw new CustomError(500, 'error al calcular el tiempo estimado de espera y personas adelante', err)
        }
    }

    async calculateGeneralTimeAndPeople(capacidad, tiempo) {
        try {
            const tiempoPersonasGeneral = await this.client.calculateGeneralTimeAndPeople(capacidad, tiempo)
            return tiempoPersonasGeneral
        } catch (err) {
            throw new CustomError(500, 'error al calcular el tiempo estimado de espera y personas adelante', err)
        }
    }

    async updateRestaurantClientState(tiempo) {
        let result
        try {
            result = await this.client.updateRestaurantClientState(tiempo)
            return result
        } catch (err) {
            throw new CustomError(500, 'error al actualizar el estado de los clientes dentro del restaurante', err)
        }
    }

    async addClient(queueClient) {
        let result
        try {
            result = await this.client.insertClientToQueue(queueClient,this.tabla)
            return result
        } catch (err) {
            throw new CustomError(500, 'error al ingresar cliente a la fila', err)
        }
    }

    async updateClient(idCliente, datosAcambiar) {
        let result       

        try {
            if (datosAcambiar.cantComensales == undefined) {
                datosAcambiar.cantComensales = await this.getCampoByPK('cantComensales', idCliente,datosAcambiar.fechaIngFila)
                const cantComensales = new Map(Object.entries(datosAcambiar.cantComensales))
                datosAcambiar.cantComensales = cantComensales.get('0').cantComensales
            }
            if (datosAcambiar.fechaEgrFila == undefined) {
                datosAcambiar.fechaEgrFila = await this.getCampoByPK('fechaEgrFila', idCliente,datosAcambiar.fechaIngFila)
                const fechaEgrFila = new Map(Object.entries(datosAcambiar.fechaEgrFila))
                datosAcambiar.fechaEgrFila = fechaEgrFila.get('0').fechaEgrFila
                    
            }
            if (datosAcambiar.esConfirmado == undefined) {
                datosAcambiar.esConfirmado = await this.getCampoByPK('esConfirmado', idCliente,datosAcambiar.fechaIngFila)
                const esConfirmado = new Map(Object.entries(datosAcambiar.esConfirmado))
                datosAcambiar.esConfirmado = esConfirmado.get('0').esConfirmado
            }
            if (datosAcambiar.activo == undefined) {
                datosAcambiar.activo = await this.getCampoByPK('activo', idCliente,datosAcambiar.fechaIngFila)
                const activo = new Map(Object.entries(datosAcambiar.activo))
                datosAcambiar.activo = activo.get('0').activo
            }

            const datos = `cantComensales = ${datosAcambiar.cantComensales}, fechaEgrFila = '${datosAcambiar.fechaEgrFila}', esConfirmado = ${datosAcambiar.esConfirmado}, activo = ${datosAcambiar.activo}`
            result = await this.client.updateClientQueue(idCliente, datosAcambiar.fechaIngFila, datos)
            return result
        } catch (err) {
            throw new CustomError(500, 'error al editar cliente a la fila', err)
        }
    }

    async getCampoByPK(data, idCliente,fechaIng) {

        try {
            const campoGet = await this.client.getByPK(data, this.tabla, idCliente, fechaIng + '.000')
            return campoGet
        } catch (err) {
            throw new CustomError(500, 'error al obtener el campo', err)
        }
    }
}


export default FilaClientesDaoDb