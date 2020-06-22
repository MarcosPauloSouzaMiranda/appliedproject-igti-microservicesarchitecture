const Product = require('../models/Product');
const op = require('sequelize').Op;
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const kafka = require('kafka-node');

class ProductService {

  async index (_textFilter = '') {
    const _productsModel = await Product.findAll({
      where: {
        [op.or]: [
          {
            nameProd: {
              [op.like]: `%${_textFilter}%`
            },
          },
          {
            descriptionProd: {
              [op.like]: `%${_textFilter}%`
            }
          }
        ]
      }
    });

    _productsModel.forEach(_productModel => {
      if ((!_productModel.isImageUploadProd) && (_productModel.imageProd)) {
        _productModel.imageProd = `${process.env.DOMAIN_STATIC}${_productModel.imageProd}`
      }
    });

    return _productsModel;
  }

  async indexById (_id = null) {
    if (!_id) throw new Error('Produto não encontrado para o identificador informado!');

    const _productModel = await Product.findByPk(_id);

    if (!_productModel) throw new Error('O produto não foi encontrado na base de dados!');

    if ((!_productModel.isImageUploadProd) && (_productModel.imageProd)) {
      _productModel.imageProd = `${process.env.DOMAIN_STATIC}${_productModel.imageProd}`
    }

    return _productModel;
  }

  async store (_data = null) {

    let nameImage = null;

    if (_data.image !== '' &&
        _data.image !== null &&
        _data.image !== undefined) {

      _data.image = _data.image.replace('data:image/png;base64,', '');
      _data.image = _data.image.replace('data:image/jpg;base64,', '');
      _data.image = _data.image.replace('data:image/gif;base64,', '');

      nameImage = uuidv4() + '.png';

      await fs.writeFile(`./src/uploads/${nameImage}`, _data.image, 'base64');
    }

    let _productModel = await Product.create({
      nameProd: _data.name,
      descriptionProd: _data.description,
      isImageUploadProd: false,
      imageProd: nameImage,
      isActiveProd: false
    });

    if (_data.image !== '' &&
        _data.image !== null &&
        _data.image !== undefined) {
      this._emitedMessageKafka(_productModel.idProd);
    }

    return _productModel;
  }

  async update (_id = null, _data = null) {

    let nameImage = null;

    if (_data.image !== '' &&
        _data.image !== null &&
        _data.image !== undefined) {

      _data.image = _data.image.replace('data:image/png;base64,', '');
      _data.image = _data.image.replace('data:image/jpg;base64,', '');
      _data.image = _data.image.replace('data:image/gif;base64,', '');

      nameImage = uuidv4() + '.png';

      await fs.writeFile(`./src/uploads/${nameImage}`, _data.image, 'base64');
    }

    let _productModel = await this.indexById(_id);

    _productModel.nameProd = _data.name;
    _productModel.descriptionProd = _data.description;

    if (nameImage) {
      _productModel.imageProd = nameImage;
      _productModel.isImageUploadProd = false;
    }

    await _productModel.save();

    if (nameImage) {
      this._emitedMessageKafka(_productModel.idProd);
    }

    return _productModel;
  }

  async delete (_id = null) {
    if (!_id) throw new Error('Por favor informe o código do produto que se deseja apagar!');

    const _productModel = await this.indexById(_id);
    await _productModel.destroy();
  }

  _emitedMessageKafka (_id = null) {
    const _client = new kafka.KafkaClient({
      kafkaHost: process.env.DOMAIN_KAFKA
    });
    const _producer = new kafka.Producer(_client);
    _producer.on("ready", () => {
      _producer.send([{
        topic: 'product-image',
        messages: [JSON.stringify({idProduct: _id})],
      }], (error, data) => {
        if (error) throw new Error('Ocorreu um erro ao gerar a mensagem da fila de upload de imagens!');
      });
    });

    _producer.on('error', (error) => {
      throw new Error('Ocorreu um erro ao conectar-se no apache kafka!');
    });
  }
}

module.exports = new ProductService();