const Client = require('../models/Client');
const op = require('sequelize').Op;

class ClientService {
  async index (_textFilter = '') {
    const _clientsModel = await Client.findAll({
      where: {
        [op.or]: [
          {
            firstNameCli: {
              [op.like]: `%${_textFilter}%`
            },
          },
          {
            lastNameCli: {
              [op.like]: `%${_textFilter}%`
            }
          }
        ]
      }
    });

    return _clientsModel;
  }

  async indexById (_id = null) {

    if (!_id) throw new Error('Por favor informe o código do cliente que se deseja encontrar!');

    const _clientModel = await Client.findByPk(_id);

    if (!_clientModel) throw new Error('O cliente não foi encontrado na base de dados!');

    return _clientModel;
  }

  async store (_data = null) {
    const _clientModel = await Client.create({
      firstNameCli: _data.firstName,
      lastNameCli: _data.lastName,
      creditLimitCli: _data.creditLimit,
      isActiveCli: _data.isActive
    });

    return _clientModel;
  }

  async update (_id = null, _data = null) {
    const _clientModel = await this.indexById(_id);

    _clientModel.firstNameCli   = _data.firstName,
    _clientModel.lastNameCli    = _data.lastName,
    _clientModel.creditLimitCli = _data.creditLimit,
    _clientModel.isActiveCli    = _data.isActive

    await _clientModel.save();

    return _clientModel;
  }

  async delete (_id = null) {
    if (!_id) throw new Error('Por favor informe o código do cliente que se deseja apagar!');
    const _clientModel = await this.indexById(_id);
    await _clientModel.destroy();
  }
}

module.exports = new ClientService();