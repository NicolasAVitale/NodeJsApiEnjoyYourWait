import Config from '../../../config.js'
import MyMsSqlClient from './MyMsSqlClient.js'

let sqlClient = null

function getMsSqlClient() {
    if (!sqlClient) {
        sqlClient = new MyMsSqlClient()
    }
    return sqlClient
}

class DbClientFactory {

    static getDbClient() {
        switch (Config.db.client) {
            case 'sql': return getMsSqlClient()
            // default: return getNullDbClient()
        }
    }
}

export default DbClientFactory