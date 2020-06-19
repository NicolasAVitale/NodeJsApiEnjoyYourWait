import CustomError from '../../errores/CustomError.js'

class UsuariosDao {

    async getAll() {
        throw new CustomError(500, 'falta implementar getAll!')
    }

    async add(prodNuevo) {
        throw new CustomError(500, 'falta implementar add!')
    }

    async getById(id) {
        throw new CustomError(500, 'falta implementar getByDni!')
    }

    async getByRol(rol) {
        throw new CustomError(500, 'falta implementar getByRol!')
    }

    async deleteById(id) {
        throw new CustomError(500, 'falta implementar deleteById!')
    }

    async deleteAll() {
        throw new CustomError(500, 'falta implementar deleteAll!')
    }

    async updateById(id, prodNuevo) {
        throw new CustomError(500, 'falta implementar updateById!')
    }

    async getByNameAndPass(name,pass) {
        throw new CustomError(500, 'falta implementar getByNameAndPass!')
    }

}

export default UsuariosDao