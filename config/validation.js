class validation {

    email(email) {
        if (email == null | email == undefined | email == "" | email.indexOf('@') == '-1' | email.length > 255) {
            return {
                Error: true,
                msg: "E-mail inválido"
            }
        } else {
            return {
                Error: false,
                msg: ""
            }
        }
    }
    nome(nome) {
        if (nome == null | nome == undefined | nome == "" | nome.length == 0 | nome.length > 255) {
            return {
                Error: true,
                msg: "Nome inválido"
            }
        } else {
            return {
                Error: false,
                msg: ""
            }
        }
    }
    sobrenome(sobrenome) {
        if (sobrenome == null | sobrenome == undefined | sobrenome == "" | sobrenome.length == 0 | sobrenome.length > 255) {
            return {
                Error: true,
                msg: "Sobrenome inválido"
            }
        } else {
            return {
                Error: false,
                msg: ""
            }
        }
    }
    senha(senha) {
        if (senha == null | senha == undefined | senha == "" | senha.length < 6 | senha.length > 255) {
            return {
                Error: true,
                msg: "Senha inválida (A senha deve conter no mínimo 6 caracteres)"
            }
        } else {
            return {
                Error: false,
                msg: ""
            }
        }
    }
    endereco(endereco) {
        if (endereco == null | endereco == undefined | endereco == "" | endereco.length == 0 | endereco.length > 255) {
            return {
                Error: true,
                msg: "Endereço inválido"
            }
        } else {
            return {
                Error: false,
                msg: ""
            }
        }
    }
    bairro(bairro) {
        if (bairro == null | bairro == undefined | bairro == "" | bairro.length == 0 | bairro.length > 255) {
            return {
                Error: true,
                msg: "Bairro inválido"
            }
        } else {
            return {
                Error: false,
                msg: ""
            }
        }
    }
    numero(numero) {
        if (numero == null | numero == undefined | numero == "" | Number.isInteger(numero) == false) {
            return {
                Error: true,
                msg: "Número de endereço inválido (Deve ser um número inteiro)"
            }
        } else {
            return {
                Error: false,
                msg: ""
            }
        }
    }
    complemento(complemento) {
        if (complemento == null | complemento == undefined | complemento == "" | complemento.length == 0 | complemento.length > 255) {
            return {
                Error: true,
                msg: "Complemento inválido"
            }
        } else {
            return {
                Error: false,
                msg: ""
            }
        }
    }
    cidade(cidade) {
        if (cidade == null | cidade == undefined | cidade == "" | cidade.length == 0 | cidade.length > 255) {
            return {
                Error: true,
                msg: "Cidade inválida"
            }
        } else {
            return {
                Error: false,
                msg: ""
            }
        }
    }
    estado(estado) {
        if (estado == null | estado == undefined | estado == "" | estado.length == 0 | estado.length > 255) {
            return {
                Error: true,
                msg: "Estado inválido"
            }
        } else {
            return {
                Error: false,
                msg: ""
            }
        }
    }
    cep(cep) {
        if (cep == null | cep == undefined | cep == "" | cep.length == 0 | cep.length > 255) {
            return {
                Error: true,
                msg: "Cep inválido"
            }
        } else {
            return {
                Error: false,
                msg: ""
            }
        }
    }
    validacaoTotal(date) {
        var obj = {
            user: {
                nome: date.nome.trim(),
                sobrenome: date.sobrenome.trim(),
                email: date.email.toLowerCase().trim(),
                password: date.password.trim()
            },
            endereco: {
                endereco: date.endereco.trim(),
                numero: parseInt(date.numero),
                complemento: date.complemento.trim(),
                bairro: date.bairro.trim(),
                cidade: date.cidade.trim(),
                estado: date.estado.trim(),
                cep: date.cep.trim(),
                userID: 0
            }
        }
        if (this.nome(obj.user.nome).Error == true) {
            return this.nome(obj.user.nome)
        } else if (this.sobrenome(obj.user.sobrenome).Error == true) {
            return this.sobrenome(obj.user.sobrenome)
        } else if (this.email(obj.user.email).Error == true) {
            return this.email(obj.user.email)
        } else if (this.senha(obj.user.password).Error == true) {
            return this.senha(obj.user.password)
        } else if (this.endereco(obj.endereco.endereco).Error == true) {
            return this.endereco(obj.endereco.endereco)
        } else if (this.numero(obj.endereco.numero).Error == true) {
            return this.numero(obj.endereco.numero)
        } else if (this.complemento(obj.endereco.complemento).Error == true) {
            return this.complemento(obj.endereco.complemento)
        } else if (this.bairro(obj.endereco.bairro).Error == true) {
            return this.bairro(obj.endereco.bairro)
        } else if (this.cidade(obj.endereco.cidade).Error == true) {
            return this.cidade(obj.endereco.cidade)
        } else if (this.estado(obj.endereco.estado).Error == true) {
            return this.estado(obj.endereco.estado)
        } else {
            return obj
        }

    }
    

}

module.exports = new validation()