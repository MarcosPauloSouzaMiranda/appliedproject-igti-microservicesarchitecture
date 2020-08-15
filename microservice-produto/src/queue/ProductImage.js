const kafka = require('kafka-node');
const dotenv = require('dotenv');

const dotenvOptions = {
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
}
dotenv.config(dotenvOptions);

const ProductService = require('../services/ProductService');

const _client = new kafka.KafkaClient({
  kafkaHost: '192.168.99.100:9092'
});
console.log('Cliente conectado...');

_consumer = new kafka.Consumer(
  _client,
  [
      { topic: 'product-image' }
  ],
  {
      autoCommit: true
  }
);
console.log('Escutando as mensagens...');
_consumer.on('message', (message) => {
  ProductService.uploadImage(JSON.parse(message.value).idProduct);
});