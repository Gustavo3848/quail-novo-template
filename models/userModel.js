const { DataTypes, where } = require('sequelize');
const db = require('../config/dbConfig');
const sequelize = db()
const bcrypt = require('bcryptjs');
const User = sequelize.define('User', {
  // Model attributes are defined here
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sobrenome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true
User.sync();
class userModel {
  async insert(user) {
    const us = user
    var exist = await User.count({ where: { 'email': us.email } });
    if (exist > 0) {
      return "E-mail já usado!"
    } else {
      await User.create(us)
      var id = await User.findOne({ where: { 'email': us.email } })
      id = id.getDataValue('id');
      return id
    }
  }
  async getAll() {
    return User.findAll()
  }
  async auth(email, password) {
    var data = await (await User.findOne({ where: { 'email': email } }))
    if (data) {
      data = data.get()
      if (bcrypt.compareSync(password, data.password)) {
        return data
      } else {
        return false
      }
    } else {
      return false
    }
  }
}
module.exports = new userModel()
