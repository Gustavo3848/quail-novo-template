const express = require('express');
const Route = express.Router();
const userController = require('../controllers/userController');
Route.get('/endereco',userController.formAttEndereco);
Route.post('/update',userController.updateEndereco);
Route.get('/meuspedidos',userController.meusPedidos);
Route.get('/login',userController.formLogin);
Route.get('/criar-conta',userController.formCadastro);
Route.post('/validar', userController.criarConta);
Route.post('/auth',userController.loginAuth);
Route.get('/logout',userController.logout);
module.exports = Route;