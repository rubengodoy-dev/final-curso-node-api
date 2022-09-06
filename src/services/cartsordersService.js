import enviarMailAdministrador from '../mail.js'

import CartsProductsService from './cartsproductsService.js';
import OrdersService from './ordersService.js';
import CartsService from './cartsService.js';
const cartService = new CartsService();
const orderService = new OrdersService();
const cartsProductsService = new CartsProductsService()


export default class CartsOrdersService {

    createOrderFromCart = async (id) => {
        try {
            const cartObj = await cartService.getById(id);
            if (cartObj.success) {
                const newOrder = {
                    timestamp: 0,
                    products: cartObj.body.products,
                    state: "generada",
                    email: cartObj.body.email
                }
                let result = await orderService.add(newOrder)

                if (result.success) {
                    ///envio email
                    let productsByCartResult = await cartsProductsService.getProductsByCart(id)

                    if (productsByCartResult.success) {

                        const subject = `Nuevo pedido de ${cartObj.body.email}`
                        console.log(subject)
                        await enviarMailAdministrador('newOrder', subject, {
                            user: {
                                email: cartObj.body.email
                            }, products: productsByCartResult.body
                        });
                    }



                    //envio email


                    return { success: true, body: result }
                } else {
                    return { success: true, body: { message: 'No fue posible generar la Orden' } }
                }






            } else {
                return { success: false, error: { message: 'registro no encontrado' } }
            }


        } catch (err) {
            console.log(err)
            return { success: false, error: err }
        }

    };

}