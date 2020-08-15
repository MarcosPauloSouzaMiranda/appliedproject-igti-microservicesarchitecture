const SaleHeader = require('../models/SaleHeader');
const op = require('sequelize').Op;
const kafka = require('kafka-node');

class SaleHeaderService{
  async index (_textFilter = '') {
    const _saleHeadersModel = await SaleHeader.findAll({
      where: {
        [op.or]: [
          {
            dateTimeSaleHe: {
              [op.like]: `%${_textFilter}%`
            }
          },
          {
            clientFirstNameSaleHe: {
              [op.like]: `%${_textFilter}%`
            },
          },
          {
            clientLastNameSaleHe: {
              [op.like]: `%${_textFilter}%`
            }
          }
        ]
      }
    });

    return _saleHeadersModel;
  }

  async indexById (_id = null) {

    if (!_id) throw new Error('Por favor informe o código da venda que se deseja encontrar!');

    const _saleModel = await SaleHeader.findByPk(_id);

    if (!_saleModel) throw new Error('A venda não foi encontrada na base de dados!');

    return _saleModel;
  }

  async store (_data = null) {
    const _saleModel = await SaleHeader.create({
      dateTimeSaleHe: _data.dateTime,
      clientIdSaleHe: _data.clientId,
      clientFirstNameSaleHe: _data.clientFirstName,
      clientLastNameSaleHe: _data.clientLastName,
      totalSaleHe: 0,
      stateSaleHe: 'Criado'
    });

    return _saleModel;
  }

  async update (_id = null, _data = null) {
    const _saleModel = await this.indexById(_id);

    let _isEmitedMessage = _saleModel.stateSaleHe === 'Criado' && _data.stateSale === 'Liberado';

    console.log(_isEmitedMessage);

    _saleModel.dateTimeSaleHe        = _data.dateTime;
    _saleModel.clientIdSaleHe        = _data.clientId;
    _saleModel.clientFirstNameSaleHe = _data.clientFirstName;
    _saleModel.clientLastNameSaleHe  = _data.clientLastName;
    _saleModel.totalSaleHe           = _data.totalSale;
    _saleModel.stateSaleHe           = _data.stateSale;

    if (_isEmitedMessage) this._emitedMessageProcessSale(_saleModel.idSaleHe);

    await _saleModel.save();

    return _saleModel;
  }

  async delete (_id = null) {
    if (!_id) throw new Error('Por favor informe o código da venda que se deseja apagar!');
    const _saleModel = await this.indexById(_id);
    await _saleModel.destroy();
  }

  _emitedMessageProcessSale (_idSale) {
    const _client = new kafka.KafkaClient({
      kafkaHost: process.env.DOMAIN_KAFKA
    });
    const _producer = new kafka.Producer(_client);
    _producer.on("ready", () => {
      _producer.send([{
        topic: 'sale-process',
        messages: [JSON.stringify({idSale: _idSale})],
      }], (error, data) => {

        if (error) throw new Error('Ocorreu um erro ao gerar a mensagem da fila de processo de vendas!');
      });
    });

    _producer.on('error', (error) => {
      throw new Error('Ocorreu um erro ao conectar-se no apache kafka!');
    });
  }
}

module.exports = new SaleHeaderService();