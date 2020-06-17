const Product = require('../models/Product');
const op = require('sequelize').Op;

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

    return _productsModel;
  }

  async indexById (_id = null) {
    if (!_id) throw new Error('Produto não encontrado para o identificador informado!');

    const _productModel = await Product.findByPk(_id);

    if (!_productModel) throw new Error('O produto não foi encontrado na base de dados!');

    return _productModel;
  }

  async store (_data = null) {
    let _productModel = await Product.create({
      nameProd: _data.name,
      descriptionProd: _data.description,
      isImageUploadProd: false,
      imageProd: null,
      isActiveProd: false
    });

    return _productModel;
  }

  async update (_id = null, _data = null) {
    let _productModel = await this.indexById(_id);

    _productModel.nameProd = _data.name;
    _productModel.descriptionProd = _data.description;

    await _productModel.save();

    return _productModel;
  }

  async delete (_id = null) {
    if (!_id) throw new Error('Por favor informe o código do produto que se deseja apagar!');

    const _productModel = await this.indexById(_id);
    await _productModel.destroy();
  }
}

module.exports = new ProductService();