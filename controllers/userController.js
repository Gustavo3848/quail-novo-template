const userModel = require('../models/userModel');
const enderecoModel = require('../models/enderecoModel');
const validation = require('../config/validation')
const bcrypt = require('bcryptjs');
const validar = require('../config/validation');
class userController {
    async formAttEndereco(req, res) {
        var endereco = await enderecoModel.getByUserId(req.session.user.id);
        res.render('user/endereco.ejs', {
            titlePage: "Atualizar endereço" + " | Quail Store",
            UF: [
                { "nome": "Acre", "sigla": "AC" },
                { "nome": "Alagoas", "sigla": "AL" },
                { "nome": "Amapá", "sigla": "AP" },
                { "nome": "Amazonas", "sigla": "AM" },
                { "nome": "Bahia", "sigla": "BA" },
                { "nome": "Ceará", "sigla": "CE" },
                { "nome": "Distrito Federal", "sigla": "DF" },
                { "nome": "Espírito Santo", "sigla": "ES" },
                { "nome": "Goiás", "sigla": "GO" },
                { "nome": "Maranhão", "sigla": "MA" },
                { "nome": "Mato Grosso", "sigla": "MT" },
                { "nome": "Mato Grosso do Sul", "sigla": "MS" },
                { "nome": "Minas Gerais", "sigla": "MG" },
                { "nome": "Pará", "sigla": "PA" },
                { "nome": "Paraíba", "sigla": "PB" },
                { "nome": "Paraná", "sigla": "PR" },
                { "nome": "Pernambuco", "sigla": "PE" },
                { "nome": "Piauí", "sigla": "PI" },
                { "nome": "Rio de Janeiro", "sigla": "RJ" },
                { "nome": "Rio Grande do Norte", "sigla": "RN" },
                { "nome": "Rio Grande do Sul", "sigla": "RS" },
                { "nome": "Rondônia", "sigla": "RO" },
                { "nome": "Roraima", "sigla": "RR" },
                { "nome": "Santa Catarina", "sigla": "SC" },
                { "nome": "São Paulo", "sigla": "SP" },
                { "nome": "Sergipe", "sigla": "SE" },
                { "nome": "Tocantins", "sigla": "TO" }

            ],
            endereco: endereco
        })
    }
    async updateEndereco(req, res) {
        var endereco = req.body
        endereco.numero = parseInt(endereco.numero)
        if(validar.numero(endereco.numero).Error){
            req.session.ifErro = validar.numero(endereco.numero)
            res.redirect('/user/endereco')
        }else{
            await enderecoModel.getByUserIdAndUpdate(req.session.user.id, endereco);
            res.redirect('/carrinho')
        }
    }
    async meusPedidos(req, res) {
        var x = await userModel.getAll()
        res.render('user/meusPedidos.ejs', {
            titlePage: "Meus pedidos" + " | Quail Store",
            x
        })
    }
    async formLogin(req, res) {
        res.render('user/login.ejs', {
            titlePage: "Login" + " | Quail Store"
        })
    }
    async loginAuth(req, res) {
        var user = await userModel.auth(req.body.email, req.body.password);
        if (user) {
            req.session.user = { id: user.id, nome: user.nome + " " + user.sobrenome, email: user.email }
            res.redirect('/carrinho');
        } else {
            req.session.msg = { type: true, msg: "E-mail e/ou senha inválidos!" }
            res.redirect('/user/login')
        }
    }
    async logout(req, res) {
        req.session.user = undefined
        res.redirect('/')
    }
    async formCadastro(req, res) {
        res.render('user/cadastro.ejs', {
            titlePage: "Criar conta" + " | Quail Store",
            UF: [
                { "nome": "Acre", "sigla": "AC" },
                { "nome": "Alagoas", "sigla": "AL" },
                { "nome": "Amapá", "sigla": "AP" },
                { "nome": "Amazonas", "sigla": "AM" },
                { "nome": "Bahia", "sigla": "BA" },
                { "nome": "Ceará", "sigla": "CE" },
                { "nome": "Distrito Federal", "sigla": "DF" },
                { "nome": "Espírito Santo", "sigla": "ES" },
                { "nome": "Goiás", "sigla": "GO" },
                { "nome": "Maranhão", "sigla": "MA" },
                { "nome": "Mato Grosso", "sigla": "MT" },
                { "nome": "Mato Grosso do Sul", "sigla": "MS" },
                { "nome": "Minas Gerais", "sigla": "MG" },
                { "nome": "Pará", "sigla": "PA" },
                { "nome": "Paraíba", "sigla": "PB" },
                { "nome": "Paraná", "sigla": "PR" },
                { "nome": "Pernambuco", "sigla": "PE" },
                { "nome": "Piauí", "sigla": "PI" },
                { "nome": "Rio de Janeiro", "sigla": "RJ" },
                { "nome": "Rio Grande do Norte", "sigla": "RN" },
                { "nome": "Rio Grande do Sul", "sigla": "RS" },
                { "nome": "Rondônia", "sigla": "RO" },
                { "nome": "Roraima", "sigla": "RR" },
                { "nome": "Santa Catarina", "sigla": "SC" },
                { "nome": "São Paulo", "sigla": "SP" },
                { "nome": "Sergipe", "sigla": "SE" },
                { "nome": "Tocantins", "sigla": "TO" }

            ]
        })
    }
    async criarConta(req, res) {
        let date = req.body
        var obj = validation.validacaoTotal(date)
        if(obj.Error){
            req.session.ifErro = obj
            res.redirect('/user/criar-conta');
        }else{
            if (date.password != date.confirmarPassword | ""+date.password.length < 6) {
                req.session.msg = { type: true, msg: "Senha inválida (A senha deve conter no mínimo 6 caracteres e serem idênticas)" }
                res.redirect('/user/criar-conta')
            } else {
                var salt = bcrypt.genSaltSync(10)
                var hash = bcrypt.hashSync(date.password, salt);
                obj.user.password = hash
                var id = await userModel.insert(obj.user);
                if (id == "E-mail já usado!") {
                    req.session.msg = { type: true, msg: "E-mail já usado!" }
                    res.redirect('/user/criar-conta');
                } else {
                    obj.endereco.userID = id
                    await enderecoModel.insert(obj.endereco);
                    req.session.user = { id: id, nome: obj.user.nome + " " + obj.user.sobrenome, email: obj.user.email }
                    res.redirect('/carrinho')
                }
            }
        }
    }
}

module.exports = new userController();