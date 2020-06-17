const ClientService = require('../services/ClientService');

class ClientController {
  async indexById (req, res) {
    try {
      const _id = req.params.id;
      const _clientModel = await ClientService.indexById(_id);
      
      res
        .status(200)
        .json(_clientModel);
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
      const _clientsModel = await ClientService.index(_textFilter);

      res
        .status(200)
        .json(_clientsModel);
    } catch (e) {
      res
        .status(500)
        .json({msg: e.message});
    }
  }

  async store (req, res) {
    try {
      const _data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        creditLimit: req.body.creditLimit,
        isActive: req.body.isActive
      }
      const _clientModel = await ClientService.store(_data);

      res
        .status(200)
        .json(_clientModel);
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
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        creditLimit: req.body.creditLimit,
        isActive: req.body.isActive
      }
      const _clientModel = await ClientService.update(_id, _data);

      res
        .status(200)
        .json(_clientModel);
    } catch (e) {
      res
        .status(500)
        .json({msg: e.message});
    }
  }

  async delete (req, res) {
    try {
      const _id = req.params.id;
      await ClientService.delete(_id);

      res
        .status(200)
        .json({ msg: 'Cliente apagado com sucesso!' });
    } catch (e) {
      res
        .status(500)
        .json({msg: e.message});
    }
  }
}

module.exports = new ClientController();