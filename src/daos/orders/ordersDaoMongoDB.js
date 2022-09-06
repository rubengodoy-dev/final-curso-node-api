import { MongoDBContainer } from "../../containers/index.js"
import orderModel from '../../models/order.js';
import mongoose from 'mongoose';
import MongoClient from '../MongoClient.js';

class ordersDaoMongoDB extends MongoDBContainer {
  constructor() {
    // const mongoClient= new MongoClient()
    // mongoClient.connect()
    super(mongoose.model(orderModel.collectionName, orderModel.schema))
  }

}


export default ordersDaoMongoDB