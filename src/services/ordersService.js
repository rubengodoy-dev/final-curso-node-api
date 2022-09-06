
import SingletonOrders from "../daos/orders/singletonPersistenceFactory.js"




export default class OrdersService {
  constructor() {
    this.orderDao
    this.init()
  }

  init = async () => {
    //  this.usersDao = await PersistenceFactory.getPersistence()

    this.orderDao = await SingletonOrders.getInstance()
  }
  getAll = async () => {
    try {
      const result = await this.orderDao.getAll();
      return { success: true, body: result }
    } catch (err) {
      return { success: false, error: err }
    }

  };
  getById = async (id) => {
    try {

      const result = await this.orderDao.getById(id);
      return { success: true, body: result }
    } catch (err) {
      return { success: false, error: err }
    }

  };

  getByEmail = async (email) => {
    try {
      const result = await this.orderDao.getByField("email", email, false);
      return { success: true, body: result }
    } catch (err) {
      return { success: false, error: err }
    }

  };


  add = async (entityData) => {
    try {
      if (entityData.date === "") {
        //create timestamp
        entityData.date = new Date().toLocaleString()
      }
     
      const result = await this.orderDao.save(entityData)
   
      return { success: true, body: result }
    } catch (err) {
      return { success: false, error: err }
    }
  }

  update = async (content, id) => {
    try {
      const result = await this.orderDao.update(content, id)
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
      const result = await this.orderDao.delete(id)
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
