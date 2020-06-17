const express = require('express');
const dotenv = require('dotenv');

class App {

  constructor () {
    this.app = express();    
    this._configDotEnv();
    this._initializeMiddlewares();
  }

  _initializeMiddlewares () {
    const cors = require('cors');
    this.app.use(cors());

    this.app.use(express.json({limit: '50mb'}));

    this.app.use('/public', express.static('./src/uploads/'));

    const routes = require('./routes');
    this.app.use(routes);
  }

  _configDotEnv () {
    const dotenvOptions = {
      path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
    }
    dotenv.config(dotenvOptions)
  }

}

module.exports = new App().app;