const express = require('express');
const routes = express.Router();

const ProductController = require('./controllers/ProductController');

routes.post('/product', ProductController.store);
routes.put('/product/:id', ProductController.update);
routes.get('/product', ProductController.index);
routes.get('/product/:id', ProductController.indexById);
routes.delete('/product/:id', ProductController.delete);

module.exports = routes;