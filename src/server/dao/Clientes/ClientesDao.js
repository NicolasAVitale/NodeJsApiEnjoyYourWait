import CustomError from '../../errores/CustomError.js'

class ClientesDao {

    async getAll() {
        throw new CustomError(500, 'falta implementar getAll!')
    }

    async add(clienteNuevo) {
        throw new CustomError(500, 'falta implementar add!')
    }

    async getById(id) {
        throw new CustomError(500, 'falta implementar getById!')
    }

    async deleteById(id) {
        throw new CustomError(500, 'falta implementar deleteById!')
    }

    async deleteAll() {
        throw new CustomError(500, 'falta implementar deleteAll!')
    }

    async updateById(id, clienteNuevo) {
        throw new CustomError(500, 'falta implementar updateById!')
    }

    async getByDni(dni) {
        throw new CustomError(500, 'falta implementar getByDni!')
    }

}

export default ClientesDao