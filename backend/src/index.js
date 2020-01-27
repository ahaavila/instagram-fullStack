const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

//criando minha app (servidor)
const app = express();

//aplicação suporta http
const server = require('http').Server(app);
//aplicação suporta web socket
const io = require('socket.io')(server);

//conexão com o BD
mongoose.connect('mongodb+srv://augusto:guv9014@omnistack-cebkf.mongodb.net/semana07?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Criando o middleware para real time
app.use((req, res, next) => {
    req.io = io;

    next();
});

//vou usar a ferramenta cors para liberar o acesso ao front-end
app.use(cors());

//vou criar uma rota com o caminho da minha imagem para o Front
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

//mostro pro servidor onde estão minhas rotas
app.use(require('./routes'));

//indico qual porta vai ficar o servidor
server.listen(3333);