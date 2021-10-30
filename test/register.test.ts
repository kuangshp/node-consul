import NodeConsul, { computerIPAddress } from '../src';

const nodeConsul = new NodeConsul('localhost:8500');

nodeConsul.registerService(6000, 'test-consul2', 'test-consul3', ['test1', 'test2'], {
  HTTP: `http://${computerIPAddress()}:3000/health`,
  Timeout: '5s',
  Interval: '5s',
  DeregisterCriticalServiceAfter: '10s',
});
