import Cliente from '../models/Cliente.js'
import ClientesDaoFactory from '../dao/Clientes/ClienteDaoFactory.js'
import CustomError from '../errores/CustomError.js'

class ClientesApi {

    constructor() {
        this.clientesDao = ClientesDaoFactory.getDao()
    }


    async buscar(queryParams) {
        let clientes
        if (queryParams.size == 0) {
            clientes = await this.clientesDao.getAll()
        } else if (queryParams.has('id')) {
            const id = parseInt(queryParams.get('id'))
            clientes = await this.clientesDao.getById(id)
        } else if (queryParams.has('dni')) {
            const dni = parseInt(queryParams.get('dni'))
            clientes = await this.clientesDao.getByDni(dni)
        } else {
            throw new CustomError(400, 'parametros de consulta invalidos', queryParams)
        }

        return clientes
    }

    async agregar(clientAgregar) {
        ClientesApi.esClienteValido(clientAgregar)
        const clientAgregado = await this.clientesDao.add(clientAgregar)
        return clientAgregado
    }

    async actualizar(id, datosAactualizar) {
        const clienteActualizado = await this.clientesDao.updateById(id, datosAactualizar)
        return clienteActualizado
    }
    
    async eliminar(id) {
        await this.clientesDao.deleteById(id)
    }

    static esClienteValido(cliente) {
        try {
            Cliente.validar(cliente)
        } catch (error) {
            throw new CustomError(400, 'el cliente a ingresar es invalido', error)
        }
    }
}


export default ClientesApi