const { DataTypes} = require('sequelize');
const db = require('../config/dbConfig');
const sequelize = db()
const Imagem = sequelize.define('Imagem', {
    // Model attributes are defined here
    produtoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
  }
  }, {
  });
  
  console.log(Imagem === sequelize.models.Imagem); // true
  
Imagem.sync();
class imagemModel {
    async insert(pedido){
      const end = endereco
      await Endereco.create(end);
      return
    }
    async findByProdutoId(id){
        var data =  await Imagem.findAll({where:{'produtoId':id},raw : true ,
        nest: true ,});
        return data
    }
}
module.exports =  new imagemModel()
