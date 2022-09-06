import express from 'express';
import productsController from '../controllers/productsController.js';
// import validation from "../middlewares/validationMiddlewares.js"
//import userSchema from "../validations/userValidation.js"
const router = express.Router();

router.get('/', productsController.getAll);
router.get('/:id',productsController.getById)
router.get('/category/:category',productsController.getByCategory)
router.post('/', productsController.save);
router.put('/', productsController.update);
router.delete('/:id',productsController.erase)

export default router;
