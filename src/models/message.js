import mongoose from 'mongoose';

const collectionName = 'message';

const schema = new mongoose.Schema({

    email: {
        type: String,
        required: [true, 'Email es obligatorio'],
    },
    type: {
        type: String,
        required: [true, 'Tipo es obligatorio'],
    },
    date: {
        type: String,
        required: [true, 'Fecha es obligatorio'],
    },
    content: {
        type: String,
        required: [true, 'Contenido es obligatorio'],
    }
})

export default {
    collectionName,
    schema,
};