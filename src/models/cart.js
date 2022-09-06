import mongoose from 'mongoose';

const collectionName = 'cart';

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: [true, 'Fecha es obligatorio'],
    },
    products: { type: Array, "default": [] },

    deliveryAddress: {
        type: String,
        required: [true, 'Direccion de Envio es obligatorio'],
    }

});

export default {
    collectionName,
    schema,
};