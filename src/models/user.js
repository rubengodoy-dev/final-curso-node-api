import mongoose from 'mongoose';

const collectionName = 'users';

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    min: 6,
    max: 1024
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
});

export default {
  collectionName,
  schema,
};
//export const users = mongoose.model(collectionName, schema)