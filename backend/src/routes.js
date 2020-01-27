//arquivo onde ficarão todas as rotas da aplicação

const express = require('express');
const multer = require ('multer');

const UploadConfig = require('./config/upload');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();
const upload = multer(UploadConfig);

//rotas
//digo que meu campo "image" é do tipo imagem
routes.post('/posts', upload.single('image'), PostController.store);
routes.get('/posts', PostController.index);

routes.post('/posts/:id/like', LikeController.store);

module.exports = routes;