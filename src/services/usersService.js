import PersistenceFactory from '../daos/users/persistenceFactory.js'
import Singleton from "../daos/users/singletonPersistenceFactory.js"

export default class UsersService {
  constructor() {
    this.usersDao
    this.init()
  }

  init = async () => {
    //  this.usersDao = await PersistenceFactory.getPersistence()
    this.usersDao = await Singleton.getInstance()
  }
  getUsers = async () => {
    try {
      const result = await this.usersDao.getAll();
      return { success: true, body: result }
    } catch (err) {
      return { success: false, error: err }
    }

  };

  
  getByEmail = async (email) => {
    try {
      const result = await this.usersDao.getByField("email", email, true);
      return { success: true, body: result }
    } catch (err) {
      return { success: false, error: err }
    }

  };
  addUser = async (user) => {
    try {
      const result = await this.usersDao.save(user)
      return { success: true, body: result }
    } catch (err) {
      return { success: false, error: err }
    }
  }

  updateUser = async (content, id) => {
    try {
      const result = await this.usersDao.update(content, id)
      if (result) {
        return { success: true, body: result }
      } else {
        return { success: false, error: { message: 'registro no encontrado' } }
      }

    } catch (err) {
      console.log(err)
      return { success: false, error: err }
    }
  }

  deleteUser = async (id) => {
    try {
      const result = await this.usersDao.delete(id)
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

}
