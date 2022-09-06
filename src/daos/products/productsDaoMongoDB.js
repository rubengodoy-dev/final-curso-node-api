import { MongoDBContainer } from "../../containers/index.js"
import productsModel from '../../models/product.js';
import mongoose from 'mongoose';
import MongoClient from '../MongoClient.js';

class productsDaoMongoDB extends MongoDBContainer {
  constructor() {
    // const mongoClient= new MongoClient()
    // mongoClient.connect()
    super(mongoose.model(productsModel.collectionName, productsModel.schema))
  }

}


export default productsDaoMongoDB