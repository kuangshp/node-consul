## <center>Node中使用consul实现服务发现</center>



## 一、使用方式

* 1、安装依赖包

  ```properties
  npm install node-consul
  ```

* 2、使用

  ```typescript
  import NodeConsul, { computerIPAddress } from '../src';
  
  const nodeConsul = new NodeConsul('localhost:8500');
  
  // 注册一个服务
  nodeConsul.registerService(6000, 'test-consul2', 'test-consul3', ['test1', 'test2'], {
    HTTP: `http://${computerIPAddress()}:3000/health`,
    Timeout: '5s',
    Interval: '5s',
    DeregisterCriticalServiceAfter: '10s',
  });
  
  // 删除服务
  nodeConsul.deregisterServiceById('test-consul3');
  
  // 查询服务
  (async () => {
    const list = await nodeConsul.findService('node-consul');
    console.log(list);
  })();
  ```

  