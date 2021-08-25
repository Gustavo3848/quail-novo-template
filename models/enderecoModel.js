const { DataTypes } = require('sequelize');
const db = require('../config/dbConfig');
const sequelize = db()
const Endereco = sequelize.define('Endereco', {
  // Model attributes are defined here
  endereco: {
    type: DataTypes.STRING,
    allowNull: false
  },
  numero: {
    type: DataTypes.STRING,
    allowNull: false
  },
  complemento: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bairro: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userID: {
    type: DataTypes.INTEGER
  }
}, {

});

console.log(Endereco === sequelize.models.Endereco); // true

Endereco.sync();
class enderecoModel {
  async insert(endereco) {
    const end = endereco
    await Endereco.create(end);
    return
  }
  async getAll() {
    //return User.findAll()
  }
  async getByUserId(id) {
    var data = await Endereco.findOne({ where: { 'userID': id } });
    return data.get()
  }
  async getByUserIdAndUpdate(id, endereco) {
    await Endereco.update(endereco, { where: { 'userID': id } });
    return
  }
}
module.exports = new enderecoModel()
