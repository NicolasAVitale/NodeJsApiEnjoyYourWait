import express from 'express';
import ProductosApi from '../api/ProductosApi.js'
import jwtMdw from '../middleware/jwtMiddleware.js'

function getProductosRouter(){

    const router = express.Router()

    const productosApi = new ProductosApi()

    router.get('/', jwtMdw.ensureAuthenticated, async (req, res) => {
        
        try {
            const queryParams = new Map(Object.entries(req.query))
            const productos =  await productosApi.buscar(queryParams)
            res.status(200).json(productos)
        } catch (err) {
            res.status(400).json(err)
        }
    })

    router.post('/', jwtMdw.ensureAuthenticated, async (req, res) => {

        const productoAgregar = req.body
        try {
            const productoAgregado = await productosApi.agregar(productoAgregar)
            res.status(201).json(productoAgregado)
        } catch (err) {
            res.status(err.estado).json(err)
        }

    })

    router.delete('/:id', jwtMdw.ensureAuthenticated, async (req, res) => {

        try {
            await productosApi.eliminar(req.params.id)
            const mensaje = { "mensaje": "eliminado correctamante" }
            res.status(204).json(mensaje)
        } catch (err) {
            res.status(err.estado).json(err)
        }

    })

    router.put('/:id', jwtMdw.ensureAuthenticated, async (req, res) => {

        const datos = req.body
        try {
            await productosApi.actualizar(req.params.id, datos)
            const mensaje = { "mensaje": "editado correctamante" }
            res.status(200).json(mensaje)
        } catch (err) {
            res.status(err.estado).json(err)
        }

    })

    router.put('/activar/:id', jwtMdw.ensureAuthenticated, async (req, res) => {

        const datos = req.body
        try {
            await productosApi.activar(req.params.id, datos)
            const mensaje = { "mensaje": "activado correctamante" }
            res.status(204).send()
        } catch (err) {
            res.status(err.estado).json(err)
        }

    })

    router.put('/desactivar/:id', jwtMdw.ensureAuthenticated, async (req, res) => {

        const datos = req.body
        try {
            await productosApi.desactivar(req.params.id, datos)
            const mensaje = { "mensaje": "desactivado correctamante" }
            res.status(204).send()
        } catch (err) {
            res.status(err.estado).json(err)
        }

    })

    return router;
}


export { getProductosRouter }