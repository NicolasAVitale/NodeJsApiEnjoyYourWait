import CustomError from '../../errores/CustomError.js'

class ProductosDao {

    async getAll() {
        throw new CustomError(500, 'falta implementar getAll!')
    }

    async add(prodNuevo) {
        throw new CustomError(500, 'falta implementar add!')
    }

    async getById(dni) {
        throw new CustomError(500, 'falta implementar getByDni!')
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

}

export default ProductosDao