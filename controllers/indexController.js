const produtoModel = require('../models/produtoModel');

class indexController{
    async index(req,res){
        var maisVendidos = await produtoModel.getMaisVendidos();
        var lancamento = await produtoModel.getLancamento();
        res.render('index/index.ejs',{
            titlePage:'Quail Store',
            maisVendidos: maisVendidos,
            lancamento: lancamento
        })
    }
}
module.exports = new indexController();