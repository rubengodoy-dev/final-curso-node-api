import  os from "os"
import config from "../config/config.js"

const getInfoAboutProcess=()=>{
    let info = {       
        path: process.argv[0],
        sistemaOperativo: process.platform,
        processId: process.pid,
        versionNode: process.version,
        carpeta: process.cwd(),
        memoriaTotalReservada: process.memoryUsage().rss,
        numeroProcesadores: os.cpus().lengt ,
        puerto: config.app.port,
        mongo: config.mongo.url,
        mail: config.mail.host,
        user: config.mail.user,
        admin:config.mail.admin
        
    }

    return info

}

export default getInfoAboutProcess
