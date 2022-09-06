import mongoose from 'mongoose';

const collectionName = 'products';

const schema = new mongoose.Schema({   
    name:{
        type: String,
        required: [true, 'Nombre es obligatorio'],
    },
    description:{
        type: String,
        required: false,
    },
    code:{
        type: String,
        required: false,
    },
    photo:{
        type: String,
        required: false,
    },
    price:{
        type: Number,
        required: [true, 'Precio es obligatorio'],
    },
    stock:{
        type: Number,
        required: [true, 'Stock es obligatorio'],
    },
    category:{
        type: String,
        required: [true, 'Categoria es obligatorio'],
    },
});

export default {
  collectionName,
  schema,
};