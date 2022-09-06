
import SingletonCarts from "../daos/carts/singletonPersistenceFactory.js"




export default class CartsService {
  constructor() {
    this.cartDao
    this.init()
  }

  init = async () => {
    //  this.usersDao = await PersistenceFactory.getPersistence()

    this.cartDao = await SingletonCarts.getInstance()
  }
  getAll = async () => {
    try {
      const result = await this.cartDao.getAll();
      return { success: true, body: result }
    } catch (err) {
      return { success: false, error: err }
    }

  };
  getById = async (id) => {
    try {

      const result = await this.cartDao.getById(id);
      return { success: true, body: result }
    } catch (err) {
      return { success: false, error: err }
    }

  };



  add = async (entityData) => {
    try {
      const result = await this.cartDao.save(entityData)
      return { success: true, body: result }
    } catch (err) {
      return { success: false, error: err }
    }
  }

  update = async (content, id) => {
    try {
      const result = await this.cartDao.update(content, id)
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
      const result = await this.cartDao.delete(id)
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

  addProduct = async (cartId, productId, quantity) => {
    try {

      const cartObject = await this.cartDao.getById(cartId);
      if (cartObject) {
        // si el producto ya se encuentra en el carrito aumentar la cantidad
        let obj = cartObject.products.find(p => p.id === productId);
        if (obj) {
          let index = cartObject.products.indexOf(obj);
          cartObject.products[index].quantity += quantity
        }
        else {
          //si no se encuentra agregar

          

          cartObject.products.push({
            id: productId,
            quantity: quantity
          })
        }

        let content = { products: cartObject.products }
        // console.log(content)
        const result = await this.cartDao.update(content, cartId)
        if (result) {
          return { success: true, body: result }
        } else {
          return { success: false, body: { message: 'No fue posible agregar el producto al carrito' } }
        }

      }
      else {
        return { success: false, error: { message: 'registro no encontrado' } }
      }

    } catch (err) {
      return { success: false, error: err }
    }
  }


  deleteProduct = async (cartId, productId) => {
    try {
console.log(cartId)
      const cartObject = await this.cartDao.getById(cartId);
      if (cartObject) {
        // si el producto ya se encuentra en el carrito aumentar la cantidad
        let obj = cartObject.products.find(p => p.id === productId);
        if (obj) {
          //producto encontrado en el carrito
          let producList = cartObject.products.filter(p => p.id != productId)
          let content = { products: producList }
          // console.log(content)
          const result = await this.cartDao.update(content, cartId)
          if (result) {
            return { success: true, body: { message: 'producto eliminado del carrito' } }
          } else {
            return { success: false, body: { message: 'No fue posible eliminar el producto del carrito' } }
          }
        }
        else {
          //producto no encontrado en el carrito
          return { success: false, error: { message: 'producto no encontrado en el carrito' } }
        }
      }
      else {
        return { success: false, error: { message: 'registro no encontrado' } }
      }

    } catch (err) {
      return { success: false, error: err }
    }
  }


}
