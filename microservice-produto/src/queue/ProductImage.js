const kafka = require('kafka-node');

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
console.log('Instância do consumer...');

_consumer.on('ready', () => {
  console.log('Consumer is ready.');  
});

console.log('Escutando as mensagens...');
_consumer.on('message', (message) => {
  console.log(message.value);
});