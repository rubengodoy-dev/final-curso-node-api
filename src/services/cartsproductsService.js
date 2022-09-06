
import ProductsService from './productsService.js';
import CartsService from './cartsService.js';
const cartService = new CartsService();
const productService = new ProductsService();

export default class CartsProductsService {


    getProductsByCart = async (id) => {
        try {
            const result = await cartService.getById(id);
            if (result.success) {
                const { products } = result.body

                let productsList = []
                await Promise.all(products.map(async (p) => {
                    let originalProduct = await productService.getById(p.id)
                    if (originalProduct.success) {
                        productsList.push({
                            product: originalProduct.body,
                            quantity: p.quantity,
                            price:p.price

                        })
                    }
                }));
                return { success: true, body: productsList }
            }
            return { success: false, error: result.error }
        } catch (err) {
            return { success: false, error: err }
        }

    };



    addProduct = async (cartId, productId, quantity) => {
        try {

            let id = cartId
            const cartObject = await cartService.getById(id);
            if (cartObject.success) {
                // si el producto ya se encuentra en el carrito aumentar la cantidad
                let productsFromCart = cartObject.body.products

                let obj = productsFromCart.find(p => p.id === productId);
                if (obj) {
                    let index = productsFromCart.indexOf(obj);
                    productsFromCart[index].quantity += quantity
                }
                else {
                    //si no se encuentra agregar
                    let originalProduct = await productService.getById(productId)
                    if (originalProduct.success) {
                        productsFromCart.push({
                            id: productId,
                            quantity: quantity
                            , price: originalProduct.body.price
                        })
                    }
                    else
                    {
                        return { success: true, body: { message: 'producto no encontrado' } }
                    }
                   
                }

                let content = { products: productsFromCart }
                
                const result = await cartService.update(content, cartId)
                 console.log(result)
                if (result.success) {
                    return { success: true, body: result.body }
                } else {
                    return { success: true, body: { message: 'No fue posible agregar el producto al carrito' } }
                }

            }
            else {
                return { success: true, body: { message: 'registro no encontrado' } }
            }

        } catch (err) {
            return { success: false, error: err }
        }
    }

}