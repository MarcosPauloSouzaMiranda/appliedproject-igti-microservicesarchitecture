const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_SCHEME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
});

class SaleHeader extends Model {}

SaleHeader.init({
  idSaleHe: {
    field: 'idSaleHe',
    primaryKey: true,
    type: DataTypes.NUMBER,
    autoIncrement: true
  },
  dateTimeSaleHe: {
    field: 'dateTimeSaleHe',
    type: DataTypes.DATE,
    allowNull: false
  },
  clientIdSaleHe: {
    field: 'clientIdSaleHe',
    type: DataTypes.NUMBER,
    allowNull: false
  },
  clientFirstNameSaleHe: {
    field: 'clientFirstNameSaleHe',
    type: DataTypes.STRING,
    allowNull: false
  },
  clientLastNameSaleHe: {
    field: 'clientLastNameSaleHe',
    type: DataTypes.STRING,
    allowNull: false
  },
  totalSaleHe: {
    field: 'totalSaleHe',
    type: DataTypes.NUMBER,
    allowNull: false
  },
  stateSaleHe: {
    field: 'stateSaleHe',
    type: DataTypes.STRING,
    allowNull: false
  }
}, { 
  sequelize, 
  modelName: 'saleheader',
  timestamps: false,
  tableName: 'saleheader' 
});


module.exports = SaleHeader;