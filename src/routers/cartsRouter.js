import express from 'express';
import cartsController from '../controllers/cartsController.js';
// import validation from "../middlewares/validationMiddlewares.js"
//import userSchema from "../validations/userValidation.js"
const router = express.Router();

router.get('/', cartsController.getAll);
router.get('/:id',cartsController.getById)
router.post('/', cartsController.save);
router.put('/', cartsController.update);
router.delete('/:id',cartsController.erase)
router.get('/:id/products', cartsController.getProductsByCart)
router.post('/:id/addProduct', cartsController.addProductWithPrice);
router.delete('/:id/product/:id_product', cartsController.deleteProduct);

export default router;
