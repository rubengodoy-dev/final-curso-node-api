import CartService from '../services/cartsService.js';
import CartsProductsService from '../services/cartsproductsService.js'
//import UsersDTO from '../dtos/usersDTO.js';
const cartService = new CartService();
const cartproductService = new CartsProductsService()

const getAll = async (req, res) => {
  try {
    let result = await cartService.getAll();

    if (result.success) {
      let { body } = result

      res.status(200).json(body);
    } else {
      let { error } = result
      res.status(500).json(error);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


const getById = async (req, res) => {
  try {
    let id = req.params.id;

    let result = await cartService.getById(id);
    if (result.success) {
      res.status(200).json(result.body);
    } else {
      let { error } = result
      res.status(500).json(error);
    }


  } catch (err) {
    res.status(500).json(err);
  }
};

const getProductsByCart = async (req, res) => {
  try {
    let id = req.params.id;

    let result = await cartproductService.getProductsByCart(id);
    if (result.success) {
    //  console.log(result)
      res.status(200).json(result.body);
    } else {
      let { error } = result
      res.status(500).json(error);
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

const addProduct = async (req, res) => {
  try {
    let cartId= req.params.id
    const {productId, quantity } = req.body;
    let result = await cartService.addProduct(cartId, productId, quantity);
    if (result.success) {
      res.status(200).json(result.body);
    }
    else {
      let { error } = result
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(500).json(err);
  }
}


const addProductWithPrice = async (req, res) => {
  try {
    let cartId= req.params.id
    const {  productId, quantity } = req.body;
    let result = await cartproductService.addProduct(cartId, productId, quantity);
 
    if (result.success) {
      res.status(200).json(result.body);
    }
    else {
      let { error } = result
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(500).json(err);
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { id, id_product } = req.params;
    let result = await cartService.deleteProduct(id, id_product);
    if (result.success) {
      res.status(200).json(result.body);
    }
    else {
      let { error } = result
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(500).json(err);
  }
}

const save = async (req, res) => {
  try {
    let entityData = req.body;
    //validaciones...
    let result = await cartService.add(entityData);

    if (result.success) {
      let { body } = result

      res.status(201).json(body);
    } else {
      let { error } = result
      res.status(400).json(error);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


const update = async (req, res) => {
  try {
    const { id, content } = req.body;
    //validaciones...

    let result = await cartService.update(content, id);
    console.log(result)
    if (result.success) {
      let { body } = result

      res.status(200).json(body);
    } else {
      let { error } = result
      res.status(500).json(error);
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

const erase = async (req, res) => {
  try {
    let id = req.params.id;
    let result = await cartService.delete(id);
    if (result.success) {
      res.status(200).json(result.body);
    } else {
      let { error } = result
      res.status(500).json(error);
    }


  } catch (err) {
    res.status(500).json(err);
  }
};

export default {
  getAll,
  getById,
  save,
  update,
  erase,
  getProductsByCart,
  addProduct,
  deleteProduct,
  addProductWithPrice
};
