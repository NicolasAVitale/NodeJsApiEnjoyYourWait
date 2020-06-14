import request from 'request-promise-native'

class Cliente {

    constructor(ipDir, puerto) {
        this.puerto = puerto
        this.serverUrl = `${ipDir}:${puerto}/api/productos`
    }

    async agregarProducto(producto) {
        const postOpt = {
            method: 'POST',
            uri: this.serverUrl,
            json: true
        }
        if (producto) {
            postOpt.body = producto
        }

        const prod = await request(postOpt)
        return prod
    }

    async buscarProductos() {
        const productos = await request({
            method: 'GET',
            uri: this.serverUrl,
            json: true
        })
        return productos
    }

    async activarProducto(id) {
        const productos = await request({
            method: 'PUT',
            uri: this.serverUrl + '/activar/' + id, 
            json: true
        })
        return productos
    }


    async desactivarProducto(id) {
        const productos = await request({
            method: 'PUT',
            uri: this.serverUrl + '/desactivar/' + id, 
            json: true
        })
        return productos
    }
}

export default Cliente
