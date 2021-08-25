const produtoModel = require('../models/produtoModel');
const imagemModel = require('../models/imagemModel');
const avaliacaoModel = require('../models/avaliacaoModel');
class produtoController {
    async produtosPorCategoria(req, res) {
        var categoria = req.params.categoria
        var produtos = await produtoModel.getByCategoria(categoria);
        res.render('produto/produtos.ejs', {
            titlePage: categoria.toUpperCase() + " | Quail Store",
            produtos: produtos
        })
    }
    async produto(req, res) {
        var data = await produtoModel.getBySlug(req.params.produtoSlug)
        var img = await imagemModel.findByProdutoId(data.id);
        var avaliacoes = await avaliacaoModel.selectByProdutoId(data.id);
        var produtosRecomendados = await produtoModel.getRecomendados(data.categoria)
        res.render('produto/produto.ejs', {
            titlePage: data.nome + " | Quail Store",
            data: data,
            img: img,
            avaliacoes: avaliacoes,
            produtosRecomendados: produtosRecomendados
        })
    }
    async buscar(req, res) {
        var filtro = req.body.buscar.toUpperCase()
        var produtos = await produtoModel.getAllByBusca(filtro);
        res.render('produto/produtos.ejs', {
            titlePage: "Buscar: " + filtro + " | Quail Store",
            produtos: produtos
        })
    }

}

module.exports = new produtoController();