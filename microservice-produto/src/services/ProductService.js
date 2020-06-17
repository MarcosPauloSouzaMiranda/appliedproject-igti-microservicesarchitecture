const Product = require('../models/Product');
const op = require('sequelize').Op;
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;


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

    return _productModel;
  }

  async delete (_id = null) {
    if (!_id) throw new Error('Por favor informe o código do produto que se deseja apagar!');

    const _productModel = await this.indexById(_id);
    await _productModel.destroy();
  }
}

module.exports = new ProductService();