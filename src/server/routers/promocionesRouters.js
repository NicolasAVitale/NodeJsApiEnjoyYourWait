import express from 'express';
import PromocionesApi from '../api/PromocionesApi.js'
import jwtMdw from '../middleware/jwtMiddleware.js'

function getPromocionesRouter(){

    const router = express.Router()

    const promocionesApi = new PromocionesApi()

    router.get('/', jwtMdw.ensureAuthenticated, async (req, res) => {
        
        try {
            const queryParams = new Map(Object.entries(req.query))
            const promociones =  await promocionesApi.buscar(queryParams)
            res.status(200).json(promociones)
        } catch (err) {
            res.status(400).json(err)
        }
    })

    router.post('/', jwtMdw.ensureAuthenticated, async (req, res) => {

        const promocionesAgregar = req.body
        try {
            const promocionesAgregado = await promocionesApi.agregar(promocionesAgregar)
            res.status(201).json(promocionesAgregado)
        } catch (err) {
            res.status(err.estado).json(err)
        }

    })

    router.delete('/:id', jwtMdw.ensureAuthenticated, async (req, res) => {

        try {
            await promocionesApi.eliminar(req.params.id)
            const mensaje = { "mensaje": "Eliminado correctamante" }
            res.status(204).json(mensaje)
        } catch (err) {
            res.status(err.estado).json(err)
        }

    })

    router.put('/:id', jwtMdw.ensureAuthenticated, async (req, res) => {

        const datos = req.body
        try {
            await promocionesApi.actualizar(req.params.id, datos)
            const mensaje = { "mensaje": "Editado correctamante" }
            res.status(200).json(mensaje)
        } catch (err) {
            res.status(err.estado).json(err)
        }

    })

    router.put('/activar/:id', jwtMdw.ensureAuthenticated, async (req, res) => {

        const datos = req.body
        try {
            await promocionesApi.activar(req.params.id, datos)
            const mensaje = { "mensaje": "Activado correctamante" }
            res.status(200).json(mensaje)
        } catch (err) {
            res.status(err.estado).json(err)
        }

    })

    router.put('/desactivar/:id', jwtMdw.ensureAuthenticated, async (req, res) => {

        const datos = req.body
        try {
            await promocionesApi.desactivar(req.params.id, datos)
            const mensaje = { "mensaje": "Desactivado correctamante" }
            res.status(200).json(mensaje)
        } catch (err) {
            res.status(err.estado).json(err)
        }

    })

    router.post('/agregarProducto', jwtMdw.ensureAuthenticated, async (req, res) => {
        try {
            await promocionesApi.agregarProductoApromocion(req.body.IdProducto, req.body.IdPromocion)
            const mensaje = { "mensaje": "Producto asociado correctamante" }
            res.status(201).json(mensaje)
        } catch (err) {
            res.status(err.estado).json(err)
        }

    })

    return router;
}


export { getPromocionesRouter }