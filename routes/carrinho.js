const express = require('express');
const Router = express.Router();
const carrinhoController = require('../controllers/carrinhoController');
Router.get('/', carrinhoController.view);
Router.post('/insert/:produtoId', carrinhoController.insert);
Router.post('/update/:produtoId', carrinhoController.update);
Router.get('/delete/:produtoId', carrinhoController.delete);
module.exports = Router;