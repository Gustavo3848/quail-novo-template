const { DataTypes } = require('sequelize');
const db = require('../config/dbConfig');
const sequelize = db()
const Avaliacao = sequelize.define('Avaliacao', {
  // Model attributes are defined here
  produtoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stars: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {

});

console.log(Avaliacao === sequelize.models.Avaliacao); // true

Avaliacao.sync();
class avaliacaoModel {
  async insert(avaliacao) {

  }
  async selectByProdutoId(id) {
    var data = await Avaliacao.findAll({
      where: { 'produtoId': id }, raw: true,
      nest: true,
      order: [
        ['data', 'DESC'],
      ]
    })
    if (data) {
      return data
    } else {
      return false
    }
  }
}
module.exports = new avaliacaoModel()
