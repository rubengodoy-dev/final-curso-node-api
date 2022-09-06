import { MongoDBContainer } from "../../containers/index.js"
import cartModel from '../../models/cart.js';
import mongoose from 'mongoose';
import MongoClient from '../MongoClient.js';

class cartsDaoMongoDB extends MongoDBContainer {
  constructor() {
    // const mongoClient= new MongoClient()
    // mongoClient.connect()
    super(mongoose.model(cartModel.collectionName, cartModel.schema))
  }

}


export default cartsDaoMongoDB