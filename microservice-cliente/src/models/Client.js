const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_SCHEME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
});

class Client extends Model {}

Client.init({
  idCli: {
    field: 'idCli',
    primaryKey: true,
    type: DataTypes.NUMBER,
    autoIncrement: true
  },
  firstNameCli: {
    field: 'firstNameCli',
    type: DataTypes.STRING,
    allowNull: false
  },
  lastNameCli: {
    field: 'lastNameCli',
    type: DataTypes.TEXT,
    allowNull: false
  },
  creditLimitCli: {
    field: 'creditLimitCli',
    type: DataTypes.NUMBER,
    allowNull: false
  },
  isActiveCli: {
    field: 'isActiveCli',
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, { 
  sequelize, 
  modelName: 'client',
  timestamps: false,
  tableName: 'client' 
});


module.exports = Client;