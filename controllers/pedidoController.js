const enderecoModel = require('../models/enderecoModel');
const mercadoPago = require('mercadopago');
const uniqid = require('uniqid');
const pedidoModel = require('../models/pedidoModel');
class pedidoController{
    async confirmarEndereco(req,res){
        var endereco = await enderecoModel.getByUserId(req.session.user.id);
        res.render('pedido/confirmarEndereco.ejs',{
            titlePage:"Confirmar endereço" + " | Quail Store",
            endereco: endereco
        }
        );
    }
    async meusPedidos(req,res){
        var pedidos = await pedidoModel.getPedidoByUserId(req.session.user.id);
        pedidos.forEach(pedido => {
            var produtos = pedido.produtosId.split(';')
            pedido.produtosId = produtos
            
        });
        res.render('pedido/meusPedidos.ejs',{
            titlePage:'Meus pedidos' + " | Quail Store",
            pedidos:pedidos
        })
    }
    async pagar(req,res){
        var emailPagador = req.session.user.email
        var id = uniqid()
        var total = 0
        var description = ""
        req.session.carrinho.forEach(produto => {
            total += produto.valorVista * produto.qtd
            description += produto.nome + "x" + produto.qtd + ";"
        });
        var pedido = {
            userId: req.session.user.id,
            produtosId: description,
            codigo: id,
            total:parseFloat(total)
        }
        var dados = {
            items: [
                {
                  id:id,  
                  title: description,
                  unit_price: parseFloat(total),
                  currency_id: 'BRL',
                  quantity: 1,
                }],
            payer:{
                email:emailPagador,
            },
            external_reference:id,
            back_urls:{
                success: "https://quailstore.com.br/pedido/meus-pedidos",
                failure: "https://quailstore.com.br/pedido/meus-pedidos",
                pending: "https://quailstore.com.br/pedido/meus-pedidos"
            },
            auto_return:"approved"
        }
        try { 
            var pagamento = await mercadoPago.preferences.create(dados)
            await pedidoModel.insert(pedido);
            return res.redirect(pagamento.body.init_point);
        } catch (error) {
            res.send(error.message)
        }
    }
}
module.exports = new pedidoController();    