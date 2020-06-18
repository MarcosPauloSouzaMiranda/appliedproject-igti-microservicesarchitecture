const SaleHeaderService = require('../services/SaleHeaderService');

class SaleHeaderController {
  async indexById (req, res) {
    try {
      const _id = req.params.id;
      const _saleModel = await SaleHeaderService.indexById(_id);

      res
        .status(200)
        .json(_saleModel);
    } catch (e) {
      res
        .status(500)
        .json({msg: e.message});
    }
  }

  async index (req, res) {
    try {
      let _textFilter = req.query.textFilter;
      if (!_textFilter) _textFilter = '';
      const _salesModel = await SaleHeaderService.index(_textFilter);

      res
        .status(200)
        .json(_salesModel);
    } catch (e) {
      res
        .status(500)
        .json({msg: e.message});
    }
  }

  async store (req, res) {
    try {
      const _data = {
        dateTime: req.body.dateTime,
        clientId: req.body.clientId,
        clientFirstName: req.body.clientFirstName,
        clientLastName: req.body.clientLastName,
        totalSale: 0,
        stateSale: 'Criado'
      }
      const _saleModel = await SaleHeaderService.store(_data);

      res
        .status(200)
        .json(_saleModel);
    } catch (e) {
      res
        .status(500)
        .json({msg: e.message});
    }
  }

  async update (req, res) {
    try {
      const _id = req.params.id;
      const _data = {
        dateTime: req.body.dateTime,
        clientId: req.body.clientId,
        clientFirstName: req.body.clientFirstName,
        clientLastName: req.body.clientLastName,
        totalSale: req.body.totalSale,
        stateSale: req.body.stateSale
      }
      const _saleModel = await SaleHeaderService.update(_id, _data);

      res
        .status(200)
        .json(_saleModel);
    } catch (e) {
      res
        .status(500)
        .json({msg: e.message});
    }
  }

  async delete (req, res) {
    try {
      const _id = req.params.id;
      await SaleHeaderService.delete(_id);

      res
        .status(200)
        .json({ msg: 'A venda foi apagada com sucesso!' });
    } catch (e) {
      res
        .status(500)
        .json({msg: e.message});
    }
  }
}

module.exports = new SaleHeaderController();