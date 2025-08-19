// const express = require('express');
// const app = express()
// const PORT = 3000;

// //middleware to parse JSON
// app.use(express.json());

// let messages = [];

// app.get('/messages', (req, res) => {
//     res.json(messages);
// })

// //Route to send a message.
// app.post('/messages', (req,res) => {
//     const { user, text } = req.body;
//     if(!user || !text){
//         return res.status(400).json({error: 'User and text are required.'});
//     }

//     const message = {user, text, time: new Date().toISOString() };
//     messages.push(message);
//     res.status(201).json(message);
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname));
app.get('/', (req, res) => {
    res.send('Socket.IO server is running');
});

io.on('connection', (socket) => {
    console.log('New client connected');

    //Recieve message from client
    socket.on('chatMessage', (msg) => {
        console.log('Message recieved: ', msg);
        io.emit('chatMessage', msg);
    });

    //when a client disconnects
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server listening on http://localhost:3000');
});
