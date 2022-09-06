import mongoose from 'mongoose';

const collectionName = 'cart';

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Number,
        required: false,
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