import request from 'request-promise-native'

class Cliente {

    constructor(ipDir, puerto, entidad) {
        this.puerto = puerto
        this.serverUrl = `${ipDir}:${puerto}/api/${entidad}`
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

    async buscarProductoPorId(params) {
        const producto = await request({
            method: 'GET',
            uri: this.serverUrl,
            qs: params,
            json: true
        })
        return producto
    }

    async actualizarProducto(id, datos) {
        const producto = await request({
            method: 'PUT',
            uri: this.serverUrl + '/' + id,
            body: datos,
            json: true
        })
        return producto
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

    async agregarUsuario(usuario) {
        const postOpt = {
            method: 'POST',
            uri: this.serverUrl,
            json: true
        }
        if (usuario) {
            postOpt.body = usuario
        }

        const user = await request(postOpt)
        return user
    }

    async buscarUsuarios() {
        const usuarios = await request({
            method: 'GET',
            uri: this.serverUrl,
            json: true
        })
        return usuarios
    }
}

export default Cliente
