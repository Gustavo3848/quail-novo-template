const express = require('express');
const Router = express.Router();
const pedidoController = require('../controllers/pedidoController');
Router.get('/confirmarendereco',pedidoController.confirmarEndereco);
Router.get('/checkout',pedidoController.pagar);
Router.get('/meus-pedidos',pedidoController.meusPedidos);
module.exports = Router;