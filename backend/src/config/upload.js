//arquivo onde vai conter meu upload da imagem

const multer = require('multer');
const path = require('path');

module.exports = {
    //salvando as imagens no disco local
    storage: new multer.diskStorage({
        //indico o caminho onde minha imagem ficará salva
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        //crio o nome do arquivo da imagem
        filename: function(req, file, cb){
            cb(null, file.originalname);
        }
    }),
}