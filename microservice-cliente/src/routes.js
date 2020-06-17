const express = require('express');
const routes = express.Router();

const ClientController = require('./controllers/ClientController');

routes.post('/client', ClientController.store);
routes.put('/client/:id', ClientController.update);
routes.get('/client', ClientController.index);
routes.get('/client/:id', ClientController.indexById);
routes.delete('/client/:id', ClientController.delete);

module.exports = routes;