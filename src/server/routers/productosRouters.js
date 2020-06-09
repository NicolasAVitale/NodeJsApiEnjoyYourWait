import express from 'express';
import ProductosApi from '../api/ProductosApi.js'

function getProductosRouter(){

    const router = express.Router()

    const productosApi = new ProductosApi()

    router.get('/', async (req, res) => {
        
        try {
            const queryParams = new Map(Object.entries(req.query))
            const productos =  await productosApi.buscar(queryParams)
            res.status(200).json(productos)
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

    router.put('/:id', async (req, res) => {

        const datos = req.body
        try {
            await productosApi.actualizar(req.params.id, datos)
            const mensaje = { "mensaje": "editado correctamante" }
            res.status(204).send()
        } catch (err) {
            res.status(err.estado).json(err)
        }

    })

    return router;
}


export { getProductosRouter }