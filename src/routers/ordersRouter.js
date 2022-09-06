import express from 'express';
import ordersController from '../controllers/ordersController.js';
// import validation from "../middlewares/validationMiddlewares.js"
//import userSchema from "../validations/userValidation.js"
const router = express.Router();

router.get('/', ordersController.getAll);
router.get('/:id',ordersController.getById)
router.get('/email/:email', ordersController.getByEmail);
router.post('/cart/:cart_to_finish', ordersController.saveFromCart);
router.post('/', ordersController.save);


export default router;
