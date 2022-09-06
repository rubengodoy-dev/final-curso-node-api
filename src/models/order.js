import mongoose from 'mongoose';

const collectionName = 'orders';

const schema = new mongoose.Schema({

    date: {
        type: String,
        required: [true, 'Fecha es obligatorio'],
    },
    products: { type: Array, "default": [] },

    state: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: [true, 'Email es obligatorio'],
    },

});

export default {
    collectionName,
    schema,
};