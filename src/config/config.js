import dotenv from 'dotenv';

dotenv.config();
export default {
  app: {
    persistence: process.env.PERSISTENCE,
    port: process.env.PORT,
    modo:process.env.MODO
  },
  mongo: {
    url: process.env.MONGO_URI
  },
  mail:{
    host: process.env.SMTP_HOST,
    user: process.env.SMTP_USERNAME,
    password: process.env.SMTP_PASSWORD,
    admin:process.env.ADMIN_EMAIL

  }

};
