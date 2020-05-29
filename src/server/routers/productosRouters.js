import express from 'express';

function getProductosRouter(){

    const router = express.Router();

    router.get('/', (req, res) => {
        res.status(200).send("Hola Mundo!")
    })

    return router;
}


export { getProductosRouter }