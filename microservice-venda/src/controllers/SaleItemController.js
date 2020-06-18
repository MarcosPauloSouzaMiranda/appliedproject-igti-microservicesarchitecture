const SaleItemService = require('../services/SaleItemService');

class SaleItemController {
  async indexById (req, res) {
    try {
      const _idHeader = req.params.idHeader;
      const _idItem = req.params.idItem;
      const _saleItemModel = await SaleItemService.indexById(_idHeader, _idItem);

      res
        .status(200)
        .json(_saleItemModel);
    } catch (e) {
      res
        .status(500)
        .json({msg: e.message});
    }
  }

  async index (req, res) {
    try {
      const _idHeader = req.params.idHeader;
      const _saleItemsModel = await SaleItemService.index(_idHeader);

      res
        .status(200)
        .json(_saleItemsModel);
    } catch (e) {
      res
        .status(500)
        .json({msg: e.message});
    }
  }

  async store (req, res) {
    try {
      const _idHeader = req.params.idHeader;
      const _data = {
        idProduct: req.body.idProduct,
        nameProduct: req.body.nameProduct,
        quantity: req.body.quantity,
        unitValue: req.body.unitValue
      }
      const _saleItemModel = await SaleItemService.store(_idHeader, _data);

      res
        .status(200)
        .json(_saleItemModel);
    } catch (e) {
      res
        .status(500)
        .json({msg: e.message});
    }
  }

  async update (req, res) {
    try {
      const _idHeader = req.params.idHeader;
      const _idItem = req.params.idItem;
      const _data = {
        idProduct: req.body.idProduct,
        nameProduct: req.body.nameProduct,
        quantity: req.body.quantity,
        unitValue: req.body.unitValue
      }
      const _saleItemModel = await SaleItemService.update(_idHeader, _idItem, _data);

      res
        .status(200)
        .json(_saleItemModel);
    } catch (e) {
      res
        .status(500)
        .json({msg: e.message});
    }
  }

  async delete (req, res) {
    try {
      const _idHeader = req.params.idHeader;
      const _idItem = req.params.idItem;
      await SaleItemService.delete(_idHeader, _idItem);

      res
        .status(200)
        .json({ msg: 'Item da venda apagado com sucesso!' });
    } catch (e) {
      res
        .status(500)
        .json({msg: e.message});
    }
  }
}

module.exports = new SaleItemController();