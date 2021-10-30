import NodeConsul from '../src';

const nodeConsul = new NodeConsul('localhost:8500');

nodeConsul.deregisterServiceById('test-consul3');
