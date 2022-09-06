import mongoose from 'mongoose';
import DbClient from "./DbClient.js"
import config from '../config/config.js';

class MongoClient extends DbClient {
  constructor() {
    super()
    this.connected = true;
    this.client = mongoose
  }

  async connect() {
  
      try {
        await this.client.connect(config.mongo.url, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log('MongoDB conectado')
      } catch (err) {
        console.log(err)
      }
    
  }

  async disconnect() {
    try {
      await this.client.connection.close()
      this.connected = false
    } catch (err) {
      console.log(err)
    }
  }

}

export default MongoClient