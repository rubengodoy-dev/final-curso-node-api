import { MongoDBContainer } from "../../containers/index.js"
import usersModel from '../../models/user.js';
import mongoose from 'mongoose';
import MongoClient from '../MongoClient.js';

class usersDaoMongoDB extends MongoDBContainer {
  constructor() {
    // const mongoClient= new MongoClient()
    // mongoClient.connect()
    super(mongoose.model(usersModel.collectionName, usersModel.schema))
  }

}


export default usersDaoMongoDB