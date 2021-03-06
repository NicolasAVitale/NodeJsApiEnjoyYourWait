import express from 'express';
import ProductosApi from '../api/ProductosApi.js'
import MyMsSqlClient from '../db/MyMsSqlClient.js'

function getProductosRouter(){

    const router = express.Router()

    const productosApi = new ProductosApi()

    router.get('/', async (req, res) => {
        
        try {
            const queryParams = new Map(Object.entries(req.query))
            const productos =  await productosApi.buscar(queryParams)

            const respuesta = { "productos": productos, "cantidad": productos.length}
            res.status(200).json(respuesta)
        } catch (err) {
            res.status(400).json(err)
        }
    })

    router.post('/', async (req, res) => {

        const productoAgregar = req.body
        try {
            const productoAgregado = await productosApi.agregar(productoAgregar)
            res.status(201).json(productoAgregado)
        } catch (err) {
            res.status(err.estado).json(err)
        }

    })

    router.delete('/:id', async (req, res) => {

        try {
            await productosApi.eliminar(req.params.id)
            const mensaje = { "mensaje": "eliminado correctamante" }
            res.status(204).send()
        } catch (err) {
            res.status(err.estado).json(err)
        }

    })

    return router;
}


export { getProductosRouter }