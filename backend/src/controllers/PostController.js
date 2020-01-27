//arquivo onde vão conter todas as minhas regras de negócio dos Posts

const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {

    //função para retornar uma lista dos posts que estão no BD
    async index(req, res){
        const posts = await Post.find().sort('-createdAt');

        return res.json(posts);
    },

    //função para criar um post
    async store(req, res){

        //busco os meus dados
        const { author, place, description, hastags} = req.body;
        const { filename: image } = req.file;

        //vou colocar uma extensão fixa para as imagens
        const [name] = image.split('.');
        const fileName = `${name}.jpg`;

        //redimencionando a imagem
        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)
            )
        
        //apagando a imagem que não está redimencionada
        fs.unlinkSync(req.file.path);

        //função para criar meu post
        const post = await Post.create({
            author,
            place,
            description,
            hastags,
            image: fileName,
        });

        //emite as informações em tempo real para os usuários logados
        req.io.emit('posts', post);

        return res.json(post);
    },
};