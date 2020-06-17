const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_SCHEME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
});

class Product extends Model {}

Product.init({
  idProd: {
    field: 'idProd',
    primaryKey: true,
    type: DataTypes.NUMBER,
    autoIncrement: true
  },
  nameProd: {
    field: 'nameProd',
    type: DataTypes.STRING,
    allowNull: false
  },
  descriptionProd: {
    field: 'descriptionProd',
    type: DataTypes.TEXT,
    allowNull: true
  },
  isImageUploadProd: {
    field: 'isImageUploadProd',
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  imageProd: {
    field: 'imageProd',
    type: DataTypes.STRING,
    allowNull: true
  },
  isActiveProd: {
    field: 'isActiveProd',
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, { 
  sequelize, 
  modelName: 'product',
  timestamps: false,
  tableName: 'product' 
});


module.exports = Product;