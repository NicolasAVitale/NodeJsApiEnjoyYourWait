import request from 'request-promise-native'

class Cliente {

    constructor(ipDir, puerto, entidad) {
        this.puerto = puerto
        this.serverUrl = `${ipDir}:${puerto}/api/${entidad}`
    }

    async obtenerToken(datosAutenticacion) {
        console.log(datosAutenticacion)
        const postOpt = {
            method: 'POST',
            uri: `http://127.0.0.1:${this.puerto}/api/usuarios/login`,
            json: true
        }
        console.log(postOpt.uri)
        if (datosAutenticacion) {
            postOpt.body = datosAutenticacion
        }

        const prod = await request(postOpt)
        console.log(prod.token)
        return prod
    }

    async agregarProducto(producto, token) {
        const postOpt = {
            method: 'POST',
            uri: this.serverUrl,
            json: true,
            auth:{
                "Bearer": token
            }
        }
        if (producto) {
            postOpt.body = producto
        }

        const prod = await request(postOpt)
        return prod
    }

    async buscarProductos(token) {
        const productos = await request({
            method: 'GET',
            uri: this.serverUrl,
            json: true,
            auth:{
                "Bearer": token
            }
        })
        return productos
    }

    async buscarProductoPorId(params, token) {
        const producto = await request({
            method: 'GET',
            uri: this.serverUrl,
            qs: params,
            json: true,
            auth:{
                "Bearer": token
            }
        })
        return producto
    }

    async actualizarProducto(id, datos, token) {
        const producto = await request({
            method: 'PUT',
            uri: this.serverUrl + '/' + id,
            body: datos,
            json: true,
            auth:{
                "Bearer": token
            }
        })
        return producto
    }

    async activarProducto(id, token) {
        const productos = await request({
            method: 'PUT',
            uri: this.serverUrl + '/activar/' + id, 
            json: true,
            auth:{
                "Bearer": token
            }
        })
        return productos
    }


    async desactivarProducto(id, token) {
        const productos = await request({
            method: 'PUT',
            uri: this.serverUrl + '/desactivar/' + id, 
            json: true,
            auth:{
                "Bearer": token
            }
        })
        return productos
    }

    async agregarUsuario(usuario, token) {
        const postOpt = {
            method: 'POST',
            uri: this.serverUrl,
            json: true,
            auth:{
                "Bearer": token
            }
        }
        if (usuario) {
            postOpt.body = usuario
        }

        const user = await request(postOpt)
        return user
    }

    async buscarUsuarios(token) {
        const usuarios = await request({
            method: 'GET',
            uri: this.serverUrl,
            json: true,
            auth:{
                "Bearer": token
            }
        })
        return usuarios
    }
}

export default Cliente
