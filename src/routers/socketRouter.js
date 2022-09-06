import express from 'express';
import messageController from '../controllers/messageController.js'

let clients = []
const SocketRouter = (io) => {
    const router = express.Router();

    router.post("/", async (req, res) => {
        const { email, type, content } = req.body

        let newMessage = {
            email: email,
            type: type,
            date: new Date().toLocaleString(),
            content: content
        }
        let result = await messageController.save(newMessage)

        if (result.success) {
            //obtener lista de mensajes
            let resultChat = await messageController.getByEmailFromService(email)
            if (resultChat.success) {
                let messageList = resultChat.body
           
                io.to(email).emit("messages", messageList);
                return res.status(200).json(messageList);
            }
            return res.status(200).json({ message: "Mensaje guardado" });
        }
        else {
            return res.status(500).json(result.error);
        }

    });

    router.get('/:email', messageController.getByEmail)

    return router;
}

export default SocketRouter