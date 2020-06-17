const ProductService = require('../services/ProductService');
const Product = require('../models/Product');

class ProductController {
  async indexById (req, res) {
    try {
      const _id = req.params.id;
      const _productModel = await ProductService.indexById(_id);
  
      res
        .status(200)
        .json(_productModel);
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

      const _products = await ProductService.index(_textFilter);

      res
        .status(200)
        .json(_products);
    } catch (e) {
      res
        .status(500)
        .json({msg: e.message});
    }
  }

  async store (req, res) {
    try {
      const _data = req.body;
      const _productModel = await ProductService.store(_data);

      res
        .status(200)
        .json(_productModel);
    } catch (e) {
      res
        .status(500)
        .json({msg: e.message});
    }
  }

  async update (req, res) {
    try {
      const _data = req.body;
      const _id = req.params.id;
      const _productModel = await ProductService.update(_id, _data);
  
      res
        .status(200)
        .json(_productModel); 
    } catch (e) {
      res
        .status(500)
        .json({msg: e.message});
    }
  }

  async delete (req, res) {
    try {
      const _id = req.params.id;
      await ProductService.delete(_id);
  
      res
        .status(200)
        .json({msg: 'Produto apagado com sucesso!'});
    } catch (e) {
      res
        .status(500)
        .json({msg: e.message});
    }
  }
}

module.exports = new ProductController();