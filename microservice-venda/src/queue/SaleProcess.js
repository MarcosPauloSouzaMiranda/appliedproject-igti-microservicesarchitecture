const kafka = require('kafka-node');
const dotenv = require('dotenv');

const dotenvOptions = {
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
}
dotenv.config(dotenvOptions);

const SaleHeaderService = require('../services/SaleHeaderService');

const _client = new kafka.KafkaClient({
  kafkaHost: process.env.DOMAIN_KAFKA
});
console.log('Cliente conectado...');

_consumer = new kafka.Consumer(
  _client,
  [
      { topic: 'sale-process' }
  ],
  {
      autoCommit: true
  }
);
console.log('Escutando as mensagens...');
_consumer.on('message', async (message) => {
  const data = JSON.parse(message.value);
  await SaleHeaderService._processSale(data.idSale);
});