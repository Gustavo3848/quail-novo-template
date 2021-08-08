const { DataTypes} = require('sequelize');
const db = require('../config/dbConfig');
const sequelize = db()
const Pedido = sequelize.define('Pedido', {
    // Model attributes are defined here
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    produtosId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigo:{
      type: DataTypes.STRING,
      allowNull: false
    },
    status:{
      type: DataTypes.STRING,
      defaultValue:'Aguardando pagamento',
      allowNull: false
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
  }, {

  });
  
  console.log(Pedido === sequelize.models.Pedido); // true
  
Pedido.sync();
class pedidoModel {
    async insert(pedido){
      await Pedido.create(pedido)
      return
    }
    async getAll(){
        //return User.findAll()
    }
    async getPedidoByUserId(id){
      var data = await Pedido.findAll({
        where:{'userId':id},
        raw : true ,
        nest: true 
      });
      if(data){
        return data
      }else{
        return false 
      }
    }
}
module.exports =  new pedidoModel()
