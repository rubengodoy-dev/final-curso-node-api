import { MongoDBContainer } from "../../containers/index.js"
import messageModel from '../../models/message.js';
import mongoose from 'mongoose';
import MongoClient from '../MongoClient.js';

class messagesDaoMongoDB extends MongoDBContainer {
  constructor() {
    // const mongoClient= new MongoClient()
    // mongoClient.connect()
    super(mongoose.model(messageModel.collectionName, messageModel.schema))
  }

}


export default messagesDaoMongoDB