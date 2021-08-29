const produtoController = require('../models/produtoModel');
class carrinhoController {
    async view(req, res) {
        if (req.session.carrinho != undefined) {
            var totalPrazo = 0
            var totalVista = 0
            req.session.carrinho.forEach(produto => {
                totalPrazo += produto.valorVista * produto.qtd
                totalVista += produto.valorVista * produto.qtd
            });
            totalPrazo = totalPrazo + ((19.79/100)*totalPrazo)
            res.render('carrinho/view.ejs', {
                titlePage: 'Carrinho',
                totalPrazo: totalPrazo,
                totalVista: totalVista
            });
        } else {
            res.render('carrinho/view.ejs', {
                titlePage: 'Carrinho' + " | Quail Store",
                totalPrazo: 0,
                totalVista: 0
            });
        }
    }
    async insert(req, res) {
        var item = []
        var id = parseInt(req.params.produtoId)
        var produto = await produtoController.getByid(id);
        if (req.session.carrinho == undefined) {
            item.push({
                id: req.params.produtoId,
                qtd: parseInt(req.body.qtd),
                valorVista: produto.valorVista,
                valorPrazo: produto.valorPrazo,
                nome: produto.nome,
                imgCapa: produto.imgCapa
            });
            req.session.carrinho = item
        } else {
            item = req.session.carrinho
            item.forEach(item => {
                if (req.params.produtoId == item.id) {
                    res.redirect('/carrinho');
                }
            });
            item.push({
                id: req.params.produtoId,
                qtd: parseInt(req.body.qtd),
                valorVista: produto.valorVista,
                valorPrazo: produto.valorPrazo,
                nome: produto.nome,
                imgCapa: produto.imgCapa,
                slug: produto.slug
            })
            req.session.carrinho = item
        }
        res.redirect('/carrinho')
    }
    async update(req, res) {
        var itens = req.session.carrinho
        var qtd = req.body.quantidade
        itens.forEach(item => {
            if (item.id == parseInt(req.params.produtoId)) {
                console.log(item.id)
                item.qtd = parseInt(qtd)
            }
        })
        req.session.carrinho = itens
        res.redirect('/carrinho');
    }
    async delete(req, res) {
        var itens = req.session.carrinho
        for (let index = 0; index < itens.length; index++) {
            if (itens[index].id == req.params.produtoId) {
                itens.splice(index, 1);
                req.session.carrinho = itens
                res.redirect('/carrinho');
            }
        }
    }
}
module.exports = new carrinhoController();