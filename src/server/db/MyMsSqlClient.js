/* eslint-disable no-console */
import Config from '../../../config.js'
import CustomError from '../errores/CustomError.js'
import mssql from 'mssql'


class MyMsSqlClient {
    constructor() {
        this.configConnection = Config.db
    }

    async connect() {
        try {
            await mssql.connect(this.configConnection);
            console.log("Connection Successful !");
        } catch (error) {
            throw new CustomError(500, 'error al conectarse a SQL', error)
        }
    }

    async disconnect() {

        try {
            await mssql.close();
            console.log("Desconexion Successful !");
        } catch (error) {
            throw new CustomError(500, 'error al desconectarse a SQL', error)
        }
    }                   

    async query() {

        try {
            return mssql.query('select * from dbo.Clientes');
            
        } catch (error) {
            throw new CustomError(500, 'error al desconectarse a SQL', error)
        }
    }   
}

export default MyMsSqlClient



