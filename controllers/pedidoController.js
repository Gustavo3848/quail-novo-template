const enderecoModel = require('../models/enderecoModel');
const mercadoPago = require('mercadopago');
const uniqid = require('uniqid');
const pedidoModel = require('../models/pedidoModel');
const userModel = require('../models/userModel');
class pedidoController {
    async confirmarEndereco(req, res) {
        var endereco = await enderecoModel.getByUserId(req.session.user.id);
        res.render('pedido/confirmarEndereco.ejs', {
            titlePage: "Confirmar endereço" + " | Quail Store",
            endereco: endereco
        }
        );
    }
    async meusPedidos(req, res) {
        var pedidos = await pedidoModel.getPedidoByUserId(req.session.user.id);
        pedidos.forEach(pedido => {
            var produtos = pedido.produtosId.split(';')
            pedido.produtosId = produtos

        });
        res.render('pedido/meusPedidos.ejs', {
            titlePage: 'Meus pedidos' + " | Quail Store",
            pedidos: pedidos
        })
    }
    async pagar(req, res) {
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
            total: parseFloat(total)
        }
        var endereco = await enderecoModel.getByUserId(req.session.user.id)
        var usuario = await userModel.getUserById(req.session.user.id);
        var dados = {
            items: [
                {
                    id: id,
                    title: description,
                    description: description,
                    category_id: 'Qualquer',
                    unit_price: parseFloat(total),
                    quantity: 1,
                }],
            payer: {
                first_name: usuario.nome,
                last_name: usuario.sobrenome,
                phone: {
                    area_code: '043',
                    number: 974002548
                },
                email: emailPagador,
                address: {
                    zip_code: endereco.cep,
                    street_name: endereco.endereco,
                    street_number: parseInt(endereco.numero)
                }
            },
            shipments: {
                receiver_address: {
                    zip_code: endereco.cep,
                    state_name: endereco.estado,
                    city_name: endereco.cidade,
                    street_name: endereco.endereco,
                    street_number: parseInt(endereco.numero)
                }
            },
            registration_date: usuario.createdAt,
            external_reference: id,
            back_urls: {
                success: "https://quailstore.com.br/pedido/meus-pedidos",
                failure: "https://quailstore.com.br/pedido/meus-pedidos",
                pending: "https://quailstore.com.br/pedido/meus-pedidos"
            },
            auto_return: "approved"
        }
        try {
            var pagamento = await mercadoPago.preferences.create(dados)
            //console.log(pagamento)
            await pedidoModel.insert(pedido);
            //res.locals.id = pagamento.body.id;
            //res.render('pedido/teste.ejs',{
            //titlePage:'Finalzar'})
            return res.redirect(pagamento.body.init_point);
        } catch (error) {
            res.send(error.message)
        }
    }
}
module.exports = new pedidoController();