import OrdersService from '../services/ordersService.js';
import CartsOrdersService from '../services/cartsordersService.js';
//import UsersDTO from '../dtos/usersDTO.js';
const orderService = new OrdersService();
const cartorderService = new CartsOrdersService();


const getAll = async (req, res) => {
    try {
        let result = await orderService.getAll();

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
        let result = await orderService.getById(id);
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


const getByEmail = async (req, res) => {
    try {
        let email = req.params.email;

        let result = await orderService.getByEmail(email);
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

const saveFromCart = async (req, res) => {
    try {

        let cart_to_finish = req.params.cart_to_finish;

        let result = await cartorderService.createOrderFromCart(cart_to_finish)
        if (result.success) {
            let { body } = result

            res.status(201).json(body);
        } else {
            let { error } = result
            res.status(500).json(error);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}


const save = async (req, res) => {
    try {
        let entityData = req.body;
        //validaciones...
        let result = await orderService.add(entityData);

        if (result.success) {
            let { body } = result

            res.status(201).json(body);
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
    getByEmail,
    save,
    saveFromCart
};