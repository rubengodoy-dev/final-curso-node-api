
import Singleton from "../daos/products/singletonPersistenceFactory.js"

export default class ProductsService {
  constructor() {
    this.productDao
    this.init()
  }

  init = async () => {
    //  this.usersDao = await PersistenceFactory.getPersistence()
    this.productDao = await Singleton.getInstance()
  }
  getAll = async () => {
    try {
      const result = await this.productDao.getAll();
      return { success: true, body: result }
    } catch (err) {
      return { success: false, error: err }
    }

  };

  getByCategory = async (category) => {
    try {
      const result = await this.productDao.getByField("category",category,false);
      return { success: true, body: result }
    } catch (err) {
      return { success: false, error: err }
    }

  };
  getById = async (id) => {
    try {

      const result = await this.productDao.getById(id);
    
      return { success: true, body: result }
    } catch (err) {
      return { success: false, error: err }
    }

  };

  add = async (entityData) => {
    try {
      const result = await this.productDao.save(entityData)
      return { success: true, body: result }
    } catch (err) {
      return { success: false, error: err }
    }
  }

  update = async (content, id) => {
    try {
      const result = await this.productDao.update(content, id)
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

  delete = async (id) => {
    try {
      const result = await this.productDao.delete(id)
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
