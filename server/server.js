const express=require('express');
const app=express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const userRouter=require('./user')
const Chat =require('./model').getModel('chat');
io.on('connection', (socket) => {
    console.log("启动时"+socket.id)
    socket.on('sendMsg',(data)=>{
        const {from,to,msg}=data;
        const chatid=[from,to].sort().join('_')
        Chat.create({chatid,from,to,'content':msg,'create_time':new Date().getTime()},(err,doc)=>{
            if(!err){
                io.emit('recvMsg',doc);

            }
        })
    })
    socket.on('disconnect',()=>{
        console.log("退出时"+socket.id)
        socket.disconnect(true);
        console.log(socket.connected)
    })
});


app.use(bodyParser())
app.use(cookieParser())
app.use('/user',userRouter)
server.listen(8888,()=>{
    console.log('端口8888')
});