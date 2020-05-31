import express from 'express';

function getProductosRouter(){

    const router = express.Router();

    router.get('/', (req, res) => {
        var mensaje = {"Mensaje":"Hola Mundo!"};
        res.status(200).send(mensaje)
    })

    return router;
}


export { getProductosRouter }