//arquivo onde vão conter todas as minhas regras de negócio dos Posts

const Post = require('../models/Post');

module.exports = {

    //função para criar um like no post
    async store(req, res){

        //busco o meu post
        const post = await Post.findById(req.params.id);

        //adiciono um like no post
        post.likes += 1;

        //salvo a alteração no BD
        await post.save();

        //emite as informações em tempo real para os usuários logados
        req.io.emit('like', post);

        return res.json(post);
    },
};