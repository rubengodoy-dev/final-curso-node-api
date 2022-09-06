import config from './config/config.js';
import express from 'express';
import usersRouter from './routers/usersRouter.js';
import productsRouter from './routers/productsRouter.js';
import cartsRouter from './routers/cartsRouter.js'
import ordersRouter from './routers/ordersRouter.js'
import authRouter from "./routers/authRouter.js"
import infoRouter from './routers/infoRouter.js'
import socketManager from './controllers/socketController.js';
import SocketRouter from './routers/socketRouter.js';
import MongoClient from './daos/MongoClient.js'
import verifyToken from './middlewares/authMiddlewares.js'
import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'
import cors from 'cors'
import os from 'os'
import cluster from 'cluster'

const MODO = config.app.modo || 'FORK'
const PORT = config.app.port || 3000
const app = express();
const httpServer = new HttpServer(app);
// const server = httpServer.listen(PORT, () => console.log(`Conectado http escuchando en ${server.address().port}`));
// server.on("error", err => console.log(err))

const mongoClient = new MongoClient()
//await mongoClient.connect()


const io = new IOServer(httpServer,
    {
        cors: {
            origin: "*",
        },
    });
app.use(cors({
    origin: '*'
}));
app.use(express.json());
io.on('connection', socketManager)
const socketRouter = SocketRouter(io)
app.use('/chat', socketRouter);
app.use('/users', verifyToken, usersRouter);
app.use('/products', verifyToken, productsRouter);
app.use('/carts', verifyToken, cartsRouter);
app.use('/orders', verifyToken, ordersRouter);
app.use('/user', authRouter);
app.use('/info', verifyToken, infoRouter)


const inicioServer = async () => {
    console.log(`modo:${MODO}`)
    const server = httpServer.listen(PORT, () => console.log(`Conectado http escuchando en ${server.address().port}`));
    server.on("error", err => console.log(err))
    try {
        await mongoClient.connect()
        console.log(`Base de datos MongoDB conectada`);
    } catch (error) {
        console.log(error)
    }
}


if (MODO !== 'FORK') {

    if (cluster.isPrimary) {
        console.log(`Proceso principal ID:(${process.pid})`)
        for (let i = 0; i < os.cpus().length; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker) => {
            //nuevo servidor en caso de fin
            cluster.fork();
        });

    } else {
        console.log(`Proceso worker ID:(${process.pid})`)
        inicioServer();
    }
} else {

    inicioServer();
}