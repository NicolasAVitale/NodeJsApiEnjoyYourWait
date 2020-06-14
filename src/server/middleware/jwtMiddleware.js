
import passport from 'passport'
import CustomError from '../errores/CustomError.js'

class jwtMiddleware {

        static async  ensureAuthenticated (req, res, next){

            await passport.authenticate('jwt', { session: false }, async (err, user, info) => {
                // console.log("ejecutando *callback auth* de authenticate para estrategia jwt");
                //si hubo un error relacionado con la validez del token (error en su firma, caducado, etc)
                if (info) { return await next(new CustomError(401, 'No hay auth token provisto', { info })); }
                
                //si hubo un error en la consulta a la base de datos
                if (err) { return await next(err); }

                //si el token está firmado correctamente pero no pertenece a un usuario existente
                if (!user) { return await next(new CustomError(403, `el usuario no tiene la autorizacion para`, { user })); }

                //inyectamos los datos de usuario en la request
                req.user = user;
                return await next();
            }) (req, res, next);
        }

}


export default jwtMiddleware
