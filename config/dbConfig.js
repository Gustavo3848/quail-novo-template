const { Sequelize } = require('sequelize');
// var db = new Sequelize('loja1', 'admin', '1234', {
//     host: 'localhost',
//     dialect:'mysql'
// });
var db = new Sequelize('mysql://adminquail:rerogu361@mysql746.umbler.com:41890/quailstorebanco');

module.exports =  function connect() {
        return db
}


