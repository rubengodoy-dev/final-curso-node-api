import SingletonMessages from "../daos/message/singletonPersistenceFactory.js"


export default class MessageService {
    constructor() {
        this.messageDao
        this.init()
    }

    init = async () => {
        //  this.usersDao = await PersistenceFactory.getPersistence()

        this.messageDao = await SingletonMessages.getInstance()
    }
    getAll = async () => {
        try {
            const result = await this.messageDao.getAll();
            return { success: true, body: result }
        } catch (err) {
            return { success: false, error: err }
        }

    }

    getById = async (id) => {
        try {
    
          const result = await this.messageDao.getById(id);
          return { success: true, body: result }
        } catch (err) {
          return { success: false, error: err }
        }
    
      };

      
  add = async (entityData) => {
    try {
      const result = await this.messageDao.save(entityData)
      return { success: true, body: result }
    } catch (err) {
      return { success: false, error: err }
    }
  }

  
  delete = async (id) => {
    try {
      const result = await this.messageDao.delete(id)
      if (result) {
        return { success: true, body: result }
      }
      else {
        return { success: false, error: { message: 'registro no encontrado' } }
      }

    } catch (err) {
      return { success: false, error: err }
    }

  }

  
  getByEmail = async (email) => {
    try {
      const result = await this.messageDao.getByField("email", email, false);
      return { success: true, body: result }
    } catch (err) {
      return { success: false, error: err }
    }

  };


}