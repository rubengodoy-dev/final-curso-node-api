class DbClient{
    async connect(){
        throw new Error("falta implementar 'connect' en la subclase")
    }
    async disconnect(){
        throw new Error("falta implementar 'disconnect' en la subclase")
    }
}

export default DbClient