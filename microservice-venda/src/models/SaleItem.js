const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_SCHEME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
});

class SaleItem extends Model {}

SaleItem.init({
  idSaleItem: {
    field: 'idSaleItem',
    primaryKey: true,
    type: DataTypes.NUMBER,
    autoIncrement: true
  },
  idSaleHeaderSaleItem: {
    field: 'idSaleHeaderSaleItem',
    type: DataTypes.NUMBER,
    allowNull: false
  },
  idProductSaleItem: {
    field: 'idProductSaleItem',
    type: DataTypes.NUMBER,
    allowNull: false
  },
  nameProductSaleItem: {
    field: 'nameProductSaleItem',
    type: DataTypes.STRING,
    allowNull: false
  },
  quantitySaleItem: {
    field: 'quantitySaleItem',
    type: DataTypes.NUMBER,
    allowNull: false
  },
  unitValueSaleItem: {
    field: 'unitValueSaleItem',
    type: DataTypes.NUMBER,
    allowNull: false
  },
  totalValueSaleItem: {
    field: 'totalValueSaleItem',
    type: DataTypes.NUMBER,
    allowNull: false
  }
}, { 
  sequelize, 
  modelName: 'saleitem',
  timestamps: false,
  tableName: 'saleitem' 
});


module.exports = SaleItem;