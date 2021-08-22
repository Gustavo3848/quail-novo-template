const express = require('express');
const Route = express.Router();
const produtoController = require('../controllers/produtoController');
Route.get('/categoria/:categoria', produtoController.produtosPorCategoria);
Route.get('/:produtoSlug', produtoController.produto)
Route.post('/busca/filtrar', produtoController.buscar)
module.exports = Route;