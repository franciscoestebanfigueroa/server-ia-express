const express = require('express');
const app=express();
const http = require('http');

const dotenv = require('dotenv').config(); 

app.use(express.static(publicPath));
const server = http.createServer(app);

const socketIO = require('socket.io');

const io = socketIO(server);

const path =require('path');
const { error } = require('console');
const publicPath = path.resolve(__dirname,'public');


io.on('connection', socket => {
  console.log('Nuevo dispositivo conectado:', socket.id);
   
   

  socket.on('mensajex', data => {
    console.log('Mensaje desde ESP32 1:', data["nombre"]);
    console.log('Mensaje desde ESP32 2:', data["estado"]);
    // Aquí puedes realizar acciones en respuesta al mensaje del ESP32
    socket.broadcast.emit('mensajex', data);
    
  });
  
  
  socket.on('response',async data => {
    console.log('response', data);
    io.emit(" response ",data);
    // Aquí puedes realizar acciones en respuesta al mensaje del ESP32
  });
  

  

  socket.on('disconnect', () => {
    console.log('Dispositivo desconectado:', socket.id);
  });
});

//const PORT = 443; // Puedes cambiar el puerto si es necesario
server.listen(process.env.PORT, (err) => {
  if(err) throw new Error(err);
  
  console.log(`Servidor de sockets en funcionamiento en el puerto ${process.env.PORT}`);
});
