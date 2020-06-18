const express = require('express');
const routes = express.Router();

const SaleHeaderController = require('./controllers/SaleHeaderController');
const SaleItemController = require('./controllers/SaleItemController');

routes.post('/sale', SaleHeaderController.store);
routes.put('/sale/:id', SaleHeaderController.update);
routes.get('/sale', SaleHeaderController.index);
routes.get('/sale/:id', SaleHeaderController.indexById);
routes.delete('/sale/:id', SaleHeaderController.delete);

routes.post('/sale/:idHeader/item', SaleItemController.store);
routes.put('/sale/:idHeader/item/:idItem', SaleItemController.update);
routes.get('/sale/:idHeader/item', SaleItemController.index);
routes.get('/sale/:idHeader/item/:idItem', SaleItemController.indexById);
routes.delete('/sale/:idHeader/item/:idItem', SaleItemController.delete);


module.exports = routes;