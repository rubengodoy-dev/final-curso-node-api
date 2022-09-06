
let clients=[]
const socketManager =
    async (socket) => {
        let messages = []     
        console.info(`Client connected [id=${socket.id}]`);      
        clients.push({id:socket.id})     

        socket.on('create-room', function (email) {
            socket.join(email);
            console.log(`room created for ${email}`)
        });
        
        // socket.emit('messages', messages);
        // socket.on('new-message', function (data) {
        //     messages.push(data);
        //     socket.emit('messages', messages);
           
        // });
      
    }



export default socketManager