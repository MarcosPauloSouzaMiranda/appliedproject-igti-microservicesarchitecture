const SaleItem = require('../models/SaleItem');

class SaleItemService{
  async index (_idHeader = null) {
    const _saleItemsModel = await SaleItem.findAll({
      where: {
        idSaleHeaderSaleItem: _idHeader
      }
    });

    return _saleItemsModel;
  }

  async indexById (_idHeader = null, _idItem = null) {

    if (!_idHeader) throw new Error('Por favor informe o código da venda que se deseja encontrar!');
    if (!_idItem) throw new Error('Por favor informe o código do item na venda que se deseja encontrar!');

    const _saleItemModel = await SaleItem.findOne({
      where: {
        idSaleItem: _idItem,
        idSaleHeaderSaleItem: _idHeader
      }
    });

    if (!_saleItemModel) throw new Error('O item da venda não foi encontrado na base de dados!');

    return _saleItemModel;
  }

  async store (_idHeader = null, _data = null) {
    const _saleItemModel = await SaleItem.create({
      idSaleHeaderSaleItem: _idHeader,
      idProductSaleItem: _data.idProduct,
      nameProductSaleItem: _data.nameProduct,
      quantitySaleItem: _data.quantity,
      unitValueSaleItem: _data.unitValue,
      totalValueSaleItem: (_data.quantity * _data.unitValue)
    });

    return _saleItemModel;
  }

  async update (_idHeader = null, _idItem = null, _data = null) {
    const _saleItemModel = await this.indexById(_idHeader, _idItem);

    _saleItemModel.idSaleHeaderSaleItem = _idHeader,
    _saleItemModel.idProductSaleItem    = _data.idProduct,
    _saleItemModel.nameProductSaleItem  = _data.nameProduct,
    _saleItemModel.quantitySaleItem     = _data.quantity
    _saleItemModel.unitValueSaleItem    = _data.unitValue
    _saleItemModel.totalValueSaleItem   = (_data.quantity * _data.unitValue)

    await _saleItemModel.save();

    return _saleItemModel;
  }

  async delete (_idHeader = null, _idItem = null) {
    const _saleItemModel = await this.indexById(_idHeader, _idItem);
    await _saleItemModel.destroy();
  }
}

module.exports = new SaleItemService();