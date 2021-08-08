const { DataTypes} = require('sequelize');
const db = require('../config/dbConfig');
const sequelize = db()
const Produto = sequelize.define('Produto', {
    // Model attributes are defined here
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valorVista: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    valorPrazo: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pedido: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fabricante: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imgCapa: {
        type: DataTypes.STRING,
        allowNull: false
    }
    
  });
  
  console.log(Produto === sequelize.models.Produto); // true
  
Produto.sync();
class produtoModel {
    async insert(pedido){
      
    }
    async getBySlug(slug){
        var data = await Produto.findOne({where:{'slug':slug}});
        return data.get()
    }
    async getManyByIds(id){
        var data = await Produto.findAll({where:{'id':id},
            raw : true ,
            nest: true
        });
        return data
    }
    async getByid(id){
        var data = await Produto.findOne({where:{'id':id}});
        return data.get()
    }
    async getByCategoria(categoria){
        var data = await Produto.findAll({where:{'categoria':categoria},
            raw : true ,
            nest: true
        });
        if(data){
            return data
        }else{
            return false
        }
    }
    async getRecomendados(categoria){
        var data = await Produto.findAll({where:{'categoria':categoria},limit:4,
            raw : true ,
            nest: true
        });
        if(data){
            return data
        }else{
            return false
        }
    }
    async getMaisVendidos(){
        var data = await Produto.findAll({
            limit:6,
            order:[['pedido','ASC']],
            raw : true ,
            nest: true
        });
        if(data){
            return data
        }else{
            return false
        }
    }
    async getLancamento(){
        var data = await Produto.findAll({
            limit:6,
            raw : true ,
            nest: true,
            order:[['id','ASC']] 
        });
        if(data){
            return data
        }else{
            return false
        }
    }
}
module.exports =  new produtoModel()
