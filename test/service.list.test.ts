import NodeConsul from '../src';

const nodeConsul = new NodeConsul('localhost:8500');

(async () => {
  const list = await nodeConsul.findService('node-consul');
  console.log(list);
})();
