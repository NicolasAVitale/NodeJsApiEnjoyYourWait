import passport from 'passport'
import _JwtStrategy from 'passport-jwt'
import _LocalStrategy from 'passport-local'
import _ExtractJwt from 'passport-jwt'
import UsuariosApi from './api/UsuariosApi.js'

class MyPassport {

    constructor(){

        const JwtStrategy = _JwtStrategy.Strategy
        const LocalStrategy = _LocalStrategy.Strategy
        const ExtractJwt = _ExtractJwt.ExtractJwt
        const usuApi = new UsuariosApi()

        /** config de estrategia local de passport ******/
        passport.use(new LocalStrategy({
            usernameField: "nombre",
            passwordField: "contrasena",
            session: false
        }, async (nombre, contrasena, done) => {
            try {
                // console.log("ejecutando *callback verify* de estategia local");
                const existe = await usuApi.findUserByName(nombre, contrasena)
                if (existe.rowsAffected == 0) return await done('no coinciden las credenciales', false); //el usuario no existe
                const data = { "id": existe.recordset[0].idUsuario, "nombre": nombre, "contrasena": contrasena }
                return await done(null, data); //login ok
            } catch (error) {
                return await done(error, null);
            }
            
        }));

        /** config de estrategia jwt de passport ******/
        let opts = {}
        opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
        opts.secretOrKey = process.env.JWT_SECRET;
        opts.algorithms = [process.env.JWT_ALGORITHM];

        passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
            try {
                // console.log("ejecutando *callback verify* de estategia jwt"); 
                const user = await usuApi.findUserById(jwt_payload.sub);
                if (user.rowsAffected == 0) {
                    return await done('usuario no existe', null);
                }
                return await done(null, user);
            } catch (error) {

                return await done(error, null);
            }
            

        }));

    }

}


export default MyPassport




