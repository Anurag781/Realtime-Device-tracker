const express = require('express');
const app = express();
const path = require('path'); 

const http = require('http');
const server = http.createServer(app);

const socketio = require('socket.io');
const io = new socketio.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

io.on("connection", function (socket) {
    socket.on('send-location', function(data){
io.emit('receive-location', {id: socket.id, ...data});
    });
    console.log("connected");
});

app.get('/', (req, res) =>{
    res.render('index');
})

server.listen(3000, () => {
    console.log('Server is running on port 3000');
})