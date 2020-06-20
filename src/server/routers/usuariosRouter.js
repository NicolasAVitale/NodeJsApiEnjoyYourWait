import express from 'express';
import UsuariosApi from '../api/UsuariosApi.js'
import jwtMdw from '../middleware/jwtMiddleware.js'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import CustomError from '../errores/CustomError.js'

function getUsuariosRouter() {

    const router = express.Router()

    const usuariosApi = new UsuariosApi()

    router.get('/', jwtMdw.ensureAuthenticated, async (req, res) => {

        try {
            const queryParams = new Map(Object.entries(req.query))
            const usuarios = await usuariosApi.buscar(queryParams)
            
            res.status(200).json(usuarios)
        } catch (err) {
            res.status(400).json(err)
        }
    })

    router.post('/', jwtMdw.ensureAuthenticated, async (req, res) => {

        const usuarioAgregar = req.body
        try {
            const usuarioAgregado = await usuariosApi.agregar(usuarioAgregar)
            res.status(201).json(usuarioAgregado)
        } catch (err) {
            res.status(err.estado).json(err)
        }

    })
 
    router.delete('/:id', jwtMdw.ensureAuthenticated, async (req, res) => {

        try {
            await usuariosApi.eliminar(req.params.id)
            res.status(204).send()
        } catch (err) {
            res.status(err.estado).json(err)
        }

    })

    router.put('/:id', jwtMdw.ensureAuthenticated, async (req, res) => {

        const datos = req.body
        try {
            await usuariosApi.actualizar(req.params.id, datos)
            const mensaje = { "mensaje": "editado correctamante" }
            res.status(204).json(mensaje)
        } catch (err) {
            res.status(err.estado).json(err)
        }

    })

    router.post('/auth', async (req, res) => {

        try {
            await passport.authenticate("local", { session: false }, async (error, user) => {
                // console.log("ejecutando *callback auth* de authenticate para estrategia local");

                //si hubo un error en el callback verify relacionado con la consulta de datos de usuario
                if (error || !user) {
                    const mensaje = { "error": error } //TODO: Mejorar este mensaje
                    res.status(404).json(mensaje)
                } else {
                    // console.log("*** comienza generacion token*****");
                    const payload = {
                        sub: user.id,
                        exp: Date.now() + parseInt(process.env.JWT_LIFETIME),
                        username: user.nombre
                    };
                    const token = await jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET, { algorithm: process.env.JWT_ALGORITHM });
                    const mensaje = { "token": token }
                    res.status(200).json(mensaje)
                }
            })(req, res);

        } catch (err) {
            res.status(err.estado).json(err)
        }

    })

    router.post('/login', jwtMdw.ensureAuthenticated, async (req, res) => {

        const datos = req.body
        try {
            const usuarioLogin = await usuariosApi.login(datos)
            res.status(200).json(usuarioLogin)
        } catch (err) {
            res.status(err.estado).json(err)
        }

    })

    return router;
}


export { getUsuariosRouter }